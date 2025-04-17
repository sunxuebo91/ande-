import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkersService {
  private workers = [];

  findAll() {
    return this.workers;
  }

  create(workerData) {
    const newWorker = { id: Date.now(), ...workerData };
    this.workers.push(newWorker);
    return newWorker;
  }
}
