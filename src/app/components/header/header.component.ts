import { CustomRoutes } from './../../constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navList = [
    {
      path: '',
      title: 'Main'
    },
    {
      path: CustomRoutes.create,
      title: 'Create'
    },
    {
      path: CustomRoutes.vote,
      title: 'Vote'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
