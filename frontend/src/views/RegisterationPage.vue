<template>
    <div class="top-left">
        <router-link to="/">
            <img
                class="arrow"
                src="@/assets/images/back-to-board.svg"
                alt="arrow"
        /></router-link>
        <img
            class="logo"
            src="@/assets/images/InTurnLogoName.jpeg"
            alt="InTurn Logo"
        />
    </div>
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
                            >Email Address
                            <span class="required">*</span></label
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
                        <div class="password-container">
                            <input
                                :type="showPassword ? 'text' : 'password'"
                                id="password"
                                name="password"
                                v-model="password"
                            />
                            <font-awesome-icon
                                :icon="['fas', 'eye']"
                                class="password-icon"
                                @click="togglePasswordVisibility"
                            />
                        </div>
                        <br /><br />
                        <input
                            type="submit"
                            value="Sign Up"
                            class="submit-button"
                        />
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
                signInSuccessWithAuthResult: function (
                    authResult,
                    redirectUrl,
                ) {
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
        const db = getFirestore();
        const router = useRouter();

        const username = ref("");
        const email = ref("");
        const password = ref("");
        const showPassword = ref(false);

        const submit = async () => {
            try {
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email.value,
                    password.value,
                );
                await setDoc(doc(db, "users", user.uid), {
                    username: username.value,
                    email: email.value,
                });
                router.push("/postings");
            } catch (error) {
                console.error(error);
            }
        };

        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        return {
            username,
            email,
            password,
            submit,
            showPassword,
            togglePasswordVisibility,
        };
        x;
    },
};
</script>

<style scoped>
.top-left {
    background-color: #526d82;
    border-radius: 0px;
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
    filter: invert(92%) sepia(15%) saturate(122%) hue-rotate(166deg)
        brightness(99%) contrast(90%);
}
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
}

.password-container {
    margin-top: 0px;
    margin-left: 15px;
    position: relative;
}

.password-icon {
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    cursor: pointer;
}

.submit-button {
    margin-bottom: 20px;
}
</style>
