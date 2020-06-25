import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { ProjectsComponentComponent } from './projects-component/projects-component.component';
import { ExperiencesComponentComponent } from './experiences-component/experiences-component.component';
import { SkillsComponentComponent } from './skills-component/skills-component.component';
import { EducationsComponentComponent } from './educations-component/educations-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { AboutComponentComponent } from './about-component/about-component.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { ContactComponentComponent } from './contact-component/contact-component.component';
import { FileSaverModule } from 'ngx-filesaver';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GraphQLModule } from './graphql.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { AppRoutingModule } from './app-routing.module';
import { ProgressBarModule } from 'angular-progress-bar';
import { AlertComponent } from './alert/alert.component';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthInterceptor } from './users/auth.interceptor';
import { OktaAuthModule, OKTA_CONFIG, OktaCallbackComponent } from '@okta/okta-angular';
import sampleConfig from './app.config';
import { NotFoundComponent } from './not-found/not-found.component';

const oktaConfig = Object.assign(
  {
    onAuthRequired: ({ oktaAuth, router }) => {
      // Redirect the user to your custom login page
      router.navigate(['/login']);
    }
  },
  sampleConfig.oidc
);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponentComponent,
    AlertComponent,
    ProjectsComponentComponent,
    ProjectAddComponent,
    ExperiencesComponentComponent,
    SkillsComponentComponent,
    EducationsComponentComponent,
    FooterComponentComponent,
    AboutComponentComponent,
    ContactComponentComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    VerticalTimelineModule,
    FileSaverModule,
    ProgressBarModule,
    OktaAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      // compiler configuration
      compiler: {
        provide: TranslateCompiler,
        useFactory: TranslateMessageFormatCompilerFactory
      }
    }),
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    GraphQLModule,
    AppRoutingModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function TranslateMessageFormatCompilerFactory() {
  return new TranslateMessageFormatCompiler();
}
