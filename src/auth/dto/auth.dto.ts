import { User } from '../../user/entities/user.entity';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: any, args: ValidationArguments) {
    const object = args.object as RegisterAuthDto;
    return object.password === confirmPassword;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password and confirm password do not match';
  }
}

function IsPasswordMatching(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordMatchingConstraint,
    });
  };
}

export class AuthDto {
  user: {
    id: number;
    username: string;
    fullName: string;
  }
  accessToken: string;

  constructor(user: User, accessToken: string) {
    this.user = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
    }
    this.accessToken = accessToken;
  }

}

import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  fullName: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  @IsPasswordMatching({ message: 'Password and confirm password do not match' })
  confirmPassword: string;
}

export class LoginAuthDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
