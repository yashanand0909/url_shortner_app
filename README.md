# Overview

This Node.js project is a simple URL shortener application with user authentication and tier-based access control. It allows users to register, log in, shorten URLs, and view their URL history. The application uses Express for the backend, MongoDB for data storage, Redis for caching, and JWT for user authentication.

## Installation
Follow these steps to set up and run the URL shortener on your local machine.

### Prerequisites
Make sure you have the following installed on your machine:

Node.js
MongoDB
Redis

### Clone the repository:
git clone <repository-url>

### Navigate to the project directory:
cd url-shortener

### Install dependencies:
npm install

### Now Start the service:
npm run start


## Service usage

### Below end points are supported:
/login/register

/login/userlogin

/:shortid

/url/short

/url/history


