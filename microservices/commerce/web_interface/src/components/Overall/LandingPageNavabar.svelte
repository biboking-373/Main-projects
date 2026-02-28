<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function navigateTo(page) {
    dispatch('navigate', { page });
  }
</script>

<nav class="navbar">
  <div class="nav-brand">MyApp</div>

  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#service">Service</a></li>
    <li><a href="#mission">Mission</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  <div class="nav-actions">
    <button class="btn-login" on:click={() => navigateTo('login')}>Login</button>
    <button class="btn-signup" on:click={() => navigateTo('signup')}>Sign Up</button>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 40px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    font-family: 'Verdana', sans-serif;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-brand {
    font-size: 1.4rem;
    font-weight: bold;
    color: #4caf50;
    letter-spacing: 1px;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
  }

  .nav-links li a {
    text-decoration: none;
    font-size: 0.95rem;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
    position: relative;
  }

  .nav-links li a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4caf50;
    transition: width 0.3s;
  }

  .nav-links li a:hover {
    color: #4caf50;
  }

  .nav-links li a:hover::after {
    width: 100%;
  }

  .nav-actions {
    display: flex;
    gap: 12px;
  }

  .btn-login,
  .btn-signup {
    padding: 8px 22px;
    font-size: 0.9rem;
    font-weight: bold;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Verdana', sans-serif;
  }

  .btn-login {
    background-color: transparent;
    color: #4caf50;
    border: 2px solid #4caf50;
  }

  .btn-login:hover {
    background-color: #4caf50;
    color: #fff;
  }

  .btn-signup {
    background-color: #4caf50;
    color: #fff;
    border: 2px solid #4caf50;
  }

  .btn-signup:hover {
    background-color: #45a049;
    border-color: #45a049;
  }

  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      gap: 15px;
      padding: 15px 20px;
    }

    .nav-links {
      gap: 15px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .nav-actions {
      width: 100%;
      justify-content: center;
    }

    .btn-login,
    .btn-signup {
      flex: 1;
      max-width: 140px;
    }
  }
</style>