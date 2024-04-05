<template>
    <div class="top-left">
        <router-link to="/">
        <img class="arrow" src="@/assets/images/back-to-board.svg" alt="arrow" /></router-link>
        <img class="logo" src="@/assets/images/InTurnLogoName.jpeg" alt="InTurn Logo" />
    </div>
    <div class="login-page">  
      <div class="login-container">
        <h1>Welcome Back!</h1>
        <h3>Simplify your internship process and boost your efficiency with InTurn.</h3>
        <div class="form-container">
            <form @submit.prevent="submit">
            <label for="email">Email Address <span class="required">*</span></label>
            <input type="text" id="email" name="email" v-model="email" /><br /><br />
            <label for="password">Password <span class="required">*</span></label>
            <input type="password" id="password" name="password" v-model="password" /><br> 
            <a href="#" class="forgot-password" @click.prevent="resetPassword">Forgot Password?</a><br /><br />
            <input type="submit" value="Login" />
            <div id="firebaseui-auth-container"></div>
            </form>
        </div>
      </div>
    </div>
  </template>
  
<script scoped>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
            return true;
          },
        },
        signInFlow: "popup",
        signInSuccessUrl: "postings",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
      };
  
      ui.start("#firebaseui-auth-container", uiConfig);
    },
    setup() {
      const auth = getAuth();
      const router = useRouter();
  
      const email = ref("");
      const password = ref("");
  
      const submit = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push("/postings");
        } catch (error) {
          console.error(error);
        }
      };

      const resetPassword = async () => {
      const userEmail = window.prompt("Please enter your email address");
      if (userEmail === null || userEmail === "") {
        console.log("No email address entered");
        return;
      }
      try {
        await sendPasswordResetEmail(auth, userEmail);
        console.log("Password reset email sent");
      } catch (error) {
        console.error(error);
      }
    };
  
      return { email, password, submit, resetPassword };
    },
  };
</script>
  
<style scoped>
.top-left {
  background-color: #526d82;
  border-radius: 10px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-items: center;
  padding-left: 30px;
}

.logo {
  width: 215px;
  height: auto;
}

.arrow {
  width: 48px;
  height: 48px;
  cursor: pointer;
  margin-left: 20px;
  filter: invert(92%) sepia(15%) saturate(122%) hue-rotate(166deg) brightness(99%) contrast(90%);
}

.forgot-password {
  color: #526d82;
  font-family: "Poppins";
  font-size: 14px;
  margin-bottom: 1em;
  align-self: center;
}

.login-page {
  height: 100vh;
  width: 100vw;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-container {
  margin-top: 10vh;
}

.required {
  color: red;
}

.form-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

form {
    flex: 2;
}

form label {
  align-self: flex-start;
}

.login-page h1 {
  color: black;
  font-family: "Poppins";
  font-weight: bold;
  font-size: 64px;
  text-align: center;
  margin-bottom: 3vh;
}

.login-page h3{
    color: black;
    font-family: "Poppins";
    font-size: 20px;
    text-align: center;
    margin-bottom: 3vh;
}

.login-page form {
  display: flex;
  flex-direction: column;
}

.login-page label {
  color: #27374d;
  font-family: "Poppins";
  font-weight: bold;
  margin-left: 1vw;
}

.login-page input {
  border-radius: 15px;
  height: 30px;
  width: 200px;
  text-align: center;
  align-self: center;
}

.login-page input[type="submit"] {
  background-color: #070707;
  color: white;
  border-radius: 15px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
}

</style>