# Next Scene
A simple application for seeing movie trailers of popular movies, using the TMDB API.

### Technical tools
**Language:** Typescript
**Framework:** Next.js
**Styling:** Tailwindcss
**API:** TMDB API

### Features
- Fetch movie trailers from TMDB API
- Display movie trailers in a grid layout
- Filter movies by title
- Infinite scrolling for loading more movies
- Favourite storage using local storage, add and remove favourite movies
- Internal endpoints to prevent access token from been exposed on requests
- Skeleton loader

### Run the development server:
1. Clone the repo, and navigate to the project directory
2. Run `npm install` to install the dependencies
3. Create a `.env` file and add your TMDB access token
```bash
ACCESS_TOKEN = ...
```
4. Run
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
 to start the development server
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Live demo link: [https://next-scene.vercel.app/](https://next-scene.vercel.app/)

#### Design Decisions
SSR is used to improve SEO and initial load performance. This is particularly important for a movie application where users might search for specific movies. SSR ensures that the content is available to search engines and users immediately.

Context API is used to manage global state, such as the list of movies and user favorites. This allows us to avoid prop drilling and makes the state management more scalable. By saving the movies list in a provider, it can be accessed from any component, reducing the need to fetch the movies again unless necessary. This minimizes unnecessary server requests and improves performance.

Next.js API routes is used to securely fetch data from external APIs without exposing sensitive information like access tokens to the client. This ensures that the access token remains secure and the client only interacts with our server.

The Context API is simpler to set up and use for smaller applications. For larger applications, Redux will be more appropriate, but we chose the Context API for its simplicity and ease of use.