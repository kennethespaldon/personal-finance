"use server";

import { refresh } from "next/cache";
import { API_URL } from "@/src/lib/config";
import type {
  CreateTransactionState,
  TransactionFormFields,
} from "@/src/types/transaction";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function createTransaction(
  _prevState: CreateTransactionState,
  formData: FormData,
): Promise<CreateTransactionState> {
  const fields: TransactionFormFields = {
    amount: String(formData.get("amount") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    transaction_date: String(formData.get("transaction_date") ?? "").trim(),
  };

  const amountInCents = Math.round(Number.parseFloat(fields.amount) * 100);

  if (!Number.isSafeInteger(amountInCents) || amountInCents <= 0) {
    return {
      status: "error",
      message: "Enter an amount greater than $0.",
      fields,
    };
  }

  if (!DATE_PATTERN.test(fields.transaction_date)) {
    return {
      status: "error",
      message: "Pick the date the money was spent.",
      fields,
    };
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/transactions`, {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "application/json",
        "x-vercel-protection-bypass":
          process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
      },
      body: JSON.stringify({
        amount_in_cents: amountInCents,
        description: fields.description || null,
        transaction_date: fields.transaction_date,
      }),
    });
  } catch {
    return {
      status: "error",
      message: "Couldn't reach the server. Try again.",
      fields,
    };
  }

  if (!response.ok) {
    const body: { message?: string } | null = await response
      .json()
      .catch(() => null);

    return {
      status: "error",
      message:
        body?.message ??
        `Failed to save transaction (status ${response.status}).`,
      fields,
    };
  }

  refresh();

  return { status: "success", message: "Transaction logged." };
}
