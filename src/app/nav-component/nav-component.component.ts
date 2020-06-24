import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OktaAuthService } from '@okta/okta-angular';
import appConfig from '../app.config';
@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.scss']
})
export class NavComponentComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(public translate: TranslateService, private oktaAuth: OktaAuthService) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    translate.use('fr');

    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => (this.isAuthenticated = isAuthenticated));
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  async logout() {
    // Read idToken before local session is cleared
    const idToken = await this.oktaAuth.getIdToken();

    // Clear local session
    await this.oktaAuth.logout('/');

    // Clear remote session
    window.location.href = `${appConfig.oidc.issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=http://localhost:4200`;
  }

  login() {
    this.oktaAuth.loginRedirect('login');
  }
}
