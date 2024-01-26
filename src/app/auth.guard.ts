import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "./user.service";
import {Subject} from "rxjs";

export const authGuard: CanMatchFn = (route, segments) => {
  const us = inject(UserService);
  const router = inject(Router);


  if (us.user) {
    //console.log('auth ok')
    return true;
  }
  //return true;

  if (us.getting) {
    //console.log('auth getting')
    const sub = new Subject<any>()
    us.userSub.subscribe(res => {
      //console.log('auth getting ok')
      sub.next(true)
    })
    return sub.asObservable()
  }

  return router.parseUrl("/login")
};
