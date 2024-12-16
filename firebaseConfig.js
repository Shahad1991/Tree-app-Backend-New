const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://eksamen-1-sem.firebaseio.com' // Replace with your actual database URL
});

module.exports = admin;