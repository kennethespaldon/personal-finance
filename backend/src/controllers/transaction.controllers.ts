import transactionService from "../services/transaction.service.ts";
import type { Request, Response } from "express";
import type { TransactionParams } from "../types/transaction.types.ts";

export const getTransactions = (req: Request<TransactionParams>, res: Response) => {
  const queryParams = req.params;
  const transactions = transactionService.getTransactions(queryParams);
  res.json(transactions);
}