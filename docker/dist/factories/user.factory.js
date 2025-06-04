"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const user_entity_1 = require("../entities/user.entity");
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = require("bcrypt");
const enums_1 = require("../core/constants/enums");
exports.default = (0, typeorm_extension_1.setSeederFactory)(user_entity_1.User, () => {
    const firstName = faker_1.faker.person.firstName();
    const lastName = faker_1.faker.person.lastName();
    const middleName = faker_1.faker.person.middleName();
    const salt = (0, bcrypt_1.genSaltSync)(parseInt(process.env.SALT_ROUND));
    const email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@mailinator.com';
    const phone = faker_1.faker.phone.number({
        style: 'international',
    });
    const password = (0, bcrypt_1.hashSync)('password', salt);
    const userObject = {
        firstName,
        lastName,
        middleName,
        email,
        phone,
        password,
        isActive: enums_1.Status.Active,
    };
    const user = new user_entity_1.User();
    return Object.assign(user, userObject);
});
//# sourceMappingURL=user.factory.js.map