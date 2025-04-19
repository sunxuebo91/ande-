"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const worker_schema_1 = require("./schemas/worker.schema");
let WorkersService = class WorkersService {
    constructor(workerModel) {
        this.workerModel = workerModel;
    }
    async findAll() {
        return this.workerModel.find().exec();
    }
    async update(id, updateData) {
        return this.workerModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
    }
    async findOne(id) {
        return this.workerModel.findById(id).exec();
    }
    async create(workerData) {
        const { attachments } = workerData, workerInfo = __rest(workerData, ["attachments"]);
        const newWorker = Object.assign(Object.assign({}, workerInfo), { medicalReports: [], photos: [], certificates: [] });
        if (attachments && attachments.length > 0) {
            newWorker.medicalReports = attachments.filter(f => f.mimetype === 'application/pdf' ||
                f.originalname.includes('medical')).map(f => ({
                name: f.originalname,
                url: `/uploads/${f.filename}`
            }));
            newWorker.photos = attachments.filter(f => f.mimetype.includes('image') &&
                !f.originalname.includes('medical')).map(f => ({
                name: f.originalname,
                url: `/uploads/${f.filename}`
            }));
            newWorker.certificates = attachments.filter(f => f.originalname.includes('certificate') ||
                f.originalname.includes('skill')).map(f => ({
                name: f.originalname,
                url: `/uploads/${f.filename}`
            }));
        }
        if (workerInfo.skills && typeof workerInfo.skills === 'string') {
            newWorker.skills = workerInfo.skills.split(',');
        }
        const createdWorker = new this.workerModel(newWorker);
        return createdWorker.save();
    }
};
exports.WorkersService = WorkersService;
exports.WorkersService = WorkersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(worker_schema_1.Worker.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkersService);
//# sourceMappingURL=workers.service.js.map