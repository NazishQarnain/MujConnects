// Firebase Configuration
// Replace these values with your own Firebase project credentials

const firebaseConfig = {
  apiKey: "AIzaSyCRYMfJvp4SYv7uYHDL4twNVkFZCYy1_Hw",
  authDomain: "studio-3196397526-cc488.firebaseapp.com",
  databaseURL: "https://studio-3196397526-cc488-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studio-3196397526-cc488",
  storageBucket: "studio-3196397526-cc488.firebasestorage.app",
  messagingSenderId: "665135764429",
  appId: "1:665135764429:web:3f6bb631a45c76421dcea84"
};

// Initialize Firebase
let app, auth, database;

function initializeFirebase() {
  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    database = firebase.database();
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

// Export for use in other files
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDatabase = database;
window.initializeFirebase = initializeFirebase;
