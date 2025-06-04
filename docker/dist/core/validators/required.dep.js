"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDateFormatConstraint = exports.IsNGPhoneNumberConstraints = exports.IsTimeConstraint = exports.YearMonthFormatConstraint = exports.RequiredIfDaysBetween = exports.RequiredIfValueIsNotInArray = exports.RequiredIfValueIsNot = exports.RequiredIfValueInArray = exports.RequiredIfValueIs = exports.RequiredIf = void 0;
exports.IsValidDateFormat = IsValidDateFormat;
exports.IsNGPhoneNumber = IsNGPhoneNumber;
exports.IsTime = IsTime;
exports.IsYearMonthFormat = IsYearMonthFormat;
exports.IsInReg = IsInReg;
const class_validator_1 = require("class-validator");
const enums_1 = require("../constants/enums");
const RequiredIf = (property, dto) => (0, class_validator_1.ValidateIf)((dto) => typeof dto[property] !== 'undefined');
exports.RequiredIf = RequiredIf;
const RequiredIfValueIs = (property, value, dto) => (0, exports.RequiredIfValueInArray)(property, [value], dto);
exports.RequiredIfValueIs = RequiredIfValueIs;
const RequiredIfValueInArray = (property, values, dto) => (0, class_validator_1.ValidateIf)((dto) => typeof dto[property] !== 'undefined' && values.includes(dto[property]));
exports.RequiredIfValueInArray = RequiredIfValueInArray;
const RequiredIfValueIsNot = (property, value, dto) => (0, exports.RequiredIfValueIsNotInArray)(property, [value], dto);
exports.RequiredIfValueIsNot = RequiredIfValueIsNot;
const RequiredIfValueIsNotInArray = (property, values, dto) => (0, class_validator_1.ValidateIf)((dto) => typeof dto[property] !== 'undefined' && !values.includes(dto[property]));
exports.RequiredIfValueIsNotInArray = RequiredIfValueIsNotInArray;
const RequiredIfDaysBetween = (property, value, dtoClass) => (0, class_validator_1.ValidateIf)((object, value) => {
    if (typeof object[property] !== 'undefined') {
        let date = object[property];
        if (date instanceof Date) {
            date = object[property].toISOString();
        }
        const providedDate = new Date(date);
        const currentDate = new Date();
        const daysAgo = new Date(currentDate.getTime() - value * 24 * 60 * 60 * 1000);
        return providedDate >= daysAgo && providedDate <= currentDate;
    }
    return true;
});
exports.RequiredIfDaysBetween = RequiredIfDaysBetween;
let YearMonthFormatConstraint = class YearMonthFormatConstraint {
    validate(value) {
        const pattern = /^\d{4}-\d{2}-\d{2}$/;
        return pattern.test(value);
    }
};
exports.YearMonthFormatConstraint = YearMonthFormatConstraint;
exports.YearMonthFormatConstraint = YearMonthFormatConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'yearMonthFormat', async: false })
], YearMonthFormatConstraint);
let IsTimeConstraint = class IsTimeConstraint {
    validate(value) {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
        return timeRegex.test(value);
    }
    defaultMessage(args) {
        return `${args.property} is not a valid time.`;
    }
};
exports.IsTimeConstraint = IsTimeConstraint;
exports.IsTimeConstraint = IsTimeConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isTime', async: false })
], IsTimeConstraint);
let IsNGPhoneNumberConstraints = class IsNGPhoneNumberConstraints {
    validate(value, args) {
        const phoneNumberRegex = /^(070|080|081|090|091)\d{8}$/;
        return phoneNumberRegex.test(value);
    }
    defaultMessage(args) {
        return `${args.property} must be a valid Nigerian phone number.`;
    }
};
exports.IsNGPhoneNumberConstraints = IsNGPhoneNumberConstraints;
exports.IsNGPhoneNumberConstraints = IsNGPhoneNumberConstraints = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isNGPhoneNumber', async: false })
], IsNGPhoneNumberConstraints);
let IsValidDateFormatConstraint = class IsValidDateFormatConstraint {
    validate(value, args) {
        if (typeof value !== 'string') {
            return false;
        }
        const pattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        const match = value.match(pattern);
        if (!match) {
            return false;
        }
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const year = parseInt(match[3], 10);
        const date = new Date(year, month, day);
        return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    }
    defaultMessage(args) {
        return `${args.property} must be a valid date in the format dd-mm-yyyy`;
    }
};
exports.IsValidDateFormatConstraint = IsValidDateFormatConstraint;
exports.IsValidDateFormatConstraint = IsValidDateFormatConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isValidDateFormat', async: false })
], IsValidDateFormatConstraint);
function IsValidDateFormat(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidDateFormatConstraint,
        });
    };
}
function IsNGPhoneNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNGPhoneNumberConstraints,
        });
    };
}
function IsTime(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsTimeConstraint,
        });
    };
}
function IsYearMonthFormat(validationOptions) {
    return function (propertyObject, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isYearMonthFormat',
            target: propertyObject.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: YearMonthFormatConstraint,
        });
    };
}
function IsInReg(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isInReg',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const allowedValues = Object.values(enums_1.Reg).filter((v) => typeof v === 'number');
                    return allowedValues.includes(Number(value)) || Object.keys(enums_1.Reg).includes(value);
                },
                defaultMessage(args) {
                    return `status must be one of the following values: ${Object.keys(enums_1.Reg).join(', ')}`;
                },
            },
        });
    };
}
//# sourceMappingURL=required.dep.js.map