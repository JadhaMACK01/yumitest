import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm,FormBuilder } from '@angular/forms';
import { MustMatch } from '../../../_helpers/must-match.validator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide = true;
  submitted = false;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) { 

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}')]],
      university:[null],
      confirmPassword: [null, Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword'),
      
    });
  }
  get f() { return this.registerForm.controls; }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
  }

  /*if registered successfully, 
  1)automatically generate an user id number and 
  2)prompt: registered successfully
  3)jump to the login page, enter the email and password to enter the dashboard page*/
  
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  this.router.navigateByUrl('/login');
  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

  }
}

