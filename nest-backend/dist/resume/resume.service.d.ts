import { Model } from 'mongoose';
import { Resume } from './schemas/resume.schema';
export declare class ResumeService {
    private resumeModel;
    constructor(resumeModel: Model<Resume>);
    create(createResumeDto: any): Promise<Resume>;
    findAll(): Promise<Resume[]>;
}
