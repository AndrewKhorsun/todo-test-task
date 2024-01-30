### Demo link [https://andrewkhorsun.github.io/todo-test-task/]


# todo-test-task

This repository contains a project named "todo-test-task" developed using modern web technologies. Below, you will find instructions on how to set up and run the project locally.

## Prerequisites
Make sure you have the following tools installed on your machine before proceeding:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) (version 7 or later)

## Installation
1. Clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    cd todo-test-task
    ```

2. Install project dependencies using npm:

    ```bash
    npm install
    ```

## Scripts

### `npm start`
- Concurrently runs the development server and the JSON server.

### `npm run dev`
- Starts the Vite development server.

### `npm run build`
- Transpiles TypeScript code and builds the project using Vite.

### `npm run lint`
- Lints the TypeScript and TypeScript React files using ESLint.

### `npm run preview`
- Builds and previews the project using Vite.

### `npm run server`
- Starts the JSON server, serving the data from `server/db.json` on port 5000.

## Project Structure

- **src:** Contains the source code for the React application.
- **server/db.json:** JSON file used as a mock database for the JSON server.

## Running the Project

To run the project, use the following command:

```bash
npm start
