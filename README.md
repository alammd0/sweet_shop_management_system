# Sweet Shop Management System

This is a full-stack web application for managing a sweet shop. It provides features for user authentication, inventory management, and a sweet catalog for customers. The project is built with a modern tech stack, including React for the frontend and Node.js with Express and Prisma for the backend.

## Features

*   **User Authentication:** Users can register and log in to the application. There are two roles: `user` and `admin`.
*   **Sweet Catalog:** All users can view the list of available sweets.
*   **Inventory Management (Admin):** Admins can add, update, and delete sweets from the inventory.
*   **Purchase and Restock:** Users can purchase sweets, and admins can restock them.
*   **Search and Filter:** Users can search for specific sweets.

## Technologies Used

### Backend

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web framework for Node.js.
*   **TypeScript:** Superset of JavaScript that adds static typing.
*   **Prisma:** Next-generation ORM for Node.js and TypeScript.
*   **PostgreSQL:** Open-source relational database.
*   **JSON Web Tokens (JWT):** For secure authentication.

### Frontend

*   **React:** JavaScript library for building user interfaces.
*   **Vite:** Next-generation frontend tooling.
*   **TypeScript:** For type-safe code.
*   **Redux Toolkit:** For state management.
*   **React Router:** For client-side routing.
*   **Axios:** For making HTTP requests.
*   **Material-UI & Tailwind CSS:** For styling and UI components.

### Testing

*   **Jest:** JavaScript testing framework.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm
*   PostgreSQL

### Backend Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/sweet_shop_management_system.git
    cd sweet_shop_management_system/backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your actual database connection string and JWT secret.

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="your_jwt_secret"
    ```

4.  **Apply database migrations:**
    ```sh
    npx prisma migrate dev
    ```

5.  **Seed the database (optional):**
    You can seed the database with some initial data using the seed script.
    ```sh
    npm run seed
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

## Running the application

1.  **Start the backend server:**
    From the `backend` directory, run:
    ```sh
    npm run dev
    ```
    The backend server will start on `http://localhost:5000` (or the port you configure).

2.  **Start the frontend development server:**
    From the `frontend` directory, run:
    ```sh
    npm run dev
    ```
    The frontend application will be available at `http://localhost:3000` (or the port Vite chooses).

## Testing

The project includes a test suite for the backend. To run the tests, navigate to the `testing` directory and run the following command:

```sh
cd ../testing
npm install
npm test
```

This will run the Jest test suite and generate a coverage report.

## API Endpoints

### Auth

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in a user.

### Sweets

*   `POST /api/sweets`: Create a new sweet (admin only).
*   `PUT /api/sweets/:id`: Update a sweet (admin only).
*   `GET /api/sweets/:sweetId`: Get a sweet by its ID.
*   `GET /api/sweets`: View all available sweets.
*   `GET /api/sweets/:search`: Filter sweets.
*   `DELETE /api/sweets/:id`: Delete a sweet (admin only).
*   `POST /api/sweets/:id/purchase`: Purchase a sweet.
*   `PUT /api/sweets/:id/restock`: Restock a sweet (admin only).

## 🧪 Testing Approach (TDD)

This project strictly follows **test-first development**:

1. Write failing tests (RED)
2. Implement functionality (GREEN)
3. Refactor safely

Git commit history clearly reflects this RED → GREEN workflow.

## ✅ Test Coverage Summary

- **Unit Tests**: Controllers, middleware, utilities
- **Integration Tests**: End-to-end API flows
- **Coverage Target**: >70% core business logic
- **Actual Coverage**: Meets or exceeds target


## Screenshots

**PROJECT STRUCTURE**
![PROJECT STRUCTURE](/ScreenShot//image.png)

**TESTING REPORT**
![TESTING REPORT](/ScreenShot/Screenshot%202025-12-13%20172109.png)

**Home Page**
![HOME PAGE](/ScreenShot/Screenshot%202025-12-14%20153036.png)

**Login Page**
![Login Page](/ScreenShot/Screenshot%202025-12-14%20153047.png)
![REGISTER PAGE](/ScreenShot//Screenshot%202025-12-14%20153106.png)
![CART PAGE](/ScreenShot/Screenshot%202025-12-14%20153523.png)

**Admin Dashboard**
![Admin Create Sweets Pages](/ScreenShot/Screenshot%202025-12-14%20153153.png)
![ADMIN HOME PAGE SEE (UPDATE, DELETE ICONS)](/ScreenShot/Screenshot%202025-12-14%20153445.png)

## My AI Usage

## 🤖 AI Use Disclosure

AI tools were used **responsibly** during the development of this project to
improve productivity and learning, while all architectural decisions,
implementation, and testing were performed and verified by the developer.

### How AI Was Used
- Clarifying backend architecture and API design concepts
- Understanding Prisma error messages and database constraints
- Drafting initial test case structures for Jest and Supertest
- Improving documentation quality (README and Test Report formatting)

### How AI Was NOT Used
- No code was copied blindly into the project
- No business logic or tests were generated without review and understanding
- No automated tools were used to bypass assignment requirements
- All final code, tests, and design decisions were written, reviewed, and validated manually

### Developer Responsibility
The developer fully understands, owns, and can explain every part of the codebase,
including authentication, inventory transactions, and test coverage.

AI was used as a **supporting assistant**, not as a replacement for engineering judgment.
