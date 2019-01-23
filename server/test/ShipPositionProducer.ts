// A class to send ship position for testing purpose

import * as domain from '../routes/fleetDomain';
import AppConfig  from '../config/AppConfig';
const kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
declare const Buffer;

export default class ShipPositionProducer {
    config:AppConfig;
    producer: any;
    km: any;
    producerReady: boolean = false;

    constructor() {
        this.config =  new AppConfig();
    }

    public ShipTopicProducer(p:domain.ShipPosition){

      let positionvarAsString = JSON.stringify(p);
      const buffer = new Buffer.from(positionvarAsString);

      var kafka = require('kafka-node'),
          Producer = kafka.Producer,
          KeyedMessage = kafka.KeyedMessage,
          client = new kafka.KafkaClient(),
          producer = new Producer(client),
          km = new KeyedMessage('key', 'message'),
          payloads = [
              { topic: 'bluewaterShip', messages: buffer, partition: 0 }
          ];

          producer.on('ready', function () {
            producer.send(payloads, function (err, data) {
              console.log(data);
            });
          });

          producer.on('error', function (err) {});

        }

    public startProducer(p:domain.ShipPosition): any {
        const client = new kafka.KafkaClient({
            kafkaHost: this.config.getKafkaBrokers(),
            connectTimeout: 5000, // in ms it takes to wait for a successful connection before moving to the next host
            requestTimeout: 5000,
            autoConnect: true, // automatically connect when KafkaClient is instantiated
            idleConnection: 10000, // allows the broker to disconnect an idle connection from a client 5 min default.
            maxAsyncRequests: 10 // maximum async operations at a time toward the kafka cluster
        });
        this.producer = new Producer(client,{
            requireAcks: 1,    // Configuration for when to consider a message as acknowledged, default 1
            ackTimeoutMs: 100, // The amount of time in milliseconds to wait for all acks before considered, default 100ms
            partitionerType: 2 // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
        });
        this.km = new KeyedMessage('key', 'message');

        this.producer.on("error", function(error) {
            console.error(error);
        });

        console.log("Producer started");

        var payloads = [
        { topic: 'bluewaterShip', messages: 'fourth color is yellow', partition: 0 },
        { topic: 'bluewaterShip', messages: 'fifth color is green', partition: 0 }
      ];

      console.log("Producer is ready");

        this.producer.on("ready", function(){
            //this.producerReady = true;
            // let positionvarAsString = JSON.stringify(p);
            // console.log("Try to send " + positionvarAsString);
            // const buffer = new Buffer.from(positionvarAsString);
            // const produceRequest = [{
            //   topic: "bluewaterShip",
            //   messages: buffer,
            //   attributes: 0 // control message compression: 0: no compression ,1: GZip, 2: snappy
            // }];
            // this.producer.send(payloads, function(err, data) {
            //   //console.log(JSON.stringify(data));
            //   console.log(data);
            //   process.exit(0);
            // });

          });
        } // startProducer

    public produceShipPosition(p:domain.ShipPosition) {
        let positionvarAsString = JSON.stringify(p);
        console.log("Try to send " + positionvarAsString);
        if (this.producerReady) {

            console.log("Try to send " + positionvarAsString);
            const buffer = new Buffer.from(positionvarAsString);
            const produceRequest = [{
                topic: this.config.getShipTopicName(),
                messages: buffer,
                attributes: 0 // control message compression: 0: no compression ,1: GZip, 2: snappy
            }];
            this.producer.send(produceRequest,(data) => {
                console.log(JSON.stringify(data));
            });
        };
    }

    public stopProducer(){
        this.producer.close(true, () => {
            console.log("Stop ship producer");
        })
    }
}
