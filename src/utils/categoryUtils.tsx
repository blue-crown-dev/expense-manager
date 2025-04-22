import React from "react";
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
import { Category } from "../types";

export const getCategoryIcon = (category: Category) => {
  switch (category) {
    case "food":
      return Utensils;
    case "shopping":
      return ShoppingCart;
    case "housing":
      return Home;
    case "transportation":
      return Car;
    case "entertainment":
      return Coffee;
    case "travel":
      return Plane;
    case "healthcare":
      return Heart;
    case "education":
      return BookOpen;
    default:
      return LayoutGrid;
  }
};

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case "food":
      return "bg-amber-100 text-amber-700";
    case "shopping":
      return "bg-pink-100 text-pink-700";
    case "housing":
      return "bg-blue-100 text-blue-700";
    case "transportation":
      return "bg-emerald-100 text-emerald-700";
    case "entertainment":
      return "bg-purple-100 text-purple-700";
    case "travel":
      return "bg-orange-100 text-orange-700";
    case "healthcare":
      return "bg-red-100 text-red-700";
    case "education":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};
