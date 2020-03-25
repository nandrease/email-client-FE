import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

interface UsernameAvailableResponse {
  available: boolean;
}
interface SignupCedentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SignupResponse {
  username: string;
}
interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  rootUrl = "https://api.angular-email.com";
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(this.rootUrl + "/auth/username", {
      username
    });
  }

  signup(credentials: SignupCedentials) {
    return this.http.post<SignupResponse>(this.rootUrl + "/auth/signup", credentials).pipe(
      tap(() => {
        this.signedIn$.next(true);
      })
    );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(this.rootUrl + "/auth/signedin").pipe(
      tap(({ authenticated }) => {
        this.signedIn$.next(authenticated);
      })
    );
  }
}
