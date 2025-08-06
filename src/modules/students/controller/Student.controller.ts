import { Request, Response, NextFunction } from "express";
import { StudentService } from "../services/Student.services";

export class StudentController {
  static async addStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        ...req.body,
        createdAt: new Date(),
      };
      const student = await StudentService.createStudent(data);
      res.status(201).json({ status: true, data: student });
    } catch (err) {
      next(err);
    }
  }

  static async getStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const students = await StudentService.getAllStudents(page, limit);
      res.status(200).json({ status: true, data: students });
    } catch (err) {
      next(err);
    }
  }

  static async getOneStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const student = await StudentService.getStudentById(id);
      res.status(200).json({ status: true, data: student });
    } catch (err) {
      next(err);
    }
  }

  static async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await StudentService.updateStudent(id, req.body);
      res.status(200).json({ status: true, data: updated });
    } catch (err) {
      next(err);
    }
  }

  static async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await StudentService.deleteStudent(id);
      res.status(200).json({ status: true, message: "Student deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async getStudentsMinMax(req: Request, res: Response, next: NextFunction){
    try{
        const {minAge, maxAge}= req.query;
        const min = parseInt(minAge as string);
        const max = parseInt(maxAge as string);
        const students = await StudentService.getStudentByMinMax(min, max);
        res.status(200).json({status: true, data: students});
    }catch(err){
        next(err);
    }
  }
}
