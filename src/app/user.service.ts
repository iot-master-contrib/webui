import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {RequestService} from "./request.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: any;
  public userSub = new Subject<any>();

  public getting = true;

  constructor(private rs: RequestService) {
    console.log("user me")
    rs.get('user/me').subscribe(res => {
      console.log("user me ok")
      this.setUser(res.data) ;
    }, error => {
      this.userSub.error(error)
    }).add(()=>{
      console.log('getting false')
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
