import {Component, OnInit} from '@angular/core';
import 'magnific-popup';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faChevronUp = faChevronUp;

  ngOnInit(): void {

  }


}
