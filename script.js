// Firebase-Konfiguration (Ersetze die Werte mit deinen Firebase-Daten)
const firebaseConfig = {
  apiKey: "AIzaSyBkI9qk5sF_GfIF9OAPUtSi51gyF-8G_w8",
  authDomain: "long-distance-calander.firebaseapp.com",
  projectId: "long-distance-calander",
  storageBucket: "long-distance-calander.firebasestorage.app",
  messagingSenderId: "314386201042",
  appId: "1:314386201042:web:d4f5900982b4fc4e86f00b",
  measurementId: "G-7MD8MQY4FE"
};

// Firebase initialisieren
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Funktion zur Registrierung eines neuen Benutzers
async function register() {
  const user = document.getElementById("regUser").value;
  const pass = document.getElementById("regPass").value;
  const privacyAccepted = document.getElementById("privacyCheck").checked;

  if (!user || !pass) {
    alert("Bitte Benutzername und Passwort eingeben.");
    return;
  }

  if (!privacyAccepted) {
    alert("Bitte akzeptiere die Datenschutzerklärung.");
    return;
  }

  try {
    // Benutzerregistrierung bei Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(user + "@example.com", pass);

    // Speichern der Benutzerdaten in Firestore
    await db.collection("users").doc(userCredential.user.uid).set({
      username: user,
      partner: null,  // Partner wird später hinzugefügt
      id: generateId()  // Generiere eine Benutzer-ID
    });

    alert("Registrierung erfolgreich!");
  } catch (error) {
    alert("Fehler bei der Registrierung: " + error.message);
  }
}

// Funktion zur Benutzeranmeldung
async function login() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  try {
    // Benutzeranmeldung bei Firebase Auth
    const userCredential = await auth.signInWithEmailAndPassword(user + "@example.com", pass);

    // Speichern des aktiven Benutzers in localStorage
    localStorage.setItem("activeUser", user);

    alert("Login erfolgreich!");
    window.location.href = "dashboard.html";  // Weiterleitung zum Dashboard
  } catch (error) {
    alert("Fehler bei der Anmeldung: " + error.message);
  }
}

// Funktion zur Generierung einer einzigartigen Benutzer-ID
function generateId() {
  return "#" + Math.floor(1000 + Math.random() * 9000);
}

// Funktion zum Laden der Benutzerdaten im Dashboard
async function loadUserData() {
  const activeUser = localStorage.getItem("activeUser");
  
  if (!activeUser) {
    alert("Kein aktiver Benutzer gefunden. Bitte melden Sie sich an.");
    return;
  }

  // Hole die Benutzerdaten aus Firestore
  const userDoc = await db.collection("users").where("username", "==", activeUser).get();
  userDoc.forEach(doc => {
    const data = doc.data();
    // Hier kannst du die Daten anzeigen (z.B. Partner, ID)
    console.log(data);
    document.getElementById("userNameDisplay").innerText = `Benutzername: ${data.username}`;
    document.getElementById("userIdDisplay").innerText = `ID: ${data.id}`;
  });
}

// Funktion zum Verbinden mit einem Partner
async function connectWithPartner() {
  const partnerUsername = document.getElementById("partnerUsername").value;
  const activeUser = localStorage.getItem("activeUser");

  if (!activeUser || !partnerUsername) {
    alert("Bitte gib sowohl deinen Benutzernamen als auch den deines Partners ein.");
    return;
  }

  // Hole den Partner aus der Firestore-Datenbank
  const partnerDoc = await db.collection("users").where("username", "==", partnerUsername).get();

  if (partnerDoc.empty) {
    alert("Partner nicht gefunden.");
    return;
  }

  // Hole die Daten des Partners
  partnerDoc.forEach(async (doc) => {
    const partnerData = doc.data();

    // Update der Partnerverbindung in der Benutzerdatenbank
    await db.collection("users").doc(doc.id).update({
      partner: activeUser
    });

    // Update des Partners in der Datenbank des aktiven Benutzers
    await db.collection("users").doc(partnerData.uid).update({
      partner: partnerUsername
    });

    alert(`Du bist jetzt mit ${partnerUsername} verbunden!`);
  });
}

// Event-Listener für das Laden der Benutzerdaten im Dashboard
document.addEventListener("DOMContentLoaded", loadUserData);
