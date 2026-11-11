import transactionService from "../services/transaction.service.ts";
import type { Request, Response } from "express";
import type {
  CreateTransactionBody,
  Transaction,
  TransactionParams
} from "../types/transaction.types.ts";
import type { ErrorResponse } from "../types/error.types.ts";

export const getTransactions = async (req: Request<TransactionParams>, res: Response) => {
  const queryParams = req.params;
  const transactions = await transactionService.getTransactions(queryParams);
  res.json(transactions);
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value: unknown): value is string => {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) return false;

  // Reject dates like 2026-02-31 that match the pattern but don't exist.
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

const validateCreateTransactionBody = (body: unknown): string | null => {
  if (typeof body !== "object" || body === null) {
    return "Request body must be a JSON object";
  }

  const { amount_in_cents, description, transaction_date } = body as Record<string, unknown>;

  if (
    typeof amount_in_cents !== "number" ||
    !Number.isSafeInteger(amount_in_cents) ||
    amount_in_cents <= 0
  ) {
    return "amount_in_cents must be a positive integer";
  }

  if (description !== undefined && description !== null && typeof description !== "string") {
    return "description must be a string";
  }

  if (!isValidDate(transaction_date)) {
    return "transaction_date must be a valid date in YYYY-MM-DD format";
  }

  return null;
}

export const createTransaction = async (
  req: Request<{}, Transaction | ErrorResponse, CreateTransactionBody>,
  res: Response<Transaction | ErrorResponse>
) => {
  const validationError = validateCreateTransactionBody(req.body);

  if (validationError) {
    res.status(400).json({ message: validationError });
    return;
  }

  const transaction = await transactionService.createTransaction(req.body);
  res.status(201).json(transaction);
}
