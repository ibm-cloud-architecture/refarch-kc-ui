/*
* This is a simple component to set configuation from environment variables or config file
*/

const config = require('./config.json');

export default class AppConfig {
  
    constructor() {}

    public getKafkaBrokers(): string {
        return process.env.KAFKA_BROKERS || config.kafkaBrokers;
    }

    public getKafkaApiKey(): string {
        return process.env.KAFKA_APIKEY ||  config.kafkaApiKey;
    }

    public getFleetMSURL(): string {
        var url = config.fleetMSURL;
        if(process.env.FLEETMS_SERVICE_HOST && process.env.FLEETMS_SERVICE_PORT){
          url = "http://" + process.env.FLEETMS_SERVICE_HOST
              + ":" + process.env.FLEETMS_SERVICE_PORT + "/fleetms";
        }
        return url;
    }

    public getOrderMSURL(): string {
      var url = config.orderMSURL;
      if(process.env.ORDERCOMMANDMS_SERVICE_HOST && process.env.ORDERCOMMANDMS_SERVICE_PORT){
        url = "http://" + process.env.ORDERCOMMANDMS_SERVICE_HOST
            + ":" + process.env.ORDERCOMMANDMS_SERVICE_PORT+ "/orders";
      }
      return url;
    }

    public getOrderQueryMSURL(): string {
        var url = config.orderQueryMSURL;
        if(process.env.ORDERQUERYMS_SERVICE_HOST && process.env.ORDERQUERYMS_SERVICE_PORT){
          url = "http://" + process.env.ORDERQUERYMS_SERVICE_HOST
              + ":" + process.env.ORDERQUERYMS_SERVICE_PORT+ "/orders";
        }
        return url;
    }

    public getVoyageMSURL(): string {
        var url = config.voyagesMSURL;
        if(process.env.VOYAGESMS_SERVICE_HOST && process.env.VOYAGESMS_SERVICE_PORT){
          url = "http://" + process.env.VOYAGESMS_SERVICE_HOST
              + ":" + process.env.VOYAGESMS_SERVICE_PORT;
        }
        return url;
    }

    public getContainerMSURL(): string {
        var url = config.containerMSURL;
        if(process.env.CONTAINERMS_SERVICE_HOST && process.env.CONTAINERMS_SERVICE_PORT){
          url = "http://" + process.env.CONTAINERMS_SERVICE_HOST
              + ":" + process.env.CONTAINERMS_SERVICE_PORT + "/containers";
        }
        return url;
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

    public getCertsPath(): string {
        return process.env.KAFKA_CERT_PATH || config.certsPath;
    }

    public isEventStreams(): boolean {
        var kafka_api_key = process.env.KAFKA_APIKEY.trim();
        return ('KAFKA_APIKEY' in process.env && kafka_api_key !=="");
    }
    
    public eventStreamsSecurityEnabled(): boolean {
        return ('KAFKA_CERT_PATH' in process.env);
    }

}
