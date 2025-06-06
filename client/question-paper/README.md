#  Question Paper Generator

A full-stack web application that allows users to create MCQ-based question papers, take exams, and generate PDFs. Designed to assist educators in preparing and managing exam content with ease.

---

##  Features

### Authentication

- User Login and Registration

###  Dashboard

####  Layout

- Header
- Footer
- Main Section:
  - MCQ Paper Creation
  - PDF Generation

---

###  MCQ Section

- **Question Form**
  - Input: Subject, Question Text, Marks, Category (True/False, Select One, Select Two)
  - Uses Redux for state management
- **Question List**
  - Displays questions stored in Redux
  - Edit/Delete questions
- **Paper Creation**
  - Create a multiple-choice question paper
  - Show results after the exam

---

###  PDF Generation Section

- **Question Form**
- **Question List**
  - Uses Redux for storing and displaying questions
- **Paper Creation**
  - Auto-generate paper based on a total of 70 marks
- **Generate PDF**
  - Export the paper to a PDF format using `html2pdf.js`

---

##  Technologies

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **PDF Generation**: html2pdf.js
- **Routing**: react-router-dom
