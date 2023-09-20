import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {
    if (localStorage.getItem('userToken') !== null) this.decodeToken();
    console.log(this.userData);
  }

  userData = new BehaviorSubject<any>(null);

  decodeToken() {
    const encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedToken));
  }

  getUserId(): string | null {
    const user = this.userData.value;
    if (user) {
      return user.id;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userToken');
  }
}
