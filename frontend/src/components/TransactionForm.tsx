"use client";

import { useActionState } from "react";
import { createTransaction } from "@/src/lib/actions/transactions";
import type { CreateTransactionState } from "@/src/types/transaction";

const initialState: CreateTransactionState = { status: "idle", message: "" };

const inputClassName =
  "w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/60";

export default function TransactionForm() {
  const [state, formAction, pending] = useActionState(
    createTransaction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-sm font-medium">
          Amount
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-foreground/60">
            $
          </span>
          <input
            id="amount"
            name="amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            required
            defaultValue={state.fields?.amount}
            className={`${inputClassName} pl-7`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          maxLength={200}
          placeholder="What was it for?"
          defaultValue={state.fields?.description}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="transaction_date" className="text-sm font-medium">
          Date
        </label>
        <input
          id="transaction_date"
          name="transaction_date"
          type="date"
          required
          defaultValue={state.fields?.transaction_date}
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-foreground px-4 py-2 font-medium text-background disabled:opacity-50"
      >
        {pending ? "Saving…" : "Log transaction"}
      </button>

      <p
        aria-live="polite"
        className={`min-h-5 text-sm ${state.status === "error" ? "text-red-600" : "text-green-600"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
