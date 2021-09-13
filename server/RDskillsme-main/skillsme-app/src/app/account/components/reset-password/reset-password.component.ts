import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  submitted = false;

  resetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 

  }
  get f() { return this.resetForm.controls; }
  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    
    if (this.resetForm.invalid) {
      return;
  }

  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.resetForm.value))

  }
}
