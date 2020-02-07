import { Component, OnInit } from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-interests-component',
  templateUrl: './interests-component.component.html',
  styleUrls: ['./interests-component.component.scss']
})
export class InterestsComponentComponent implements OnInit {
  faStar = faStar;
  constructor() { }

  ngOnInit() {
  }

}
