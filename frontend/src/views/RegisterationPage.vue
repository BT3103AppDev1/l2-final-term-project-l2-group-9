<template>
  <div class="registration-page">
    <div class="registration-container">
      <h1>Register Account</h1>
      <div class="form-container">
        <div class="requirements">
          <p>Password should contain:</p>
          <ul>
            <li>A minimum of 8 characters</li>
            <li>Mix of uppercase and lowercase letters</li>
            <li>Numbers</li>
            <li>At least 1 special character</li>
          </ul>
        </div>
        <div id="inner-form-container">
          <form @submit.prevent="submit">
            <label for="username"
              >Username <span class="required">*</span></label
            >
            <input
              type="text"
              id="username"
              name="username"
              v-model="username"
            /><br /><br />
            <label for="email"
              >Email Address <span class="required">*</span></label
            >
            <input
              type="text"
              id="email"
              name="email"
              v-model="email"
            /><br /><br />
            <label for="password"
              >Password <span class="required">*</span></label
            >
            <input
              type="password"
              id="password"
              name="password"
              v-model="password"
            /><br /><br />
            <input type="submit" value="Sign Up" />
            <div id="firebaseui-auth-container"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      signInSuccessUrl: "<url-to-redirect-to-on-success>",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };

    ui.start("#firebaseui-auth-container", uiConfig);
  },
  setup() {
    const auth = getAuth();
    const db = getFirestore();
    const router = useRouter();

    const username = ref("");
    const email = ref("");
    const password = ref("");

    const submit = async () => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        await setDoc(doc(db, "users", user.uid), {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        router.push("/home");
      } catch (error) {
        console.error(error);
      }
    };

    return { username, email, password, submit };
  },
};
</script>

<style scoped>
.registration-page {
  height: 100vh;
  width: 100vw;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.registration-container {
  margin-top: 10vh;
}

.required {
  color: red;
}

.form-container {
  display: flex;
  justify-content: space-between;
  margin-right: 320px;
}

.requirements {
  color: black;
  font-family: "Poppins";
  font-size: 12px;
  text-align: center;
  flex: 1;
  margin-right: 100px;
  margin-top: 150px;
  text-wrap: nowrap;
}

form {
  flex: 2;
}

form label {
  align-items: left;
}
ul {
  text-align: left;
}

.registration-page h1 {
  color: black;
  font-family: "Poppins";
  font-weight: bold;
  font-size: 64px;
  text-align: center;
  margin-bottom: 3vh;
}

.registration-page form {
  display: flex;
  flex-direction: column;
}

.registration-page label {
  color: #27374d;
  font-family: "Poppins";
  font-weight: bold;
  margin-left: 1vw;
}

.registration-page input {
  border-radius: 15px;
  height: 30px;
  width: 200px;
  text-align: center;
  align-self: center;
}

.registration-page input[type="submit"] {
  background-color: #070707;
  color: white;
  border-radius: 15px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
}

#inner-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
