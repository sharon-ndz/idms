"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_extension_1 = require("typeorm-extension");
const typeorm_config_1 = __importDefault(require("../config/typeorm.config"));
async function runSeeds() {
    try {
        await typeorm_config_1.default.initialize();
        await (0, typeorm_extension_1.runSeeders)(typeorm_config_1.default);
        console.log('Seeding completed!');
        process.exit();
    }
    catch (err) {
        console.error('Error during seeding:', err);
        process.exit(1);
    }
}
runSeeds().then((r) => {
    console.log('Seeding completed!', r);
});
//# sourceMappingURL=seed.js.map