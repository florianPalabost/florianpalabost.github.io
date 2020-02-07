import { Component, OnInit } from '@angular/core';
import {JsonService} from '../services/json.service';
import {faPlus, faTimes, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projects-component',
  templateUrl: './projects-component.component.html',
  styleUrls: ['./projects-component.component.scss']
})
export class ProjectsComponentComponent implements OnInit {
  projects = [];
  faPlus = faPlus;
  faTimes = faTimes;
  faStar = faStar;
  constructor(private jsonService: JsonService) { }

  ngOnInit() {
    this.projects = this.jsonService.getProjects();
  }

}
