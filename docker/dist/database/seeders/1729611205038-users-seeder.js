"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSeeder1729611205038 = void 0;
const user_entity_1 = require("../../entities/user.entity");
class UsersSeeder1729611205038 {
    async run(dataSource, factoryManager) {
        const userFactory = factoryManager.get(user_entity_1.User);
        await userFactory.saveMany(3);
        const user = await userFactory.make();
        user.firstName = 'Josiah';
        user.lastName = 'Adgbola';
        user.email = user.firstName.toLowerCase() + '@mailinator.com';
        user.drivingSchoolId = 1;
        await userFactory.save(user);
    }
}
exports.UsersSeeder1729611205038 = UsersSeeder1729611205038;
//# sourceMappingURL=1729611205038-users-seeder.js.map