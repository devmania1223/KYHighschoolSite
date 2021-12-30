# ukk
When i start making this project, i didn't know anything about svelte/sapper.
I probably still don't, so beware of the bad practice.

### How to run the dev mode

1. Import the database

2. Install the dependencies
   ```
   npm install
   ```

3. Rename `.env_example` to `.env` and fill it
   
4. Run these two command in **separate** terminal
   ```
   npm run watch:tailwind
   ```
   ```
   npm run dev
   ```

4. Go to http://localhost:3000


### How to run in production mode
```
npm run build
node __sapper__/build
```

### Why not use PHP/Laravel like your teacher tought to you?
I just don't like PHP syntax. Like bruh that thing is even cringer than the entire badasintended projects.

Also they said PHP framework is optional for this final project ;-).

### Credits
`src/node_modules/client/svg` contains svg from [heroicons](https://github.com/tailwindlabs/heroicons), which is licensed with MIT
