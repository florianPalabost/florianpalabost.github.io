import { Component, OnInit } from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {JsonService} from '../services/json.service';

@Component({
  selector: 'app-educations-component',
  templateUrl: './educations-component.component.html',
  styleUrls: ['./educations-component.component.scss']
})

export class EducationsComponentComponent implements OnInit {
  faStar = faStar;
  educations = [];

  constructor(private jsonService: JsonService) { }

  ngOnInit() {
    this.educations = this.jsonService.getEducations();
    this.educations.forEach((edu) => {
      edu.annee = new Date(edu.year).toLocaleDateString();
    });
  }

}
