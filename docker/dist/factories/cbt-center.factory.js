"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const faker_1 = require("@faker-js/faker");
const cbt_center_entity_1 = require("../entities/cbt-center.entity");
const enums_1 = require("../core/constants/enums");
exports.default = (0, typeorm_extension_1.setSeederFactory)(cbt_center_entity_1.CbtCenter, () => {
    const firstName = faker_1.faker.person.firstName('male');
    const lastName = faker_1.faker.person.lastName('male');
    const name = faker_1.faker.person.fullName({ firstName, lastName }) + ' ' + 'CBT Center';
    const lgas = [
        { id: 517, name: 'Lagos-Island' },
        { id: 518, name: 'Lagos-Mainland' },
        { id: 519, name: 'Mushin' },
        { id: 523, name: 'Surulere' },
        { id: 514, name: 'Ikeja' },
    ];
    const getRandomLga = () => {
        const randomIndex = Math.floor(Math.random() * lgas.length);
        return lgas[randomIndex];
    };
    const selectedLga = getRandomLga();
    const cbtCenterObject = {
        name,
        stateId: 25,
        lgaId: selectedLga.id,
        isActive: enums_1.Status.Active,
    };
    const cbtCenter = new cbt_center_entity_1.CbtCenter();
    return Object.assign(cbtCenter, cbtCenterObject);
});
//# sourceMappingURL=cbt-center.factory.js.map