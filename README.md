# Bank Recommendation Services Project

This project consists of a microservice architecture with two backend services and one frontend service. It allows users to view service distribution and access recommendations.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup and Run](#setup-and-run)
   - [Backend Services](#backend-services)
   - [Frontend Service](#frontend-service)
3. [Accessing the Application](#accessing-the-application)
   - [Login](#login)
   - [Dashboard](#dashboard)
   - [Recommendation Service](#recommendation-service)
4. [Notes](#notes)

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose
- Node.js (for Angular CLI)

## Setup and Run

### Backend Services

1. Clone the repository:

   ```bash
   git clone https://github.com/Oussamaajlani/Banking-System
   cd your-repository

2. Run it on Docker:

   ```bash
   docker-compose up --build
   
### Frontend Services
   
1. Open a new terminal, navigate to the frontend directory, and start the Angular development server:

    ```bash
   ng serve
The frontend service will be available at http://localhost:4200 (or the port specified in your Angular configuration).

### Accessing the Application

### Login

Use the following credentials to log in:

Username: isam

Password: pass123456

### Dashboard
After logging in, you will be redirected to the dashboard. The dashboard displays:

A graph showing the distribution of services.
A list of users.
### Recommendation Service
You can use the recommendation service by pressing the "Recommendation" button on the dashboard.

### Notes
Ensure Docker and Docker Compose are installed and running on your machine.
If you encounter issues, check the Docker logs for errors and ensure all services are properly configured.
