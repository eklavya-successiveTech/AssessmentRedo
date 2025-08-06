import { Router } from "express";
import { StudentController } from "../controller/Student.controller";
import { StudentSchema } from "../Student.Schema";
import { validateRequest } from "../../../middlewares/validateRequest";
import { authenticate } from "../../../middlewares/authMiddleware";

const router = Router();

router.post("/students", authenticate, validateRequest(StudentSchema), StudentController.addStudent);
router.get("/students", authenticate, StudentController.getStudents);
router.get("/students/by-age", authenticate, StudentController.getStudentsMinMax);
router.get("/students/:id", authenticate, StudentController.getOneStudent);
router.put("/students/:id", authenticate, StudentController.updateStudent);
router.delete("/students/:id", authenticate, StudentController.deleteStudent);


export default router;
