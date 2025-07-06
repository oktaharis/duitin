
-- Create user_onboarding table to store onboarding survey responses
CREATE TABLE public.user_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  purpose TEXT,
  purpose_other TEXT,
  has_monthly_target BOOLEAN DEFAULT FALSE,
  monthly_target_amount NUMERIC,
  wants_daily_reminder BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_onboarding table
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_onboarding
CREATE POLICY "Users can view their own onboarding data" 
  ON public.user_onboarding 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own onboarding data" 
  ON public.user_onboarding 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding data" 
  ON public.user_onboarding 
  FOR UPDATE 
  USING (auth.uid() = user_id);
