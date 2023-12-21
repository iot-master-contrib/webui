import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "./user.service";
import {Subject} from "rxjs";

export const authGuard: CanActivateFn = () => {
  const us = inject(UserService);
  const router = inject(Router);

  if (us.user) {
    console.log('auth ok')
    return true;
  }
  //return true;

  if (us.getting) {
    console.log('auth getting')
    const sub = new Subject<any>()

    us.userSub.subscribe(res => {
      console.log('auth getting ok')
      sub.next(true)
    }, error => {
      sub.next(router.parseUrl("/login"))
    })

    return sub.asObservable()
  }

  return router.parseUrl("/login")
};
