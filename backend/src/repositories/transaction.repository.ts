import supabase from "../config/supabase.ts";
import { type TransactionParams } from "../types/transaction.types.ts";

const getTransactions = async ({
  minAmount,
  maxAmount,
  startDate,
  endDate
}: TransactionParams) => { 
  let query = supabase
    .from("transactions")
    .select("*");

  if (minAmount) {
    query = query.gte("amount_in_cents", minAmount);
  }

  if (maxAmount) {
    query = query.lte("amount_in_cents", maxAmount);
  }

  if (startDate) {
    query = query.gte("transaction_date", startDate);
  }

  if (endDate) {
    query = query.lte("transaction_date", endDate);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};

export default { getTransactions };