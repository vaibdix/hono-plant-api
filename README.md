# Plants API

A simple API for managing plant data.

## Features
- Add, update, and delete plant records.
- Retrieve plant details.
- Lightweight and easy to set up.

## Requirements
- [Docker](https://www.docker.com/) installed on your system.

## Setup and Usage

### 1. Build the Docker Image
To build the Docker image, run the following command in the project directory:

```bash
docker build -t plants-api .
```

### 2. Run the Docker Container
Start the container by running:

```bash
docker run -d -p 3000:3000 --env-file .env plants-api
```

### 3. Access the Application
The application will be available at [http://localhost:3000](http://localhost:3000).
Swagger docs available at [http://localhost:3000/swagger](http://localhost:3000/swagger)

## Environment Variables
Create a `.env` file in the project directory to configure environment variables for the application. Example:

```env
MONGODB_URI=your_database_url
PORT=
NODE_ENV=
```

## Stopping the Container
To stop the running container, find the container ID using:

```bash
docker ps
```

Then stop it with:

```bash
docker stop <container_id>
```