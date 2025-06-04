"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const messages_1 = require("../constants/messages");
const constants_1 = require("../constants/constants");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function setupSwagger(app) {
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle(messages_1.MESSAGES.docTitle)
        .setDescription(messages_1.MESSAGES.docDescription)
        .addServer(`${process.env.LOCAL_URL}`, 'Local environment')
        .addServer(`${process.env.STAGING_URL}`, 'Staging')
        .addBearerAuth({ scheme: 'Bearer', type: 'http' })
        .setVersion('1.0.0')
        .addTag(constants_1.appConstants.appName)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions, {});
    swagger_1.SwaggerModule.setup('api-docs', app, document);
}
//# sourceMappingURL=swagger.js.map