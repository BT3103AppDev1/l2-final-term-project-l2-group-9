<template>
    <div class="card">
        <h2 class="post-title">{{ title }}</h2>
        <p class="post-paragraph">{{ paragraph }}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        paragraph: String,
    },
};

</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 1em;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
  color: blue;
  width: 50%;
}

.card:hover {
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
</style>