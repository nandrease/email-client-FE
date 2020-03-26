import { Component, OnChanges, Input } from "@angular/core";
import { EmailService } from "../email.service";
import { Email } from "../email";

@Component({
  selector: "app-email-reply",
  templateUrl: "./email-reply.component.html",
  styleUrls: [ "./email-reply.component.css" ]
})
export class EmailReplyComponent implements OnChanges {
  @Input() email: Email;
  showModal = false;

  constructor(private emailService: EmailService) {}

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: "RE: " + this.email.subject,
      text: `\n\n-------- from ${this.email.from}\n${this.email.text}`
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
