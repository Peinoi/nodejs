//sendmail.js
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "recod368@daum.net",
    pass: "mzzygkbwbiksiaas",
  },
});

function mailSendFunc(name, path) {
  const data = {
    from: "recod368@daum.net",
    to: "recod368@daum.net",
    subject: "subject",
    html: "Sample Content",
    attachments: [
      {
        filename: `${name}.xlsx`,
        path: `${path}`,
      },
    ],
  };

  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      // res.status(500).send({ error: err.message });
    } else {
      console.log(info);
      // res.send("Email sent successfully");
      resolve(info);
    }
  });
}
mailSendFunc();
module.exports = { mailSendFunc };
