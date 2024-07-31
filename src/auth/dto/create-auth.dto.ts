import { IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(4)
  fullName: string;

  @IsString()
  password: string;
}

