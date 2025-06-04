"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const driving_school_entity_1 = require("../entities/driving-school.entity");
const faker_1 = require("@faker-js/faker");
const enums_1 = require("../core/constants/enums");
const functions_helpers_1 = require("../core/helpers/functions.helpers");
exports.default = (0, typeorm_extension_1.setSeederFactory)(driving_school_entity_1.DrivingSchool, () => {
    const firstName = faker_1.faker.person.firstName('male');
    const lastName = faker_1.faker.person.lastName('male');
    const name = faker_1.faker.person.fullName({ firstName, lastName }) + ' ' + 'Driving School';
    const email = faker_1.faker.internet.email({
        firstName,
        lastName,
        allowSpecialCharacters: false,
        provider: 'example.com',
    });
    const phone = faker_1.faker.phone.number({
        style: 'international',
    });
    const identifier = (0, functions_helpers_1.hexCode)({
        count: 8,
        caps: true,
        prefix: 'DR',
    });
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
    const addressComponents = {
        streetAddress: faker_1.faker.location.streetAddress(),
        city: selectedLga.name,
        state: 'Lagos State',
        zipCode: '23407',
        country: 'Nigeria',
    };
    const generateNigerianAddressString = () => {
        return `${addressComponents.streetAddress}, ${addressComponents.city}, ${addressComponents.state}, ${addressComponents.zipCode}, ${addressComponents.country}`;
    };
    const schoolObject = {
        name,
        email,
        phone,
        identifier,
        stateId: 25,
        lgaId: selectedLga.id,
        address: generateNigerianAddressString(),
        isActive: enums_1.Status.Active,
    };
    const school = new driving_school_entity_1.DrivingSchool();
    return Object.assign(school, schoolObject);
});
//# sourceMappingURL=driving-school.factory.js.map