# Build Run and Deploy the User Interface component

## Pre-requisites

Be sure to have cloned the root repository: `refarch_kc` as there is a dependency on the environment setting scripts (`refarch_kc/scripts/setenv.sh`).

The UI is using Angular so you need to get angular CLI installed, nodejs and npm.  

Keep npm up to date with the command:

```
npm install -g npm
```
Verify node version (we run v 12.0)

```
node -v
```

To install or update Angular CLI

```
cd ui
npm install -g @angular/cli
```

And install all the dependencies
```
npm install
```

!!! note
        The project was started with Angular 6 and then migrated to Angular 8 with the commands:
        ```
        ng update @angular/cli @angular/core
        ng update @angular/material
        ```

The test driven development approach is done using [mocha](https://mochajs.org/) as test runner and [chai](https://www.chaijs.com) for assertion library and Typescript. Which means those tools were installed with the command:
```
$ npm install mocha chai ts-node --save-dev
# and install the supporting types for Typescript
# npm install @types/chai @types/mocha --save-dev
```

## Build

### UI Build

While doing development, you can build the UI first, by being under the `ui` folder and run:

```
ng build
```

You should get a trace like:
```
chunk {main} main-es2015.js, main-es2015.js.map (main) 156 kB [initial] [rendered]
chunk {polyfills} polyfills-es2015.js, polyfills-es2015.js.map (polyfills) 438 kB [initial] [rendered]
chunk {runtime} runtime-es2015.js, runtime-es2015.js.map (runtime) 6.08 kB [entry] [rendered]
chunk {styles} styles-es2015.js, styles-es2015.js.map (styles) 392 kB [initial] [rendered]
chunk {vendor} vendor-es2015.js, vendor-es2015.js.map (vendor) 5.81 MB [initial] [rendered]
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build so the javascripts will be smaller.

It is possible to test the User interface without the nodejs backend, by using

```
ng serve
```

Navigate to http://localhost:4200/. The app will automatically reload if you change any of the UI source files.

You may encounter some issues as there are dependencies on the backend nodejs for some APIs and data.

### UI Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Build and run the BFF server

Run the command below:
```
npm serve
```

All those commands are executed when developing the server or ui parts. But when we need to deploy the user interface with the other components of the solution we first need to build a docker image and then be sure the other services are deployed...

### Dockerize all

Build UI and server in one command: (this is what a CI/CD will do). 

```
./scripts/buildDocker.sh
```

This will build a docker image, named: `ibmcase/kc-ui:latest` for local execution. 

## Run locally

To be able to run the UI and server locally, you need to have at least the following kafka, zookeeper, order command, order query and fleet simulator microservices up and running.

As introduced before we have two options to run the solution, Minikube or docker-compose.

### Using docker compose

We recommend to read [this chapter](https://ibm-cloud-architecture.github.io/refarch-kc/deployments/local/) 

* If not done already start Kafka and zookeeper using the docker compose file in the root project: 

 ```
 cd ../refarch-kc/docker
 docker-compose -f backbone-compose.yml up
 ```

* Start the Fleet simulator.  For the fleet simulator [see instructions here](https://github.com/ibm-cloud-architecture/refarch-kc-ms/tree/master/fleet-ms#run) to run the simulator locally.

* Start the UI and BFF locally with `./script/run.sh` or with a docker `./script/runDocker.sh`. 

* Use your web browser at http://localhost:3000/#/home 

### Using Minikube

See the instruction in [this article](https://ibm-cloud-architecture.github.io/refarch-kc/deployments/minikube/) for deploying all the components.
