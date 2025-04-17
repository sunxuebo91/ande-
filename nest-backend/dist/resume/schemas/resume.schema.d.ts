import { Document } from 'mongoose';
export declare class Resume extends Document {
    resumeId: string;
    fullName: string;
    email: string;
    phone: string;
    skills: string[];
    experience: Record<string, any>[];
    education: Record<string, any>[];
}
export declare const ResumeSchema: import("mongoose").Schema<Resume, import("mongoose").Model<Resume, any, any, any, Document<unknown, any, Resume> & Resume & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resume, Document<unknown, {}, import("mongoose").FlatRecord<Resume>> & import("mongoose").FlatRecord<Resume> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
