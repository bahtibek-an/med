import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthDto, LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async register(createAuthDto: RegisterAuthDto) {
    const candidate = await this.userService.findByUsername(createAuthDto.username);
    if (candidate) {
      throw new BadRequestException('User already exists');
    }
    const passwordSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createAuthDto.password, passwordSalt);
    const user = await this.userService.create({ ...createAuthDto, password: hashPassword });
    const payload = await this.createUserPayload(user);
    return new AuthDto(user, payload);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findByUsername(loginAuthDto.username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isEqualPassword = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!isEqualPassword) {
      throw new BadRequestException('User not found');
    }
    const payload = await this.createUserPayload(user);
    return new AuthDto(user, payload);
  }

  private async createUserPayload(user: User) {
    const payload = {
      userId: user.id,
      username: user.username,
      fullName: user.fullName,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

}
