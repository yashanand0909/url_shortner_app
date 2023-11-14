# Overview

This Node.js project is a simple URL shortener application with user authentication and tier-based access control. It allows users to register, log in, shorten URLs, and view their URL history. The application uses Express for the backend, MongoDB for data storage, Redis for caching, and JWT for user authentication.

## Approach
Given that the application does not demand high computational resources, I opted for Node.js as my primary choice for developing the application.

I anticipate a significant integration with the database, with limited reliance on joins, and prioritize scalability over strict adherence to ACID properties. MongoDB is my preferred database due to its non-relational nature, and I believe it will facilitate easier scaling as traffic grows. Additionally, we can expect faster search query performance through proper indexing on relevant keys.

Since there will be lot of redirection requests on the same short URL I decided to use redis for caching this data which will reduce load on our primary database and  will also reduce the latency significantly.

Considering the frequent redirection requests for the same short URL, I've chosen to employ Redis for caching this data. This strategy aims to alleviate the burden on our primary database, leading to a substantial reduction in latency.

In my present implementation, I utilize MD5 hash to generate short URLs for users. However, I acknowledge that this approach may result in collisions, particularly in the case of concurrent calls. To address this concern, I propose incorporating ZooKeeper to manage a counter for each request. This counter mechanism ensures uniqueness and helps mitigate collision issues, providing a more robust solution.

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

### Environment Variable
Add mongoDB URI in .env file before running the code

### Local setup
You need to start redis locally before running the code

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


