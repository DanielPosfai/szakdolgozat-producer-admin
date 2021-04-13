import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from '@app/shared/customValidator/confirmed.validator';
import { User } from '@app/shared/models/user.model';
import { AuthUtil } from '@app/shared/utils/authorizationCheck.util';
import { EditItemService } from './editItem.service';


@Component({
    selector: 'app-editItem',
    templateUrl: 'editItem.component.html',
    styleUrls: ['editItem.component.scss']
})
export class EditItemComponent implements OnInit {

    public form: FormGroup;
    public isAuthenticated = AuthUtil.checkAuthorization();
    public customer = new User;
    public userId = 'id';
    public id = this.route.snapshot.params[this.userId];

    constructor(private service: EditItemService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        
        this.getSingleProduct();
    }

    initForm(): void {
        this.form = new FormGroup({
            lastName: new FormControl(this.customer.lastname, [
                Validators.required
            ]),
            firstName: new FormControl(this.customer.firstname, [
                Validators.required
            ]),
            userName: new FormControl(this.customer.username, [
                Validators.required
            ]),
            phoneNumber: new FormControl(this.customer.phonenumber, [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(11)
            ]),
            email: new FormControl(this.customer.email, [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z]+$')
            ]),
            password: new FormControl('', [
                Validators.minLength(8)
            ]),
            confirmPassword: new FormControl('', [])

        },{
            validators: ConfirmedValidator.bind(this)
            // ennek a formnak átadása
        },)

    }

    getSingleProduct() {
        this.service.getProduct(this.id).subscribe({
            next: response => {
                this.customer = response;
                this.initForm();
            },
            error: () => {
            }
        });
    }
   
    onSubmit() {

        // stop here if form is invalid
        if (this.form.invalid) {
            console.log("here1");
            return;

        }
        console.log("here");
        let newUser = new User;
        newUser.lastname = this.form.get("lastName").value;
        newUser.firstname = this.form.get("firstName").value;
        newUser.username = this.form.get("userName").value;
        newUser.phonenumber = this.form.get("phoneNumber").value;
        newUser.email = this.form.get("email").value;


        if(this.form.get("password").value == ""){
            newUser.password = "asd";
        }else{
            newUser.password = this.form.get("password").value;
        }
        
        newUser.role = "customer";

        console.log(newUser);
        this.service.editProduct(newUser, this.id).subscribe({
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
