import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import { Expense } from "../types";

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const clearAllExpenses = () => {
    setExpenses([]);
  };

  const startEditing = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const cancelEditing = () => {
    setEditingExpense(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-slate-800">
          Expense Tracker
        </h1>
      </div>

      <ExpenseForm
        onAddExpense={addExpense}
        editingExpense={editingExpense}
        onUpdateExpense={updateExpense}
        onCancelEdit={cancelEditing}
      />

      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpense}
        onEditExpense={startEditing}
      />

      <ExpenseSummary expenses={expenses} onClearExpenses={clearAllExpenses} />
    </div>
  );
};

export default ExpenseTracker;
