import express from "express";
import type { Router } from "express";
import { getTransactions } from "../controllers/transaction.controllers.ts";

const router: Router = express.Router();

router.get("/", getTransactions);

export default router;