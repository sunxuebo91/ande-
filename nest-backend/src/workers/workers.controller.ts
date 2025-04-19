import { Controller, Get, Post, UseInterceptors, UploadedFiles, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { WorkersService } from './workers.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  findAll() {
    return this.workersService.findAll();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: '/home/ubuntu/comate-zulu-demo/nest-backend/uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() workerData
  ) {
    // 处理上传的文件
    const filePaths = files?.map(file => ({
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype
    })) || [];

    return this.workersService.create({
      ...workerData,
      attachments: filePaths
    });
  }
}
