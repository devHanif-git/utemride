import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: string; email: string; name: string; role: string };
}

@Controller('rides')
@UseGuards(JwtAuthGuard)
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  /**
   * POST /api/v1/rides — Request a new ride
   */
  @Post()
  async createRide(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateRideDto,
  ) {
    return this.ridesService.createRide(req.user.id, dto);
  }

  /**
   * GET /api/v1/rides — Get user's ride history
   */
  @Get()
  async getUserRides(@Req() req: AuthenticatedRequest) {
    return this.ridesService.getUserRides(req.user.id);
  }

  /**
   * GET /api/v1/rides/:id — Get a specific ride
   */
  @Get(':id')
  async getRide(@Param('id') id: string) {
    return this.ridesService.getRide(id);
  }

  /**
   * PATCH /api/v1/rides/:id/cancel — Cancel a ride
   */
  @Patch(':id/cancel')
  async cancelRide(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body('reason') reason?: string,
  ) {
    return this.ridesService.cancelRide(id, req.user.id, reason);
  }
}
