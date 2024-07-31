import { User } from '../../user/entities/user.entity';


export class AuthDto {
  id: number;
  username: string;
  fullName: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.fullName = user.fullName;
  }

}