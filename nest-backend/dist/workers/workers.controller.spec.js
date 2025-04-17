"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const workers_controller_1 = require("./workers.controller");
describe('WorkersController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [workers_controller_1.WorkersController],
        }).compile();
        controller = module.get(workers_controller_1.WorkersController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=workers.controller.spec.js.map