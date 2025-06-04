"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailNotification = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const constants_1 = require("../constants/constants");
const enums_1 = require("../constants/enums");
const enqueue = async (payload) => {
    try {
        const endpoint = `https://sqs.${constants_1.awsConstants.region}.amazonaws.com/${constants_1.awsConstants.accountId}/${constants_1.awsConstants.notificationsQueueName}`;
        const sqs = new client_sqs_1.SQS({
            apiVersion: '2012-11-05',
            region: constants_1.awsConstants.region,
            credentials: {
                accessKeyId: constants_1.awsConstants.accessKeyId,
                secretAccessKey: constants_1.awsConstants.secret,
            },
            endpoint,
        });
        console.log(payload);
        console.log('INSERTING IN QUEUE');
        const params = {
            MessageBody: JSON.stringify(payload),
            QueueUrl: endpoint,
        };
        console.log('QueueUrl', params.QueueUrl);
        const result = await sqs.sendMessage(params);
        console.log('Enqueue success', result.MessageId);
        return result;
    }
    catch (e) {
        console.log('Error while enqueue message', e);
    }
};
const sendEmailNotification = async ({ id }) => {
    const payload = {
        type: enums_1.NotificationTypes.Email,
        emailId: id,
    };
    await enqueue(payload);
};
exports.sendEmailNotification = sendEmailNotification;
//# sourceMappingURL=notifications.js.map