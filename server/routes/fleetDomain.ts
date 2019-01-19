export class FleetControl {
	fleetName:string = "";
	command:string = "";
    numberOfMinutes:number = 2;
}


export class ShipControl {
    shipName:string = "";
	command:string = "";
    numberOfMinutes:number = 2;
}

export class SimulResponse {
    status: string = "";
}

export class Ship {
    name: string = "";
    longitude?: string = "";
    latitude?: string = "";
    maxRow?: number = 4;
    maxColumn?: number = 6;
    status?: string;
    port?: string;
    type?: string;
    numberOfContainers?: number = 0;
}

export class Fleet {
    id: string =""; 
    name: string = "";
    color?: string = "";
    ships?: Ship[] ;
}

export class ProblemReport {
    issue: string = '';
    containerId: string = '';
    shipId: string = '';
    status?: string;
    weatherC?: number = 0;
    tempC?: number = 0;
    amp?: number = 0;
    latitude?: string;
    longitude?: string;
    tag?: string;
    severity?: string;
    ts?: any;
}

export class ShipPosition {
    shipID: string = '';
    latitude?: string;
    longitude?: string;
    speed?: number;
    status?: string;
	ambiantTemperature?: number;
    compass?: number;
    ts?: any;
}
