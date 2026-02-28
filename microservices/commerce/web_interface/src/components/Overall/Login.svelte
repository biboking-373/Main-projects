<script>

</script>

<div class="form-container">
  <!-- Login Panel -->
  <div class="login-panel">
    <form class="log-in">
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" required>
      <span class="input-info">Enter your registered email address.</span>

      <label for="password">Password *</label>
      <input type="password" id="password" name="password" required>
      <span class="input-info">Enter your password.</span>

      <button type="submit">Login</button>
    </form>
  </div>

  <!-- Content / Info Panel -->
  <div class="content-panel">
    <h2>Welcome Back!</h2>
    <p>Login to access your dashboard.</p>
  </div>
</div>

<style>
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

.login-panel {
    flex: 1;
    max-width: 400px;
    padding: 40px 50px 40px 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
    background-color: #fff;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #ff0202;
}

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

.input-info {
    display: block;
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 15px;
}

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

@media (max-width: 900px) {
    .form-container {
        flex-direction: column;
        gap: 20px;
    }
}
</style>