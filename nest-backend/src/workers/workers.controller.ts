import { Controller, Get, Post, Body } from '@nestjs/common';
import { WorkersService } from './workers.service';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  findAll() {
    return this.workersService.findAll();
  }

  @Post()
  create(@Body() workerData) {
    return this.workersService.create(workerData);
  }
}
