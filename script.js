function updateCountdown() {
  const input = document.getElementById("dateInput").value;
  const countdown = document.getElementById("countdown");

  if (!input) {
    countdown.innerText = "Bitte Datum eingeben.";
    return;
  }

  const future = new Date(input);
  const today = new Date();
  const diff = future - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days >= 0) {
    countdown.innerText = `Noch ${days} Tag(e) bis zum Wiedersehen ❤️`;
  } else {
    countdown.innerText = "Das Datum liegt in der Vergangenheit.";
  }
}

function saveNote() {
  const note = document.getElementById("noteInput").value;
  if (note.trim() === "") return;
  localStorage.setItem("loveNote", note);
  displayNote();
}

function displayNote() {
  const note = localStorage.getItem("loveNote") || "(Noch keine Nachricht gespeichert.)";
  document.getElementById("noteDisplay").innerText = note;
}

document.getElementById("dateInput").addEventListener("change", updateCountdown);
document.addEventListener("DOMContentLoaded", displayNote);
