import { Component, OnInit } from '@angular/core';
import {faDownload, faStar} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

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

  constructor() { }

  ngOnInit() {
  }

}
