// Firebase Authentication Functions

function renderLogin() {
  $("#app").innerHTML = `
    <div class="max-w-md mx-auto p-6 border rounded-2xl dark:border-zinc-800">
      <h2 class="text-xl font-bold mb-3">Login</h2>
      <form id="loginForm" class="space-y-3">
        <input id="email" type="email" placeholder="College Email" class="w-full border rounded-xl px-3 py-2" required />
        <input id="pass" type="password" placeholder="Password" class="w-full border rounded-xl px-3 py-2" required />
        <button class="w-full rounded-xl bg-blue-600 text-white py-2">Login</button>
        <p class="text-center text-sm text-zinc-500">No account? <a href="#register" class="underline">Register</a></p>
      </form>
      <div id="errorMsg" class="text-red-500 text-sm mt-2 hidden"></div>
    </div>
  `;
  
  $("#loginForm").onsubmit = async (e) => {
    e.preventDefault();
    const email = $("#email").value;
    const password = $("#pass").value;
    
    try {
      // Firebase sign in
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Save user data to profile
      const p = getProfile();
      p.email = user.email;
      p.uid = user.uid;
      setProfile(p);
      loginSession(email);
      
      location.hash = "home";
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = $("#errorMsg");
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = error.message;
    }
  };
}

function renderRegister() {
  $("#app").innerHTML = `
    <div class="max-w-md mx-auto p-6 border rounded-2xl dark:border-zinc-800">
      <h2 class="text-xl font-bold mb-3">Register</h2>
      <form id="regForm" class="space-y-3">
        <input id="name" placeholder="Full Name" class="w-full border rounded-xl px-3 py-2" required />
        <input id="email" type="email" placeholder="College Email" class="w-full border rounded-xl px-3 py-2" required />
        <input id="batch" placeholder="Batch (e.g., 2025-2029)" class="w-full border rounded-xl px-3 py-2" required />
        <input id="pass" type="password" placeholder="Password (min 6 characters)" class="w-full border rounded-xl px-3 py-2" required />
        <button class="w-full rounded-xl bg-blue-600 text-white py-2">Register</button>
        <p class="text-center text-sm text-zinc-500">Already have account? <a href="#login" class="underline">Login</a></p>
      </form>
      <div id="errorMsg" class="text-red-500 text-sm mt-2 hidden"></div>
    </div>
  `;
  
  $("#regForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = $("#name").value;
    const email = $("#email").value;
    const batch = $("#batch").value;
    const password = $("#pass").value;
    
    try {
      // Firebase create user
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await user.updateProfile({
        displayName: name
      });
      
      // Save user data to Firebase Realtime Database
      await firebase.database().ref('users/' + user.uid).set({
        displayName: name,
        email: email,
        batchId: batch,
        createdAt: Date.now()
      });
      
      // Save to local profile
      const p = getProfile();
      p.displayName = name;
      p.email = email;
      p.batchId = batch;
      p.uid = user.uid;
      setProfile(p);
      loginSession(email);
      
      location.hash = "home";
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = $("#errorMsg");
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = error.message;
    }
  };
}

// Logout function
function logout() {
  firebase.auth().signOut().then(() => {
    // Clear local session
    localStorage.removeItem('session');
    localStorage.removeItem('profile');
    location.hash = "login";
  }).catch((error) => {
    console.error('Logout error:', error);
  });
}

// Listen for auth state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user.email);
  } else {
    console.log('User is signed out');
  }
});
