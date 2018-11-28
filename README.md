# User Interface and BFF for the KC container shipment solution

This repository includes the user interface in Angular as Single Page Application and the BFF in nodejs to present the container shipment demonstration.

## User stories to support

- [ ] As a fleet manager I want to login to the webapp to access the fleet management feature
- [ ] As a fleet manager I want to select one of the fleet to get the list of ships with their attributes in a table format, and plot the ship on a map at their respective position (latitude, longitude)
- [ ] As a demoer I want to start ship movement so the ships move on the map
- [ ] As a fleet manager I want to select one ship and present a detail view of it with its containers loaded in the boat
- [ ] As a demoer I want to start the fire to container or heat wave or container down simulation from the detailed ship view
- [ ] As a demoer I want to see the message coming back from the streaming analytics about next best action from my simulation

## Code explanation

This is a traditional Angular 6 app with the app.module.ts using `shared` and `features` modules. `Shared` is for UI generic widgets, while `features` are for supporting the UI specific components linked to the business logic.

TODO ADD diagram of the app and wireframe 

For the BFF code the server code is under the `server` folder and uses the standard patterns for expressjs middleware. 

## UI Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1. The user interface features are under the features folder.

### UI Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### UI Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### UI Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## BFF Development