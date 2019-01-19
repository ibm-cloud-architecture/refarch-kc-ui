/**
 * Tool to send ship position to the topic to test the BFF consumer and UI
 */
const kafka = require('kafka-node');
const topicName= 'bluewaterShip';

// setup Kafka client
const client = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092'
});

producer = new kafka.Producer(client);
console.log('Kafka producer is ready');

var positions = [
    {"shipID":"JimminyCricket","latitude":"37.8226902168957","longitude":"-122.3248956640928","speed":0,"ambiantTemperature":0.0,"compass":0,"status":"AT_PORT","timestampMillis":1547866840954},
    {"shipID":"JimminyCricket","latitude":"37.8226902168957","longitude":"-122.3248956640928","speed":0,"ambiantTemperature":0.0,"compass":0,"status":"AT_PORT","timestampMillis":1547866840954},
    {"shipID":"JimminyCricket","latitude":"37.8226902168957","longitude":"-122.3248956640928","speed":15,"ambiantTemperature":22.0,"compass":310,"status":"AT_SEA","timestampMillis":1547864140954},
    {"shipID":"JimminyCricket","latitude":"37.82702920677694","longitude":"-122.75885562498678","speed":15,"ambiantTemperature":22.0,"compass":310,"status":"AT_SEA","timestampMillis":1547874940954},
    {"shipID":"JimminyCricket","latitude":"38.311379442887706","longitude":"-124.36835269529928","speed":15,"ambiantTemperature":22.0,"compass":310,"status":"AT_SEA","timestampMillis":1547885740954}
];

for (var i=0;i< positions.length;i++) {
    let payload = [{
        topic: topicName,
        messages: JSON.stringify(positions[i])
    }];
    producer.send(payload, function (err, data) {
        if (err)
            console.log(JSON.stringify(err));
        else
            console.log(JSON.stringify(data));
    });
}

