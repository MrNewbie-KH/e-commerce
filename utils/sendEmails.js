const nodemailer = require("nodemailer");
const sendEmail = async function (options) {
  // 1) create transporter service(mailgun, mailtrap, gmail ...etc)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });
  // 2) add email options from to ..etc
  const mailOptions = {
    from: "E-commerce <mkhattab369@gmail.com>",
    to: options.to,
    subject: options.subject,
    text: options.text,
  };
  // 3) send email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
