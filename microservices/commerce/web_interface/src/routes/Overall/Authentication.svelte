<script>
  import { cubicOut } from 'svelte/easing';
  import Login from '../../components/Overall/Login.svelte';
  import Signup from '../../components/Overall/Signup.svelte';
  import Navbar from '../../components/Overall/LandingPageNavabar.svelte';

  let currentView = 'login';
  let direction = 1; // 1 = going right (login→signup), -1 = going left (signup→login)

  function switchView(view) {
    direction = view === 'signup' ? 1 : -1;
    currentView = view;
  }

  function handleNavigate(e) {
    switchView(e.detail.page);
  }

  // Slides in from left or right like turning a page
  function slideIn(node, { duration = 600 }) {
    return {
      duration,
      easing: cubicOut,
      css: (t) => `
        opacity: ${t};
        transform: perspective(1200px) rotateY(${(1 - t) * direction * -30}deg) translateX(${(1 - t) * direction * 60}px);
        transform-origin: ${direction === 1 ? 'left' : 'right'} center;
      `
    };
  }
</script>

<div class="auth-root">
  <div class="bg-shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
    <div class="shape shape-4"></div>
  </div>

  <Navbar on:navigate={handleNavigate} />

  <main class="auth-stage">
    <div class="view-toggle">
      <button
        class="toggle-btn"
        class:active={currentView === 'login'}
        on:click={() => switchView('login')}
      >
        Login
      </button>
      <button
        class="toggle-btn"
        class:active={currentView === 'signup'}
        on:click={() => switchView('signup')}
      >
        Sign Up
      </button>
      <div
        class="toggle-indicator"
        style="transform: translateX({currentView === 'signup' ? '100%' : '0'})"
      ></div>
    </div>

    <div class="card-wrapper">
      {#if currentView === 'login'}
        <div class="card-inner" in:slideIn={{ duration: 600 }}>
          <Login />
        </div>
      {:else}
        <div class="card-inner" in:slideIn={{ duration: 600 }}>
          <Signup />
        </div>
      {/if}
    </div>

    <p class="switch-hint">
      {#if currentView === 'login'}
        Don't have an account?
        <button class="link-btn" on:click={() => switchView('signup')}>Sign up here</button>
      {:else}
        Already have an account?
        <button class="link-btn" on:click={() => switchView('login')}>Log in here</button>
      {/if}
    </p>
  </main>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    background-color: #1e2329;
    color: #e6edf3;
    min-height: 100vh;
  }

  .auth-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .bg-shapes {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
    animation: drift 12s ease-in-out infinite alternate;
  }

  .shape-1 {
    width: 500px; height: 500px;
    background: #4caf50;
    top: -120px; left: -100px;
    animation-duration: 14s;
  }

  .shape-2 {
    width: 400px; height: 400px;
    background: #1a7f37;
    bottom: -80px; right: -80px;
    animation-duration: 10s;
    animation-delay: -3s;
  }

  .shape-3 {
    width: 300px; height: 300px;
    background: #a8ff78;
    top: 40%; left: 60%;
    animation-duration: 16s;
    animation-delay: -6s;
  }

  .shape-4 {
    width: 200px; height: 200px;
    background: #4caf50;
    top: 20%; right: 15%;
    animation-duration: 9s;
    animation-delay: -1s;
  }

  @keyframes drift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.1); }
  }

  .auth-stage {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px 60px;
    gap: 24px;
  }

  .view-toggle {
    position: relative;
    display: flex;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50px;
    padding: 4px;
    width: 260px;
    backdrop-filter: blur(10px);
  }

  .toggle-btn {
    position: relative;
    z-index: 1;
    flex: 1;
    padding: 10px 0;
    border: none;
    background: transparent;
    color: rgba(255,255,255,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 50px;
    transition: color 0.3s;
  }

  .toggle-btn.active {
    color: #0d1117;
  }

  .toggle-indicator {
    position: absolute;
    top: 4px; left: 4px;
    width: calc(50% - 4px);
    height: calc(100% - 8px);
    background: #4caf50;
    border-radius: 50px;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 0;
  }

  /* clip overflow so the slide doesn't spill outside the card */
  .card-wrapper {
    width: 100%;
    max-width: 900px;
    border-radius: 18px;
    overflow: hidden;
    perspective: 1200px;
    box-shadow:
      0 0 0 1px rgba(76, 175, 80, 0.15),
      0 30px 80px rgba(0, 0, 0, 0.5),
      0 0 60px rgba(76, 175, 80, 0.05);
  }

  .card-inner {
    background: rgba(13, 17, 23, 0.85);
    backdrop-filter: blur(20px);
    will-change: transform, opacity;
  }

  .card-inner :global(.form-container) {
    height: auto !important;
    min-height: 420px;
    padding: 50px 60px !important;
    gap: 60px !important;
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
  }

  .card-inner :global(.login-panel),
  .card-inner :global(.signup-panel) {
    background: rgba(255,255,255,0.03) !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    box-shadow: none !important;
  }

  .card-inner :global(.content-panel h2) {
    font-family: 'DM Serif Display', serif !important;
    font-size: 2.4rem !important;
    color: #e6edf3 !important;
  }

  .card-inner :global(.content-panel p) {
    color: rgba(255,255,255,0.5) !important;
  }

  .card-inner :global(label) {
    color: #4caf50 !important;
  }

  .card-inner :global(input) {
    background: rgba(255,255,255,0.05) !important;
    border-color: rgba(255,255,255,0.1) !important;
    color: #e6edf3 !important;
  }

  .card-inner :global(input:focus) {
    border-color: #4caf50 !important;
    background: rgba(76, 175, 80, 0.05) !important;
  }

  .card-inner :global(.input-info) {
    color: rgba(255,255,255,0.35) !important;
  }

  .card-inner :global(button[type="submit"]) {
    background-color: #4caf50 !important;
    font-family: 'DM Sans', sans-serif !important;
  }

  .card-inner :global(button[type="submit"]:hover) {
    background-color: #45a049 !important;
  }

  .switch-hint {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.4);
    margin: 0;
  }

  .link-btn {
    background: none;
    border: none;
    color: #4caf50;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.2s;
  }

  .link-btn:hover {
    opacity: 0.75;
  }

  @media (max-width: 768px) {
    .card-inner :global(.form-container) {
      flex-direction: column !important;
      padding: 30px 24px !important;
      gap: 24px !important;
    }

    .card-inner :global(.content-panel) {
      max-width: 100% !important;
    }
  }
</style>