import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { ProjectsComponentComponent } from './projects-component/projects-component.component';
import { ExperiencesComponentComponent } from './experiences-component/experiences-component.component';
import { SkillsComponentComponent } from './skills-component/skills-component.component';
import { EducationsComponentComponent } from './educations-component/educations-component.component';
import { InterestsComponentComponent } from './interests-component/interests-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { AboutComponentComponent } from './about-component/about-component.component';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {VerticalTimelineModule} from 'angular-vertical-timeline';
import { ContactComponentComponent } from './contact-component/contact-component.component';
import {FileSaverModule} from 'ngx-filesaver';

@NgModule({
  declarations: [
    AppComponent,
    NavComponentComponent,
    ProjectsComponentComponent,
    ExperiencesComponentComponent,
    SkillsComponentComponent,
    EducationsComponentComponent,
    InterestsComponentComponent,
    FooterComponentComponent,
    AboutComponentComponent,
    ContactComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    VerticalTimelineModule,
    FileSaverModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
