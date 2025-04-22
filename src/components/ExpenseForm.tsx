import React, { useState, useEffect } from "react";
import { PlusCircle, Save, X } from "lucide-react";
import { Expense, Category } from "../types";
import CategorySelector from "./CategorySelector";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
  onUpdateExpense: (expense: Expense) => void;
  editingExpense: Expense | null;
  onCancelEdit: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onAddExpense,
  editingExpense,
  onUpdateExpense,
  onCancelEdit,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("general");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
    }
  }, [editingExpense]);

  const resetForm = () => {
    setName("");
    setAmount("");
    setCategory("general");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setError("Please enter an expense name");
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    const expenseData: Expense = {
      id: editingExpense ? editingExpense.id : Date.now().toString(),
      name: name.trim(),
      amount: amountValue,
      category,
      date: editingExpense ? editingExpense.date : new Date().toISOString(),
    };

    if (editingExpense) {
      onUpdateExpense(expenseData);
    } else {
      onAddExpense(expenseData);
    }
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expense-name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Expense Name
            </label>
            <input
              id="expense-name"
              type="text"
              placeholder="e.g. Groceries"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="expense-amount"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                $
              </span>
              <input
                id="expense-amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <CategorySelector
          selectedCategory={category}
          onSelectCategory={setCategory}
        />

        {error && (
          <div className="text-red-500 text-sm py-1 px-2 bg-red-50 rounded-md animate-fadeIn">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 pt-2">
          {editingExpense && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
          )}

          <button
            type="submit"
            className={`flex items-center px-5 py-2 rounded-lg text-white transition-all ${
              editingExpense
                ? "bg-green-500 hover:bg-green-600 active:bg-green-700"
                : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            }`}
          >
            {editingExpense ? (
              <>
                <Save size={16} className="mr-1" />
                Update
              </>
            ) : (
              <>
                <PlusCircle size={16} className="mr-1" />
                Add Expense
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
