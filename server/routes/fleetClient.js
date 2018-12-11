/**
 * Client to call the Fleet manager microservice
 */

const request = require('request')
const config = require('../config/config.json');
const CommandsFactory = require('hystrixjs').commandFactory;
  
var getFleetNamesExecution = function(){
    console.log("getFleetNamesExecution");
    return new Promise(function(resolve, reject){
        let opts= { method: "GET", headers: { accept: 'application/json'}};
        request(config.fleetMSURL + "/fleets", opts, function(error,body) {
            if (error) {console.error(error); reject(error)}
            console.log(body)
            resolve(body);
        })
    });
}

var serviceCommand = CommandsFactory.getOrCreate("getFleetNames")
  .run(getFleetNamesExecution)
  .timeout(5000)
  .requestVolumeRejectionThreshold(2)
  .build();



module.exports = {
    getFleetNames: function(next){
         request.get(config.fleetMSURL + '/fleets/', 
                {json: true},
                (err,res,body) => {
                    if (err) { return console.err(err); }
                    next(body);
                }); 
    },

    getShips : function(fleetName,next) {
        //var opts = buildOptions('GET',config.fleetMSURL + '/fleets/' +req.params.fleetName);
        //opts.headers['Content-Type']='multipart/form-data';
        request.get(config.fleetMSURL + '/fleets/' +fleetName,
                        {json: true},                  
                        (err,res,body) => {
                            if (err) { return console.log(err); }
                            // console.log(JSON.parse(body));
                           next(body);
                        }); 
    },

    fleetSimulation: function(ctl) {
        request.post({
            url: config.fleetMSURL + '/fleets/simulate',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'}, 
            body: JSON.stringify(ctl) },               
        (err,res,body) => {
            if (err) { return console.log(err); }
            console.log(JSON.parse(body));
        }); 
    },
    shipSimulation: function(ctl) {
        request.post({url: config.fleetMSURL + '/ships/simulate',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'}, 
        body: JSON.stringify(ctl) },                
        (err,res,body) => {
            if (err) { return console.log(err); }
            console.log(JSON.parse(body));
        });
    }

}