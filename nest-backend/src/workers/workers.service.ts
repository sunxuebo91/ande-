
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Worker, WorkerDocument } from './schemas/worker.schema';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>
  ) {}

  async create(workerData) {
    // 处理附件数据
    const { attachments, ...workerInfo } = workerData;
    const newWorker = {
      ...workerInfo,
      medicalReports: [],
      photos: [],
      certificates: []
    };

    if (attachments && attachments.length > 0) {
      newWorker.medicalReports = attachments.filter(f => 
        f.mimetype === 'application/pdf' || 
        f.originalname.includes('medical')
      ).map(f => ({
        name: f.originalname,
        url: `/uploads/${f.filename}`
      }));

      newWorker.photos = attachments.filter(f => 
        f.mimetype.includes('image') && 
        !f.originalname.includes('medical')
      ).map(f => ({
        name: f.originalname,
        url: `/uploads/${f.filename}`
      }));

      newWorker.certificates = attachments.filter(f => 
        f.originalname.includes('certificate') || 
        f.originalname.includes('skill')
      ).map(f => ({
        name: f.originalname,
        url: `/uploads/${f.filename}`
      }));
    }

    // 处理skills字段
    if (workerInfo.skills && typeof workerInfo.skills === 'string') {
      newWorker.skills = workerInfo.skills.split(',');
    }

    const createdWorker = new this.workerModel(newWorker);
    return createdWorker.save();
  }

  async findAll() {
    return this.workerModel.find().exec();
  }
}
