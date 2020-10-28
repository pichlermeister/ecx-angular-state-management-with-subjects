import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //"Subject":
  //      is a special kind of Observable, which can also emit values new values to the Stream (see .next(...) ).
  //      If a value is emitted, subscribers will be notified.
  //      late subscribers, won't get previous updates.
  //"BehaviourSubject":
  //      additionally to an regular "Subject" it has an initial value and we can access the last emitted value.
  //      late subscribers will recieve the last emitted value, or the initial value in case nothing was emitted yet.
  //
  // NOTE: "late subscriber": is a Subscriber, which subscribes after a value was emitted
  private authSubject = new BehaviorSubject<string>(null);

  //NOTE: the "authSubject" is private!
  //it's a good practice keep the "Subject" private, so state-updates cannot be done from outside.
  //instead external subscribers will only see a a publically available observable (=> subject.asObservable())
  //if new values get emitted in the subject, the subscribers will be notified through the observable.
  //also note: it seems to be a common practice, that observables are named with a "$" at the send. (=> authState$)
  //           while that's technically not necessary, it makes it easier to distinguish observables from regular types.
  authState$ = this.authSubject.asObservable();

  constructor() {
    console.log('authService - constructor');
    this.autologin();
  }

  private autologin() {
    const username = localStorage.getItem('username');
    if (username) {
      console.debug('autologin for ' + username);
      this.login(username);
    }
  }

  login(username: string) {
    this.authSubject.next(username);
    localStorage.setItem('username', username);
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('username');
  }
}
