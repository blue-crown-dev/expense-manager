export type Category =
  | "general"
  | "food"
  | "shopping"
  | "housing"
  | "transportation"
  | "entertainment"
  | "travel"
  | "healthcare"
  | "education";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
  date: string;
}
