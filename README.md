# AtelierBackend
Rebuilding the back end of an eCommerce site using a new stack (GraphQl, PostgreSQL)


# About this API
This API exists to create a smooth browsing experience through easy, fast access to millions of records for the product catalogue displayed on a commercial retail site.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Endpoints](#end-points)
- [Peformance](#performance)

## Tech Stack
![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/-Express-DCDCDC?logo=express&logoColor=black&style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

## End Points
* Get Products (TBD)
  * (Description of endpoint, something like this) Given a product ID and optional page count information, this endpoint will return a list of questions and the associated answers for the product.

## Performance
To allow for 1000 RPS, this API was deployed over five different instances: a database instance, a load balancer instance, and three server handling instances. Below are key metric improvements compared to running the endpoints on a single instance. All utilize a throughput of 1000 RPS for 60 seconds.
* (something like this tbd)Get Questions
  * 63% to 0% Error Rate
  * 4655 ms to 1 ms Latency
