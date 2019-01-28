import * as domain from './fleetDomain';
import AppConfig  from '../config/AppConfig';
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;

export interface ShipPositionMap {
    [shipId: string]: domain.ShipPosition
}
export default class ShipPositionConsumer {
    config:AppConfig;
    // revisit this structure if number of ships is too big
    lastPosition: ShipPositionMap;
    shipConsumer: any;
    shipPosition: domain.ShipPosition;

    constructor() {
        this.config =  new AppConfig();
    }

    public ShipTopicConsumer() : Promise<String>{
      var options = {
          fromOffset: 'latest'
      };

      var kafka = require('kafka-node'),
          Consumer = kafka.Consumer,
          client = new kafka.KafkaClient(),
          consumer = new Consumer(
              client,
              [
                  { topic: 'bluewaterShip', partition: 0 }
              ],
              [
                {
                  autoCommit: false
                },
                options =
                {
                  fromOffset: 'latest'
                }
              ]
            );

            consumer.on('message', function (message) {
              let aPosition: domain.ShipPosition = JSON.parse(message.value);
              this.shipPosition = aPosition;
              return Promise.resolve(aPosition.shipID);
              });

            consumer.on('error', function (err) {});
            return Promise.reject('error');

    }

    public getShipPosition(shipID: string): domain.ShipPosition {
        // console.log("get ship position"+this.lastPosition[shipID]);
        // return this.lastPosition[shipID];
        return this.shipPosition;
    }

    public startConsumer(){
        const client = new kafka.KafkaClient({
            kafkaHost: this.config.getKafkaBrokers(),
            connectTimeout: 10000, // in ms it takes to wait for a successful connection before moving to the next host
            requestTimeout: 25000,
            autoConnect: true, // automatically connect when KafkaClient is instantiated
            idleConnection: 60000, // allows the broker to disconnect an idle connection from a client 5 min default.
            maxAsyncRequests: 10 // maximum async operations at a time toward the kafka cluster
        });
        this.shipConsumer = new Consumer(client,
            [{ topic: this.config.getShipTopicName(),offset:0, partition:0
            }],
            {
                groupId: 'kcsolution',//consumer group id
                autoCommit: false,
                autoCommitIntervalMs: 5000,
                // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
                fetchMaxWaitMs: 100,
                // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
                fetchMinBytes: 1,
                // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
                fetchMaxBytes: 1024 * 1024,
                // If set true, consumer will fetch message from the given offset in the payloads
                fromOffset: false,
                // If set to 'buffer', values will be returned as raw buffer objects.
                encoding: 'utf8',
                keyEncoding: 'utf8'
            }
        );
        console.log("Consumer to topic started");

            // By default, we will consume messages from the last committed offset of the current group
        this.shipConsumer.on('message', function (message) {
            //let aPosition: domain.ShipPosition = JSON.parse(message.value.toString());
            //this.lastPosition[aPosition.shipID] = aPosition;
            //console.log(this.aPosition);
        });

        this.shipConsumer.on("error", function(err) {
            console.log("error", err);
        });
    } // start consumer

    public stopConsumer(){
        this.shipConsumer.close(true, () => {
            console.log("Stop ship consumer");
        })
    }
}// class

(()=> {
})();
