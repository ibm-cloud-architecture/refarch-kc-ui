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
/*
Server responsible to support APIs for the Angular App, serving the Single Page App,
connect to a kafka topic and then
broadcast Event coming from kafka to the connected dashboards.
*/

import * as express from 'express';
import * as http from 'http';
import * as passport from  'passport';
import * as path from 'path';
import AppConfig from './config/AppConfig';
const bodyParser = require('body-parser');



var cors = require('cors');

const app = express();
app.use(cors())
// Parsers for POST JSON PAYLOAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const config = new AppConfig();
//initialize a simple http server
const server = http.createServer(app);

require('./routes/api')(app);
require('./routes/passport')(passport)
require('./routes/userlogin')(app, passport);

// Point static path to /static
app.use(express.static(path.join(__dirname, './static')));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

//start our server
server.listen(config.getPort(), () => {
    let addr: string = JSON.stringify(server.address());
    console.log(`Server started on port ${addr} version:` + config.getVersion());
    console.log('Kafka Brokers ' +  config.getKafkaBrokers());
    console.log('Fleet Simulator ' +  config.getFleetMSURL());
    console.log('Order MS Command ' +  config.getOrderMSURL());
    console.log('Order MS Query ' +  config.getOrderQueryMSURL());
    console.log('Voyage MS ' +  config.getVoyageMSURL());

});
