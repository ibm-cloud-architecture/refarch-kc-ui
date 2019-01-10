// A class to send ship position for testing purpose

import * as domain from '../routes/fleetDomain';
import AppConfig  from '../config/AppConfig';
const kafka = require('kafka-node');
var Producer = kafka.Producer;
declare const Buffer;

export default class ShipPositionProducer {
    config:AppConfig; 
    producer: any;
    producerReady: boolean = false;

    constructor() {
        this.config =  new AppConfig();
    }

    public startProducer() {
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

        this.producer.on("error", function(error) {
            console.error(error);
        });
        console.log("Producer started");
        this.producer.on("ready", function(){
            console.log("Producer is ready");
            this.producerReady = true;
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