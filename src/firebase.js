import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
const firebaseConfig = {
	apiKey: 'AIzaSyADz-0coXnfrmOZDt6qbQQXsAF9F1KvemA',
	authDomain: 'expense-tracker-c01a8.firebaseapp.com',
	projectId: 'expense-tracker-c01a8',
	storageBucket: 'expense-tracker-c01a8.appspot.com',
	messagingSenderId: '772629601124',
	appId: '1:772629601124:web:a2b8e3d3cf301044e47871',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
