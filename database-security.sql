-- Database Security Setup for Portfolio Application
-- Run this SQL in your Supabase SQL Editor to enable Row Level Security

-- Enable Row Level Security on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- IMPORTANT: Replace 'your-admin-email@example.com' with your actual admin email address

-- Projects Table Policies
CREATE POLICY "Admin can manage projects" ON projects FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Public can view active projects" ON projects FOR SELECT USING (active = true);

-- Testimonials Table Policies
CREATE POLICY "Admin can manage testimonials" ON testimonials FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Public can view active testimonials" ON testimonials FOR SELECT USING (active = true);

-- Skills Table Policies
CREATE POLICY "Admin can manage skills" ON skills FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Public can view active skills" ON skills FOR SELECT USING (active = true);

-- Personal Info Table Policies
CREATE POLICY "Admin can manage personal_info" ON personal_info FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Public can view personal_info" ON personal_info FOR SELECT USING (true);

-- About Features Table Policies
CREATE POLICY "Admin can manage about_features" ON about_features FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Public can view active about_features" ON about_features FOR SELECT USING (active = true);

-- Contact Info Table Policies
CREATE POLICY "Admin can manage contact_info" ON contact_info FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Public can view active contact_info" ON contact_info FOR SELECT USING (active = true);

-- Contact Submissions Table Policies (Admin only - sensitive data)
CREATE POLICY "Admin can manage contact_submissions" ON contact_submissions FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

-- Enable realtime for dashboard updates (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE skills;
ALTER PUBLICATION supabase_realtime ADD TABLE personal_info;
ALTER PUBLICATION supabase_realtime ADD TABLE about_features;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_info;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_submissions;
