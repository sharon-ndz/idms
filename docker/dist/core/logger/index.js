"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const constants_1 = require("../constants/constants");
const errorStackFormat = (0, winston_1.format)((info) => {
    if (info instanceof Error) {
        return { ...info, stack: info.stack, message: info.message };
    }
    return info;
});
const logFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.colorize({ all: true }), winston_1.format.prettyPrint(), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`), errorStackFormat());
const logger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || 'info',
    defaultMeta: { service: constants_1.appConstants.logTitle },
    format: logFormat,
    transports: [new winston_1.transports.Console()],
});
const logError = (msg, ...args) => {
    logger.error(msg, ...args);
};
exports.default = {
    ...logger,
    info: (msg, ...args) => logger.info(msg, ...args),
    warn: (msg, ...args) => logger.warn(msg, ...args),
    error: logError,
    debug: (msg, ...args) => logger.debug(msg, ...args),
};
//# sourceMappingURL=index.js.map