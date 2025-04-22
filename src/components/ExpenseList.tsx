import React, { useState } from "react";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import { Expense } from "../types";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  onEditExpense: (expense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDeleteExpense,
  onEditExpense,
}) => {
  const [sortField, setSortField] = useState<"date" | "name" | "amount">(
    "date"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: "date" | "name" | "amount") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
  });

  if (expenses.length === 0) {
    return (
      <div className="px-6 sm:px-8 py-8 text-center text-slate-500 border-t border-slate-100">
        <p className="mb-2">No expenses yet</p>
        <p className="text-sm">Add your first expense using the form above</p>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-100">
      <div className="px-6 sm:px-8 py-4">
        <h2 className="text-lg font-medium text-slate-800 mb-2">
          Expense History
        </h2>

        <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium text-slate-600">
          <div
            className="sm:col-span-5 flex items-center cursor-pointer"
            onClick={() => handleSort("name")}
          >
            Expense
            {sortField === "name" &&
              (sortDirection === "asc" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </div>
          <div
            className="sm:col-span-3 flex items-center cursor-pointer"
            onClick={() => handleSort("date")}
          >
            Date
            {sortField === "date" &&
              (sortDirection === "asc" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </div>
          <div
            className="sm:col-span-2 flex items-center cursor-pointer justify-end"
            onClick={() => handleSort("amount")}
          >
            Amount
            {sortField === "amount" &&
              (sortDirection === "asc" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </div>
          <div className="sm:col-span-2 text-right">Actions</div>
        </div>

        <div className="mt-2 space-y-2">
          {sortedExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDeleteExpense}
              onEdit={onEditExpense}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
