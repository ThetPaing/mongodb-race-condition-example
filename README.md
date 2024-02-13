# MongoDB Race Condition Example

This repository serves as a demonstration of a race condition scenario in a web application built with Express.js and MongoDB. The example includes an Express application generated with the Express generator, featuring an endpoint that increments a counter using MongoDB transactions.

## Overview

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [How to Use](#how-to-use)
- [Usage](#usage)
- [License](#license)


### Technology Stack
  - Node.js
  - Express.js  ( [Express Generator](https://www.npmjs.com/package/express-generator) )
  - MongoDB
  - Mongoose
  - Docker

### Key Features
  - Web application demonstrating a race condition scenario.
  - Utilizes Mongoose for MongoDB interactions.
  - Tests the behavior of incrementing a count within MongoDB transactions.

### How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/ThetPaing/mongodb-race-condition-example.git
2. Run the application.

    ```bash
    cd mongodb-race-condition-example
    docker compose up
3. Open your web browser and visit http://localhost:5500 to see the application in action.

4. To test MongoDB transactions, you can visit the following endpoint:
    - [http://localhost:5500/transaction](http://localhost:5500/transaction)


### Usage

Feel free to explore, modify, and learn from this POC. If you encounter issues or have suggestions, please open an issue.

Note: This repository is for educational and testing purposes only. Be cautious when dealing with race conditions in production scenarios.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.