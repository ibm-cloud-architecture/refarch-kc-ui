import { Ship } from './ship/ship';

export class Fleet {
    id: string;
    name: string;
    color?: string;
    ships?: Ship[];
}