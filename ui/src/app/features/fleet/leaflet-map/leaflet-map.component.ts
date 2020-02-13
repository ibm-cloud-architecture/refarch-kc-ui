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

  
  _ships: Ship[];
  seaMap;

  basicIcon:L.Icon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });

  constructor() { }
  @Input()
  set ships(ships: Ship[]) {
    this._ships = ships;
    this.placeMarkers();
  }

  get ships(){
    return this._ships;
  }

  ngOnInit() {
    
    /* Render Map centered on California, with a zoom high enough to fit the usa map
    all mouse and touch interactions on the map are enabled, and it has zoom and attribution controls. */

    this.seaMap = L.map('mapid').setView([37.8044, -122.2711], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  
       attribution: 'OpenStreet map &copy;'
      }).addTo(this.seaMap);
      console.log(JSON.stringify(this.ships));
  }

  addMarker(lat,long,iconType,id,myMap){
    var boat=L.marker([lat,long],{icon: iconType,title: id}).addTo(myMap);
    boat.bindPopup("<b>"+id+"</b>").openPopup();
  }

  ngOnChanges(shipUpdates) {
     console.log("On changes " + JSON.stringify(shipUpdates));
     this.ships = shipUpdates.ships.currentValue;
     this.placeMarkers();
   }

   placeMarkers(){
      if (this.seaMap !== undefined) {
        for(let ship of this.ships) {
          this.addMarker(ship.latitude,ship.longitude,this.basicIcon,ship.name,this.seaMap);
        }
      }
      
   }

}
