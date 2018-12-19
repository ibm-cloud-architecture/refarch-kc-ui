import * as kafka from 'kafka-node';
import * as socketIo from 'socket.io';
import AppConfig  from '../config/AppConfig';

export default class ProblemTopicConsumer {
    config: AppConfig;

    constructor() {
        this.config =  new AppConfig();
    }

    // use kafka client to subscribe to events to push to UI
    // setup Kafka client
    client = new kafka.KafkaClient({
        kafkaHost: this.config.getKafkaBrokers(),
        connectTimeout: this.config.getKafkaConnectTimeout(),
        autoConnect: true
    });


    // start Kafka consumer
    startConsumer(socket: any) {
        const consumer = new kafka.Consumer(this.client,
        // array of FetchRequest
        [{ topic: this.config.getProblemTopicName() }],
        // options
        { groupId: this.config.getKafkaGroupId(), 
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
}
