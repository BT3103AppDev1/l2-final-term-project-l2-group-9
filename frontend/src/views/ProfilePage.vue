<template>
    <ProfilePicture />
    <ProfilePosts />
</template>



<script>
import ProfilePicture from '../components/ProfilePage/ProfilePicture.vue'
import ProfilePosts from '../components/ProfilePage/ProfilePosts.vue'

export default {
  name: 'ProfilePage',
  components: {
    ProfilePicture,
    ProfilePosts,
  }
}
</script>



<style scoped></style>