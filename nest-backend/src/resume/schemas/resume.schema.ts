
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Resume extends Document {
  @Prop({
    required: true,
    default: () => Math.floor(10000000 + Math.random() * 90000000).toString()
  })
  resumeId: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop([{
    jobTitle: String,
    company: String,
    duration: String,
    description: String
  }])
  experience: Record<string, any>[];

  @Prop([{
    degree: String,
    institution: String,
    year: String
  }])
  education: Record<string, any>[];
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
