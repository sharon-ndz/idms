import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare const RequiredIf: (property: string, dto: any) => PropertyDecorator;
export declare const RequiredIfValueIs: (property: string, value: any, dto: any) => PropertyDecorator;
export declare const RequiredIfValueInArray: (property: string, values: any[], dto: any) => PropertyDecorator;
export declare const RequiredIfValueIsNot: (property: string, value: any, dto: any) => PropertyDecorator;
export declare const RequiredIfValueIsNotInArray: (property: string, values: any[], dto: any) => PropertyDecorator;
export declare const RequiredIfDaysBetween: (property: string, value: number, dtoClass: any) => PropertyDecorator;
export declare class YearMonthFormatConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean;
}
export declare class IsTimeConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class IsNGPhoneNumberConstraints implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class IsValidDateFormatConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsValidDateFormat(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare function IsNGPhoneNumber(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare function IsTime(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare function IsYearMonthFormat(validationOptions?: ValidationOptions): (propertyObject: any, propertyName: string) => void;
export declare function IsInReg(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
