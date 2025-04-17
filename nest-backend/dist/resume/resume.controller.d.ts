import { ResumeService } from './resume.service';
import { Resume } from './schemas/resume.schema';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    create(createResumeDto: any): Promise<Resume>;
    findAll(): Promise<Resume[]>;
}
