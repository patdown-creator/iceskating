-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ROLES
CREATE TYPE user_role AS ENUM ('admin', 'instructor', 'student');

-- PROFILES
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role user_role DEFAULT 'student',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- LEVELS
CREATE TABLE levels (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CLASSES
CREATE TABLE classes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  day TEXT NOT NULL, -- e.g., 'Monday', 'Tuesday'
  time_slot TEXT NOT NULL, -- e.g., '10:00 AM - 11:00 AM'
  ice_location TEXT NOT NULL, -- e.g., 'Rink A', 'Rink B'
  level_id UUID REFERENCES levels(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CLASS INSTRUCTORS (Multiple instructors per class)
CREATE TABLE class_instructors (
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, instructor_id)
);

-- ENROLLMENTS (Students in classes)
CREATE TABLE enrollments (
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, student_id)
);

-- ATTENDANCE
CREATE TABLE attendance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE DEFAULT CURRENT_DATE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('present', 'absent', 'excused')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- FEEDBACK REPORTS
CREATE TABLE feedback_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  comments TEXT,
  skills_achieved TEXT[], -- Array of skills
  report_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies (Simplified for MVP, assuming Admin has full access)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_reports ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Allow read for all authenticated users, restricted write)
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', (new.raw_user_meta_data->>'role')::user_role);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
