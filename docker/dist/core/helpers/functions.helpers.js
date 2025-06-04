"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
exports.createConsistentHash = createConsistentHash;
exports.maskNIN = maskNIN;
exports.generateUniqueIntegers = generateUniqueIntegers;
exports.getFullName = getFullName;
exports.slugify = slugify;
exports.getStringInitials = getStringInitials;
exports.hexCode = hexCode;
exports.removeNullAndEmpty = removeNullAndEmpty;
exports.readJsonFile = readJsonFile;
exports.writeJsonFile = writeJsonFile;
exports.removeMimeTypePrefix = removeMimeTypePrefix;
exports.genQRCode = genQRCode;
exports.numberCode = numberCode;
exports.formatMoney = formatMoney;
exports.getDateTime = getDateTime;
exports.getDateDiff = getDateDiff;
exports.encode = encode;
exports.decode = decode;
exports.removeProperty = removeProperty;
exports.convertDate = convertDate;
exports.dateWord = dateWord;
exports.hasValue = hasValue;
exports.isNumber = isNumber;
exports.containsKeywords = containsKeywords;
exports.getUUID = getUUID;
const qrcode_1 = __importDefault(require("qrcode"));
const fs = __importStar(require("fs-extra"));
const CryptoJS = __importStar(require("crypto-js"));
const uuid_1 = require("uuid");
class HexCode {
}
function createConsistentHash(key) {
    return CryptoJS.MD5(key).toString(CryptoJS.enc.Hex);
}
function maskNIN(nin) {
    if (nin.length !== 11) {
        throw new Error('NIN must be 11 digits long');
    }
    const firstTwo = nin.slice(0, 2);
    const lastTwo = nin.slice(-2);
    const maskedPart = '*'.repeat(7);
    return `${firstTwo}${maskedPart}${lastTwo}`;
}
function generateUniqueIntegers(count, min, max) {
    if (count > max - min + 1) {
        throw new Error('Count exceeds the range of possible unique integers');
    }
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(randomNumber);
    }
    return Array.from(uniqueNumbers).join('');
}
function getFullName(user) {
    return [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' ');
}
function slugify(text) {
    const lowerCaseText = text.toLowerCase();
    const replacedSpaces = lowerCaseText.replace(/\s+/g, '_');
    return replacedSpaces.replace(/[^a-z0-9-]/g, '');
}
function getStringInitials(identifier, length) {
    return identifier.slice(0, length);
}
const getPagination = (count, page, offset, limit) => {
    const pages = Math.ceil(count / limit);
    const end = Math.min(offset + limit, count);
    return {
        total: count,
        pages: pages,
        page: page < pages ? page : pages,
        start: count > 0 ? offset + 1 : 0,
        end: end,
        hasPages: page < pages || page > 1,
        hasNext: page < pages,
        hasPrevious: page > 1,
    };
};
exports.getPagination = getPagination;
function hexCode(param) {
    const chars = 'acdefhiklmnoqrstuvwxyz0123456789'.split('');
    let result = '';
    for (let i = 0; i < param.count; i++) {
        const x = Math.floor(Math.random() * chars.length);
        result += chars[x];
    }
    result = (param.prefix ? param.prefix : '') + result + (param.prefix ? param.prefix : '');
    if (param.caps) {
        result = result.toUpperCase();
    }
    return result;
}
function removeNullAndEmpty(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== '') {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
async function readJsonFile(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    }
    catch (err) {
        console.error(`Error reading JSON file: ${err.message}`);
        throw err;
    }
}
async function writeJsonFile(filePath, data) {
    return new Promise(async (resolve, reject) => {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
            resolve(true);
        }
        catch (err) {
            console.error(`Error writing JSON file: ${err.message}`);
            reject(err);
        }
    });
}
function removeMimeTypePrefix(base64String) {
    const regex = /^(data:image\/(?:png|jpeg);base64,)/;
    return base64String.replace(regex, '');
}
async function genQRCode(QRCodeData) {
    const barcode = qrcode_1.default.toDataURL(QRCodeData, {
        color: {
            light: '#0000',
        },
    });
    return barcode.split(',')[1];
}
function numberCode(count) {
    const chars = '0123456789'.split('');
    let result = '';
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * chars.length);
        result += chars[x];
    }
    return result;
}
function formatMoney(money, currency) {
    const formater = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });
    return formater.format(money);
}
function getDateTime(dateTime = false) {
    function pad(s) {
        return s < 10 ? '0' + s : s;
    }
    const today = new Date();
    if (dateTime) {
        return ([pad(today.getFullYear()), pad(today.getMonth() + 1), today.getDate()].join('-') +
            ' ' +
            today.getHours() +
            ':' +
            today.getMinutes() +
            ':' +
            today.getSeconds());
    }
    return pad(today.getHours()) + ':' + pad(today.getMinutes()) + ':' + pad(today.getSeconds());
}
function getDateDiff(d1, d2) {
    const t2 = d2.getTime();
    const t1 = d1.getTime();
    return (t2 - t1) / (24 * 3600 * 1000);
}
function encode(data) {
    return Buffer.from(data).toString('base64');
}
function decode(base64String) {
    return Buffer.from(base64String, 'base64').toString('ascii');
}
function removeProperty(data, keys) {
    const myObject = {};
    let index = 0;
    for (const obk in data) {
        if (!keys.includes(obk)) {
            myObject[obk] = data[obk];
        }
        index++;
    }
    return myObject;
}
function convertDate(dateString) {
    const date = new Date(dateString);
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
    };
}
function dateWord({ date = '', month = true, day = true, year = true }) {
    const dob = new Date(`${date}`);
    const dobArr = dob.toDateString().split(' ');
    let data = month ? dob.toLocaleString('default', { month: 'long' }) + ' ' : '';
    data += day ? dobArr[2] + ', ' : '';
    data += year ? dobArr[3] : '';
    return data;
}
function hasValue(value) {
    return (value !== undefined &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && Object.keys(value).length === 0));
}
function isNumber(value) {
    return !isNaN(Number(value));
}
function containsKeywords(text, keywords) {
    for (const keyword of keywords) {
        if (!text.toLowerCase().includes(keyword.toLowerCase())) {
            return false;
        }
    }
    return true;
}
function getUUID(length) {
    return length ? (0, uuid_1.v4)().substring(0, length) : (0, uuid_1.v4)();
}
//# sourceMappingURL=functions.helpers.js.map