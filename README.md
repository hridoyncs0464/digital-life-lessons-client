# Utility Bill Management System

🎯 **Project Theme:**
The Utility Bill Management System is a **MERN Stack-based web application** that allows users to view, manage, and pay monthly utility bills such as **Electricity, Gas, Water, and Internet**. Users can securely log in, pay only the current month bills, and update their bill information. The system also features **responsive UI, search/display functionalities, and PDF report download** for users’ paid bill history.

---

## 🔗 Live Website

https://payutilitybill.web.app/

---

## 📌 Key Features

* **User Authentication:** Register, login, and Google social login for secure access.
* **Dynamic Bill Management:** View all bills, filter by category, and see detailed bill information.
* **Pay Bills:** Users can pay only the bills of the current month via a modal form.
* **My Paid Bills:** View all paid bills with options to update, delete, and download a PDF report.
* **Responsive UI:** Works seamlessly across desktop, tablet, and mobile devices.
* **Extra Features:** Loading spinners, toast notifications, dynamic titles, 404 page, and optional dark/light theme toggle.

---

## 🏗️ Layout Structure

* **Navbar:**

  * Before Login: Logo | Home | Bills | Login | Register
  * After Login: Logo | Home | Bills | My Pay Bills | Profile Avatar | Logout

* **Main Section:** Dynamic routing with React Router for different pages.

* **Footer:**

  * Logo / Site Name
  * Short Description
  * Copyright
  * Useful Links

---

## 🏠 Pages & Functionalities

### Home Page (Public)

* Banner section with an image slider/carousel.
* 4 category cards: Electricity, Gas, Water, Internet.
* Recent 6 bills displayed dynamically from MongoDB.
* Two additional meaningful sections for more information.

### Authentication

* **Login Page:** Email, Password, Forget Password, and Social Google login.
* **Registration Page:** Name, Email, Photo-URL, Password with validation (Uppercase, Lowercase, Minimum 6 characters).

### Bills Page (Public)

* Display all bills in a 3-column grid.
* Filter bills by category dynamically without page reload.
* “See Details” button navigates to bill details page.

### Bill Details Page (Private)

* Shows title, category, location, description, image, amount, date.
* **Pay Bill Button:** Enabled only for current month bills, opens a modal with pre-filled form.

### My Paid Bills Page (Private)

* Displays bills paid by the logged-in user in a table.
* Update and Delete functionalities with modals.
* Download PDF report of paid bills with **total amount** summary.

---

## ⚙️ Technologies Used

* **Frontend:** React.js, React Router, Tailwind CSS, DaisyUI, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Firebase (Email & Google login)
* **Extras:** jsPDF + jsPDF-AutoTable, Lottie React, React Awesome Reveal

---

## 📂 Database Structure (MongoDB)

### Bills Collection

```json
{
  "title": "Frequent Power Outage in Mirpur",
  "category": "Electricity",
  "email": "creator@gmail.com",
  "location": "Mirpur-10, Dhaka",
  "description": "Power cuts occur daily in the evening.",
  "image": "https://example.com/power.jpg",
  "date": "2025-10-26",
  "amount": 260
}
```

### MyBills Collection

```json
{
  "billsId": "abc123",
  "username": "Mr. X",
  "phone": "017XXXXXXX",
  "address": "Dhaka",
  "email": "mrx@gmail.com",
  "amount": 260,
  "date": "2025-10-26"
}
```

---

## 💻 GitHub Commits

* **Client Side:** 15+ notable commits
* **Server Side:** 8+ notable commits

---

## 📌 Notes

* No Lorem Ipsum text used anywhere.
* All CRUD actions use toast notifications or SweetAlert for better UX.
* Application hosted using **Netlify/Firebase (client)** and **Vercel (server)**.

---

## ⚡ Resources & Inspiration

* [UI & Components](https://uiverse.io/)
* [Free Images & Resources](https://devmeetsdevs.com/)
* [UX Design Inspiration](https://bootcamp.uxdesign.cc/free-images-and-resources-collection-for-website-c77f2fc46ce5)
* [ThemeForest Templates](https://themeforest.net/)
* [CodeCanyon Scripts](https://codecanyon.net/)

---

**Made with ❤️ by [Hridoy]**
