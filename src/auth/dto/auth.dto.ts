import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
  // this are pipes or annotations
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
