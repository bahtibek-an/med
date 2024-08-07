import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './auth.dto';

export class UpdateAuthDto extends PartialType(RegisterAuthDto) {}
