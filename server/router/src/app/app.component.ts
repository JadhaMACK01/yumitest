import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { AccountDataShareService } from './services/accountDataShare.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  email:string | undefined;
  constructor(private accountDataShareService:AccountDataShareService) {}


  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  geturl(){
    this.email=this.accountDataShareService.userData.email;
    const url = `/${this.email}/dashboard`;
    return url;

  }
}
