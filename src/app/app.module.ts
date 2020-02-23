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
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {VerticalTimelineModule} from 'angular-vertical-timeline';
import { ContactComponentComponent } from './contact-component/contact-component.component';
import {FileSaverModule} from 'ngx-filesaver';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      // compiler configuration
      compiler: {
        provide: TranslateCompiler,
        useFactory: (TranslateMessageFormatCompilerFactory)
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function TranslateMessageFormatCompilerFactory() {
  return new TranslateMessageFormatCompiler();
}
