/**
 * Client to call the Fleet manager microservice
 */
import * as domain from './fleetDomain';
import AppConfig  from '../config/AppConfig';

import * as request from 'request-promise-native';


 export default class FleetClient {
    config:AppConfig;

    constructor() {
        this.config =  new AppConfig();
    }

    public getFleetNames(): Promise<domain.Fleet[]> {
        return request.get(this.config.getFleetMSURL() + '/fleets/', 
               {json: true})
               .then( (body) => {
                   return <domain.Fleet[]>body;
               })
               .catch( (err) => {
                   console.log(err);
                   return [];
               });
               
   }

   public getFleetByName(fleetName: string): Promise<domain.Fleet> {
    return request.get(this.config.getFleetMSURL() + '/fleets/' +fleetName,
        {json: true})
        .then( (body) => {
            return <domain.Fleet>body;
        })
        .catch( (err:any) => {
            console.log(err);
            return new domain.Fleet();
        });
   }

   public fleetSimulation(ctl: domain.FleetControl): Promise<domain.SimulResponse> {
    return request.post(
        this.config.getFleetMSURL() + '/fleets/simulate',
        {json: true,
         headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'}, 
         body: ctl 
        })
        .then( (body ) => {
            return <domain.SimulResponse>body;
        })
        .catch( (err: any) => {
            console.log(err);
            let rep: domain.SimulResponse = {status:"Error"};
            return rep;
        });               
    }; 

    public shipSimulation(ctl: domain.ShipControl): Promise<domain.Ship>  {
        return request.post(
            this.config.getFleetMSURL() + '/ships/simulate',
            {json: true,
             headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'}, 
             body: ctl 
            })
            .then( (body:any ) => {
                return <domain.Ship> body;
            })
            .catch( (err: any) => {
                let ship: domain.Ship = new domain.Ship();
                ship.name = ctl.shipName;
                ship.status = "Error";
                return ship;
            });
    }
 }
