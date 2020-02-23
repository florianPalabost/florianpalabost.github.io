import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.scss']
})
export class NavComponentComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
