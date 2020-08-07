"use strict";
/*
Kafka consumer for two different topics
*/
import AppConfig from   '../config/AppConfig';
var kafka = require('node-rdkafka');
var config = new AppConfig();
var fs = require('fs');

const getCloudConfig = () => {
  var _config = {
    'security.protocol': 'sasl_ssl',
    'sasl.username': config.getKafkaUser(),
    'sasl.password': config.getKafkaPassword()
  };

  // If we are connecting to ES on IBM Cloud, the SASL mechanism is plain
  if(_config['sasl.username'] === 'token'){
    _config['sasl.mechanisms'] = 'PLAIN'
  }
  // If we are connecting to ES on OCP, the SASL mechanism is scram-sha-512
  else {
    _config['sasl.mechanisms'] = 'SCRAM-SHA-512'
  }
  
  if(config.eventStreamsSecurityEnabled()){
    _config['ssl.ca.location'] = config.getCertsPath();
  }
  return _config;
}

const getConsumerTopicConfig = () => {
  return {'auto.offset.reset':'latest'};
}

const getConsumerConfig = (gid) => {
  var consumerConfig = {
    'debug': 'security,broker',
    'metadata.broker.list': config.getKafkaBrokers(),
    'broker.version.fallback': '0.10.2.1',
    'log.connection.close' : false,
    'client.id': 'kc-ui-consumer',
    'group.id': gid,
    'enable.auto.commit' : true,
    'socket.keepalive.enable': true
  };

  if (config.isEventStreams()){
    var eventStreamsConfig = getCloudConfig();
    for (var key in eventStreamsConfig) {
        consumerConfig[key] = eventStreamsConfig[key];
    }
  }
  return consumerConfig;
}

class KafkaConsumer {

  problemsConsumer() {
    var problems = new Array;

    var kafkaClientConfig = getConsumerConfig('kc-ui-problems-consumer-group');
    console.log('Problem consumer config: ' + JSON.stringify(kafkaClientConfig));

    var stream = kafka.KafkaConsumer.createReadStream(kafkaClientConfig, getConsumerTopicConfig(), {
      topics: [config.getProblemTopicName()]
    });

    stream.on('data', function (message) {
      console.log("Problem consumer:" + message.value);
      problems.push(message.value);
    });

    stream.on('event.error', function (err) {
       console.error("Problem consumer error: "+err);
       return err;
    });
    return problems;
   }

   kafkaShipPosition() {
    var shipPositionList = new Array;

    var kafkaClientConfig = getConsumerConfig('kc-ui-ship-consumer-group');
    console.log('Ship position consumer config: ' + JSON.stringify(kafkaClientConfig));

    var stream = kafka.KafkaConsumer.createReadStream(kafkaClientConfig, getConsumerTopicConfig(), {
      topics: [config.getShipTopicName()]
    });

    stream.on('data', function (message) {
      console.log("Ship position consumer: " + message.value);
      shipPositionList.push(message.value);
    });

    stream.on('event.error', function (err) {
      console.log("Ship position consumer error: "+err);
      return err;
    });

    return shipPositionList;
  }
}
export default KafkaConsumer;
