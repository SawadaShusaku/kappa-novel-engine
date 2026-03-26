import { Router, type IRouter } from "express";
import healthRouter from "./health";
import novelRouter from "./novel";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/novel", novelRouter);

export default router;
