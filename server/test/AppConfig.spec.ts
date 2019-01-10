
import "jasmine";
import { expect } from 'chai';
import AppConfig  from '../config/AppConfig';


describe('Config', () => {
    it('should return a broker lists', () => {
        let appCfg = new AppConfig();
        let brokers = appCfg.getKafkaBrokers();
        expect(brokers).to.contain("9092");
    });

    it('should have a problem topic name', () => {
        let appCfg = new AppConfig();
        expect(appCfg.getProblemTopicName()).to.be.equal("bluewaterProblem");
    });

    it('should have a ship topic name', () => {
        let appCfg = new AppConfig();
        expect(appCfg.getShipTopicName()).to.be.equal("bluewaterShip");
    });

})