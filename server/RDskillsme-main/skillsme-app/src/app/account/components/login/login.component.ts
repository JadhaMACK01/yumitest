import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  submitted = false;
  loginForm!: FormGroup;
 
  constructor(private formBuilder: FormBuilder ,private router: Router) { 

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}')]]
    });
  }
  get f() { return this.loginForm.controls; }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
  }
  //if all login info are correct, enter to the dashboard page
  this.router.navigateByUrl('/dashboardpage');

  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))

  }
 
  get Email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.value.password;
  }
} 

/* constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { } */