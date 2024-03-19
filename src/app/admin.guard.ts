import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "./user.service";
import {Subject} from "rxjs";

export const adminGuard: CanMatchFn = () => {
    const us = inject(UserService);
    const router = inject(Router);

    if (us.user) {
        if (us.user.admin)
            return true;
    }

    if (us.getting) {
        const sub = new Subject<any>()
        us.userSub.subscribe(res => {
            if (us.user.admin)
                sub.next(true)
            else
                sub.next(router.parseUrl("/select"))
        })
        return sub.asObservable()
    }

    return router.parseUrl("/select")
};
