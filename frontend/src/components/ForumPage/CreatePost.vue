<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Title</label>
          <input id="title" v-model="title" type="text" required />
        </div>
        <div>
          <label for="paragraph">Paragraph</label>
          <textarea id="paragraph" v-model="paragraph" required></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
      <ForumPostCard :title="title" :paragraph="paragraph" v-if="submitted" />
    </div>
  </template>
  
  <script>
  import ForumPostCard from './ForumPostCard.vue';
  
  export default {
    components: {
      ForumPostCard,
    },
    data() {
      return {
        title: '',
        paragraph: '',
        submitted: false,
      };
    },
    methods: {
      submitForm() {
        this.submitted = true;
      },
    },
  };
  </script>