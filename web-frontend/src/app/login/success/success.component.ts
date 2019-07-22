import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoopBackAuth } from 'lb-sdk';
import { Account, AccessToken } from '../../../../lb-sdk/models'
import { AuthdataService } from '../../authdata.service';
import { AccountApi } from '../../../../lb-sdk/services';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  public account: Account = new Account();
  public rememberMe = false;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loopBackAuth: LoopBackAuth,
    public AuthdataService: AuthdataService,
    private accountApi: AccountApi
  ) { }

  ngOnInit() {
    this.loopBackAuth.setToken(JSON.parse(this.cookieService.get('authJson')));
    this.cookieService.delete('authJson');
    console.log("hoge");
    // this.accountApi.login(this.account, 'user', this.rememberMe).subscribe((token: AccessToken) => {
    //   this.AuthdataService.emitChange();
    //   this.router.navigate(['/home']);
    // });
    console.log(this.AuthdataService.account);
    this.AuthdataService.emitChange();
    // TOPに遷移
    this.router.navigateByUrl('/home');
  }

}
