<template>
  <div class="relative" v-if="user">
    <ThePostings class="absolute-fill" />
  </div>
</template>

<script>
import ThePostings from '../components/PostingPage/ThePostings.vue'
import firebaseApp from '../firebase.js'
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
  name: 'PostingsPage',
  components: {
    ThePostings,
  },
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

<style scoped>
.relative {
  position: relative;
  height: 82vh;
}

.absolute-fill {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
