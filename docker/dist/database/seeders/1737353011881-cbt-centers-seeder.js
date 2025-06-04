"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbtCentersSeeder1737353011881 = void 0;
const cbt_center_entity_1 = require("../../entities/cbt-center.entity");
class CbtCentersSeeder1737353011881 {
    async run(dataSource, factoryManager) {
        const cbtCenterFactory = factoryManager.get(cbt_center_entity_1.CbtCenter);
        await cbtCenterFactory.saveMany(2);
    }
}
exports.CbtCentersSeeder1737353011881 = CbtCentersSeeder1737353011881;
//# sourceMappingURL=1737353011881-cbt-centers-seeder.js.map