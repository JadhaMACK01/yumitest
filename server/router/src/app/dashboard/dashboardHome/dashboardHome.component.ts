import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboardHome',
  templateUrl: './dashboardHome.component.html',
  styleUrls: ['./dashboardHome.component.css']
})
export class DashboardHomeComponent {
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
