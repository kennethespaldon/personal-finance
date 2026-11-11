import transactionRepository from "../repositories/transaction.repository.ts";
import type { CreateTransactionBody, Transaction, TransactionParams } from "../types/transaction.types.ts";

const getTransactions = async (queryParams: TransactionParams): Promise<Transaction[]> => {
  return await transactionRepository.getTransactions(queryParams);
}

const createTransaction = async ({
  amount_in_cents,
  description,
  transaction_date
}: CreateTransactionBody): Promise<Transaction> => {
  const trimmedDescription = description?.trim();

  return await transactionRepository.createTransaction({
    amount_in_cents,
    description: trimmedDescription ? trimmedDescription : null,
    transaction_date,
  });
}

export default { getTransactions, createTransaction };
