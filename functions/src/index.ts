import * as functions from "firebase-functions";
const nodemailer = require("nodemailer");

import { User } from "../../src/models/user";

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

let db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().google.email;
const gmailPassword = functions.config().google.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Your company name to include in the emails
const APP_NAME = "LiveScape - Earth Accents Landscaping";

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  // create profile document
  let profile = new User({
    uid: user.disabled,
    displayName: user.displayName,
    email: user.email,
    phone: user.phoneNumber,
    photoURL: user.photoURL
      ? user.photoURL
      : "http://lorempixel.com/g/200/200/cats/1",
    providers: [],
    active: false,
    lastLogin: user.metadata.lastSignInTime,
    role: "",
  });

  // Add a new document in collection "users"
  db.collection("users")
    .doc(user.uid)
    .set(profile);

  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  // [END onDeleteTrigger]
  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyeEmail(email, displayName);
});
// [END sendByeEmail]

// Sends a welcome email to the given user.
async function sendWelcomeEmail(
  email: string | undefined,
  displayName: string | undefined
) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@wayhighradio.com>`,
    to: email,
    subject: "",
    text: "",
  };

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName ||
    ""}! Welcome to ${APP_NAME}. I hope you will enjoy the platform.`;
  await mailTransport.sendMail(mailOptions);
  console.log("New welcome email sent to:", email);
  return null;
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(
  email: string | undefined,
  displayName: string | undefined
) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@wayhighradio.com>`,
    to: email,
    subject: "",
    text: "",
  };

  mailOptions.subject = `Bye!`;
  mailOptions.text = `Hey ${displayName ||
    ""}!, We confirm that we have deleted your ${APP_NAME} account.`;
  await mailTransport.sendMail(mailOptions);
  console.log("Account deletion confirmation email sent to:", email);
  return null;
}
