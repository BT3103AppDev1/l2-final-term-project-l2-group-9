<template>
    <div id="profile-page" v-if="user">
        <ProfilePicture :userName="this.userName" :userId="this.user.uid" />
        <div class="profile-details">
            <div class="changePassword">
                <button class="btn" @click="checkProvider() ? window.alert('Google users cannot change their password here.') : showChangePassword = true">
                    Change My Password
                </button>
                <div
                    v-if="showChangePassword"
                    class="modal"
                    @click="showChangePassword = false"
                >
                    <div class="modal-content" @click.stop>
                        <h2>Change Password</h2>
                        <div class="input-container">
                            <input
                                :type="
                                    showCurrentPassword ? 'text' : 'password'
                                "
                                v-model="currentPassword"
                                placeholder="Current Password"
                            />
                            <font-awesome-icon
                                :icon="[
                                    'fas',
                                    showCurrentPassword ? 'eye' : 'eye-slash',
                                ]"
                                class="password-icon"
                                @click.stop="
                                    showCurrentPassword = !showCurrentPassword
                                "
                            />
                        </div>
                        <div class="input-container">
                            <div class="input-field">
                                <input
                                    :type="
                                        showNewPassword ? 'text' : 'password'
                                    "
                                    v-model="newPassword"
                                    placeholder="New Password"
                                />
                                <font-awesome-icon
                                    :icon="[
                                        'fas',
                                        showNewPassword ? 'eye' : 'eye-slash',
                                    ]"
                                    class="password-icon"
                                    @click.stop="
                                        showNewPassword = !showNewPassword
                                    "
                                />
                            </div>
                            <div class="password-hint">
                                New Password must contain a mix of uppercase and
                                lowercase letters, one number, one special
                                character, and be at least 8 characters long.
                            </div>
                        </div>
                        <button id="submit" @click="changePassword">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div class="viewResume" v-if="this.fileUrl">
                <a
                    :href="this.fileUrl"
                    class="uploadResumeButton"
                    target="_blank"
                    >View Resume</a
                >
            </div>
        </div>
        <ProfilePosts :userId="this.user.uid" />
    </div>
</template>

<script>
import ProfilePicture from "../components/ProfilePage/ProfilePicture.vue";
import ProfilePosts from "../components/ProfilePage/ProfilePosts.vue";
import firebaseApp from "../firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import {
    getAuth,
    onAuthStateChanged,
    updatePassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    listAll,
    getMetadata,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

const storage = getStorage();
const db = getFirestore(firebaseApp);

export default {
    name: "ProfilePage",
    components: {
        ProfilePicture,
        ProfilePosts,
    },
    props: {
        userId: {
            type: String,
        },
    },
    data() {
        return {
            user: false,
            userName: "",
            showChangePassword: false,
            currentPassword: "",
            newPassword: "",
            showCurrentPassword: false,
            showNewPassword: false,
            fileUrl: "",
        };
    },

    async mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.user = user;
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                this.userName = userDoc.data().username;
                this.fetchDocumentFromStorage();
            } else {
                // Change the route to the login page
                this.$router.push("/login");
            }
        });
    },

    methods: {
        async fetchDocumentFromStorage() {
            // Retrieve all documents from storage and filter the documents based on userId
            const listRef = ref(storage, `Resumes/${this.user.uid}`);
            listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        getMetadata(itemRef).then((metadata) => {
                            if (
                                metadata.customMetadata.userId === this.user.uid
                            ) {
                                // Set the document URL to the documentUrl variable
                                getDownloadURL(itemRef).then((url) => {
                                    this.fileUrl = url;
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error fetching documents: ", error);
                });
        },

        validatePassword(password) {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                password,
            );
            const hasMinLength = password.length >= 8;

            return (
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                hasSpecialChar &&
                hasMinLength
            );
        },

        async changePassword() {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                try {
                    // Check if the current password and new password are the same
                    if (this.currentPassword === this.newPassword) {
                        window.alert(
                            "New password cannot be the same as the current password.",
                        );
                        return;
                    }
                    // Try signing in with the provided email and current password
                    await signInWithEmailAndPassword(
                        auth,
                        user.email,
                        this.currentPassword,
                    );

                    // Check if the new password meets the criteria
                    if (!this.validatePassword(this.newPassword)) {
                        window.alert(
                            "New password does not meet the criteria.",
                        );
                        return;
                    }

                    // If sign-in is successful and new password is valid, update the password
                    await updatePassword(user, this.newPassword);
                    window.alert("Password has been changed successfully");
                    this.showChangePassword = false;
                } catch (error) {
                    window.alert(
                        "Current password entered incorrectly. Please try again.",
                    );
                    console.error(error);
                }
            }
        },

        checkProvider() {
        if (this.user.providerData[0].providerId === 'google.com') {
            return true;
        }
        return false;
    },
    },
};
</script>

<style scoped>
#profile-page {
    background-color: white;
    height: 50vh;
}

.profile-details {
    display: flex;
    justify-content: start; /* Aligns children at the start of the container */
    align-items: center; /* Centers children vertically */
    height: 0;
    margin-bottom: 50px;
    margin-left: 60px;
}

.changePassword {
    display: flex;
    margin-left: 20px;
}

.btn {
    font-size: 16px;
    cursor: pointer;
    border: 0px;
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border-radius: 10px;
    width: 30%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.modal-content h2 {
    color: black;
    font-family: Avenir, sans-serif;
}

.input-container {
    position: relative;
    display: inline-block;
}

.input-field {
    position: relative;
}

.input-container input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 15px;
}

.password-icon {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    cursor: pointer;
    color: black;
}

.password-hint {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
}

#submit {
    width: 45%;
    margin-top: 20px;
    cursor: pointer;
}

.changePassword button {
    background-color: #526d82;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    padding: 8px 16px;
    margin-left: 180px;
}

.uploadResumeButton {
    background-color: #526d82;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    padding: 8px 16px;
    margin-left: 15px;
}
</style>
