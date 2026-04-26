import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, SendOtpDto, VerifyOtpDto } from './dto';

@Injectable()
export class AuthService {
  // In-memory OTP store: email -> { code, expiresAt }
  private otpStore = new Map<string, { code: string; expiresAt: Date }>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user with UTeM email
   */
  async register(dto: RegisterDto) {
    // Validate UTeM email domain
    if (
      !dto.email.endsWith('@student.utem.edu.my') &&
      !dto.email.endsWith('@utem.edu.my')
    ) {
      throw new UnauthorizedException('Only UTeM email addresses are allowed');
    }

    // Check for existing user
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    // Hash password & create user
    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        studentId: dto.studentId,
        password: hashedPassword,
      },
    });

    // Generate JWT
    const token = this.generateToken(user.id, user.email, user.role);

    return {
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken: token,
    };
  }

  /**
   * Login with email and password
   */
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.email, user.role);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken: token,
    };
  }

  /**
   * Generate a JWT token
   */
  private generateToken(userId: string, email: string, role: string): string {
    return this.jwtService.sign({
      sub: userId,
      email,
      role,
    });
  }

  /**
   * Send OTP — generates a random 6-digit code and stores it in memory.
   * In the future this will send via email (e.g. Resend).
   */
  async sendOtp(dto: SendOtpDto) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    this.otpStore.set(dto.email, { code, expiresAt });

    // Log for testing (visible in Postman / server console)
    console.log(`[OTP] Code for ${dto.email}: ${code}`);

    return {
      message: 'OTP sent successfully',
      // Return the code in dev for easy testing via Postman
      ...(process.env.NODE_ENV !== 'production' && { code }),
    };
  }

  /**
   * Verify OTP — checks the code against the in-memory store.
   * Returns the user's role so the frontend can decide where to navigate.
   */
  async verifyOtp(dto: VerifyOtpDto) {
    const entry = this.otpStore.get(dto.email);

    if (!entry) {
      throw new UnauthorizedException('No OTP found for this email. Please request a new one.');
    }

    if (new Date() > entry.expiresAt) {
      this.otpStore.delete(dto.email);
      throw new UnauthorizedException('OTP has expired. Please request a new one.');
    }

    if (entry.code !== dto.code) {
      throw new UnauthorizedException('Invalid OTP code.');
    }

    // OTP verified — clean up
    this.otpStore.delete(dto.email);

    // Fetch user to return their role
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    return {
      message: 'OTP verified successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
