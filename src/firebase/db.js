import { App } from './app'
import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = App.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }
