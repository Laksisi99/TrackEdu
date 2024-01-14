CREATE DATABASE TrackEdu;

USE TrackEdu;

-- Table for Users
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL,
    UserType VARCHAR(20) NOT NULL CHECK (UserType IN ('Admin', 'Student', 'Lecturer', 'Academic Staff', 'Non Academic Staff'))
    
);

-- Table for Batches
CREATE TABLE Batches (
    Batch_ID INT PRIMARY KEY AUTO_INCREMENT,
    Batch_Start_Year INT NOT NULL,
    Batch_End_Year INT NOT NULL,
    Batch_Code VARCHAR(20) UNIQUE NOT NULL
);

-- Table for Semester Details
CREATE TABLE Semester_Details (
    Semester_ID INT PRIMARY KEY AUTO_INCREMENT,
    Semester_Name VARCHAR(50) NOT NULL
);

-- Table for Admin
CREATE TABLE Admin (
    Admin_ID INT PRIMARY KEY AUTO_INCREMENT,
    Admin_Name VARCHAR(50) NOT NULL,
    Admin_Email VARCHAR(100) UNIQUE NOT NULL,
    Admin_Password VARCHAR(100) NOT NULL
);

-- Table for Students
CREATE TABLE Students (
    Student_ID INT PRIMARY KEY AUTO_INCREMENT,
    Student_Name VARCHAR(50) NOT NULL,
    Student_Reg_Num VARCHAR(20) UNIQUE NOT NULL,
    Student_Email VARCHAR(100) UNIQUE NOT NULL,
    Student_Contact_Number VARCHAR(15),
    Lecturer_NIC VARCHAR(15) UNIQUE NOT NULL,
    Student_Password VARCHAR(100) NOT NULL,
    Batch_ID INT,
    Club_ID INT,
    FOREIGN KEY (Batch_ID) REFERENCES Batches(Batch_ID),
    FOREIGN KEY (Club_ID) REFERENCES Clubs(Club_ID)
);

-- Table for Lecturers
CREATE TABLE Lecturers (
    Lecturer_ID INT PRIMARY KEY AUTO_INCREMENT,
    Lecturer_Name VARCHAR(50) NOT NULL,
    Lecturer_Email VARCHAR(100) UNIQUE NOT NULL,
    Lecturer_Contact_Number VARCHAR(15),
    Lecturer_NIC VARCHAR(15) UNIQUE NOT NULL,
    Lecturer_Password VARCHAR(100) NOT NULL
);

-- Table for Academic Staff
CREATE TABLE Academic_Staff (
    Academic_Staff_ID INT PRIMARY KEY AUTO_INCREMENT,
    Academic_Staff_Name VARCHAR(50) NOT NULL,
    Academic_Staff_Email VARCHAR(100) UNIQUE NOT NULL,
    Academic_Staff_Contact_Number VARCHAR(15),
    Academic_Staff_NIC VARCHAR(15) UNIQUE NOT NULL,
    Academic_Staff_Password VARCHAR(100) NOT NULL
);

-- Table for Clubs
CREATE TABLE Clubs (
    Club_ID INT PRIMARY KEY AUTO_INCREMENT,
    Club_Name VARCHAR(100) NOT NULL,
    Club_Code VARCHAR(20) UNIQUE NOT NULL
);


-- Table for Non Academic Staff
CREATE TABLE Non_Academic_Staff (
    Non_Academic_Staff_ID INT PRIMARY KEY AUTO_INCREMENT,
    Non_Academic_Staff_Name VARCHAR(50) NOT NULL,
    Non_Academic_Staff_Email VARCHAR(100) UNIQUE NOT NULL,
    Non_Academic_Staff_Contact_Number VARCHAR(15),
    Non_Academic_Staff_NIC VARCHAR(15) UNIQUE NOT NULL,
    Non_Academic_Staff_Password VARCHAR(100) NOT NULL,
    Club_ID INT,
    FOREIGN KEY (Club_ID) REFERENCES Clubs(Club_ID)
);

-- Table for Courses
CREATE TABLE Courses (
    Course_ID INT PRIMARY KEY AUTO_INCREMENT,
    Course_Name VARCHAR(100) NOT NULL,
    Course_Code VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (Lecturer_ID) REFERENCES Lecturers(Lecturer_ID)
);

