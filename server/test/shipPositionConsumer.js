const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const config = require('../config/config.json');
const topicName= 'bluewaterShip';
console.log("#####################################");
console.log("# Ship Position consumer  v1        #");
console.log("#####################################");
console.log(" Topic is:" + topicName);


// setup Kafka client
const client = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092'
});
var consumer = new Consumer(client,
    [{ topic: topicName, offset: 0, partition: 0 }],
    { fromOffset: true}
    );

    // By default, we will consume messages from the last committed offset of the current group
consumer.on('message', function (message) {
   
    console.log('Message recieved: ' + JSON.stringify(message, null, 4));
    console.log('value-> ' + message.value);
});

consumer.on("error", function(err) {
    console.log("error", err);
});

process.on("SIGINT", function() {
    consumer.close(true, function() {
        process.exit();
    });
});

console.log('Consumer ready');