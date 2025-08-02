-- About and Contact Sections Database Schema
-- Run this SQL in your Supabase SQL Editor to add About and Contact management

-- About Features table (for the feature cards in About section)
CREATE TABLE IF NOT EXISTS about_features (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Info table (for contact methods and social links)
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- 'contact' or 'social'
    label VARCHAR(255) NOT NULL,
    value VARCHAR(500) NOT NULL, -- email, phone, address, or social URL
    icon VARCHAR(100) NOT NULL,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_about_features_active ON about_features(active);
CREATE INDEX IF NOT EXISTS idx_about_features_order ON about_features(order_index);
CREATE INDEX IF NOT EXISTS idx_contact_info_type ON contact_info(type);
CREATE INDEX IF NOT EXISTS idx_contact_info_active ON contact_info(active);
CREATE INDEX IF NOT EXISTS idx_contact_info_order ON contact_info(order_index);

-- Create triggers for updated_at
CREATE TRIGGER update_about_features_updated_at BEFORE UPDATE ON about_features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for About Features
INSERT INTO about_features (title, description, icon, order_index) VALUES
('Clean Code', 'Writing maintainable, scalable code following modern development standards and best practices.', 'Code', 1),
('User-Focused Design', 'Creating intuitive interfaces that prioritize user experience and accessibility.', 'Palette', 2),
('Performance Optimization', 'Building fast, efficient websites optimized for speed and search engines.', 'Zap', 3),
('Responsive Development', 'Ensuring perfect functionality across all devices and screen sizes.', 'Smartphone', 4),
('Modern Technologies', 'Leveraging the latest frameworks and tools for cutting-edge solutions.', 'Layers', 5),
('Problem Solving', 'Analytical approach to complex challenges with creative, effective solutions.', 'Target', 6);

-- Insert sample data for Contact Info
INSERT INTO contact_info (type, label, value, icon, order_index) VALUES
-- Contact methods
('contact', 'Email', 'abudanishmd@gmail.com', 'Mail', 1),
('contact', 'Phone', '+91 6305597058', 'Phone', 2),
('contact', 'Location', 'Bhubaneswar, Odisha, India', 'MapPin', 3),
-- Social links
('social', 'GitHub', 'https://github.com/yourusername', 'Github', 1),
('social', 'LinkedIn', 'https://linkedin.com/in/yourusername', 'Linkedin', 2),
('social', 'Twitter', 'https://twitter.com/yourusername', 'Twitter', 3),
('social', 'Instagram', 'https://instagram.com/yourusername', 'Instagram', 4);

-- Create contact submissions table for form entries
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread', -- 'unread', 'read', 'replied'
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for contact submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create trigger for contact submissions updated_at
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
