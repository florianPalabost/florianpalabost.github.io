import { Component, OnInit } from '@angular/core';
import { JsonService } from '../services/json.service';
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import 'magnific-popup';
import * as AOS from 'aos';
import { GraphQLService } from '../services/graph-ql.service';

@Component({
  selector: 'app-projects-component',
  templateUrl: './projects-component.component.html',
  styleUrls: ['./projects-component.component.scss']
})
export class ProjectsComponentComponent implements OnInit {
  projects = [];
  faPlus = faPlus;
  faStar = faStar;
  dropdownSettings = {};
  techs = [];
  selectedTech = [];
  private query;

  constructor(private jsonService: JsonService, private graphQLService: GraphQLService) {}

  async ngOnInit() {
    this.query = await this.graphQLService.retrieveProjects();
    this.projects = this.query?.data?.projects;
    console.log(this.projects);
    // this.projects = this.jsonService.getProjects();

    this.techs = ['PHP', 'JS', 'Angular', 'VueJS', 'Node.JS', 'Laravel', 'HTML', 'CSS'];
    this.dropdownSettings = {
      singleSelection: false,
      idField: '',
      textField: '',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
      // limitSelection: 2
    };

    // tips: besides if magnificPopup is not recognize (ex : "property not found"), declare new file typing.d.ts and declare the method in it
    this.projects.forEach(project => {
      project.technos = project?.technos?.split(',');
      let imgSrc = [];
      if (project.img !== null) {
        const imgs = project?.img?.split(',');
        imgs.forEach(img => {
          imgSrc.push({ src: 'http://localhost:3003/uploads/projects/' + img });
        });
        project.img = imgSrc[0]?.src;
      }

      // tips: document.ready is deprecated, now we use this method
      $(function() {
        $('#magnific-image-' + project.id).magnificPopup({
          items: imgSrc,
          type: 'image',
          gallery: {
            enabled: true
          }
        });
      });
    });

    AOS.init({
      duration: 2000
    });
  }

  findProjects(item: any) {
    if (!this.selectedTech.includes(item)) {
      this.selectedTech.push(item);
    }

    this.projects =
      this.selectedTech.length === 0
        ? this.jsonService.getProjects()
        : this.jsonService.getProjectsWithTech(this.selectedTech);
  }

  async deleteItemFromSelected(item: any) {
    await this.selectedTech.filter((tech, index) => {
      if (tech === item) {
        this.selectedTech.splice(index, 1);
      }
    });

    // case with selectedTech size 0
    this.projects =
      this.selectedTech.length === 0
        ? await this.jsonService.getProjects()
        : await this.jsonService.getProjectsWithTech(this.selectedTech);
  }

  refreshProject() {
    this.projects = this.jsonService.getProjects();
  }
}
