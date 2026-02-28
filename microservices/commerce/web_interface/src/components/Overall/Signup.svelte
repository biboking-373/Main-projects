<script>

</script>

<div class="form-container">
  <!-- Content / Info Panel -->
  <div class="content-panel">
    <h2>Don't have an account?</h2>
    <p>Enter your details in here to signup for the app</p>
  </div>

  <!-- Login / Signup Panel -->
  <div class="login-panel">
    <form class="log-in" on:submit={handleSubmit}>
      <label for="username">Username *</label>
      <input type="text" id="username" name="username"required>
      <span class="input-info">Your username must be unique.</span>

      <label for="email">Email *</label>
      <input type="email" id="email" name="email" required>
      <span class="input-info">Enter a valid email address.</span>

      <label for="password">Password *</label>
      <input type="password" id="password" name="password"required>
      <span class="input-info">Minimum 6 characters.</span>

      <label for="confirmPassword">Confirm Password *</label>
      <input type="password" id="confirmPassword" name="confirmPassword"required>
      <span class="input-info">Must match your password.</span>

      <button type="submit">Login</button>
    </form>
  </div>
</div>

<style>
/* Center everything on the page */
body, html {
    height: 100%;
    margin: 0;
    font-family: 'Verdana', sans-serif;
    background-color: #f5f5f5;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    gap: 50px;
    padding: 40px;
}

/* Content panel */
.content-panel {
    flex: 1;
    max-width: 400px;
    text-align: center;
}

.content-panel h2 {
    font-size: 2rem;
    margin-bottom: 15px;
}

.content-panel p {
    font-size: 1rem;
    color: #555;
}

/* Login panel */
.login-panel {
    flex: 1;
    max-width: 400px;
    padding: 40px 50px 40px 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
    background-color: #fff;
}

/* Labels */
label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #ff0202;
}

/* Input fields */
input {
    padding: 7px;
    border-radius: 7px;
    border: 1px solid #999;
    font-size: 1rem;
    outline: none;
    width: 100%;
    margin-bottom: 5px;
    transition: border 0.3s;
}

input:focus {
    border: 2px solid #4caf50;
}

/* Spans below input for hints or errors */
.input-info {
    display: block;
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 15px;
}

/* Button styling */
button {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #4caf50;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

/* Responsive adjustments */
@media (max-width: 900px) {
    .form-container {
        flex-direction: column;
        gap: 20px;
    }
}
</style>