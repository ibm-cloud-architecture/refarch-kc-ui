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
