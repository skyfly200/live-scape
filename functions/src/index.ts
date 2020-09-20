import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
//import "firebase-functions";
import * as nodemailer from "nodemailer";

// import { User } from "../../src/models/user";

admin.initializeApp();

const db = admin.firestore();

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const fromEmail = functions.config().email.from;
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

// [START newUser]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.newUser = functions.auth.user().onCreate(async (user) => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  // create profile document
  const profile = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    phone: user.phoneNumber,
    photoURL: user.photoURL
      ? user.photoURL
      : "http://lorempixel.com/g/200/200/cats/1",
    providers: [],
    active: true,
    role: "new",
  };

  // Add a new document in collection "users" with uid key
  await db
    .collection("users")
    .doc(user.uid)
    .set(profile);

  // Set admin privilege on the user corresponding to uid.
  // The new custom claims will propagate to the user's ID token the next time a new one is issued.
  await admin.auth().setCustomUserClaims(user.uid, { role: "new" });

  return sendWelcomeEmail(email, displayName);
});
// [END newUser]

// [START deleteUser]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  // [END onDeleteTrigger]
  const email = user.email;
  const displayName = user.displayName;

  await db
    .collection("users")
    .doc(user.uid)
    .update({ active: false });

  return sendGoodbyeEmail(email, displayName);
});
// [END deleteUser]

// [START setRole]
// Take a user uid and a role to apply to it
exports.setRole = functions.https.onRequest(async (req, res) => {
  // Grab the parameters
  const uid = req.query.uid ? req.query.uid.toString() : "";
  const role = req.query.role ? req.query.role.toString() : "";
  // Push the new role into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await db
    .collection("users")
    .doc(uid)
    .update({ role: role });
  // Set admin privilege on the user corresponding to uid.
  // The new custom claims will propagate to the user's ID token the next time a new one is issued.
  await admin.auth().setCustomUserClaims(uid, { role: role });
  functions.logger.info("Role Set Results", {
    writeResult: writeResult,
  });
  // Send back a response
  res.status(200);
  res.send(writeResult);
});
// [END setRole]

// Sends a welcome email to the given user.
async function sendWelcomeEmail(
  email: string | undefined,
  displayName: string | undefined
) {
  const mailOptions = {
    from: `${APP_NAME} <${fromEmail}>`,
    to: email,
    subject: "",
    text: "",
  };

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName ||
    ""}! Welcome to ${APP_NAME}. I hope you will enjoy the platform.`;
  await mailTransport.sendMail(mailOptions);
  functions.logger.info("New welcome email sent to:", email);
  return null;
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(
  email: string | undefined,
  displayName: string | undefined
) {
  const mailOptions = {
    from: `${APP_NAME} <${fromEmail}>`,
    to: email,
    subject: "",
    text: "",
  };

  mailOptions.subject = `Bye!`;
  mailOptions.text = `Hey ${displayName ||
    ""}!, We confirm that we have deleted your ${APP_NAME} account.`;
  await mailTransport.sendMail(mailOptions);
  functions.logger.info("Account deletion confirmation email sent to:", email);
  return null;
}
