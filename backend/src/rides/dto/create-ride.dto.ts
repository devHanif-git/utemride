import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRideDto {
  @IsString()
  @IsNotEmpty()
  pickupAddress!: string;

  @IsNumber()
  pickupLat!: number;

  @IsNumber()
  pickupLng!: number;

  @IsString()
  @IsNotEmpty()
  dropoffAddress!: string;

  @IsNumber()
  dropoffLat!: number;

  @IsNumber()
  dropoffLng!: number;
}
