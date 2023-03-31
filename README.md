# Peptipedia 2.0

## Usage

Download requisites files and database from https://drive.google.com/file/d/1x3yHNl8k5teHlBI2FMgl966o51s0T8i_/view?usp=sharing.

Then, unzip recursively the backup in ./bd folder (Remember to store .zip files).

Create two .env files (first one in ./bd, second in ./backend) and store a password in DB_PASS.

```
DB_PASS = example_password
```

Create a final .env.local file in ./frontend.

```
VITE_BACKEND_URL = http://localhost:8001
```

If you will use another server to store the backend, write the IP inplace. 

Then you can serve the database with docker compose from ./bd folder:

```
docker-compose up --build
```

When the psql server is accepting connections, in root folder:

```
docker-compose up --build
```
