# Myapp

This project was generated with [Angular CLI] version 18.2.0.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Then open another terminal and run  `npm run server` to initiate the local JSON server.

## Additional setup
In your Angular development environment, you need to run these commands.
`ng add @angular/material`
`npm install -D tailwindcss postcss autoprefixer`
`npx tailwindcss init`

Then you need to create environment folder.
`ng g e environments`
There create(if not already) and inside environment.ts and environment.development.ts folder, paste this code

```
export const environment = {
  apiURL : 'http://localhost:3000',
};
```
This is the API call which was avoided to push into github as the standard practice of development.
It is then used in the sevice field.

## Extra Features
As fullfilling the required features, I have also instated some extra features to make the app more appealing. 
- Sorting is available in products table.
- pop-up message is shown for every action.
- Auto complete Total amount and Sale price in the Add order page.
- While selecting category in order page, it shows current available item remaining.
- A landing page which shows the current state of our inventory.

## Further help

If there is any difficulties in running the program, feel free to reach out at [kshariare@gmail.com] (kshariare@gmail.com)
