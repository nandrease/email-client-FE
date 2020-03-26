import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Email } from "../email";

@Component({
  selector: "app-email-create",
  templateUrl: "./email-create.component.html",
  styleUrls: [ "./email-create.component.css" ]
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;

  constructor(private authService: AuthService) {
    this.email = {
      id: "",
      to: "",
      subject: "",
      from: `${authService.username}@angular-email.com`,
      text: "",
      html: ""
    };
  }

  ngOnInit(): void {}

  onSubmit(email: Email) {
    // Send the email off vie the email service
    console.log(email);
  }
}
