# Mini Project Backend Server Development
This repository contains documentation for this Mini Project

### Contents
 * Overview
 * Scenario
 * Authentication
 * Resources
 * Architecture Diagram
 * Entity Relationship Diagram

## 1. Overview
This is an E-commerce Project using Nodejs, API, MySQL Database and JSON Web Token (JWT) to generate token.

## 2. Scenario
A merchant service that handles the catalog of products owned by merchants. The merchant is user.

## 3. Authentication
Authentication using Basic Auth (Email and Password). Every merchant can register and need to login to get an access token. An access token grants limited access to a merchant's account.

## 4. Resources
The API is arranged around resources. All request must be made with an integration token. 

## 5. Architecture Diagram
![arc diagram](https://user-images.githubusercontent.com/91186902/174457400-d20f54ac-4979-4bc4-a2e2-49f6bdf8d8e3.png)

## 6. Entity Relationship Diagram
![erd](https://user-images.githubusercontent.com/91186902/174456781-b604897e-15b2-4c3a-b1f0-5c0d0515f240.png)
