/*
* This is a simple component to set configuation from environment variables or config file
*/

const config = require('./config.json');

export default class AppConfig {
    constructor() {}
    public getKafkaBrokers(): string {
        return process.env.KAFKA_BROKERS || config.kafkaBrokers;
    }

    public getFleetMSURL(): string {
        return process.env.FLEET_MS_URL || config.fleetMSURL;
    }

    public getOrderMSURL(): string {
        return process.env.ORDER_MS_URL || config.orderMSURL;
    }

    public getOrderQueryMSURL(): string {
        return process.env.ORDER_QUERY_MS_URL || config.orderQueryMSURL;
    }
    

    public getKafkaConnectTimeout(): number {
       return config.kafkaConnectTimeout;
    }

    public getKafkaGroupId(): string {
        return config.kafkaGroupId;
    }

    public getProblemTopicName(): string {
        return process.env.PROBLEM_TOPIC || config.problemTopicName;
    }
    

    public getShipTopicName(): string {
        return process.env.SHIP_TOPIC || config.shipTopicName;
    }

    public getPort(): number {
        return process.env.port || config.port;
    }
 
}