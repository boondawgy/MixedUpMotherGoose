# Mother Goose · My Rhyme Book

A mobile-friendly, dependency-free practice checklist for the 18 nursery rhymes in Sierra's Mixed-Up Mother Goose. Expand verses, mark and unmark passes, filter and search, and celebrate when all 18 are complete.

## Run locally

Open `index.html` directly, or run `python3 -m http.server 8080` from this folder and visit http://localhost:8080.

## Deploy to Cloudflare Pages

Push this repository to GitHub. In Cloudflare, create a Pages project and connect the repository. Choose **None** as the framework, leave the build command empty, and set the build output directory to `.` (the repository root). No environment variables or dependencies are needed. If using the newer Workers Git integration instead, `wrangler.jsonc` supplies the static asset configuration; use `npx wrangler deploy` as the deploy command.

Progress lives in browser localStorage, not GitHub or Cloudflare. It is separate on each device, browser, and website origin. Clearing browser data removes it. No accounts, analytics, or third-party runtime requests are used.

## Content

Edit `rhymes.js` to change the wording. Stable rhyme IDs preserve checklist progress through content updates. See [SOURCES.md](SOURCES.md) for verification and limitations. This is an independent family learning project, not affiliated with Sierra. No game binaries or screenshots are distributed.
