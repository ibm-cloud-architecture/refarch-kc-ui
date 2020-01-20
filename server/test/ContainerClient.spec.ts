import { expect, assert }  from 'chai';
import ContainerClient from '../routes/ContainerClient'


describe('Container client', () => {
    it('it should return a list of the containers', async function() {
        let client = new ContainerClient();
        client.getContainers().then( data => {
            console.log(data);
            assert.isOk(data);
        })
    });
});