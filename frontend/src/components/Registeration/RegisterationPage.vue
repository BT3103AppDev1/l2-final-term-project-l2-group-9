<template>
    <div class="registration-page">
        <h1>Registration</h1>
        <form>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"><br><br>
            <label for="email">Email:</label>
            <input type="text" id="email" name="email"><br><br>
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .registration-page {
        height: 100vh;
        width: 100vw;
        text-align: center;
        background-color: #dde6ed;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .registration-page h1 {
        color: #27374d;
        font-family: "Poppins", sans-serif, Helvetica;
        font-weight: bold;
    }

    .registration-page form {
        display: flex;
        flex-direction: column;
    }

    .registration-page label {
        color: #27374d;
        font-family: "Poppins", sans-serif, Helvetica;
        font-weight: bold;
    }

    .registration-page input {
        font-size: 1em;
        text-decoration: underline;
        color: #27374d;
        font-family: "Poppins", sans-serif, Helvetica;
        font-weight: bold;
    }
</style>