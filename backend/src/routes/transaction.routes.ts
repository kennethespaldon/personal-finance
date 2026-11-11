import express from "express";
import type { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transaction.controllers.ts";
import { TRANSACTIONS_PATH } from "../utils/apiPaths.ts";

const router: Router = express.Router();

router.get(TRANSACTIONS_PATH.ROOT, getTransactions);
router.post(TRANSACTIONS_PATH.ROOT, createTransaction);

export default router;
