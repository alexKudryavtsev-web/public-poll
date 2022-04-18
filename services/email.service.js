import config from "config";
import nodemailer from "nodemailer";

class EmailService {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.get("SMTP_USER"),
        pass: config.get("SMTP_PASSWORD"),
      },
    });

    this.transporter.verify((err, success) => {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  }

  sendActivationUserMail(to, firstname, link) {
    this.transporter.sendMail({
      from: config.get("SMTP_USER"),
      to,
      subject: `Account activation`,
      html: `
      <div>
      <h2>Hello, ${firstname}. To activate follow the link</h2>
      <a style="font-family: Consolas, 'Courier New', monospace; text-decoration: none; appearance: button;cursor:pointer;" href="${link}">activate</a>
      <h4>If this is not your letter, then ignore it.</h4>
      </div>
      `,
    });
  }
}

export default new EmailService();
