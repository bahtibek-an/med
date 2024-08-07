import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
class IsTimeConstraint implements ValidatorConstraintInterface {
  validate(time: any, args: ValidationArguments) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return typeof time === 'string' && timeRegex.test(time);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Time ($value) must be in the format HH:MM';
  }
}

export function IsTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeConstraint,
    });
  };
}
