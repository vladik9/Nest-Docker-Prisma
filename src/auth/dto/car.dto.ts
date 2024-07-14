import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';
export class CarDto {
  // this are pipes or annotations
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsString()
  @IsNotEmpty()
  color: string;
  @IsNumber()
  @IsNotEmpty()
  @Max(5)
  seats: number;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
