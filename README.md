# YeetCode

A clone of a certain popular code-challenge website. Implements a front-end with [SvelteKit](https://github.com/sveltejs/kit), back-end in [Nest](https://github.com/nestjs/nest), and code-judging provided by [Judge0](https://github.com/judge0/judge0). Uses [PostgreSQL](https://www.postgresql.org/) as the database, with [Prisma](https://www.prisma.io/) as the ORM.

## Features

- User authentication
- Code editor with syntax highlighting (through Monaco)
- Code execution in multiple languages (Python, JavaScript, C++, Java)

This is a work-in-progress, and many features are still missing.

The folder `backend/problems` contains a list of problems, and will be the defaults in the database.

The folder `backend/judge_files` contains the dependencies for the code runner for Judge0.

## Development

The project runs through Docker. To start the development environment, run:

```bash
docker compose -f docker-compose-dev.yml up --build -d
```

## Optimized build

To run the project using an optimized build, run:

```bash
docker compose -f docker-compose-prod.yml up --build -d
```