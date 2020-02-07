import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../services/projects.service';

@Component({
  selector: 'app-projects-component',
  templateUrl: './projects-component.component.html',
  styleUrls: ['./projects-component.component.scss']
})
export class ProjectsComponentComponent implements OnInit {
  projects = [];

  constructor(private projetsService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.projetsService.getProjects();
  }

}
