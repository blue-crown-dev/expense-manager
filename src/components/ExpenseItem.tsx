import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Expense } from "../types";
import { getCategoryIcon, getCategoryColor } from "../utils/categoryUtils";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onDelete,
  onEdit,
}) => {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const Icon = getCategoryIcon(expense.category);
  const categoryColorClass = getCategoryColor(expense.category);

  return (
    <div className="grid grid-cols-12 gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="col-span-7 sm:col-span-5 flex items-center gap-3">
        <div className={`p-2 rounded-lg ${categoryColorClass}`}>
          <Icon size={16} />
        </div>
        <div>
          <p className="font-medium text-slate-800">{expense.name}</p>
          <p className="text-xs text-slate-500 sm:hidden">{formattedDate}</p>
        </div>
      </div>

      <div className="hidden sm:flex sm:col-span-3 items-center text-slate-600 text-sm">
        {formattedDate}
      </div>

      <div className="col-span-3 sm:col-span-2 p-1.5 flex items-center justify-end sm:justify-start font-medium text-slate-800">
        {formatAmount(expense.amount)}
      </div>

      <div className="col-span-2 flex items-center justify-end space-x-1">
        <button
          onClick={() => onEdit(expense)}
          className="p-0.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          aria-label="Edit expense"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={() => onDelete(expense.id)}
          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Delete expense"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
