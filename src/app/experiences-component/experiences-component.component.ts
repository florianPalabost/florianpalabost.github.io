import { Component, OnInit } from '@angular/core';
import {JsonService} from '../services/json.service';
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experiences-component',
  templateUrl: './experiences-component.component.html',
  styleUrls: ['./experiences-component.component.scss']
})
export class ExperiencesComponentComponent implements OnInit {
  experiences = [];
  faStar = faStar;

  constructor(private jsonService: JsonService) { }

  ngOnInit() {
    this.experiences = this.jsonService.getExperiences();
    this.experiences.forEach((exp) => {
      exp.annee = new Date(exp.year).toLocaleDateString();
    });
  }

}
