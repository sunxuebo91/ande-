import { WorkersService } from './workers.service';
import { Express } from 'express';
export declare class WorkersController {
    private readonly workersService;
    constructor(workersService: WorkersService);
    findAll(): Promise<import("./schemas/worker.schema").Worker[]>;
    findOne(id: string): Promise<import("./schemas/worker.schema").Worker>;
    update(id: string, updateData: any): Promise<import("./schemas/worker.schema").Worker>;
    create(files: Array<Express.Multer.File>, workerData: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/worker.schema").WorkerDocument> & import("./schemas/worker.schema").Worker & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
