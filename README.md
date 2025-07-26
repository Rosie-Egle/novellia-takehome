# novellia-takehome

## Demo

[Walk through of the feature set on Loom](https://www.loom.com/share/2dbdf76d3170415589107e181c8f2f35?sid=b51f68c0-75e0-4d4c-9c42-d8767a12d8ad)

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

### Database:

- Postgres - this is the DB I am most comfortable with
- Drizzle ORM - I used Prisma at my last job and so wanted to take this opportunity to try something different. I liked being able to write the schema in typescript and how types are inferred from the schema, but I can't say that I like it more than Prisma

### API/UI:

- Next.js - I haven't used Next.js in a professional setting but I've heard a lot about it and so wanted to try it out here. Since it can handle both server and client side, it seemed like a good tool to use for this mono-repo app
- Vite + React - Vite is quick, quick, quick and I love the HMR that is built-in

## Technical Decisions

### How I Modeled the Data

I designed three relational tables — `pets`, `allergy`, and `vaccine` — with clear one-to-many relationships and enums for consistent domain values.

### 1. `pets` table

**Purpose**: Acts as the core entity representing each pet.

- `id`: UUID primary key ensures global uniqueness.
- `name`, `animalType`, `ownerName`: Identity fields.
- `dob`: Stored as `date` (not datetime) for accurate birthday calculations.
- `createdAt`, `updatedAt`: Lifecycle tracking for auditing.
  **Enums**:
- `animal_type` enum enforces consistent species values (e.g. DOG, CAT, etc.).

### 2. `allergy` table

**Relation**: One-to-many from `pets` → `allergy`.

- `name`: Allergy name.
- `severity`: Uses an enum (`MILD`, `SEVERE`) for constrained values.
- `reactions`: Array of enums (e.g. `HIVES`, `RASH`) to represent multiple symptoms per allergy.
- `petId`: Foreign key to `pets.id`.
- `createdAt`, `updatedAt`: Lifecycle tracking for auditing.
  **Foreign Key Constraints**:
- `petId` references `pets.id` with `onDelete: cascade` — deleting a pet removes its allergies automatically.

### 3. `vaccine` table

**Relation**: One-to-many from `pets` → `vaccine`.

- `name`: Vaccine name (e.g. Rabies). I debated making this an enum, but since there are new vaccines coming out all the time, that means that there would need to a mechanism for adding the newest vaccines, so having this be a string as an MVP seemed sufficient for now
- `dateReceived`: Stored as `date`, because you don't need to know the specific time a vaccine was given.
- `petId`: Foreign key to `pets.id`.
- `createdAt`, `updatedAt`: Lifecycle tracking for auditing.
  **Foreign Key Constraints**:
- `petId` references `pets.id` with `onDelete: cascade`.

### Why I Modeled It This Way

1. **Relational Integrity** - Foreign keys ensure pets are correctly linked to their vaccines and allergies. Cascading deletes clean up related rows automatically.
2. **Scalability** - One-to-many modeling avoids duplication and scales cleanly.
3. **Enums for Domain Safety** - Enums prevent invalid inputs at both DB and frontend level (e.g. typos in severity like "sevre").
4. **Type Safety with Drizzle ORM** - Drizzle’s schema definitions provide full TypeScript types, ideally reducing bugs.

##

### How I Structured My API

The API structure follows RESTful principles, organizing endpoints around core resources (`pets`, `vaccines`, and `allergies`) and their relationships.

These are core resource endpoints:

- `api/pets/route.ts`  
  Handles collection-wide operations (e.g. `GET` all pets, `POST` a new pet)
- `api/vaccines/route.ts`  
  Handles `POST` for new vaccines
- `api/allergies/route.ts`  
  Handles `POST` for new allergies

These handle resources that belong to a specific pet:

- `api/pets/[id]/route.ts`  
  Interacts with a single pet (e.g. `GET`,)
- `api/pets/[id]/vaccines/route.ts`  
  GET for a specific pet’s vaccines
- `api/pets/[id]/allergies/route.ts`  
  GET for a specific pet’s allergies

### Why I Structured It This Way

- **Clarity & Maintainability** - Each domain resource is clearly scoped in its own file and folder. This promotes modular code and easy onboarding.
- **Semantic URLs** - The route paths clearly describe their purpose, making it easier to find what you're looking for.
- **Data Model Alignment** - Routes reflect the underlying one-to-many relationships (e.g. each pet can have many vaccines/allergies).
- **Scalability** - Easy to add new nested routes or query params without disrupting the folder structure.

##

### Page Structure: How and Why I Decided on the Pages I Built

The structure of the `pages` and components in this application is centered around the core domain: **managing pets, their vaccines, and allergies**. I focused on creating clear, RESTful, and user-friendly paths for CRUD operations while following Next.js App Router conventions.

### `/pets`

This is the main listing page for all pets. This acts as the central dashboard of the app. Users should be able to browse pets easily and select one to view or manage their medical history.

### `/pets/new`

Contains a form to create a new pet. Follows a common pattern (`/resource/new`) and separates creation logic into its own route for clarity

### `/pets/[id]`

Dynamic route for viewing an individual pet and its related data. Offers a scoped view of a single pet with easy access to create their:

- Vaccines (`/pets/[id]/vaccine/new`)
- Allergies (`/pets/[id]/allergy/new`)
  This ideally makes the app more intuitive and aligns with real-world workflows.

### `/pets/[id]/vaccine/new`

Giving them a nested route under the pet ensures context stays clear (you always know _which_ pet you're updating).

### `/pets/[id]/allergy/new`

Like vaccines, nesting this form mirrors how users would logically think of managing a specific pet's data.

### Reuseable Components (in `/pets/components`)

Includes `PetCard`, `LabelValue`, `AllergiesSection`, and `VaccineSection`

- These are modular and reusable visual components that build up the main views.
- They help maintain separation of concerns and keep pages clean and composable.

### Query Hooks (in `/hooks`)

- `useGetAllPets`, `useGetPetById`, `useGetVaccinesByPetId`, etc.
- Query logic is separated to ensure reusability and composability across components and pages, and since React Query has built in caching it can prevent unecessary refetching across pages

Focuses of the routing and page structure:

- **Scalability**: Easy to add/edit new entities (e.g., procedures, medications).
- **Clarity**: RESTful, predictable routes like `/pets/[id]/vaccine/new`.
- **Modularity**: Hooks, forms, and components are broken out for maintainability.
- **User Experience**: Grouping related forms under each pet helps users stay oriented.

##

### Improvements I would make if building this for real

**Overall**

- Add unit and integration tests for all happy path flows and all edge cases we are handling

**Database**

- Add a `users` table that would be a one to many with `pets` so that we could query for a specific user's pets with more certainty than by the Owner Name field

**API**

- Add pagination to the `api/pets/route.ts GET ALL` endpoint, so that we aren't fetching thousands of objects at a time on the admin dashboard
- Add request validation with something like zod, to make sure we aren't posting malformed/suspcious data to the DB
- Add authorization checks to endpoints, i.e. only allow admins to fetch admin level data, only allow users to edit their own pet records, etc.

**UI**

- The styles are very slapdash atm, in order to make it a production level app they would need to be drastically improved
- Add navigation
- Add error handling in the forms, right now if the API fails the user won't know
- Add loading states when fetching/posting data so the user knows something is happening
- Add authorization checks to certain pages, i.e. only allow admins to view admin pages

##

### AI Used

- **ChatGPT** - I never ask it to write business logic for me or to create full components/functions, it typically needs more context to do that well and even then it add extraneous things that I then have to clean up. I typically use ChatGPT to help me debug unfamiliar errors, to check if something is technically possible(although sometimes it says it can't be done when it can) or to give me a basic example of some syntax/code that I am unfamiliar with.
- **Cursor** I started using Cursor in the last month and would say that it's `TAB` functionality is stronger than that of Github Copilot. For this project I mainly used it for boilerplate, i.e. setting up a arrow function/component/basic types and then I would fill in the substance/business logic.
