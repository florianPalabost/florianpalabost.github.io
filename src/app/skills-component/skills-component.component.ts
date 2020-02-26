import { Component, OnInit } from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {JsonService} from '../services/json.service';

@Component({
  selector: 'app-skills-component',
  templateUrl: './skills-component.component.html',
  styleUrls: ['./skills-component.component.scss']
})
export class SkillsComponentComponent implements OnInit {
  faStar = faStar;
  skills = [];
  constructor(private jsonService: JsonService) { }

  ngOnInit() {
    this.skills = this.jsonService.getSkills().shift();
    $(function () {
      $('[data-toggle="popover"]').popover();
    })
  }

}
