<template>
    <div class="registration-page">
        <h1>Register Account</h1>
        <div class = "form-container">
            <div class="requirements">
                <p>Password should contain:</p>
                <ul>
                    <li>A minimum of 8 characters</li>
                    <li>Mix of uppercase and lowercase letters</li>
                    <li>Numbers</li>
                    <li>At least 1 special character</li>
                </ul>
            </div>
            <form>
                <label for="username">Username <span class="required">*</span></label>
                <input type="text" id="username" name="username"><br><br>
                <label for="email">Email Address <span class="required">*</span></label>
                <input type="text" id="email" name="email"><br><br>
                <label for="password">Password <span class="required">*</span></label>
                <input type="password" id="password" name="password"><br><br>
                <input type="submit" value="Sign Up">
            </form>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.registration-page {
    height: 100vh;
    width: 100vw;
    background-color: #dde6ed;
    display: flex;
    flex-direction: column;
    align-items: center;
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
ul {
    text-align: left;
}
.registration-page h1 {
    color: black;
    font-family: "Poppins";
    font-weight: bold;
    font-size: 64px;
}

.registration-page form {
    display: flex;
    flex-direction: column;
}

.registration-page label {
    color: #27374d;
    font-family: "Poppins";
    font-weight: bold;
}

.registration-page input {
    border-radius: 15px;
    height: 30px;
}

.registration-page input[type="submit"] {
    background-color: #070707;
    color: white;
    border-radius: 15px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
}
</style>