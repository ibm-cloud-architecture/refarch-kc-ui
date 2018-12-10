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

/** Export the APIs for the front end */
module.exports = function(app:any,config:any) {
    // health verb for application monitoring.
    app.get('/healthz',(req:any,res:any) => {
      res.send('UP and running');
    });

    app.get('/api/fleets', (req:any,res:any) => {
        console.log("In api GET fleets");
        let fleets = [{id: "f1", name: "KC-NorthAtlantic"}, {id: "f2", name: "KC-NorthPacific"},{id: "f2", name: "KC-SouthPacific"}];
        res.status(200).send(fleets);
    });


    app.post('/api/fleets/simulate', (req:any,res:any) => {
        console.log("In api POST fleets " + JSON.stringify(req.body));
        // todo call fleet MS
        res.status(200);
    });

    app.get('/api/ship', (req:any,res:any) => {
        console.log("In api GET fleets");
        let fleets = [{id: "f1", name: "KC-NorthAtlantic"}, {id: "f2", name: "KC-NorthPacific"},{id: "f2", name: "KC-SouthPacific"}];
        res.status(200).send(fleets);
    });

    app.post('/api/ships/simulate', (req:any,res:any) => {
        console.log("In api POST ship " + JSON.stringify(req.body));
        // todo call fleet MS
        res.status(200);
    });
} // end exports