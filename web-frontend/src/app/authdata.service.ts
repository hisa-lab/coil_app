
import { Injectable } from '@angular/core';
;
import { mergeMap } from 'rxjs/operators';
import { of, from, Observable, BehaviorSubject, Subject } from 'rxjs';
import { Account } from '../../lb-sdk';
import { AccountApi, LoopBackAuth } from '../../lb-sdk/services';
import { ValidUserApi, ValidUser } from '../../lb-sdk/'
@Injectable()
export class AuthdataService {
  private emitChangeSource = new Subject<any>();
  public changeEmitted$ = this.emitChangeSource.asObservable();
  public isAuth: Boolean = false;
  public isAdmin: Boolean = false;
  public account: Account = new Account;

  constructor(
    private AccountApi: AccountApi,
    private ValidUserApi: ValidUserApi
  ) {
  }
  ValidUser: ValidUser[];
  emitChange() {
    this.AccountApi.getCurrent({ include: 'ValidUser' }).subscribe((account: Account) => {
      console.log("acount", account.ValidUser);
      this.isAuth = this.AccountApi.isAuthenticated();
      this.account = account;
      if (account.ValidUser !== undefined) {
        this.isAdmin = account.ValidUser.role === 'admin';
      }

      this.emitChangeSource.next();
      //console.log("acountA: ", this.account);
    }, err => {
      // ログイン失敗時は認証情報等を消す
      this.logout();
    });
  }

  logout() {
    this.AccountApi.logout();
    this.isAuth = false;
    this.isAdmin = false;
    this.account = new Account;
    this.emitChangeSource.next();
  }
}