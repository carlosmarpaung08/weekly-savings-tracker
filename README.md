# 💰 Tabungan Bareng

> A modern web application for managing and tracking weekly group savings with an easy admin system and transparent member monitoring.

## 📌 Overview

Tabungan Bareng is a web-based application designed to help groups manage their weekly savings activities.

The application uses a simple concept:
- One admin manages all saving records.
- Members can view saving progress transparently.
- Weekly saving amounts can be changed based on group agreement.
- Members who have not paid are marked as unpaid, without any debt calculation or penalties.

## ✨ Features

### 👤 Member View
- View current active week.
- View weekly saving amount.
- View who has paid and who has not.
- View total group savings.
- View member saving recap.
- View previous saving history.

### 🔐 Admin Panel
- Secure admin login.
- Add, edit, and delete members.
- Create a new weekly saving period.
- Set weekly saving amount once for all members.
- Mark members who have paid using simple checklists.
- Bulk check all members.

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Google Apps Script REST API

### Database
- Google Sheets

### Deployment
- Vercel


## 🔄 Application Flow

```
Admin
  |
  | Login
  ↓
Manage Members
  |
Create Weekly Saving
  |
Set Weekly Amount
  |
Mark Paid Members
  |
Update Group Progress


Members
  |
  ↓
View Dashboard
  |
View Weekly Status
  |
View Saving History
```

## 🎯 Main Concept

This application does not treat unpaid members as debt.

An unpaid status is only used as a reminder so the admin can manually follow up with members.

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/tabungan-bareng.git
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

## 🌟 Future Improvements

- Multiple saving groups.
- Multiple admins.
- Member authentication.
- Push notifications.
- Mobile application support.

## 👨‍💻 Author

Created with ❤️ by Carlos Michael Marpaung