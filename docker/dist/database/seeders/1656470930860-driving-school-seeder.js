"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivingSchoolSeeder1656470930860 = void 0;
const driving_school_entity_1 = require("../../entities/driving-school.entity");
class DrivingSchoolSeeder1656470930860 {
    async run(dataSource, factoryManager) {
        const drivingFactory = factoryManager.get(driving_school_entity_1.DrivingSchool);
        await drivingFactory.saveMany(2);
    }
}
exports.DrivingSchoolSeeder1656470930860 = DrivingSchoolSeeder1656470930860;
//# sourceMappingURL=1656470930860-driving-school-seeder.js.map