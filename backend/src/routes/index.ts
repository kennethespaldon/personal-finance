import express from "express";
import { type Router } from "express";
import { TRANSACTIONS_PATH } from "../utils/apiPaths.ts";
import transactionRoutes from "./transaction.routes.ts";

const router: Router = express.Router();

router.use(TRANSACTIONS_PATH.BASE, transactionRoutes);

export default router;