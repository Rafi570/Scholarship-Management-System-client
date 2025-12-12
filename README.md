# 🚀 Scholarship Management System

This project is a comprehensive Scholarship Management Platform designed to facilitate students in discovering and applying for scholarships, while providing Admin and Moderator users with the necessary tools to efficiently manage applications and platform content.

## 🌐 Live Links

| Description | Link |
| :--- | :--- |
| **Hosting URL (Frontend)** | [https://scholarship-management-s-8675e.web.app](https://scholarship-management-s-8675e.web.app) |
| **Server URL (Backend)** | [https://scholarship-management-system-serve-one.vercel.app](https://scholarship-management-system-serve-one.vercel.app) |

## ✨ Core Features

### 1. All Scholarships Page

* **Responsive Grid:** Displays all available scholarships on the platform.
* **Search Functionality:** Users can search for scholarships by Scholarship Name, University Name, or Degree.
* **Filter Functionality:** Options to filter scholarships by specific criteria (e.g., Scholarship Category, Subject Category, or Location).
* **Card Information:** Each card displays University Image, Name, Category, Location, Application Fees, and a "View Details" button.

### 2. Scholarship Details Page

* Displays comprehensive information: University Image, Scholarship Name, University World Rank, Deadline, Location, Application Fees, Description, and Stipend/Coverage details.
* **Reviews Section:** Shows all associated reviews (reviewer image, name, date, rating, and comment).
* **'Apply for Scholarship' Button:** Redirects the user to the Payment/Checkout page.

### 3. Role-Based Dashboard

A single `/dashboard` path with a conditional sidebar based on the user's role (Student, Moderator, Admin).

| Role | Key Features |
| :--- | :--- |
| **Admin** | `My Profile`, `Add Scholarship`, `Manage Scholarships` (Update/Delete), `Manage Users` (Role Change/Delete), `Analytics` (Total Users, Fees, Charts). |
| **Moderator** | `My Profile`, `Manage Applied Applications` (Details, Feedback, Status Update, Cancel), `All Reviews` (Delete). |
| **Student** | `My Profile`, `My Applications` (Details, Edit, Pay, Delete), `Add Review`, `My Reviews` (Edit, Delete). |

### 4. Payment System and Application Flow

* **Checkout Page:** Dedicated page for payment upon clicking 'Apply'.
* **Stripe Integration:** Secure implementation for handling payments.
* **Application Saving:** On **successful** payment, the application is saved with `paymentStatus: "paid"`. On **failure**, it's saved with `paymentStatus: "unpaid"`, allowing the student to retry payment from the dashboard.
* **Payment Status Pages:** Separate success and failure pages with relevant details and navigation options.

### 5. Additional Features

* **Loading States:** Implemented loading spinners/skeletons on all data-fetching pages for better UX.
* **Custom Error Page:** A custom 404 Error page for invalid routes.

## 🛠️ Technologies Used

* **Frontend:** (Add your specific frontend framework here, e.g., React, Next.js)
* **Backend:** (Add your specific backend technology here, e.g., Node.js, Express.js)
* **Database:** (Add your database, e.g., MongoDB, Firebase Firestore)
* **Payment Gateway:** Stripe
* **Hosting:** Firebase Hosting (Frontend), Vercel/Others (Backend)

## ⚙️ Installation Guide

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <Your-Project-Repository-URL>
cd <project-directory>
```
### 2. Frontend Setup

```bash
# Navigate to the frontend folder
cd client (or your frontend folder name)
npm install
npm run dev (or your specific start script)
```
### 3. Backend Setup
```bash
# Navigate to the backend folder
cd server (or your backend folder name)
npm install
npm start (or your specific start script)
```
### 4. Environment Variables (.env)
```bash
# Example: .env file
DATABASE_URL=...
STRIPE_SECRET_KEY=...
```
