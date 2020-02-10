import { Component, OnInit } from '@angular/core';
import {faStar, faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-component',
  templateUrl: './contact-component.component.html',
  styleUrls: ['./contact-component.component.scss']
})
export class ContactComponentComponent implements OnInit {
  faStar = faStar;
  faEnvelope = faEnvelope;
  constructor() { }

  ngOnInit() {
  }

}
