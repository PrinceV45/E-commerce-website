# TrendBazaar

**TrendBazaar** is a full-featured e-commerce platform built with the MERN stack. It allows users to browse products, add items to their cart, and make purchases securely. Admins can manage products, orders, and users.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Running the Project](#running-the-project)
* [License](#license)

## Features

* User Authentication (Login/Register)
* Product browsing and filtering
* Shopping cart with dynamic pricing
* Payment processing via PayPal
* Admin panel for managing products, orders, and users
* File uploads via Cloudinary
* E-Mail sending via Mailgun

## Tech Stack

* **Frontend**: React, Redux, React-Bootstrap, Axios
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JSON Web Tokens (JWT)
* **Payments**: PayPal API
* **File Uploads**: Cloudinary
* **E-Mail Sending**: Mailgun

## Getting Started

To get started with the project locally, follow these steps:

### Prerequisites

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ChintanVekariya9189/Trend-Bazaar.git
    cd Trend-Bazaar
    ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

## Environment Variables

### Create a .env file in the server directory with the following environment variables:
  ```env
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    PAYPAL_CLIENT_ID=<your_paypal_client_id>
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_secret>
    MAILGUN_DOMAIN=<your_mailgun_domain>
    MAILGUN_API_KEY=<your_mailgun_api_key>
  ```
    
## Running the Project

### Backend

To start the Node.js server:

  ```bash
    cd server
    npm start
  ```
    
This will start the backend server on http://localhost:9189.

### Frontend

To start the React development server:

  ```bash
    cd client
    npm start
   ```
    
This will start the frontend on http://localhost:9189.

Both the frontend and backend should be running concurrently.

### License
This project is licensed under the MIT License. See the LICENSE file for more details.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## Authors

* **Chintan R. Vekariya**

## Version History

* v1.0: Initial release

## Contact

If you have any questions or need help with the project, please don't hesitate to reach out to me.





