
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout";

// Import all pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpenseHistory from "./pages/ExpenseHistory";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import MonthlyTarget from "./pages/MonthlyTarget";
import ExportData from "./pages/ExportData";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Onboarding Route */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } /> 
            
            {/* Protected Main App Routes with Layout */}
            <Route path="/home" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="add-expense" element={<AddExpense />} />
              <Route path="history" element={<ExpenseHistory />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="profile" element={<Profile />} />
              <Route path="target" element={<MonthlyTarget />} />
              <Route path="export" element={<ExportData />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
