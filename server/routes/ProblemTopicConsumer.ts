import * as kafka from 'kafka-node';
import * as socketIo from 'socket.io';
import AppConfig  from '../config/AppConfig';
import * as domain from './fleetDomain';

export default class ProblemTopicConsumer {
    config: AppConfig;
    shipProb: domain.ProblemReport;

    lastPosition: [] = [];

    constructor() {
        this.config =  new AppConfig();
    }

    public ProbTopicConsumer() {
      console.log("Enetered problem topic consumer");

      var options = {
          fromOffset: 'latest'
      };

      var kafka = require('kafka-node'),
          Consumer = kafka.Consumer,
          client = new kafka.KafkaClient(),
          consumer = new Consumer(
              client,
              [
                  { topic: 'blueProblem', partition: 0 }
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
              this.lastPosition = new Array();
              console.log("In js consumer file");
              let aProb: domain.ProblemReport = JSON.parse(message.value);
              console.log("This problem is "+ aProb.containerId);
              this.lastPosition[aProb.shipId]=aProb;
              console.log("I am in consumer on"+typeof this.lastPosition[aProb.shipId]);
              console.log(JSON.stringify(this.lastPosition[aProb.shipId]));
              console.log("Printed it"+this.lastPosition.toString());
              // return new Promise<domain.ProblemReport[]>((resolve, reject) => {
              //   if(this.lastPosition != null){
              //     console.log("Printed it"+JSON.stringify(this.lastPosition));
              //     this.lastPosition.forEach(object => console.log(object.shipId));
              //     resolve(this.lastPosition);
              //   }
              //   else{
              //     reject(new Error('Error'));
              //   }
              // });
            });

            consumer.on('error', function (err) {});

            consumer.on('error', function (err) {});


    }

    public getProbEvent(shipID: string): domain.ProblemReport {
      console.log("Entered get prob event");
      //return this.shipProb;
      if(this.lastPosition.length>0){
        console.log("Get problem event"+this.lastPosition[shipID]);
        return this.lastPosition[shipID];
      }
      return null;
    }
}
