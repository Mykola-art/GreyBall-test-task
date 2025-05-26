# MMA Platform API

A GraphQL API for managing MMA fighters, events, fights, and rankings, built with NestJS, TypeORM, and PostgreSQL.

## Endpoints

- **GraphQL Playground**: http://localhost:5000/graphql\
  Interactive interface to explore and test queries/mutations. Check the "Docs" tab for schema details.\
  *Example Query*:

  ```graphql
  query {
    fighters {
      id firstName lastName weightClass wins losses draws
    }
  }
  ```

- **GraphQL Voyager**: http://localhost:5000/voyager\
  Visual schema representation showing type relationships.

## Setup

1. **Prerequisites**: Node.js (v16+), PostgreSQL (v13+), Docker (optional), npm.
2. **Clone & Install**:

   ```bash
   git clone <repository-url>
   cd mma-platform
   npm install
   ```
3. **Environment Variables**: Create `.env`:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5433
   DB_USERNAME=postgres
   DB_PASSWORD=secret
   DB_NAME=mma_platform
   ```
4. **Run PostgreSQL (Optional)**: Use Docker:

   ```bash
   docker-compose up -d
   ```
5. **Start API**:

   ```bash
   npm run start
   ```

## Schema Overview

- **Types**: `Fighter`, `Event`, `Fight`, `Ranking`.
- **Queries**: `fighters`, `fighter(id)`, `fightersByWeightClass`, `events`, `event(id)`, `upcomingEvents`, `fights`, `fight(id)`, `fightsByEvent`, `rankings`, `ranking(id)`, `rankingsByWeightClass`.
- **Mutations**: `createFighter`, `updateFighter`, `removeFighter`, `createEvent`, `updateEvent`, `removeEvent`, `createFight`, `updateFight`, `removeFight`, `createRanking`, `updateRanking`, `removeRanking`.

Explore details in GraphQL Playground ("Docs" tab).

## Ranking Algorithm

- **Weight Class**: Derived from `fighter.weightClass`.
- **Points**:
    - Decision wins: 3 points.
    - KO/Submissions: 4 points each.
    - Draws: 1 point.
    - Formula: `(wins * 3) + (knockouts * 4) + (submissions * 4) + (draws * 1)`.\
      *Example*: 10 wins, 5 KOs, 3 submissions, 2 draws → `64 points`.
- **Win Percentage**: `wins / (wins + losses + draws)`.\
  *Example*: 10 wins, 2 losses, 1 draw → `0.769`.
- **Rank**: Sorted by points (descending), with win percentage as a tiebreaker. Rank 1 is the highest.