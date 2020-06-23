import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GraphQLService } from '../services/graph-ql.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  formProject;
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files = [];
  techs = [];
  selectedTechnos = [];
  linksImg = [];
  dropdownSettings = {};

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private gQLService: GraphQLService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.formProject = this.fb.group({
      id: '',
      title: '',
      description: '',
      img: '',
      technos: '',
      url: '',
      anneeReal: ''
    });

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
  }

  async addProject() {
    this.formProject.value.id = this.formProject.value.title;
    this.formProject.value.img = this.linksImg.join();
    this.formProject.value.technos = this.selectedTechnos.join();
    await this.gQLService.createProject(this.formProject.value);
    await this.router.navigateByUrl('/');
    this.alertService.success('Le projet a été ajouté !', true);
  }

  async uploadFile(file) {
    this.fileUpload.nativeElement.value = '';
    const formData = new FormData();
    formData.append('uploadedImage', file?.data);
    file.inProgress = true;
    try {
      const isUpload = await this.uploadService.upload(file?.data);
      console.log('rep;', isUpload);
    } catch (e) {
      console.log(e);
    }
    file.progress = 100;
    file.inProgress = false;
    this.linksImg.push(file?.data?.name);
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = async () => {
      const file = { data: fileUpload.files[fileUpload.files.length - 1], inProgress: false, progress: 0 };
      this.files.push(file);
      await this.uploadFile(file);
    };
    fileUpload.click();
    console.log('links img : ', this.linksImg);
  }

  addSkill(val: any) {
    this.selectedTechnos.push(val);
  }

  removeSkillFromSelected(val: any) {
    this.selectedTechnos.filter((skill, index) => {
      if (skill === val) {
        this.selectedTechnos.splice(index, 1);
      }
    });
  }

  refreshSkills() {
    this.selectedTechnos = [];
  }

  fullSkills() {
    this.selectedTechnos = this.techs;
  }
}
