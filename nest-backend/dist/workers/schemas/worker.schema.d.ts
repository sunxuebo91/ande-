import { Document } from 'mongoose';
export type WorkerDocument = Worker & Document;
export declare class Worker {
    name: string;
    age: number;
    gender: string;
    phone: string;
    type: string;
    skills: string[];
    workExperienceYears: number;
    expectedSalary: number;
    medicalReports: Array<{
        name: string;
        url: string;
    }>;
    photos: Array<{
        name: string;
        url: string;
    }>;
    certificates: Array<{
        name: string;
        url: string;
    }>;
    workExperiences: Array<{
        period: string[];
        description: string;
    }>;
}
export declare const WorkerSchema: import("mongoose").Schema<Worker, import("mongoose").Model<Worker, any, any, any, Document<unknown, any, Worker> & Worker & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Worker, Document<unknown, {}, import("mongoose").FlatRecord<Worker>> & import("mongoose").FlatRecord<Worker> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
