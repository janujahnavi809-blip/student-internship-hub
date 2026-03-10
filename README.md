# Student Internship Application Portal

A simple internship application system built using React that allows students to apply for internships and check the status of their applications.

## Project Overview

The Student Internship Application Portal is a web application where students can

* View the homepage with project introduction
* Apply for internships using a form
* Check the status of submitted applications

The application communicates with backend APIs using GET and POST requests.

## Folder Structure

```
student-internship-app
│
├── src
│   ├── components
│   │     Navbar.js
│   │
│   ├── pages
│   │     Home.js
│   │     ApplyInternship.js
│   │     ApplicationStatus.js
│   │
│   ├── services
│   │     api.js
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
└── README.md
```

## Features

* Navigation using React Router
* Internship application form
* GET API to fetch applications
* POST API to submit applications
* Status display such as Approved, Pending and Rejected
* Simple responsive user interface

## Tech Stack

Frontend Technologies

* React
* React Router
* Axios
* CSS

## Installation

Clone the repository

```
git clone https://github.com/your-username/student-internship-app.git
```

Navigate to project folder

```
cd student-internship-app
```

Install dependencies

```
npm install
```

Install required libraries

```
npm install react-router-dom axios
```

## Running the Application

Start the React development server

```
npm start
```

Open the browser and go to

```
http://localhost:3000
```

## API Integration

POST API – Submit Internship Application

Endpoint

```
POST /apply
```

Example request body

```
{
"name": "John Doe",
"email": "john@example.com",
"course": "Computer Science"
}
```

GET API – Fetch Applications

Endpoint

```
GET /applications
```

Example response

```
[
{
"name": "John Doe",
"email": "john@example.com",
"status": "Pending"
}
]
```

## Styling

Basic styling is implemented using CSS in App.css.

Application status colors

* Approved
* Pending
* Rejected

## Future Improvements

* Admin dashboard to update application status
* Authentication system for students
* Database integration
* Improved UI design

## Author

Developed as a React project for internship application management.

## License

This project is open source and available for learning and educational purposes.
