import { Injectable } from '@angular/core';
import projects from '../projects-component/projects.json';
import experiences from '../experiences-component/experiences.json';
import educations from '../educations-component/educations.json';
import skills from '../skills-component/skills.json';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private projectsList = projects;
  private experiencesList = experiences;
  private educationsList = educations;
  private skillsList = skills;

  constructor() { }

  getProjects() {
    return this.projectsList;
  }

  getExperiences() {
    return this.experiencesList;
  }

  getEducations() {
    return this.educationsList;
  }

  getSkills() {
    return this.skillsList;
  }
}
