import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Ship } from '../ship/ship';

import * as L from 'leaflet';
declare function require(path: string);


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit, OnChanges {

  @Input()
  ships: Ship[];
  seaMap;

  basicIcon:L.Icon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });

  constructor() { }

  ngOnInit() {
     // Render Map centered on California, with a zoom high enough to fit the usa map
    // all mouse and touch interactions on the map are enabled, and it has zoom and attribution controls.
    this.seaMap = L.map('mapid').setView([37, -120], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar',  attribution: 'OpenStreet map &copy;'
      }).addTo(this.seaMap);

  }

  addMarker(lat,long,iconType,assetID,myMap){
    console.log('Add Marker run');
    L.marker([lat,long],{icon: iconType,title:'Asset ' + assetID}).addTo(myMap);
  }

  ngOnChanges(shipUpdates) {
     console.log(JSON.stringify(shipUpdates));
     this.ships = shipUpdates.assets;
     this.placeMarkers();
   }

   placeMarkers(){
      for(let ship of this.ships) {
        this.addMarker(ship.latitude,ship.longitude,this.basicIcon,ship.name,this.seaMap);
      }
   }

}
