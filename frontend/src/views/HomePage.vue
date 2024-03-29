<template>
    <div>
        <h1>Home Page</h1>
        <p v-if="user">Welcome, {{ this.username }}</p>
        <p v-else>Welcome, </p>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js'
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
    name: 'HomePage',
    data() {
        return {
            user: false,
            username: ''
        }
    },
    async mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.user = user
                await this.fetchAndUpdateDatabase(user)
            }
        })
    },
    methods: {
        async fetchAndUpdateDatabase(user) {
            const usersCollection = collection(db, 'users')
            const userSnapshot = await getDoc(doc(usersCollection, user.uid))
            if (userSnapshot.exists()) {
                this.username = userSnapshot.data().username
            } else {
                await this.addUserToDatabase(user)
            }
        },
        async addUserToDatabase(user) {
            const usersCollection = collection(db, 'users')
            await setDoc(doc(usersCollection, user.uid), {
                username: user.displayName,
                email: user.email,
            })
        }
    }
}



</script>