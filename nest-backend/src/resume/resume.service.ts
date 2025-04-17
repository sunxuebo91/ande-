
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume } from './schemas/resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<Resume>
  ) {}

  async create(createResumeDto: any): Promise<Resume> {
    const createdResume = new this.resumeModel(createResumeDto);
    return createdResume.save();
  }

  async findAll(): Promise<Resume[]> {
    return this.resumeModel.find().sort({ createdAt: -1 }).exec();
  }
}
