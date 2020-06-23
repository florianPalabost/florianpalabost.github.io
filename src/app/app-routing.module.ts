import { NgModule } from '@angular/core';
import { ProjectAddComponent } from './project-add/project-add.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { SigninComponent } from './users/signin/signin.component';

const routes: Routes = [
  { path: 'projects/add', component: ProjectAddComponent, canActivate: [OktaAuthGuard] },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: SigninComponent
  },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
