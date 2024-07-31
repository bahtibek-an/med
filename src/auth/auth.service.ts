import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from "bcrypt";
import { AuthDto } from './dto/auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  async register(createAuthDto: CreateAuthDto) {
    const candidate = await this.userService.findByUsername(createAuthDto.username);
    if (candidate) {
      throw new BadRequestException("User already exists");
    }
    const passwordSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createAuthDto.password, passwordSalt);
    const user = await this.userService.create({ ...createAuthDto, password: hashPassword });
    return new AuthDto(user);
  }
}
