import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PasswordMatch } from "../validators/password-match";
import { UniqueUser } from "../validators/unique-user";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: [ "./signup.component.css" ]
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        "",
        [ Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/) ],
        [ this.uniqueUser.validate ]
      ),
      password: new FormControl("", [ Validators.required, Validators.minLength(4), Validators.maxLength(20) ]),
      passwordConfirmation: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    },
    {
      validators: [ this.passowrdMatch.validate ]
    }
  );

  constructor(private passowrdMatch: PasswordMatch, private uniqueUser: UniqueUser, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value).subscribe({
      next: response => {
        // Navigate to some other route
      },
      error: err => {
        // Internet problems
        if (err.status === 0) {
          this.authForm.setErrors({ noConnection: true });
          return;
        }
        // Generic errors
        this.authForm.setErrors({ unknownError: true });
      }
    });
  }
}
