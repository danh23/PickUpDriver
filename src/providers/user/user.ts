import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Config } from "../../config/config";
import { User } from "../../shared/user/user";
import { endpoints } from "../../config/endpoint";

@Injectable()
export class UserProvider {
  
    private options: RequestOptions;
    
    constructor(private http: Http) {}

    register(user: User) {
      let url = Config.apiUrl + endpoints
      let result = this.http.post(url, user, this.options)
      .map((response: Response) => <number>response.json())
      .do(data => console.log("Do data: " + JSON.stringify(data)))
      .catch(this.handleError);
      return result;
    }

    login(email: string) {
      let url = Config.apiUrl + endpoints.getUserByEmail;
      let result = this.http.post(url, email, this.options)
      .map((response: Response) => response.json())
      .do(data => console.log("Do data: " + JSON.stringify(data)))
      .catch(this.handleError);
      return result;
    }

    getCarTypes() {
        let url = Config.apiUrl + endpoints.getCarTypes;
        let result = this.http.get(url, this.options)
        .map((response: Response) => response.json())
        .do(data => console.log("Do data: " + JSON.stringify(data)))
        .catch(this.handleError);
        return result;
    }
  
    private handleError(err) {
        let errMessage: string;
        if (err instanceof Response) {
            let body = err.json() || '';
            errMessage = body.message;
        } else {
            errMessage = err.meessage ? err.message : err.toString();
        }
        return Observable.throw(errMessage);
    }
}