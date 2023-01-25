import { Router } from "express";
import { login } from "../middlewares/auth.middleware";
import * as employeeRouter from "./employee.controller";
const router = Router();

router.post(`/login`, login);
router.use(`/employees`, employeeRouter);

export = router;
