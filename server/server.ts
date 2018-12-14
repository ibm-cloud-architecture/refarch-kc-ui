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
import AppConfig from './config/AppConfig'; 


const app = express();
const config = new AppConfig();
//initialize a simple http server
const server = http.createServer(app);

// use kafka client to subscribe to events to push to UI
// setup Kafka client
const client = new kafka.KafkaClient({
    kafkaHost: config.getKafkaBrokers(),
    connectTimeout: config.getKafkaConnectTimeout(),
    autoConnect: true
});


// start Kafka consumer
function startConsumer(socket: WebSocket) {
    const consumer = new kafka.Consumer(client,
      // array of FetchRequest
      [{ topic: config.getProblemTopicName() }],
      // options
       { groupId: config.getKafkaGroupId(), 
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


  require('./routes/api')(app);

  // Point static path to dist
  app.use(express.static(path.join(__dirname, './static')));
  // Catch all other routes and return the index file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
  });
//start our server
server.listen(config.getPort(), () => {
    let addr: string = JSON.stringify(server.address());
    console.log(`Server started on port ${addr} :)`);
});
