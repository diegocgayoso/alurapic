import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerLog } from './server-log';
import { environment } from 'src/environments/environment';


const API_INFRA = environment.serverLog;
@Injectable({ providedIn: 'root' })
export class ServerLogService {
  constructor(private http: HttpClient){}

  log(serverLog: ServerLog){
    return this.http.post(API_INFRA + '/infra/log', serverLog);
  }
}
