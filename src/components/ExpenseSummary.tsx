import React, { useMemo, useState } from "react";
import { Trash, ChevronDown, ChevronUp, PieChart } from "lucide-react";
import { Expense, Category } from "../types";
import { getCategoryColor, getCategoryIcon } from "../utils/categoryUtils";

interface ExpenseSummaryProps {
  expenses: Expense[];
  onClearExpenses: () => void;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  expenses,
  onClearExpenses,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const categoryTotals = useMemo(() => {
    const totals: Record<Category, number> = {
      general: 0,
      food: 0,
      shopping: 0,
      housing: 0,
      transportation: 0,
      entertainment: 0,
      travel: 0,
      healthcare: 0,
      education: 0,
    };

    expenses.forEach((expense) => {
      totals[expense.category] += expense.amount;
    });

    return Object.entries(totals)
      .filter(([_, amount]) => amount > 0)
      .sort(([_, a], [__, b]) => b - a) as [Category, number][];
  }, [expenses]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="border-t border-slate-100 px-6 sm:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-slate-800 flex items-center">
          <PieChart size={20} className="mr-2" />
          Summary
        </h2>

        {expenses.length > 0 && (
          <button
            onClick={onClearExpenses}
            className="flex items-center px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash size={14} className="mr-1" />
            Clear All
          </button>
        )}
      </div>

      <div className="bg-slate-50 rounded-xl p-4 sm:p-6">
        <div className="text-center mb-2">
          <p className="text-sm text-slate-500 mb-1">Total Expenses</p>
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
            {formatAmount(totalAmount)}
          </h3>
        </div>

        {expenses.length > 0 && (
          <div className="mt-4">
            <button
              className="flex items-center justify-between w-full py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
              onClick={() => setShowDetails(!showDetails)}
            >
              <span>Category Breakdown</span>
              {showDetails ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {showDetails && (
              <div className="mt-3 space-y-2 animate-fadeIn">
                {categoryTotals.map(([category, amount]) => {
                  const Icon = getCategoryIcon(category);
                  const colorClass = getCategoryColor(category);
                  const percentage = Math.round((amount / totalAmount) * 100);

                  return (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className={`p-1.5 rounded-md ${colorClass} mr-2`}>
                          <Icon size={14} />
                        </div>
                        <span className="text-sm text-slate-700 capitalize">
                          {category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {formatAmount(amount)}
                        </span>
                        <span className="text-xs text-slate-500">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;
