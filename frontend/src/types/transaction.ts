export type Transaction = {
  id: string;
  amount_in_cents: number;
  description: string | null;
  transaction_date: string;
};

export type TransactionFormFields = {
  amount: string;
  description: string;
  transaction_date: string;
};

export type CreateTransactionState = {
  status: "idle" | "success" | "error";
  message: string;
  // Echoed back on error so the form keeps what the user typed.
  fields?: TransactionFormFields;
};
