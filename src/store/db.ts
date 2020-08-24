import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db: any = firebase
  .initializeApp({ projectId: "landscaping-business-manager" })
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore as any;

export { TimeStamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true });
