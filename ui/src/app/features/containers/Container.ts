export interface Container {
    id: string;
    type: string;
    temperature: number;
    humidity: number;
    co2: number;
    amp: number;
    status?: string;
    row: number;
    column: number;
    shipId: string;
    latitude: number;
    longitude: number;
}
