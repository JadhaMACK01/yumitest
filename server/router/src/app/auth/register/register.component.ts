import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm,FormBuilder } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide = true;
  submitted = false;
  registerForm!: FormGroup;
  loading=false;
  

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private accountService: AccountService,
              private alertService:AlertService,
              private route:ActivatedRoute) 
              { }

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
  
  onSubmit():void {
  
    this.submitted = true;
   // validate the inputs
    if (this.registerForm.invalid) {
      return;
    }

    
  // check if the email has been registered
  this.accountService.get(this.registerForm.value.email)
  .subscribe(
    response=>{
      console.log(response);
      var dbemail=JSON.stringify(response.email);
      var inemail='"'+this.registerForm.value.email+'"';
      //if has such account
      if(dbemail!=inemail){
              /*if registered successfully, 
        1)automatically generate an user id number and */
        this.accountService.create(this.registerForm.value)
        .subscribe(
          response=>{
            console.log(response);
            var message=JSON.stringify(response.message);
          
            //this.submitted=true;
            //2)prompt: registered successfully
            alert('SUCCESS!! :-)\n\n' + 'Welcome'+JSON.stringify(this.registerForm.value.lastName))
            //3)jump to the login page, enter the email and password, then user can enter the dashboard page
            this.router.navigateByUrl('/login');
          
          },
          error=>{
            console.log(error);
          }
        );
    
     }//no such account-not register
      else{ alert('This email has been registered. Please login or use another email to register.');}
    },
    error=>{
      console.log(error);
    }  
  );
  

   
 


/*
  this.loading = true;
  this.accountService.register(this.registerForm.value)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('Registration successful hhshsh', { keepAfterRouteChange: true });
              this.router.navigate(['/login'], { relativeTo: this.route });
          },
          error: error => {
              this.alertService.error(error);
              this.loading = false;
          }
      });
*/

 

  }
}