-- Table for Semester Courses (Mapping of Courses to Semesters)
CREATE TABLE Semester_Courses (
    Semester_ID INT,
    Course_ID INT,
    PRIMARY KEY (Semester_ID, Course_ID),
    FOREIGN KEY (Semester_ID) REFERENCES Semester_Details(Semester_ID),
    FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID)
);

-- Junction Table: Lecturer_Courses
CREATE TABLE Lecturer_Courses (
    Lecturer_ID INT,
    Course_ID INT,
    PRIMARY KEY (Lecturer_ID, Course_ID),
    FOREIGN KEY (Lecturer_ID) REFERENCES Lecturers(Lecturer_ID),
    FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID)
);

-- Table for Student Results
CREATE TABLE Student_Results (
    Result_ID INT PRIMARY KEY AUTO_INCREMENT,
    Student_ID INT,
    Course_ID INT,
    Academic_Staff_ID INT,
    Lecturer_ID INT,
    Assignment_1 INT,
    Assignment_2 INT,
    Assignment_3 INT,
    Assignment_4 INT,
    Assignment_5 INT,
    Mid_Exam INT,
    End_Exam INT,
    Total_Result INT,
    Grade VARCHAR(1),
    Semester_ID INT,
    FOREIGN KEY (Student_ID) REFERENCES Students(Student_ID),
    FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID),
    FOREIGN KEY (Semester_ID) REFERENCES Semester_Details(Semester_ID),
    FOREIGN KEY (Academic_Staff_ID) REFERENCES Academic_Staff(Academic_Staff_ID),
    FOREIGN KEY (Lecturer_ID) REFERENCES Lecturers(Lecturer_ID)

);

-- Table for Login Details
CREATE TABLE Login_Details (
    Login_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT, -- Reference to Admin_ID, Student_ID, or other relevant user IDs
    Login_Time DATETIME,
    FOREIGN KEY (User_ID) REFERENCES Admin(Admin_ID) ON DELETE CASCADE,
    FOREIGN KEY (User_ID) REFERENCES Students(Student_ID) ON DELETE CASCADE,
    FOREIGN KEY (User_ID) REFERENCES Lecturers(Lecturer_ID) ON DELETE CASCADE,
    FOREIGN KEY (User_ID) REFERENCES Academic_Staff(Staff_ID) ON DELETE CASCADE,
    FOREIGN KEY (User_ID) REFERENCES Non_Academic_Staff(Non_Academic_Staff_ID) ON DELETE CASCADE
    \-- ON DELETE CASCADE is used to delete the login details of a user when the user is deleted from the database
);

CREATE TABLE JWTTokensStudent
(
    TokenID INT PRIMARY KEY AUTO_INCREMENT,
    Token   VARCHAR(255) NOT NULL,
    RefreshToken VARCHAR(255) NOT NULL,
    UserID  INT,
    FOREIGN KEY (UserID) REFERENCES Customers (Student_ID)
);

CREATE TABLE JWTTokensLecturer
(
    TokenID INT PRIMARY KEY AUTO_INCREMENT,
    Token   VARCHAR(255) NOT NULL,
    RefreshToken VARCHAR(255) NOT NULL,
    UserID  INT,
    FOREIGN KEY (UserID) REFERENCES Customers (Lecturer_ID)
);

CREATE TABLE JWTTokensAdmin
(
    TokenID INT PRIMARY KEY AUTO_INCREMENT,
    Token   VARCHAR(255) NOT NULL,
    RefreshToken VARCHAR(255) NOT NULL,
    UserID  INT,
    FOREIGN KEY (UserID) REFERENCES Customers (Admin_ID)
);

CREATE TABLE JWTTokensAcademicStaff
(
    TokenID INT PRIMARY KEY AUTO_INCREMENT,
    Token   VARCHAR(255) NOT NULL,
    RefreshToken VARCHAR(255) NOT NULL,
    UserID  INT,
    FOREIGN KEY (UserID) REFERENCES Customers (Staff_ID)
);

CREATE TABLE JWTTokensNonAcademicStaff
(
    TokenID INT PRIMARY KEY AUTO_INCREMENT,
    Token   VARCHAR(255) NOT NULL,
    RefreshToken VARCHAR(255) NOT NULL,
    UserID  INT,
    FOREIGN KEY (UserID) REFERENCES Customers (Non_Academic_Staff_ID)
);