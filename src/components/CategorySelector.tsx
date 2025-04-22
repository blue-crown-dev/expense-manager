import React from "react";
import { Category } from "../types";
import {
  Coffee,
  Home,
  Car,
  ShoppingCart,
  Utensils,
  Plane,
  Heart,
  BookOpen,
  LayoutGrid,
} from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const categories: {
  value: Category;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: "general",
    label: "General",
    icon: <LayoutGrid size={16} />,
    color: "bg-slate-100 text-slate-700",
  },
  {
    value: "food",
    label: "Food",
    icon: <Utensils size={16} />,
    color: "bg-amber-100 text-amber-700",
  },
  {
    value: "shopping",
    label: "Shopping",
    icon: <ShoppingCart size={16} />,
    color: "bg-pink-100 text-pink-700",
  },
  {
    value: "housing",
    label: "Housing",
    icon: <Home size={16} />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    value: "transportation",
    label: "Transport",
    icon: <Car size={16} />,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: <Coffee size={16} />,
    color: "bg-purple-100 text-purple-700",
  },
  {
    value: "travel",
    label: "Travel",
    icon: <Plane size={16} />,
    color: "bg-orange-100 text-orange-700",
  },
  {
    value: "healthcare",
    label: "Healthcare",
    icon: <Heart size={16} />,
    color: "bg-red-100 text-red-700",
  },
  {
    value: "education",
    label: "Education",
    icon: <BookOpen size={16} />,
    color: "bg-indigo-100 text-indigo-700",
  },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Category
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => onSelectCategory(category.value)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
              category.value === selectedCategory
                ? `${category.color} ring-2 ring-offset-1 ring-blue-500 scale-105`
                : `${category.color} bg-opacity-50 hover:bg-opacity-70`
            }`}
          >
            <span className="mb-1">{category.icon}</span>
            <span className="text-xs">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
