import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  email='';
  constructor(  
    private route: ActivatedRoute,
    private router:Router, 
    private accountService: AccountService, 
    private accountDataShareService: AccountDataShareService,
    private formBuilder: FormBuilder,) { }

    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.email = params['email'];
        
      })}

}
