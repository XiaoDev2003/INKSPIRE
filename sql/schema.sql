
-- Tạo cơ sở dữ liệu inkspire nếu chưa tồn tại
CREATE DATABASE IF NOT EXISTS inkspire
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Chuyển sang sử dụng database inkspire
USE inkspire;

-- -----------------------------
-- BẢNG USER
-- -----------------------------
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash TEXT NOT NULL,
    avatar_url VARCHAR(255),
    role ENUM('user', 'creator', 'admin') DEFAULT 'user',
    gender ENUM('male', 'female', 'other'),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    status ENUM('active', 'banned') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -----------------------------
-- BẢNG CATEGORIES
-- -----------------------------
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_des TEXT,
    category_origin TEXT,
    category_type ENUM('traditional', 'modern', 'handwriting_design') NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft'
);

-- -----------------------------
-- BẢNG ITEM (FONT THƯ PHÁP)
-- -----------------------------
CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    item_des TEXT,
    item_origin TEXT,
    lang_type VARCHAR(50),
    item_url VARCHAR(255) NOT NULL,
    author_id INT NOT NULL DEFAULT 1,
    views INT DEFAULT 0,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (author_id) REFERENCES users(user_id)
);

-- -----------------------------
-- BẢNG GALLERY
-- -----------------------------
CREATE TABLE gallery (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_title VARCHAR(100),
    image_url VARCHAR(255) NOT NULL,
    category_id INT,
    item_id INT,
    uploaded_by INT,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id)
);

-- -----------------------------
-- BẢNG FEEDBACK
-- -----------------------------
CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    feedback_url VARCHAR(255),
    feedback_message TEXT NOT NULL,
    feedback_attachment_url VARCHAR(255),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- -----------------------------
-- BẢNG COMMENTS
-- -----------------------------
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    comment_content TEXT NOT NULL,
    user_id INT NOT NULL,
    item_id INT,
    category_id INT,
    parent_comment_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (parent_comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
);

-- -----------------------------
-- BẢNG COMMENT_LIKES
-- -----------------------------
CREATE TABLE comment_likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
);

-- -----------------------------
-- BẢNG QUERIES_LINK
-- -----------------------------
CREATE TABLE queries_link (
    query_id INT AUTO_INCREMENT PRIMARY KEY,
    question_content TEXT NOT NULL,
    short_answer VARCHAR(255) NOT NULL,
    full_answer LONGTEXT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -----------------------------
-- BẢNG PAGE_VIEWS
-- -----------------------------
CREATE TABLE page_views (
    view_id INT AUTO_INCREMENT PRIMARY KEY,
    total_views INT DEFAULT 0
);