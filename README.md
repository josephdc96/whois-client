# WHOIS Lookup Client
## Introduction
This React application interfaces with the [WHOIS Lookup Server](https://github.com/josephdc96/whois-server) and presents the WHOIS information of a domain or IP address in a formatted style.
## How to Build
### Prerequesites
* Node.JS v. 14 or higher  
OR
* Docker
* Docker Compose
  
You must also create a .env file in the root of this project with the address and port of your Lookup Server.
See `example.env`.
### Docker
If you have Docker installed simply run `docker-compose up -d --build`.  
You can then access the webpage on `http://localhost:80`.
### Node
If you don't have Docker or would prefer to run the server directly, run `npm install` followed by `npm start`.  
You can then access the API on `http://localhost:3000`.