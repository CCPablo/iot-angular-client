import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginObject } from '../../authentication/model/login-object.model';

import { AuthenticationService } from '../../authentication/service/authentication.service';
import { FormControl } from '@angular/forms';
import { CanvasComponent } from '../../canvas/canvas.component'
import { EngineService } from '../../threeJS/engine.service'

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html' ,
    styleUrls: ['login.component.css']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    error: {code: number, message: string} = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private canvas: CanvasComponent,
        private engine: EngineService) {

        if (this.authenticationService.isAuthenticated()) {
            this.router.navigate(['/']);
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('admin'),
            password: new FormControl(null,Validators.required),
          });
    }

    get formControls() {
        return this.loginForm.controls;
    }

    submitLogin() {
        //console.log(this.loginForm)
        //this.engine.updateCubeSize({x:1, y:1, z:1});
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(new LoginObject(this.loginForm.value))
            .pipe(first()).subscribe(
                token => {
                    console.log(token)
                    this.correctLogin(token);
                    this.canvas.animationInit();
                },
                error => {
                    this.canvas.reset();
                    this.error = JSON.parse(error._body);
                });
    }

    private correctLogin(token: string){
        this.authenticationService.setCurrentSessionWithToken(token);
        this.router.navigate(['/home']);
    }
}
