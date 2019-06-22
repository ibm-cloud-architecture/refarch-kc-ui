# Backend For Frontend Server for the K Container Shipment Solution

The nodejs / expressjs application is developed using Typescripts and javascripts. The entry point is the `server.ts` file.


So the package.json reflects those changes.

To execute the unit tests run `npm test`.

## Code explanation

We are using a standard expressjs code structure. The Angular app is served by the nodejs app. So the compiled Javascript from the Angular build is copied into the `static` folder. The URL is map to server the index.html:

```
// Point static path to /static
  app.use(express.static(path.join(__dirname, './static')));
  // Catch all other routes and return the index file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
  });
```

The other api definition to support the Angular app are in the `route/api.ts` component. We are also separating the different microservice clients used in their own module.

### A TDD for ship event consumer

We want to have the user interface polling every x seconds the state of ship so it can update the ship map. There are multiple ways to implement this. The angular component can call a BFF end point every x seconds using the RxJS Observable interface, then the BFF can call the Ship microservice. But as we are using event sourcing, we have the state of the ship as ShipEvent on the `bluewaterShip` kafka topic, therefore the BFF is also a kafka consumer and will populate a list of the last n events read from the topic. When Angular call the new BFF api `getShipPosition(shipId)` then the last event is sent back.

To illustrate a TDD approach on consuming ship event in the BFF we define a new test case: `test/GetShipEvent.spec.ts`.

