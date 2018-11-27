# User Interface and BFF for the KC container shipment solution

This repository includes the user interface in Angular as Single Page Application and the BFF in nodejs to present the container shipment demonstration.

## Code explanation
This is a traditional Angular 6 app with the app.module.ts using shared a features modules. Shared is for UI generic widgets, while features are supporting the UI specific components linked to the app's business logic.

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