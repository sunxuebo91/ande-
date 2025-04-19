import { Model } from 'mongoose';
import { Worker, WorkerDocument } from './schemas/worker.schema';
export declare class WorkersService {
    private workerModel;
    constructor(workerModel: Model<WorkerDocument>);
    findAll(): Promise<Worker[]>;
    update(id: string, updateData: any): Promise<Worker>;
    findOne(id: string): Promise<Worker>;
    create(workerData: any): Promise<import("mongoose").Document<unknown, {}, WorkerDocument> & Worker & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
