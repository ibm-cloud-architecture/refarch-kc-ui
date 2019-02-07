
var shippositionsconsumer = require('../routes/shipPositionConsumer');

var consumer = shippositionsconsumer.buildConsumer('ships');

var ps = shippositionsconsumer.getPositions('rose');

for (var i = 0; i < ps.length; i++) {
    console.log(ps[i]);
};