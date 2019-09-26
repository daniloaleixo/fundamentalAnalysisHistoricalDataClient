import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  navLinks = [
    {
      label: 'Análise Fundamentalista',
      path: "/recent"
    },
    {
      label: 'Análise Histórica',
      path: "/historic"
    },
  ];

  constructor() {
  }



  ngOnInit() {

  }

}