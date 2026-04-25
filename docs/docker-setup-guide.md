# Docker Setup Guide for UTeM Ride

This guide will walk you through setting up Docker for our project. We will use Docker to easily run our PostgreSQL database (with the PostGIS extension for geospatial features) without having to manually install and configure database servers on your computer.

## 1. What is Docker?

Imagine trying to install a complex software like PostgreSQL. You'd have to download the right version for Windows, run an installer, set up users and passwords, and make sure it doesn't conflict with anything else on your computer. When you share the project with a teammate, they have to do the exact same thing, and sometimes their setup might differ slightly, causing errors ("It works on my machine!").

**Docker solves this.** 

Docker packages software into standardized units called **Containers**. A container has everything the software needs to run (code, runtime, system tools, libraries) bundled together. This guarantees that it will always run the exact same way, regardless of the environment it is running in.

We will use Docker to spin up a PostgreSQL database in seconds, identically configured for anyone working on this project.

## 2. Installing Docker Desktop

Because you are on Windows, you need to install **Docker Desktop**.

1. Go to the official Docker website: [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Download the Windows version installer.
3. Run the installer. Ensure that the option to "Use WSL 2 instead of Hyper-V" is checked (WSL 2 handles Windows Subsystem for Linux, which makes Docker much faster on Windows).
4. Restart your computer if prompted.
5. Open the "Docker Desktop" application. It might take a minute to start the Docker Engine for the first time.
6. To verify it installed correctly, open a terminal (PowerShell or Command Prompt) and type:
   ```bash
   docker --version
   ```
   You should see the version number printed out.

## 3. Using Docker Compose

While you *can* start a container with a long command like `docker run -d -p 5432:5432 --name my-db -e POSTGRES_PASSWORD=secret postgres`, it gets tedious to type that out every time, and you might forget the exact flags.

Instead, we use a tool called **Docker Compose**. It allows us to define our containers, their settings, passwords, and ports in a simple `docker-compose.yml` file. 

I have created a `docker-compose.yml` file for you inside the `backend/` directory.

### Understanding our `docker-compose.yml`

Take a look at `backend/docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgis/postgis:15-3.3
    container_name: utemride_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres_password
      POSTGRES_DB: utemride
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Here's what this means:
- **image**: We are using the official `postgis/postgis` image (version 15) which is PostgreSQL with the spatial database extender added in.
- **environment**: We set the default username (`postgres`), password (`postgres_password`), and the database name (`utemride`).
- **ports**: We map port `5432` inside the container to port `5432` on your actual computer. This lets Prisma connect to `localhost:5432`.
- **volumes**: Databases need to save data permanently. By default, when a container stops or is deleted, everything inside is lost. We create a volume `postgres_data` so your data survives even if the container is stopped or removed.

## 4. Starting the Database

Once Docker Desktop is running in the background, open your terminal and navigate to the backend folder:

```bash
cd backend
```

Then, tell Docker Compose to start the services defined in the file in "detached" mode (so it runs in the background):

```bash
docker-compose up -d
```

Docker will now download the PostgreSQL image from the internet (this might take a minute the first time) and start the container.

To see if it's running, you can use:

```bash
docker ps
```
You should see `utemride_postgres` listed.

## 5. Connecting Prisma to the Database

Now that the database is running on your computer at port `5432`, we need to tell Prisma how to connect to it.

Open `backend/.env` and update the `DATABASE_URL` to match the credentials defined in our config. **I have already updated this for you:**

```env
DATABASE_URL="postgresql://postgres:postgres_password@localhost:5432/utemride?schema=public"
```

## 6. Creating the Tables (Migrations)

Now, send our schema to the database to create all the tables (Users, Drivers, Rides):

```bash
npx prisma migrate dev --name init
```

## 7. Stopping the Database

When you are done working for the day and want to free up computer resources, you can stop the container. Inside the `backend/` folder, run:

```bash
docker-compose down
```

Next time you want to work, just run `docker-compose up -d` again. All your data will still be there because of the volume we set up!
