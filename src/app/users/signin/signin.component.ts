import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router,
    private alertService: AlertService
  ) {
    // user already logged, we redirect him to the home page
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // when we are not connected to a page which need to be connected, redirect to /user/login and then redirect to returnUrl
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user/profile';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    // form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.alertService.success('Login successful', true);
        },
        error => {
          this.error = error;
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
