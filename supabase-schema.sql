-- Portfolio Dashboard Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500) NOT NULL,
    live_url VARCHAR(500) NOT NULL,
    github_url VARCHAR(500) NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    category VARCHAR(100) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    project VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Personal Info table
CREATE TABLE IF NOT EXISTS personal_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    github VARCHAR(500),
    linkedin VARCHAR(500),
    twitter VARCHAR(500),
    resume_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
-- Projects
INSERT INTO projects (title, description, image, live_url, github_url, technologies, category, featured) VALUES
('E-commerce Dashboard', 'Modern React dashboard for managing online stores with real-time analytics and inventory management.', 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/ecommerce', 'https://github.com/example/ecommerce', ARRAY['React', 'TypeScript', 'Node.js', 'MongoDB'], 'React', true),
('Shopify Theme', 'Custom Shopify theme with modern design and optimized performance for fashion brands.', 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/shopify-theme', 'https://github.com/example/shopify-theme', ARRAY['Shopify', 'Liquid', 'JavaScript', 'SCSS'], 'Shopify', true),
('WordPress Corporate Site', 'Professional WordPress website with custom post types and advanced SEO optimization.', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://example.com/wp-site', 'https://github.com/example/wp-site', ARRAY['WordPress', 'PHP', 'MySQL', 'JavaScript'], 'WordPress', false);

-- Testimonials
INSERT INTO testimonials (name, role, company, avatar, content, rating, project) VALUES
('Sarah Johnson', 'Founder & CEO', 'GreenTech Solutions', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', 'Working with this developer was a game-changer for our business. Professional, reliable, and delivers exceptional results.', 5, 'WordPress Corporate Site'),
('Emily Chen', 'Product Manager', 'TechStart Inc', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', 'Amazing work on our learning management system. The user experience is intuitive and our students love the platform.', 5, 'React LMS Platform');

-- Skills
INSERT INTO skills (name, category, level, icon) VALUES
('React', 'Frontend', 95, 'react'),
('TypeScript', 'Frontend', 90, 'typescript'),
('JavaScript', 'Frontend', 95, 'javascript'),
('Node.js', 'Backend', 85, 'nodejs'),
('MongoDB', 'Database', 80, 'mongodb'),
('PostgreSQL', 'Database', 75, 'postgresql'),
('Shopify', 'Tools & Platforms', 90, 'shopify'),
('WordPress', 'Tools & Platforms', 85, 'wordpress'),
('Tailwind CSS', 'Frontend', 90, 'css'),
('Git', 'Tools & Platforms', 95, 'git');

-- Personal Info
INSERT INTO personal_info (name, title, bio, email, phone, location, github, linkedin, twitter, resume_url) VALUES
('MD Abudanish', 'Front-End Developer & Digital Craftsman', 'Passionate front-end developer with 4+ years of experience creating beautiful, functional web applications. Specialized in React, TypeScript, and modern web technologies.', 'contact@abudanish.dev', '+1 (555) 123-4567', 'New York, USA', 'https://github.com/abudanish', 'https://linkedin.com/in/abudanish', 'https://twitter.com/abudanish', 'https://example.com/resume.pdf');

-- Enable Row Level Security (RLS) - Optional for public access
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (uncomment if needed)
-- CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
-- CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (true);
-- CREATE POLICY "Enable read access for all users" ON skills FOR SELECT USING (true);
-- CREATE POLICY "Enable read access for all users" ON personal_info FOR SELECT USING (true);
