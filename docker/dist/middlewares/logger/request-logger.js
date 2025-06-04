"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
function requestLogger(options = {}) {
    const { log = console.log } = options;
    return (req, res, next) => {
        const start = process.hrtime();
        const now = new Date().toISOString();
        res.on('finish', () => {
            const [seconds, nanoseconds] = process.hrtime(start);
            const elapsed = seconds * 1000 + nanoseconds / 1e6;
            const { method, originalUrl } = req;
            const { statusCode } = res;
            log(`${method} ${originalUrl} ${statusCode} ${elapsed}ms`, {
                timestamp: now,
                responseTimeMs: elapsed,
                method,
                originalUrl,
                statusCode,
            });
        });
        next();
    };
}
//# sourceMappingURL=request-logger.js.map