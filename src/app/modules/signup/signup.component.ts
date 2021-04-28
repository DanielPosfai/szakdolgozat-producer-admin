import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { ConfirmedValidator } from './CustomValidator/confirmed.validator';
import { SignupService } from './signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})
export class SignUpComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();
    constructor(private service: SignupService, private router: Router, private snackBar: MatSnackBar) { }

    ngOnInit(): void {

        this.initForm();
    }

    initForm(): void {
        this.form = new FormGroup({
            lastName: new FormControl('', [
                Validators.required
            ]),
            firstName: new FormControl('', [
                Validators.required
            ]),
            userName: new FormControl('', [
                Validators.required
            ]),
            phoneNumber: new FormControl('', [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(12)
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@+[a-zA-Z0-9-]+[.]+[a-zA-Z]+$')
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),
            confirmPassword: new FormControl('', []),
        }, {
            validators: ConfirmedValidator.bind(this)
            // ennek a formnak átadása
        });

    }

    onSubmit(): void {

        // stop here if form is invalid
        if (this.form.invalid) {

            return;
        }

        const newUser = new User();
        newUser.firstname = this.form.get('lastName').value;
        newUser.lastname = this.form.get('lastName').value;
        newUser.username = this.form.get('userName').value;
        newUser.phonenumber = this.form.get('phoneNumber').value;
        newUser.email = this.form.get('email').value;
        newUser.password = this.form.get('password').value;
        newUser.role = 'producer';


        this.service.addNewUser(newUser).subscribe({
            next: response => {

                if (response === 'user already exists') {

                    this.snackBar.open('A megadott felhasználónév foglalt!', 'Ok', {
                        panelClass: ['snackbar-color-warn'],
                        duration: 10000

                    });
                    return;

                }
                if (response === 'email already exists') {
                    this.snackBar.open('A megadott email cím foglalt!', 'Ok', {
                        panelClass: ['snackbar-color-warn'],
                        duration: 10000
                    });
                    return;
                }
                this.snackBar.open('Sikeres regisztráció!', 'Ok', {
                    panelClass: ['snackbar-color'],
                    duration: 3000
                });

                this.router.navigate(['/login']);
            },
            error: err => {
                alert(err);
            }
        }
        );

    }
}
