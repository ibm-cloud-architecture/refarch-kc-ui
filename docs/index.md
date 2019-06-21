# User Interface and BFF for the K Container shipment solution

!!! abstract 
    This repository includes the user interface to support the demonstration of the end to end Reefer containe shipment process. It is done with Angular 8 with a Back end for front end server done in Nodejs. This is the only component of the solution that is not using publishing events. You will learn how to do test driven development with Angular, and the BFF pattern in action. 
    
This project is part of the Container shipment reference implementation as presented in [this project](https://ibm-cloud-architecture.github.io/refarch-kc).

## User stories to support

This project is in light development so the following user stories are in plan (or done):

- [x] As a fleet manager I want to login to the webapp to access the fleet management feature. Use eddie@email.com.
- [x] As a fleet manager I want to select one of the fleet to get the list of ships with their attributes in a table format, and plot the ship on a map at their respective position (latitude, longitude)
- [x] As a demoer I want to start ship movement so the ships move on the map
- [x] As a fleet manager I want to select one ship from the table of ships and present a detail view of it with its containers loaded in the boat
- [x] As a demoer I want to start the fire to container or heat wave or container down simulation from the detailed ship view
- [ ] As a demoer I want to see the message coming back from the streaming analytics about next best action from my simulation

## Pre-requisites

The UI is using Angular so you need to get angular CLI installed, nodejs and npm.  

Keep npm up to date with:
```
npm install -g npm
```

To install or update Angular CLI:

```
npm install -g @angular/cli
```

!!! note
        The project was started with Angular 6 and then migrated to Angular 8 with the command:
        ```
        ng update @angular/cli @angular/core
        ng update @angular/material
        ```
## Build and Run

The `scripts` folder has a script to build the UI and the server component, package them in a docker image. You should clone all the KC solution repositories and use each component one by one, or use our IBM public cloud deployment (IKS). To be able to run the UI locally, you need to have at least the following component up and running:

* Kafka and zookeeper: Use the docker compose file in the root project: 
 ```
 cd ../refarch-kc/docker
 docker-compose -f backbone-compose.yml up
 ```
* Start the Fleet simulator.  For the fleet simulator [see instructions here](https://github.com/ibm-cloud-architecture/refarch-kc-ms/tree/master/fleet-ms#run) to run the simulator locally.

* Make sure you have the angular cli installed via `npm install -g @angular/cli` and run an initial `npm install` inside the ui folder to pull all dependencies.

* Build UI and server and a docker image with the command: `./scripts/build.sh`. The trace looks like:
> .... chunk {main} main.js, main.js.map (main) 78.9 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 223 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.08 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 387 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 6.81 MB [initial] [rendered]
...   
> kcbff@0.0.1 copy-deps /Users/jeromeboyer/Code/GreenCompute/refarch-kc-ui/server
> cpx "../ui/dist/ui/*.*" ./dist/server/static && cpx "./config/config.json" ./dist/server/config   
Successfully built 0226a1748fd9  
Successfully tagged ibmcase/kc-ui:latest

* Start locally with `./script/run.sh` or with a docker `./script/runDocker.sh`. 

* Use your web browser at http://localhost:3000/#/home 


## UI Development

This is a traditional Angular 7 app with the app.module.ts using `shared` and `features` modules. `Shared` is for UI generic widgets, while `features` are for supporting the UI specific components linked to the business logic. 
There is no login page yet, but the home page displays a set of tiles to support the demonstration of the full shipment process as illustrated in the figure below:

![](./kc-ui-home.png)

For the BFF code the server code is under the `server` folder and uses the standard patterns for expressjs middleware. The [readme file](./server/README.md) goes into the details on this implementation.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1. The user interface features are under the features folder. We are using a TDD approach as described in [this note.](https://github.com/ibm-cloud-architecture/refarch-caseportal-app/blob/master/docs/tdd.md) The tests run with `ng test`. We also encourage to read the [angular.io testing guide](https://angular.io/guide/testing)

### UI Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### UI Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### UI Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Deployment

### Deploy on IBM Cloud IKS

### Deploy on IBM Cloud Private 


## Contribute

As this implementation solution is part of the Event Driven architeture reference architecture, the [contribution policies](./CONTRIBUTING.md) apply the same way here.

**Contributors:**
* [Jerome Boyer](https://www.linkedin.com/in/jeromeboyer/)
* [Hemankita Perabathini](https://www.linkedin.com/in/hemankita-perabathini/)

Please [contact me](mailto:boyerje@us.ibm.com) for any questions.