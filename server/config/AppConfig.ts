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
        if (process.env.KAFKA_ENV !== "IBMCLOUD") {
            return process.env.FLEET_MS_URL || config.fleetMSURL;
        } else {
            return "http://" + process.env.FLEETMS_SERVICE_SERVICE_HOST
                + ":" + process.env.FLEETMS_SERVICE_SERVICE_PORT + "/fleetms";
        }
        
    }

    public getOrderMSURL(): string {
        if (process.env.KAFKA_ENV !== "IBMCLOUD") {
            return process.env.ORDER_MS_URL || config.orderMSURL;
        } else {
            return "http://" + process.env.ORDERCOMMANDMS_SERVICE_SERVICE_HOST
                + ":" + process.env.ORDERCOMMANDMS_SERVICE_SERVICE_PORT_HTTP+ "/orders";
        } 
    }

    public getOrderQueryMSURL(): string {
        if (process.env.KAFKA_ENV !== "IBMCLOUD") {
            return process.env.ORDER_QUERY_MS_URL || config.orderQueryMSURL;
        } else {
            return "http://" + process.env.ORDERQUERYMS_SERVICE_SERVICE_HOST
                + ":" + process.env.ORDERQUERYMS_SERVICE_SERVICE_PORT_HTTP+ "/orders";
        }
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

    public getVersion() : string {
        return config.version;
    }
 
}