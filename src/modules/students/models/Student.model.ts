import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  age: number;
  grade: string;
  email: string;
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number, 
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now, 
  },
});

export const StudentModel = mongoose.model<IStudent>("Student", StudentSchema); 
