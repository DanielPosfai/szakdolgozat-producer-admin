import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '@app/shared/customValidator/confirmed.validator';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { AddCustomerService } from './addCustomer.service';



@Component({
    selector: 'app-addCustomer',
    templateUrl: 'addCustomer.component.html',
    styleUrls: ['addCustomer.component.scss']
})
export class AddCustomerComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();

    constructor(private service: AddCustomerService, private router: Router) { }

    ngOnInit() {

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
                Validators.maxLength(11)
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z]+$')
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),
            confirmPassword: new FormControl('', [])

        },{
            validators: ConfirmedValidator.bind(this)
            // ennek a formnak átadása
        },)

    }

    onSubmit() {

        // stop here if form is invalid
        if (this.form.invalid) {

            return;
        }

        let newUser = new User;
        newUser.firstname = this.form.get("lastName").value;
        newUser.lastname = this.form.get("lastName").value;
        newUser.username = this.form.get("userName").value;
        newUser.phonenumber = this.form.get("phoneNumber").value;
        newUser.email = this.form.get("email").value;
        newUser.password = this.form.get("password").value;
        newUser.role = "customer";


        this.service.addNewUser(newUser).subscribe({
            next: response => {

                if (response == 'user already exists') {
                    alert("user alredy exist");
                    return;

                }
                if (response == 'email already exists') {
                    alert("email alredy exist");
                    return;
                }
                this.router.navigate(['/customers/list']);
            },
            error: err => {
                alert(err);
            }
        }
        );

    }
}
