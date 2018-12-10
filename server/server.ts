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
import * as kafka from 'kafka-node';
import * as path from 'path';
const config = require( './config/config.json');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

// use kafka client to subscribe to events to push to UI
const topicName = 'bluewaterProblem';
// setup Kafka client
const client = new kafka.KafkaClient({
    // kafkaHost: 'gc-kafka-0.gc-kafka-hl-svc.greencompute.svc.cluster.local:32224',
    //"kafka03-prod02.messagehub.services.us-south.bluemix.net:9093,kafka01-prod02.messagehub.services.us-south.bluemix.net:9093,kafka02-prod02.messagehub.services.us-south.bluemix.net:9093,kafka04-prod02.messagehub.services.us-south.bluemix.net:9093,kafka05-prod02.messagehub.services.us-south.bluemix.net:9093", 
    kafkaHost: config.kafkaHost,
    connectTimeout: config.kafkaConnectTimeout,
    autoConnect: true
});


// start Kafka consumer
function startConsumer(socket: WebSocket) {
    const consumer = new kafka.Consumer(client,
      // array of FetchRequest
      [{ topic: topicName }],
      // options
       { groupId: config.kafkaGroupId, 
         autoCommit: true,
         autoCommitIntervalMs: 5000,
         fetchMaxWaitMs: 10,
         fetchMinBytes: 1,
          // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
          fetchMaxBytes: 1024 * 1024,
          // If set true, consumer will fetch message from the given offset in the payloads
          fromOffset: false,
          // If set to 'buffer', values will be returned as raw buffer objects.
          encoding: 'utf8',
          keyEncoding: 'utf8'});

    consumer.on('message', (message) => {

        console.log('KC Container Metric Event received: ' + JSON.stringify(message, null, 4));
        // push the dashboard via socket
        socket.send(JSON.stringify(message));
    });
    console.log('Kafka consumer is ready');
}


export class ProblemReport {
    issue: string = '';
    containerId: string = '';
    shipId: string = '';
    status?: string;
    weatherC?: number = 0;
    tempC?: number = 0;
    amp?: number = 0;
    latitude?: string;
    longitude?: string;
    tag?: string;
    severity?: string;
    ts?: any;
}

  require('./routes/api')(app,config);

  // Point static path to dist
  app.use(express.static(path.join(__dirname, './static')));
  // Catch all other routes and return the index file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
  });
//start our server
server.listen(process.env.PORT || 3000, () => {
    let addr: string = JSON.stringify(server.address());
    console.log(`Server started on port ${addr} :)`);
});
