import { Container } from './container';

export class Ship {
    name: string;
    longitude?: string = '';
    latitude?: string = '';
    maxRow?: number = 4;
    maxColumn?: number = 6;
    status?: string;
    port?: string;
    type?: string;
    numberOfContainers?: number = 0;
    containers?: Container[];
}
