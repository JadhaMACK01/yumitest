import { Injectable } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class AccountDataShareService{
    userData:Account;
    constructor(){
      this.userData= {};
    }
    logUserData(val: Account){
      this.userData= val;
    }
    viewUserData(){
      return this.userData;
    }
}
