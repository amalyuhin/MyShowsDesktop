import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/services/api.service';
import { DataService } from '../shared/services/data.service';
import { AppToolbarService } from '../shared/services/appToolbar.service';
import { ProfileEntity } from '../shared/entities/profile.entity';

require('./login.less');

@Component({
  templateUrl: './login-form.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  data: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dataService: DataService,
    private appToolbarService: AppToolbarService
  ) {}

  ngOnInit() {
    console.log('auth');
    //this.appToolbarService.setTitle('Log In');
    this.appToolbarService.showToolbar(false);
    this.appToolbarService.showMenuButton(false);

    this.loginForm = this.formBuilder.group({
      login: '',
      password: ''
    });
  }

  onSubmit() {
      let data = this.loginForm.value;
      this.apiService
        .login(data.login, data.password)
        .subscribe(
          (res) => {
            console.log('Auth result:', res);

            this.apiService
              .getProfile()
              .subscribe((profile: ProfileEntity) => {
                this.dataService.setProfile(profile);
                this.router.navigate(['/']);
              });
          },
          (err) => {
            console.log('Auth error:', err);
          }
        )

  }
}
