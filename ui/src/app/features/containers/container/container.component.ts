import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { ContainersService } from '../containers.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private containerService: ContainersService) { }

  ngOnInit() {

  }

}