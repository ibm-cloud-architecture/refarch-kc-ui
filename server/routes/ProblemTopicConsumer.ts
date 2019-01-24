import * as kafka from 'kafka-node';
import * as socketIo from 'socket.io';
import AppConfig  from '../config/AppConfig';
import * as domain from './fleetDomain';

export default class ProblemTopicConsumer {
    config: AppConfig;
    shipProb: domain.ProblemReport;

    constructor() {
        this.config =  new AppConfig();
    }

    public ProblemTopicConsumer() : Promise<String>{
      var options = {
          fromOffset: 'latest'
      };

      var kafka = require('kafka-node'),
          Consumer = kafka.Consumer,
          client = new kafka.KafkaClient(),
          consumer = new Consumer(
              client,
              [
                  { topic: 'bluewaterProblem', partition: 0 }
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
              let aProb: domain.ProblemReport = JSON.parse(message.value);
              console.log("This problem is "+aProb);
              this.shipProb = aProb;
              return Promise.resolve(aProb.shipId);
              });

            consumer.on('error', function (err) {});
            return Promise.reject('error');

    }

    public getProbEvent(shipID: string): domain.ProblemReport {
        return this.shipProb;
    }

    // use kafka client to subscribe to events to push to UI
    // setup Kafka client
    // client = new kafka.KafkaClient({
    //     kafkaHost: this.config.getKafkaBrokers(),
    //     connectTimeout: this.config.getKafkaConnectTimeout(),
    //     autoConnect: true
    // });

    // start Kafka consumer
    // startConsumer(socket: any) {
    //     const consumer = new kafka.Consumer(this.client,
    //     // array of FetchRequest
    //     [{ topic: this.config.getProblemTopicName() }],
    //     // options
    //     { groupId: this.config.getKafkaGroupId(),
    //         autoCommit: true,
    //         autoCommitIntervalMs: 5000,
    //         fetchMaxWaitMs: 10,
    //         fetchMinBytes: 1,
    //         // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
    //         fetchMaxBytes: 1024 * 1024,
    //         // If set true, consumer will fetch message from the given offset in the payloads
    //         fromOffset: false,
    //         // If set to 'buffer', values will be returned as raw buffer objects.
    //         encoding: 'utf8',
    //         keyEncoding: 'utf8'});
    //
    //     consumer.on('message', (message) => {
    //         console.log('KC Container Metric Event received: ' + JSON.stringify(message, null, 4));
    //         // push the dashboard via socket
    //         socket.send(JSON.stringify(message));
    //     });
    //     console.log('Kafka consumer is ready');
    // }
}
