
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/resume_db'),
    ResumeModule
  ]
})
export class AppModule {}
