import { Router } from "express";
import { create, deleteDoc, detail, edit, list } from "../middlewares/employee.middleware";
import { addSalary, getSalaries } from "../middlewares/salaries.middleware";
const router = Router();

router.post(`/create`, create);
router.get(`/list`, list);
router.get(`/:id`, detail);
router.put(`/:id`, edit);
router.delete(`/:id`, deleteDoc);
router.post(`/:id/add-salary`, addSalary);
router.get(`/:id/salaries`, getSalaries);
// router.put(`/:id/salaries/:salary_id`, editSalary);
export = router;
