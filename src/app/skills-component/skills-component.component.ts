import { Component, OnInit } from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills-component',
  templateUrl: './skills-component.component.html',
  styleUrls: ['./skills-component.component.scss']
})
export class SkillsComponentComponent implements OnInit {
  faStar = faStar;
  constructor() { }

  ngOnInit() {
  }

}
