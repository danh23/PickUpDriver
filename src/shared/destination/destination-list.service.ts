import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../../config/config";
import { Destination } from "./destination";

@Injectable()
export class DestinationListService {
  constructor(private http: Http) {}

  load() {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);

    return this.http.get(Config.apiUrl + "Destination", {
      headers: headers
    })
    .map(res => res.json())
    .map(data => {
      let destinationList = [];
      data.Result.forEach((destination) => {
        destinationList.push(new Destination(destination.name));
      });
      return destinationList;
    })
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}