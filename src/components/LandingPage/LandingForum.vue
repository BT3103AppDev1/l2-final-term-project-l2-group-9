<template>
    <div id="landing-forum">
      <div class="forum-text">
        <h1>Interact,</h1>
        <br>
        <h1>Share</h1>
        <p>Streamline your forum experience. <br> Filter discussions, post, and engage with ease.</p>
      </div>
      <div class="shuffle-items">
        <div class="inturn-community">
          <div class="item">
            <img src="@/assets/images/Community.png" alt="InTurn Community">
          </div>
          <div class="item">
            <font-awesome-icon :icon="['fas', 'people-group']" class="big-icon" />
            <p>Empower members to freely share insights and knowledge that are typically kept within closed circles</p>
          </div>
          <div class="item">
            <img src="@/assets/images/filter.png" alt="InTurn Community">
          </div>
          <div class="item">
            <font-awesome-icon :icon="['fas', 'filter']" class="big-icon" />
            <p>Customize your feed to focus on the content that interests you, making your experience on our forum more efficient and enjoyable</p>
          </div>
          <div class="item">
            <img src="@/assets/images/posts.jpg" alt="InTurn Community">
          </div>
          <div class="item">
            <font-awesome-icon :icon="['fas', 'comment-dots']" class="big-icon" />
            <p>Engage in meaningful discussions, learn from others, and contribute to a vibrant exchange of ideas</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  #landing-forum {
    text-align: center;
    background-color: #f2f2f2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center; /* Center items horizontally */
  }
  
  .forum-text {
    width: 30%;
  }
  
  .forum-text h1 {
    color: #000000;
    font-family: "League Spartan";
    font-weight: bold;
    font-size: 5em;
    text-align: left;
    margin-left: 150px;
    line-height: 1em;
    margin-bottom: 20px;
  }
    
  .forum-text p {
    color: #000000;
    font-family: "League Spartan";
    text-align: left;
    margin-left: 150px;
    text-wrap: wrap;
    font-size: 1.5em;
  }

  .shuffle-items {
    width: 70%;
  }
  
  .inturn-community {
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
  }
  
  .item {
    flex: 1 1 30%;
    padding: 30px;
    box-sizing: border-box;
    color: black;
  }
  
  .inturn-community p {
    font-family: "League Spartan";
    margin-right: 10vw;
    padding: 30px;
    font-size: 1.5em;
  }
  
  .inturn-community img {
    width: 28vw;
    height: 24vh;
  }
  
  .inturn-community .item {
    display: flex;
    align-items: center; 
  }

  .big-icon {
    font-size: 4em;
  }

  </style>
  