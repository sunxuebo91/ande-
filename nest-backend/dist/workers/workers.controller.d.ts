import { WorkersService } from './workers.service';
import { Express } from 'express';
export declare class WorkersController {
    private readonly workersService;
    constructor(workersService: WorkersService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/worker.schema").WorkerDocument> & import("./schemas/worker.schema").Worker & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    create(files: Array<Express.Multer.File>, workerData: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/worker.schema").WorkerDocument> & import("./schemas/worker.schema").Worker & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
