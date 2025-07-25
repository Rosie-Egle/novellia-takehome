# novellia-takehome

## Loom

Video recording of a walk through of the feature set

## Launching the Project

To launch this project, you need to install:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/), to launch the Postgres database
- Node 20 (you can install it through [nvm](https://github.com/nvm-sh/nvm))

Once these dependencies are installed, you can set up and launch the projects:

```sh
# install dependencies, load the database fixtures
make init

# launch the project
make start

```

## Technologies Used

- Database:
  - Postgres, this is the DB I am most comfortable with
  - Drizzle ORM - I used Prisma at my last job and so wanted to take this opportunity to try something different. I liked being able to write the schema in typescript and how types are inferred from the schema, but I can't say that I like it more than Prisma
- API/UI:
  - Next.js - I haven't used Next.js in a professional setting but I've heard a lot about it and so wanted to try it out here. Since it can handle both server and client side, it seemed like a good tool to use for this mono-repo app
  - Vite + React - Vite is quick, quick, quick and I love the HMR that is built-in
