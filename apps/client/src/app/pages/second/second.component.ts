import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export default class SecondComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
