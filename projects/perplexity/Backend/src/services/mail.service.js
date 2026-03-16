import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

transpoter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
export const sendEmail = async ({to, subject, text, html}) => {
  const mailOption = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
    };
    const details = await transpoter.sendMail(mailOption)
    console.log("Email sent: ", details)
};

