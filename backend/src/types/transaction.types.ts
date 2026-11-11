import type { Database } from "./database.types.ts";

export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];
export type TransactionUpdate = Database["public"]["Tables"]["transactions"]["Update"];

export type TransactionParams = {
  minAmount?: string,
  maxAmount?: string,
  startDate?: string,
  endDate?: string,
}

export type CreateTransactionBody =
  Pick<TransactionInsert, "amount_in_cents" | "transaction_date"> &
  Partial<Pick<TransactionInsert, "description">>;
