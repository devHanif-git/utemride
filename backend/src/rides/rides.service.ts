import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto';
import { RideStatus } from '@prisma/client';

@Injectable()
export class RidesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Request a new ride
   */
  async createRide(riderId: string, dto: CreateRideDto) {
    // Check if rider already has an active ride
    const activeRide = await this.prisma.ride.findFirst({
      where: {
        riderId,
        status: {
          in: [
            RideStatus.REQUESTED,
            RideStatus.ACCEPTED,
            RideStatus.DRIVER_ARRIVED,
            RideStatus.IN_PROGRESS,
          ],
        },
      },
    });

    if (activeRide) {
      throw new BadRequestException('You already have an active ride');
    }

    // Calculate estimated fare (simple distance-based formula)
    const distanceKm = this.calculateDistance(
      dto.pickupLat,
      dto.pickupLng,
      dto.dropoffLat,
      dto.dropoffLng,
    );
    const estimatedFare = this.calculateFare(distanceKm);

    const ride = await this.prisma.ride.create({
      data: {
        riderId,
        pickupAddress: dto.pickupAddress,
        pickupLat: dto.pickupLat,
        pickupLng: dto.pickupLng,
        dropoffAddress: dto.dropoffAddress,
        dropoffLat: dto.dropoffLat,
        dropoffLng: dto.dropoffLng,
        distanceKm,
        estimatedFare,
        status: RideStatus.REQUESTED,
      },
    });

    return ride;
  }

  /**
   * Get a specific ride by ID
   */
  async getRide(rideId: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        rider: { select: { id: true, name: true, phone: true } },
        driver: { select: { id: true, name: true, phone: true } },
      },
    });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    return ride;
  }

  /**
   * Get ride history for a user
   */
  async getUserRides(userId: string) {
    return this.prisma.ride.findMany({
      where: {
        OR: [{ riderId: userId }, { driverId: userId }],
      },
      orderBy: { requestedAt: 'desc' },
      take: 20,
    });
  }

  /**
   * Cancel a ride
   */
  async cancelRide(rideId: string, userId: string, reason?: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.riderId !== userId && ride.driverId !== userId) {
      throw new BadRequestException('You are not part of this ride');
    }

    if (
      ride.status === RideStatus.COMPLETED ||
      ride.status === RideStatus.CANCELLED
    ) {
      throw new BadRequestException('This ride cannot be cancelled');
    }

    return this.prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.CANCELLED,
        cancelledAt: new Date(),
        cancelReason: reason,
      },
    });
  }

  // ─── Helper Methods ───────────────────────────────────────

  /**
   * Haversine formula — calculate distance between two GPS coordinates in km
   */
  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 100) / 100; // Round to 2 decimal places
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Simple fare calculation
   * Base fare: RM 2.00 + RM 1.50 per km
   */
  private calculateFare(distanceKm: number): number {
    const baseFare = 2.0;
    const perKmRate = 1.5;
    const fare = baseFare + distanceKm * perKmRate;
    return Math.round(fare * 100) / 100; // Round to 2 decimal places
  }
}
