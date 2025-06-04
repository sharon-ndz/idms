"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePermitNo = exports.generateDrivingCenterNo = exports.generateDrivingSchoolId = void 0;
exports.findOrganizationByCode = findOrganizationByCode;
exports.isNINValid = isNINValid;
exports.isValidDate = isValidDate;
exports.hasCompletedTraining = hasCompletedTraining;
exports.hasExpired = hasExpired;
exports.isOTPValid = isOTPValid;
exports.getMapValue = getMapValue;
exports.getLicenseApprovalData = getLicenseApprovalData;
exports.getPermitIssuanceData = getPermitIssuanceData;
exports.generateCertificateNo = generateCertificateNo;
exports.generatePreRegApplicationNo = generatePreRegApplicationNo;
exports.generateStudentNo = generateStudentNo;
exports.generateDrivingSchoolApplicationNo = generateDrivingSchoolApplicationNo;
const constants_1 = require("../constants/constants");
const functions_helpers_1 = require("./functions.helpers");
function containsAsterisk(value) {
    if (typeof value === 'string') {
        return value.includes('*');
    }
    return false;
}
function findOrganizationByCode(code) {
    return constants_1.organizations.find((org) => org.code === code);
}
function isNINValid(data) {
    if (!data) {
        return false;
    }
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] === 'object') {
                if (!isNINValid(data[key])) {
                    return false;
                }
            }
            else {
                if (containsAsterisk(data[key])) {
                    return false;
                }
            }
        }
    }
    return true;
}
function isValidDate(dateString) {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/;
    return pattern.test(dateString);
}
function hasCompletedTraining(startDate, duration) {
    const today = new Date();
    const trainingCompletionDate = new Date(new Date(today).setMonth(today.getMonth() + duration));
    if (trainingCompletionDate < today) {
        return true;
    }
    else if (trainingCompletionDate.getDate() === today.getDate() &&
        trainingCompletionDate.getMonth() === today.getMonth() &&
        trainingCompletionDate.getFullYear() === today.getFullYear()) {
        return true;
    }
    return false;
}
function hasExpired(startDate, endDate) {
    const today = new Date();
    const end = new Date(endDate);
    return end < today;
}
function isOTPValid(issuedAt) {
    const otpValidityDuration = 5 * 60 * 1000;
    const dbTimezoneOffset = issuedAt.getTimezoneOffset();
    const adjustedClientTime = new Date(Date.now() + dbTimezoneOffset);
    return adjustedClientTime.getTime() - issuedAt.getTime() < otpValidityDuration;
}
function getMapValue(mapObjects, key, value, field) {
    if (typeof key === 'undefined') {
        return null;
    }
    const singleMap = mapObjects.find((m) => m[key] === value);
    if (!singleMap) {
        return null;
    }
    return singleMap[field];
}
async function getLicenseApprovalData(data, licenseRepository) {
    const today = new Date();
    const expiryDate = new Date(new Date(today).setFullYear(today.getFullYear() + data.years, today.getMonth(), today.getDate()));
    const licenseNo = await generateLicenseNo(licenseRepository);
    return {
        issuedAt: today,
        expiryAt: expiryDate,
        licenseNo: licenseNo,
    };
}
async function getPermitIssuanceData(data, permitRepository) {
    const today = new Date();
    const expiryDate = new Date(new Date(today).setFullYear(today.getFullYear() + data.years, today.getMonth(), today.getDate()));
    const permitNo = await (0, exports.generatePermitNo)(permitRepository);
    return {
        issuedAt: today,
        expiryAt: expiryDate,
        permitNo: permitNo,
    };
}
const generateLicenseNo = async (licenseRepository) => {
    const idSet = (0, functions_helpers_1.generateUniqueIntegers)(8, 0, 9);
    const licenseCount = await licenseRepository.count({
        where: { licenseNo: idSet },
    });
    if (licenseCount > 0) {
        await generateLicenseNo(licenseRepository);
    }
    return idSet;
};
const generateDrivingSchoolId = async (drivingSchoolRepository) => {
    const identifier = (0, functions_helpers_1.hexCode)({
        count: 8,
        caps: true,
        prefix: 'DR',
    });
    const licenseCount = await drivingSchoolRepository.count({
        where: { identifier: identifier },
    });
    if (licenseCount > 0) {
        await (0, exports.generateDrivingSchoolId)(drivingSchoolRepository);
    }
    return identifier;
};
exports.generateDrivingSchoolId = generateDrivingSchoolId;
function generateCertificateNo(student) {
    const schoolInitials = (0, functions_helpers_1.getStringInitials)(student.drivingSchool.identifier, 4);
    const state = constants_1.states.find((s) => student.drivingSchool.stateId == s.id);
    const appNoSplit = student.application.applicationNo.split('/');
    const applicationNoLast5 = appNoSplit[appNoSplit.length - 1];
    const studentNoSplit = student.studentNo.split('-');
    const studentNoLast5 = studentNoSplit[studentNoSplit.length - 1];
    return `${schoolInitials}/${state.code}/${applicationNoLast5}/${studentNoLast5}`;
}
function generatePreRegApplicationNo(student) {
    const today = new Date();
    const studentNoLast5 = (0, functions_helpers_1.generateUniqueIntegers)(6, 0, 9);
    return `DRLP/${today.getFullYear()}/${studentNoLast5}`;
}
function generateStudentNo(drivingSchool) {
    const idSet = (0, functions_helpers_1.generateUniqueIntegers)(6, 0, 9);
    return `${drivingSchool.identifier}-${idSet}`;
}
const generateDrivingCenterNo = async (name, drivingTestCenterRepository) => {
    const initials = (0, functions_helpers_1.getStringInitials)(name, 2);
    const idSet = (0, functions_helpers_1.generateUniqueIntegers)(9, 0, 9);
    const code = `${initials}${idSet}`;
    const count = await drivingTestCenterRepository.count({
        where: { identifier: code },
    });
    if (count > 0) {
        await (0, exports.generateDrivingCenterNo)(name, drivingTestCenterRepository);
    }
    return code;
};
exports.generateDrivingCenterNo = generateDrivingCenterNo;
function generateDrivingSchoolApplicationNo(drivingSchool) {
    const schoolInitials = (0, functions_helpers_1.getStringInitials)(drivingSchool.identifier, 4);
    const currentYear = new Date().getFullYear();
    const idSet = (0, functions_helpers_1.generateUniqueIntegers)(6, 0, 9);
    return `${schoolInitials}/${currentYear}/${idSet}`;
}
const generatePermitNo = async (permitRepository) => {
    const initials = 'PM';
    const idSet = (0, functions_helpers_1.generateUniqueIntegers)(13, 0, 20);
    const permitNo = `${initials}${idSet}`;
    const permitCount = await permitRepository.count({
        where: { permitNo: permitNo },
    });
    if (permitCount > 0) {
        await (0, exports.generatePermitNo)(permitRepository);
    }
    return permitNo;
};
exports.generatePermitNo = generatePermitNo;
//# sourceMappingURL=general.js.map