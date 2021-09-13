import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-detailSettings',
  templateUrl: './detailSettings.component.html',
  styleUrls: ['./detailSettings.component.css']
})
export class DetailSettingsComponent { 
  currentAccountd: Account = {
    id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  university: '',
  };
  currentAccountAfter: Account = {
    id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  university: '',
  };

  email='';
  message = '';
  updateForm!: FormGroup;
  submitted=false;
  hide = true;
  loading=false;

  constructor(
    private route: ActivatedRoute,
    private router:Router, 
    private accountService: AccountService, 
    private accountDataShareService: AccountDataShareService,
    private formBuilder: FormBuilder,
  ) {
    
   // console.log(accountDataShareService.viewUserData());
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.email = params['email'];
      
    })
    //get account detail
    this.getAccount();
  
    //update submit form    
    this.updateForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}')]],
      university:[null],
      confirmPassword: [null, Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword'),
      
    });

    //set default value
    this.updateForm.controls["firstName"].setValue(this.currentAccountd.firstName);
    this.updateForm.controls["lastName"].setValue(this.currentAccountd.lastName);    
    this.updateForm.controls["email"].setValue(this.currentAccountd.email); 
    this.updateForm.controls["password"].setValue(this.currentAccountd.password); 
    this.updateForm.controls["confirmPassword"].setValue(this.currentAccountd.password);    
    this.updateForm.controls["university"].setValue(this.currentAccountd.university);  
  }

  getAccount(): void {

   this.currentAccountd=this.accountDataShareService.viewUserData();
  }
  get f() { return this.updateForm.controls; }

  resetForm() {
    this.updateForm.controls["firstName"].setValue(this.currentAccountd.firstName);
    this.updateForm.controls["lastName"].setValue(this.currentAccountd.lastName);    
    this.updateForm.controls["password"].setValue(this.currentAccountd.password);    
    this.updateForm.controls["university"].setValue(this.currentAccountd.university);    
  }

  saveForm() {

    this.submitted = true;
    this.currentAccountAfter = this.updateForm.value;
    this.updateAccount();
  }

  updateAccount(): void {
    this.message = '';

    this.accountService.update(this.email, this.currentAccountAfter)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'The account detail was updated successfully!';
          alert('UPDATE SUCCESS!! :-)');
          this.router.navigateByUrl('./settings');
        },
        error => {
          console.log(error);
        });
  }
 
} 
