import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Config } from "../../config/config";
import { User } from "../../shared/user/user";

@Injectable()
export class UserProvider {
  constructor(private http: Http) {}

  register(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "Users",
      JSON.stringify({
        Username: user.email,
        Email: user.email,
        Password: user.password
      }),
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  login(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    //for testing
    return new Observable(observer => {
        observer.next("test");
    });
    
    // return this.http.post(
    //   Config.apiUrl + "oauth/token",
    //   JSON.stringify({
    //     username: user.email,
    //     password: user.password,
    //     grant_type: "password"
    //   }),
    //   { headers: headers }
    // )
    // .map(response => response.json())
    // .do(data => {
    //   Config.token = data.Result.access_token;
    // })
    // .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}