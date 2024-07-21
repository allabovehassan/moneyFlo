# Invoice Generator Application

## Overview

The Invoice Generator is a web application built with Node.js, Express.js, and MongoDB. This application allows users to create, view, and download invoices in PDF format. It also supports the generation of invoice images. The application features user authentication, product management, and invoice creation functionalities.

## Features

- User registration and login
- Add and manage products
- Generate invoices in PDF and image formats 
- View and download generated invoices
- Docker containerization for deployment

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **PDF Generation:** Puppeteer
- **Validation:** Joi
- **Authentication:** JWT
- **Security:** Rate Limiter, Bcrypt, Dotenv
- **Deployment:** Docker

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v20)

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/allabovehassan/moneyFlo.git
cd moneyflo
```
### 2. Install Packages
```
npm install
```
### 3. Configure Env and Run
```
npm start
```

# 1. APIs 

## 1. Signup 
 **POST**
 ```
 http://localhost:7070/api/user/signup

{
    "email":"harry@gmail.com",
    "name":"harrry",
    "password":"harry"
}

```

 ## 2. Login 
 **POST**
 ```
 http://localhost:7070/api/user/login

{
    "email":"harry@gmail.com",
    "password":"harry"
}

```
 ## 3. Create/Add Products and generate PDFs and Images 
 **POST**
 ### Description:- It requires token and needs to be passed from headers
 ```
 http://localhost:7070/api/product

[
{
  "name":"Fridge",
  "qty":5,
  "rate":786
},
{
  "name":"Television",
  "qty":12,
  "rate":5000
},
{
  "name":"Hair Dryer",
  "qty":20,
  "rate":1450
}
]

```

 ## 4. View Quotations
 **GET**
 ### Description:- It requires token and needs to be passed from headers
 ```
http://localhost:7070/api/invoice/view-quotations

```
## Sample Pdf Output

