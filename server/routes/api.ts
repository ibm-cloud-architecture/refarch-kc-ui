/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const express = require('express');
const fs = require("fs");
import FleetClient from './FleetClient';
import * as fleetDomain from './fleetDomain';
import OrderClient from './OrderClient';
import * as orderDomain from './orderDomain';
import * as containerDomain from './containerDomain';
import ContainerClient from './ContainerClient'

import ShipmentClient from './ShipmentClient';
import KafkaConsumer from './kafka';

const orderClient = new OrderClient();
const fleetClient = new FleetClient();
const shipmentClient = new ShipmentClient();
const containerClient = new ContainerClient();


async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** Export the APIs for the front end */
module.exports = function (app: any) {

    app.on('listening', function () {
        // server ready to accept connections here
    });

    // health verb for application monitoring.
    app.get('/healthz', (req: any, res: any) => {
        res.send('UP and running');
    });

    // api polled from UI to get potential problem on ships
    app.get('/api/problem', (req: any, res: any) => {
        console.log("In api problem topic consumer");
        const kafkaConsumer = new KafkaConsumer();

        async function wait() {
            await delay(10000);
        }

        var problemData = kafkaConsumer.problemsConsumer();

        wait().then(() => {
            console.log("data is old " + problemData);
            res.status(200).send(problemData);
        }).catch((error) => {
            console.log(error);
        });
    });

    // api polled from UI to get ship position
    app.get('/api/shipposition', (req: any, res: any) => {
        console.log("In api ship position topic consumer");

        const kafkaConsumer = new KafkaConsumer();
        async function wait() {
            await delay(10000);
        }

        var shipPositionData = kafkaConsumer.kafkaShipPosition();

        wait().then(() => {
            res.status(200).send(shipPositionData);
        }).catch((error) => {
            console.log(error);
        });
    });

    // get the list of fleets
    app.get('/api/fleets', (req: any, res: any) => {
        console.log("In GET /api/fleets");
        let fleets = [{ id: "f1", name: "KC-NorthAtlantic" }, { id: "f2", name: "KC-NorthPacific" }, { id: "f2", name: "KC-SouthPacific" }];
        fleetClient.getFleetNames().then((fleets: fleetDomain.Fleet[]) => {
            console.log("Got fleet names: " + JSON.stringify(fleets, null, 2));
            res.status(200).send(fleets);
        });

    });

    app.get('/api/fleets/:fleetname', (req, res) => {
        console.log("In api GET ships for fleet: " + req.params.fleetname);
        fleetClient.getFleetByName(req.params.fleetname).then((aFleet: fleetDomain.Fleet) => {
            console.log("Got those ships: " + JSON.stringify(aFleet, null, 2));
            res.status(200).send(aFleet);
        });
    });



    app.post('/api/fleets/simulate', (req, res) => {
        console.log("In api POST fleet simulate " + JSON.stringify(req.body, null, 2));
        if (req.body !== undefined) {
            fleetClient.fleetSimulation(req.body).then((data: fleetDomain.SimulResponse) => {
                res.status(200).send(data);
            });
        } else {
            res.status(400).send({ error: 'no post body' });
        }
    });


    app.post('/api/ships/simulate', (req, res) => {
        console.log("In api POST ship simulate " + JSON.stringify(req.body, null, 2));
        if (req.body !== undefined) {
            fleetClient.shipSimulation(req.body).then((data: fleetDomain.Ship) => {
                console.log("In api POST ship simulate resp:" + JSON.stringify(data));
                res.status(200).send(data);
            });
        } else {
            res.status(400).send({ error: 'no post body' });
        }
    });

    // Orders
    app.get('/api/orders/:manuf', (req, res) => {
        console.log("In api GET orders for " + req.params.manuf);
        orderClient.getOrders(req.params.manuf).then((orders: orderDomain.Order[]) => {
            console.log("Got this " + JSON.stringify(orders));
            res.status(200).send(orders);
        });
    });

     app.post('/api/orders', (req, res) => {
        console.log("In api POST new orders " + JSON.stringify(req.body));
        if (req.body !== undefined) {
            if (orderClient.checkCreateNewOrder(req.body) !== true){
                console.log("[ERROR] - Incorrect new order object received. Make sure all attributes for a new order are present and aren't empty.");
                res.status(404).send({ error: 'Incorrect New Order Object' });
            }
            else {
                orderClient.saveOrder(req.body).then((data: orderDomain.Order) => {
                res.status(200).send(data);
                });
            }
        } else {
            res.status(400).send({ error: 'No POST body' });
        }
    }); 

    app.put('/api/orders/:orderID', (req, res) => {
        console.log("In api PUT existing order " + JSON.stringify(req.body));
        if (req.body !== undefined) {
            orderClient.updateOrder(req.body).then((data: orderDomain.Order) => {
                res.status(200).send(data);
            });
        } else {
            res.status(400).send({ error: 'No PUT body' });
        }
    })

    app.get('/api/shipments', (req, res) => {
        console.log("In api GET all ordered shipments");
        shipmentClient.getOrderedShipments().then((orders: orderDomain.OrderedShipment[]) => {
            console.log("Got this " + JSON.stringify(orders));
            res.status(200).send(orders);
        });
    });
    app.put('/api/shipments/:orderID', (req, res) => {
        console.log("In api PUT existing order shipment " + JSON.stringify(req.body));
        if (req.body !== undefined) {
            shipmentClient.updateOrder(req.body).subscribe((data: orderDomain.OrderedShipment) => {
                res.status(200).send(data);
            });
        } else {
            res.status(400).send({ error: 'No PUT body' });
        }
    });

    app.get('/api/voyages', (req, res) => {
        console.log("In api GET all scheduled voyages");
        shipmentClient.getVoyages().subscribe((voyages: orderDomain.Voyage[]) => {
            console.log("Got this " + JSON.stringify(voyages));
            res.status(200).send(voyages);
        });
    });

    app.get('/api/voyages/:voyageID', (req, res) => {
        console.log("In api GET voyage" + req.params.voyageID);
        shipmentClient.getVoyage(req.params.voyageID).subscribe((voyage: orderDomain.Voyage) => {
            console.log("Got this " + JSON.stringify(voyage));
            res.status(200).send(voyage);
        });
    });

    //Get the list of containers
    app.get('/api/containers', (req: any, res: any) => {
        console.log("In api Get all containers");
        containerClient.getContainers().then((containers: containerDomain.Container[]) => {
            console.log("Got containers: " + JSON.stringify(containers));
            res.status(200).send(containers);
        });
    
    });
    
    
} // end exports
