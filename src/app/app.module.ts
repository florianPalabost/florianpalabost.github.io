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
    AboutComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
