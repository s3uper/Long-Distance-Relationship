<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBkI9qk5sF_GfIF9OAPUtSi51gyF-8G_w8",
    authDomain: "long-distance-calander.firebaseapp.com",
    projectId: "long-distance-calander",
    storageBucket: "long-distance-calander.firebasestorage.app",
    messagingSenderId: "314386201042",
    appId: "1:314386201042:web:d4f5900982b4fc4e86f00b",
    measurementId: "G-7MD8MQY4FE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>