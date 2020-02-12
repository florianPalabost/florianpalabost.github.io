import { Component, OnInit } from '@angular/core';
import {faDownload, faEnvelope, faStar} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.component.html',
  styleUrls: ['./about-component.component.scss']
})
export class AboutComponentComponent implements OnInit {
  faDownload = faDownload;
  faStar = faStar;
  faLinkedIn = faLinkedin;
  faGithub = faGithub ;
  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit() {
  }

  downloadPdf() {
    const pdfUrl = 'assets/cv_florian.pdf';
    const pdfName = 'cv_florian.pdf';
    FileSaver.saveAs(pdfUrl, pdfName);
  }
}
