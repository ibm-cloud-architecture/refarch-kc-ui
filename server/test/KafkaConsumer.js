var options = {
    fromOffset: 'latest'
};

var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(
        client,
        [
            { topic: 'bluewaterShip', partition: 0 },
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
        console.log(message);
      });

      consumer.on('error', function (err) {});
