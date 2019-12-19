import * as domain from './containerDomain';
import AppConfig from '../config/AppConfig';
import * as request from 'request-promise-native';

export default class ContainerClient {
    config: AppConfig;

    constructor () {
        this.config = new  AppConfig();
    }

    public getContainers(): Promise<domain.Container[]>{
        return request.get(this.config.getContainerMSURL(),
        {json: true})
        .then( (body) => {
            return <domain.Container[]>body;
        })
        .catch( (err) => {
            console.log(err);
            return[];
        });

    }
}