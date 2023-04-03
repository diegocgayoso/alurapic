import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { ErrorHandler } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';
import * as StackTrace from 'stacktrace-js';
import { ServerLogService } from './server-log.service';
import { environment } from './../../../environments/environment.prod';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {

    const location = this.injector.get(LocationStrategy);

    console.log('passei pelo handler')


    const userService = this.injector.get(UserService);

    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const serverLogService = this.injector.get(ServerLogService);
    const router =  this.injector.get(Router)

    const message = error.message
      ? error.message
      : error.toString();
    if(environment.production) router.navigate(['/error']);
    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n')

        console.log(message);
        console.log(stackAsString);
        console.log('Será enviado ao Back-end');
        serverLogService.log({ message, url, userName: userService.getUserName(), stack: stackAsString })
        .subscribe(() => {
          console.log('Error logged on server'),
          err => {
            console.log(err);
            console.log('Fail to send error log to server');
          }
        })
      });
  }

}
