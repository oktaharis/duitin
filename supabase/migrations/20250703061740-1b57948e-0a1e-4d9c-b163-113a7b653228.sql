
-- Create enum for expense categories
CREATE TYPE expense_category AS ENUM (
  'food', 'transport', 'entertainment', 'shopping', 'bills', 
  'health', 'education', 'travel', 'other'
);

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create categories table for custom expense categories
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '💰',
  color TEXT NOT NULL DEFAULT '#3B82F6',
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create monthly_targets table
CREATE TABLE public.monthly_targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_amount DECIMAL(10,2) NOT NULL CHECK (target_amount > 0),
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL CHECK (year >= 2000),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, month, year)
);

-- Create notification_settings table
CREATE TABLE public.notification_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_reminder BOOLEAN NOT NULL DEFAULT TRUE,
  reminder_time TIME NOT NULL DEFAULT '15:00:00',
  weekly_summary BOOLEAN NOT NULL DEFAULT FALSE,
  push_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for categories
CREATE POLICY "Users can view their own categories" ON public.categories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own categories" ON public.categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories" ON public.categories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories" ON public.categories
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for expenses
CREATE POLICY "Users can view their own expenses" ON public.expenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own expenses" ON public.expenses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" ON public.expenses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" ON public.expenses
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for monthly_targets
CREATE POLICY "Users can view their own monthly targets" ON public.monthly_targets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own monthly targets" ON public.monthly_targets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own monthly targets" ON public.monthly_targets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own monthly targets" ON public.monthly_targets
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for notification_settings
CREATE POLICY "Users can view their own notification settings" ON public.notification_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notification settings" ON public.notification_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification settings" ON public.notification_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  
  -- Insert default categories
  INSERT INTO public.categories (user_id, name, icon, color, is_default) VALUES
    (NEW.id, 'Makanan', '🍽️', '#EF4444', TRUE),
    (NEW.id, 'Transportasi', '🚗', '#3B82F6', TRUE),
    (NEW.id, 'Hiburan', '🎬', '#8B5CF6', TRUE),
    (NEW.id, 'Belanja', '🛍️', '#EC4899', TRUE),
    (NEW.id, 'Tagihan', '💡', '#F59E0B', TRUE),
    (NEW.id, 'Kesehatan', '⚕️', '#10B981', TRUE),
    (NEW.id, 'Pendidikan', '📚', '#06B6D4', TRUE),
    (NEW.id, 'Lainnya', '💰', '#6B7280', TRUE);
  
  -- Insert default notification settings
  INSERT INTO public.notification_settings (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_expenses_user_id ON public.expenses(user_id);
CREATE INDEX idx_expenses_date ON public.expenses(date);
CREATE INDEX idx_expenses_category_id ON public.expenses(category_id);
CREATE INDEX idx_categories_user_id ON public.categories(user_id);
CREATE INDEX idx_monthly_targets_user_id ON public.monthly_targets(user_id);
CREATE INDEX idx_monthly_targets_month_year ON public.monthly_targets(month, year);

-- Create function to get expense statistics
CREATE OR REPLACE FUNCTION public.get_expense_statistics(
  p_user_id UUID,
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL
)
RETURNS TABLE (
  total_amount DECIMAL,
  expense_count BIGINT,
  avg_daily_amount DECIMAL,
  category_breakdown JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH expense_data AS (
    SELECT 
      e.amount,
      e.date,
      c.name as category_name,
      c.color as category_color
    FROM public.expenses e
    LEFT JOIN public.categories c ON e.category_id = c.id
    WHERE e.user_id = p_user_id
      AND (p_start_date IS NULL OR e.date >= p_start_date)
      AND (p_end_date IS NULL OR e.date <= p_end_date)
  ),
  stats AS (
    SELECT
      COALESCE(SUM(amount), 0) as total_amt,
      COUNT(*) as exp_count,
      CASE 
        WHEN COUNT(*) > 0 AND p_start_date IS NOT NULL AND p_end_date IS NOT NULL
        THEN COALESCE(SUM(amount), 0) / GREATEST((p_end_date - p_start_date + 1), 1)
        ELSE 0
      END as avg_daily_amt
    FROM expense_data
  ),
  category_stats AS (
    SELECT 
      jsonb_agg(
        jsonb_build_object(
          'category', COALESCE(category_name, 'Tanpa Kategori'),
          'amount', cat_total,
          'color', COALESCE(category_color, '#6B7280'),
          'count', cat_count
        )
      ) as breakdown
    FROM (
      SELECT 
        category_name,
        category_color,
        SUM(amount) as cat_total,
        COUNT(*) as cat_count
      FROM expense_data
      GROUP BY category_name, category_color
    ) cat_data
  )
  SELECT 
    s.total_amt,
    s.exp_count,
    s.avg_daily_amt,
    COALESCE(cs.breakdown, '[]'::jsonb)
  FROM stats s
  CROSS JOIN category_stats cs;
END;
$$;
