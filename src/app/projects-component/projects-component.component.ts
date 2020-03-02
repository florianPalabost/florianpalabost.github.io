import { Component, OnInit } from '@angular/core';
import {JsonService} from '../services/json.service';
import {faPlus, faStar} from '@fortawesome/free-solid-svg-icons';
import 'magnific-popup';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';

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

  constructor(private jsonService: JsonService) { }

  ngOnInit() {
    this.projects = this.jsonService.getProjects();
    this.techs = ["PHP","JS","Angular","VueJS","Node.JS","Laravel","HTML","CSS"];
    this.dropdownSettings = {
      singleSelection: false,
      idField: '',
      textField: '',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      // limitSelection: 2
    };

    // tips: document.ready is deprecated, now we use this method
    // tips: besides if magnificPopup is not recognize (ex : "property not found"), declare new file typing.d.ts and declare the method in it
    this.projects.forEach((project) => {

      let imgSrc = [];
      project.img.forEach((img) => {
        imgSrc.push({src: img});
      });

      $(function() {
        $('#magnific-image-' + project.id).magnificPopup(
          {
            items: imgSrc,
            type:'image',
            gallery: {
              enabled: true
            },
          });
      });
    });

  }

  findProjects(item: any) {
    if (!this.selectedTech.includes(item)) {
      this.selectedTech.push(item);
    }

    this.projects = this.selectedTech.length === 0 ?
      this.jsonService.getProjects() : this.jsonService.getProjectsWithTech(this.selectedTech);

  }

 async deleteItemFromSelected(item: any) {
    await this.selectedTech.filter((tech, index) => {
      if (tech === item) {
        this.selectedTech.splice(index, 1);
      }
    });

    // case with selectedTech size 0
   this.projects = this.selectedTech.length === 0 ?
     await this.jsonService.getProjects() : await this.jsonService.getProjectsWithTech(this.selectedTech);
  }

  refreshProject() {
    this.projects = this.jsonService.getProjects();
  }
}
