# Kambaz: Canvas-Inspired Learning Management System

A full-featured web application that simulates the core experience of [Canvas LMS](https://www.instructure.com/canvas/), built using **React**, **TypeScript**, and **React-Bootstrap**.

## 🎯 Features

- 🎓 **Course Management**: Create, edit, delete courses
- 🧑‍🏫 **User Roles**: Instructor and student support
- 📝 **Assignment & Quiz System**:
  - Add/edit assignments and quizzes
  - Support for multiple-choice, true/false, fill-in-the-blank questions
  - Quiz attempts and detailed feedback
- 👥 **Enrollment System**: Students can enroll/unenroll in courses
- 📊 **Quiz Preview & Review**: Students can review their answers and see correctness (like Canvas)
- 🔄 **RESTful API Integration**: All data operations connected to backend services

## 🧱 Tech Stack

- **Frontend**: React, TypeScript, React-Bootstrap
- **State Management**: Redux (initially), migrated to RESTful API calls
- **Backend**: Node.js, Express, MongoDB (with Mongoose)
- **Auth**: Session-based authentication
- **Data Modeling**: Mongoose with population for many-to-many relationships

## 🚀 Project Structure

- `Users/`: Registration, login, and profile features
- `Courses/`: Course list, detail view, editing, enrollments
- `Assignments/`: Create/edit/view assignments
- `Quizzes/`: Quiz editor, question types, attempt system
- `QuizAttempt/`: Student submissions and review view

## 📸 Screenshot

> *You can insert a screenshot here if available.*

## 🛠 How to Run

```bash
# Install dependencies
npm install

# Run frontend dev server
npm start


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
