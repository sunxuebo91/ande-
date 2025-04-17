
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './schemas/resume.schema';

@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  async create(@Body() createResumeDto: any): Promise<Resume> {
    return this.resumeService.create(createResumeDto);
  }

  @Get()
  async findAll(): Promise<Resume[]> {
    return this.resumeService.findAll();
  }
}
