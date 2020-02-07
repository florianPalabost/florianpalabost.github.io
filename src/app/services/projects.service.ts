import { Injectable } from '@angular/core';
import projects from '../projects-component/projects.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsList = projects;

  constructor() { }

  getProjects() {
    return this.projectsList;
  }
}
