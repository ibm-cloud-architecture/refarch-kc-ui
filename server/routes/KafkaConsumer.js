var Kafka = require('node-rdkafka');

var topicName = "defaultTopic"

var kafkaConsumer;

exports.kafkaConsumer = kafkaConsumer;

const buildConsumer = (tName) => {
    topicName = tName;
    console.log(topicName)
}


module.exports = {
    buildConsumer
}