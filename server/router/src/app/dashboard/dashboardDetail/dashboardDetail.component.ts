import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

import { SelectivePreloadingStrategyService } from '../../selective-preloading-strategy.service';

@Component({
  selector: 'app-dashboardDetail',
  templateUrl: './dashboardDetail.component.html',
  styleUrls: ['./dashboardDetail.component.css']
})
export class DashboardDetailComponent implements OnInit {
  lastName!: Observable<string>;
  id!:Observable<string>;
  fullName!:string;
  email?: string;

  constructor(
    private route: ActivatedRoute,private router:Router,  private accountService: AccountService,
  ) {
   
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.email = params['email'];
      
    })
  }

getdetail(){
  return this.email;
}


}