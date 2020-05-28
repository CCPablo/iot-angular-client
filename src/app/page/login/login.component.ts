import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { LoginObject } from '../../authentication/model/login-object.model';

import { AuthenticationService } from '../../authentication/service/authentication.service';
import { FormControl } from '@angular/forms';
import { CanvasComponent } from '../../canvas/canvas.component'
import { EngineService } from '../../threeJS/engine.service'
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html' ,
  styleUrls: ['login.component.css']})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
      private router: Router,
      private http: HttpClient,
      private authenticationService: AuthenticationService,
      private canvas: CanvasComponent,
      private engine: EngineService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
        username: new FormControl('admin'),
        password: new FormControl(null,Validators.required),
      });
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  get formControls() {
      return this.loginForm.controls;
  }

  submitLogin() {
      //this.engine.updateCubeSize({x:1, y:1, z:1});
      this.submitted = true;

      const loginFormCopy = this.loginForm.getRawValue();

      if (this.loginForm.invalid) {
          return;
      }

      this.login(new LoginObject(this.loginForm.value))
          .pipe(first()).subscribe(
              token => {
                  this.correctLogin(token, loginFormCopy);
                  //this.canvas.animationInit();
              },
              error => {
                  //this.canvas.reset();
                  console.log(error.message);
                  alert('contraseña incorrecta');
              });
  }

  private login(loginObj: LoginObject): Observable<string> {
      let params = new HttpParams();
      params = params.append('username', loginObj.username);
      params = params.append('password', loginObj.password);
      return this.http.post<any>(`${environment.apiUrl}${this.authenticationService.authUrl}`, null, {params: params, observe: 'response'})
          .pipe(map(res => {
            return res.headers.get('Authorization');
      }));
  }

  private correctLogin(token: string, loginFormCopy){
      this.authenticationService.setCurrentSession({
        token:token,
        user:loginFormCopy.username
      })
      this.router.navigate(['/home']);
  }
}
