import { Container } from './container';

export class Ship {
    name: string;
    longitude?: string = '';
    latitude?: string = '';
    maxRow?: number;
    maxColumn?: number;
    status?: string;
    port?: string;
    type?: string;
    numberOfContainers?: number;
    containers?: Container[][];
}
