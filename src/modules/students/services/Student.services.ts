import { StudentModel } from "../models/Student.model";
import { IStudent } from "../models/Student.model";

export class StudentService {
  static async createStudent(data: IStudent) {
    const existing = await StudentModel.findOne({ email: data.email });
    if (existing) throw new Error("Student already exists with same email");

    const student = new StudentModel(data);
    return student.save();
  }

  static async getAllStudents(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const students = await StudentModel.find().skip(skip).limit(limit);
    return students;
  }

  static async getStudentById(id: string) {
    const student = await StudentModel.findById(id);
    if (!student) throw new Error("Student not found");
    return student;
  }

  static async updateStudent(id: string, data: IStudent) {
    const updated = await StudentModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new Error("Student not found");
    return updated;
  }

  static async deleteStudent(id: string) {
    const deleted = await StudentModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Student not found");
    return deleted;
  }
  static async getStudentByMinMax(min: number, max: number){
    const students = await StudentModel.find({age:{$gte: min, $lte:max}});
    if (!students) throw new Error("Students not found");
    return students;
  }
}
