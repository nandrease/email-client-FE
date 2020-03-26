import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Email } from "../email";

@Component({
  selector: "app-email-form",
  templateUrl: "./email-form.component.html",
  styleUrls: [ "./email-form.component.css" ]
})
export class EmailFormComponent implements OnInit {
  emailForm: FormGroup;
  @Input() email: Email;

  constructor() {}

  ngOnInit(): void {
    const { from, to, subject, text } = this.email;
    
    this.emailForm = new FormGroup({
      from: new FormControl(from),
      to: new FormControl(to),
      subject: new FormControl(subject),
      text: new FormControl(text)
    });
  }
}
