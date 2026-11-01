import transactionRepository from "../repositories/transaction.repository.ts";
import { PostgrestError } from "@supabase/supabase-js";
import type { Transaction, TransactionParams } from "../types/transaction.types.ts";

const getTransactions = async (queryParams: TransactionParams) => {
  const { data, error }: { data: Transaction[] | null, error: PostgrestError | null } = await transactionRepository.getTransactions(queryParams);

  if (error) {
    throw error;
  }

  return data;
}

export default { getTransactions };