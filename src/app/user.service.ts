import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {RequestService} from "../../projects/smart/src/lib/request.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: any;
  public userSub = new Subject<any>();

  public getting = true;

  constructor(private rs: RequestService) {
    //console.log("user me")
    rs.get('user/me').subscribe({
      next: res => {
        //console.log("user me ok")
        this.setUser(res.data);
      }, error: err => {
        //console.error('user.service.error', err)
        this.userSub.error(err)
      }
    }).add(() => {
      //console.log('getting false')
      this.getting = false;
    })
  }

  setUser(user: any) {
    this.user = user;
    this.userSub.next(user);
  }

  getUser() {
    return this.user;
  }

  subscribe() {
    return this.userSub.subscribe()
  }

}
