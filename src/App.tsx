import { Wallet, TrendingUp, Shield } from "lucide-react";
import Product from "./components/Product";
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Smart Expense Management
            <span className="block text-blue-600">for Modern Life</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Take control of your finances with our intuitive expense tracker.
            Monitor spending, set budgets, and make informed financial decisions
            with ease.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-500 mb-4 flex justify-center">
                <Wallet size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Easy Tracking
              </h3>
              <p className="text-slate-600">
                Record and categorize expenses with just a few clicks
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-green-500 mb-4 flex justify-center">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Smart Insights
              </h3>
              <p className="text-slate-600">
                Visualize spending patterns and track financial progress
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-purple-500 mb-4 flex justify-center">
                <Shield size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Secure Data
              </h3>
              <p className="text-slate-600">
                Your financial data stays private, stored in your browsers
                local-storage
              </p>
            </div>
          </div>
        </div>

        <Product />
      </div>
    </div>
  );
};

export default App;
