import transactionRepository from "../repositories/transaction.repository.ts";
import type { Transaction, TransactionParams } from "../types/transaction.types.ts";

const getTransactions = async (queryParams: TransactionParams): Promise<Transaction[]> => {
  return await transactionRepository.getTransactions(queryParams);
}

export default { getTransactions };