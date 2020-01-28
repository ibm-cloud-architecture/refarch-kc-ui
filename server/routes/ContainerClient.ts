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
            //We need to cast & return `body.content` and not just `body`,
            // as it is a paginated response
            return <domain.Container[]> (body.content);
        })
        .catch( (err) => {
            console.log(err);
            return new Promise((resolve, _) => {
                // resolve empty on error
                resolve([]);
            });
        });

    }
}
