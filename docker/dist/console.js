"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const services_module_1 = require("./services/services.module");
const notification_service_1 = require("./services/notification-service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(services_module_1.ServicesModule);
    const notificationService = app.get(notification_service_1.NotificationService);
    const command = process.argv[2];
    if (command) {
        const id = Number(command);
        await notificationService.main(id);
    }
    await app.close();
    process.exit(0);
}
bootstrap();
//# sourceMappingURL=console.js.map