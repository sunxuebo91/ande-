import { WorkersService } from './workers.service';
export declare class WorkersController {
    private readonly workersService;
    constructor(workersService: WorkersService);
    findAll(): any[];
    create(workerData: any): any;
}
