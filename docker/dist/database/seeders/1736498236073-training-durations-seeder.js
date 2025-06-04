"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingDurationsSeeder1736498236073 = void 0;
const training_duration_entity_1 = require("../../entities/training-duration.entity");
const enums_1 = require("../../core/constants/enums");
class TrainingDurationsSeeder1736498236073 {
    async run(dataSource, factoryManager) {
        const schoolIds = [1, 2];
        const trainingDurationRepository = dataSource.getRepository(training_duration_entity_1.TrainingDuration);
        const durations = [
            { duration: 3, durationText: '3 Months', isActive: enums_1.Status.Active },
            { duration: 6, durationText: '6 Months', isActive: enums_1.Status.Active },
            { duration: 9, durationText: '9 Months', isActive: enums_1.Status.Active },
        ];
        for (let i = 0; i < schoolIds.length; i++) {
            const schoolId = schoolIds[i];
            for (const duration of durations) {
                duration.drivingSchoolId = schoolId;
                await trainingDurationRepository.insert(duration);
            }
        }
    }
}
exports.TrainingDurationsSeeder1736498236073 = TrainingDurationsSeeder1736498236073;
//# sourceMappingURL=1736498236073-training-durations-seeder.js.map