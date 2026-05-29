-- ============================================
-- Student Management System - Database Schema
-- Database: school
-- ============================================

CREATE DATABASE IF NOT EXISTS school;
USE school;

-- ============================================
-- Table: student
-- Stores student records
-- ============================================
CREATE TABLE IF NOT EXISTS student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL
);

-- ============================================
-- Table: users
-- Stores user accounts for authentication
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- ============================================
-- Sample Data (Optional)
-- ============================================
-- INSERT INTO student (fname, lname, email, address) VALUES
-- ('John', 'Doe', 'john.doe@example.com', '123 Main St, City'),
-- ('Jane', 'Smith', 'jane.smith@example.com', '456 Oak Ave, Town');

-- INSERT INTO users (username, email, password) VALUES
-- ('admin', 'admin@example.com', 'hashed_password_here');
