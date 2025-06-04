"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const services_module_1 = require("../services.module");
const _1 = require(".");
let app;
const bootstrap = async () => {
    if (!app) {
        app = await core_1.NestFactory.createApplicationContext(services_module_1.ServicesModule, { logger: false });
    }
    return app;
};
const handler = async (event, context) => {
    const instance = await bootstrap();
    const contextId = core_1.ContextIdFactory.create();
    instance.registerRequestByContextId({ event, context }, contextId);
    const service = await instance.resolve(_1.NotificationService, contextId);
    for (const record of event.Records) {
        const { emailId } = JSON.parse(record.body);
        console.log(`ID from queue ${emailId}`);
        await service.main(emailId);
    }
    return;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map