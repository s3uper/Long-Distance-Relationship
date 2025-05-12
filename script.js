function generateId() {
  return '#' + Math.floor(1000 + Math.random() * 9000);
}

function register() {
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

  const id = generateId();
  localStorage.setItem("user_" + user, JSON.stringify({ pass, id, partner: null }));
  alert(`Registrierung erfolgreich! Deine ID ist ${id}. Du kannst dich nun einloggen.`);
}

function login() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;
  const storedData = localStorage.getItem("user_" + user);

  if (!storedData) {
    alert("Benutzer nicht gefunden.");
    return;
  }

  const data = JSON.parse(storedData);
  if (data.pass === pass) {
    localStorage.setItem("activeUser", user);
    alert("Login erfolgreich!");
    if (user === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    alert("Falsche Anmeldedaten.");
  }
}
