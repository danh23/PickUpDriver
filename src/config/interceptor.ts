import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, BaseRequestOptions, RequestOptionsArgs } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import { Config } from "./config";


@Injectable()
export class Interceptor extends BaseRequestOptions {

  constructor() {
    super();
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    newOptions.headers.append('Authorization', Config.token);
    if(!newOptions.headers.get('Content-Type')){
      newOptions.headers.append('Content-Type', 'application/json');
    }
    return newOptions;
  }
}