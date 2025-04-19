
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkerDocument = Worker & Document;

@Schema()
export class Worker {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  phone: string;

  @Prop()
  type: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop()
  workExperienceYears: number;

  @Prop()
  expectedSalary: number;

  @Prop({ type: Array, default: [] })
  medicalReports: Array<{ name: string; url: string }>;

  @Prop({ type: Array, default: [] })
  photos: Array<{ name: string; url: string }>;

  @Prop({ type: Array, default: [] })
  certificates: Array<{ name: string; url: string }>;

  @Prop({ type: Array, default: [] })
  workExperiences: Array<{ period: string[]; description: string }>;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
