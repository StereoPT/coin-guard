import { Transform, TransformFnParams } from 'class-transformer';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { format, isValid, parse } from 'date-fns';

@ValidatorConstraint({ async: false })
export class DateFormatConstraint implements ValidatorConstraintInterface {
  validate(dateString: string): boolean {
    const parsedDate = parse(dateString, 'yyyy/MM/dd', new Date());
    return isValid(parsedDate);
  }

  defaultMessage(): string {
    return 'date must be in the format dd/MM/yyyy';
  }
}

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DateFormatConstraint,
    });

    Transform(({ value }: TransformFnParams) => {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return format(parsedDate, 'yyyy/MM/dd');
    })(object, propertyName);
  };
}
