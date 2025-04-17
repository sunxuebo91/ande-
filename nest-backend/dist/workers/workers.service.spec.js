"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const workers_service_1 = require("./workers.service");
describe('WorkersService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [workers_service_1.WorkersService],
        }).compile();
        service = module.get(workers_service_1.WorkersService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=workers.service.spec.js.map