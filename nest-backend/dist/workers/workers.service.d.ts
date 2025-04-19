import { Model } from 'mongoose';
import { Worker, WorkerDocument } from './schemas/worker.schema';
export declare class WorkersService {
    private workerModel;
    constructor(workerModel: Model<WorkerDocument>);
    create(workerData: any): Promise<import("mongoose").Document<unknown, {}, WorkerDocument> & Worker & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, WorkerDocument> & Worker & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
