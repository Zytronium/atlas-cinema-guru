## Atlas Cinema Guru

This is the Atlas Cinema Guru project. It's the final project for the last
trimester at Atlas School. This is a movie database application. It allows
users to search for movies, add movies to their favorite list, and add movies
to their watch later list. All movies in the database are AI generated and are
not real, nor can they be watched.

Final product goal:  
![](./images/task-2-a.png)

### Getting Started
- Run `npm install` to install dependencies
- Run `npm run dev` to start the dev server
- Open http://localhost:3000 in a browser

### API Routes

When using client rendered components, the application needs to use
the follwing API endpoints:  
- `GET /api/titles?page=1&minYear=2024&maxYear=2025&genres=Sci-Fi,Mystery`
  returns list of movies. Support pagination, filtering by min year, max year,
  and genres
- `GET /api/watch-later?page=1` return list of movies added to users watch later
  list. Support pagination.
- `GET /api/favorites?page=1` return list of movies added to users favorite
  list. Support pagination.
- `GET /api/activities?page=1` returns list of user’s app activity.
  Support pagination.
- `POST /api/watch-later/:id` Adds movie to a users watch later list.
- `DELETE /api/watch-later/:id` Removes a movie from a user's watch later list.
- `POST /api/favorites/:id` Adds a movie to a a users favorites list.
- `DELETE /api/favorites/:id` Removes a movie from a user's favorites list.

The code for these apis can be found in the [app/api](./app/api/) directory.

If the application were to avoid using the API and instead use
server-rendered components, it can use the data fetchers defined
in [lib/data.ts](./lib/data.ts).

### Database Setup
The application expects a postgres database to store data. You will need to
create a postgres database in vercel and populate the following env variables:

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

Once the database is setup and the application can connect, you will need
to [seed](https://en.wikipedia.org/wiki/Database_seeding) the database using the
`GET /api/seed` endpoint. This will create necessary database tables and load
starter data. See the code [here](./app/api/seed/route.ts).

Helper methods for interacting with the database are already implemented
in [lib/data.ts](./lib/data.ts)

### Authentication
The
application expects [Auth.js](https://authjs.dev/) to be configured for the
application to authenticate and authorize users. Authentication is configured
in [auth.ts](auth.ts) You will need to add the following env variables:

```
# Run `npx auth secret` to set value. See https://cli.authjs.dev
AUTH_SECRET=


# Copy from github. See https://authjs.dev/guides/configuring-github#registering-your-app
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

---

### ✅ Tasks checklist:
- [X] ​0. Getting Started (0/0 pts)
- [X] ​1. Authentication / Layout (10/10 pts)
- [X] ​2. Home Page (30/30 pts)
- [ ] ​3. Favorites Page (15/20 pts)
- [ ] ​4. Watch Later Page (0/20 pts)
- [ ] ​5. Latest Activity Feed (0/10 pts)
- [X] ​6. Deploy Application (10/10 pts)


- [ ] **Everything Done ✓** (65/100 pts) - 65%

>### Progress Goals:
><strong>Sunday: 10% ✓(task 0 & 6 only)</strong>  
<strong>Monday: 20% ✓(task 1)</strong>  
<strong>Tuesday: 25% (task 2)</strong>  
<strong>Wednesday: 30% ✓(task 2)</strong>  
<strong>Thursday: 40% (task 2)</strong>  
<strong>Friday: 50% (task 2)</strong>  
<strong>Saturday-Sunday: 70% (task 3)</strong>  
<em style="color: gray">Monday: 90% (task 4)</em>  
<em style="color: gray">Tuesday: 100% (task 6)</em>  

Completed: `N/A`

---
