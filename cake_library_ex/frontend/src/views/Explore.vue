<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/services/store/Auth/auth'
import ComponentUserDashboard from '@/components/User/userdashboard.vue'

const router = useRouter()
const authStore = useAuthStore()

const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = ref([
  'All', 'Gaming', 'Podcasts', 'EA Sports FC 26', 'Premier League', 
  'Live', 'CPUs', 'Ferrari S.p.A.', 'Supercar', 'AI', 'History', 'Action'
])

const videos = ref([
  { 
    id: 1, 
    title: "The Modern Day Bonnie & Clyde || Headline Hitters 11 Ep 6", 
    channel: "Abel Mutua",
    channelVerified: true,
    views: "324K", 
    time: "4 days ago",
    duration: "53:17",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  { 
    id: 2, 
    title: "BEST RACECAR SOUNDS EVER | 2000th upload | Zonda R, 991 RSR, ...", 
    channel: "Belgian-Motorsport",
    channelVerified: false,
    views: "627K", 
    time: "3 years ago",
    duration: "44:31",
    thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  { 
    id: 3, 
    title: "20 OVERHYPED Games That Actually Delivered", 
    channel: "gameranx",
    channelVerified: true,
    views: "479K", 
    time: "2 days ago",
    duration: "34:58",
    thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  { 
    id: 4, 
    title: "Building a Full-Stack App from Scratch", 
    channel: "Web Dev Simplified",
    channelVerified: true,
    views: "892K", 
    time: "1 week ago",
    duration: "28:45",
    thumbnail: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  { 
    id: 5, 
    title: "10 JavaScript Tips You Need to Know", 
    channel: "Fireship",
    channelVerified: true,
    views: "1.2M", 
    time: "3 days ago",
    duration: "8:12",
    thumbnail: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
  },
  { 
    id: 6, 
    title: "CSS Grid Layout Tutorial - Complete Guide", 
    channel: "Traversy Media",
    channelVerified: true,
    views: "567K", 
    time: "1 month ago",
    duration: "42:18",
    thumbnail: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  { 
    id: 7, 
    title: "Vue 3 Composition API Crash Course", 
    channel: "The Net Ninja",
    channelVerified: true,
    views: "234K", 
    time: "2 weeks ago",
    duration: "36:52",
    thumbnail: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  },
  { 
    id: 8, 
    title: "How to Build a REST API with Node.js", 
    channel: "Academind",
    channelVerified: true,
    views: "445K", 
    time: "5 days ago",
    duration: "51:33",
    thumbnail: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  },
])

const shorts = ref([
  {
    id: 1,
    title: "estimations",
    views: "2.3M views",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "your night",
    views: "890K views",
    thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "MoistCritical finds out how many adults actually buy LEGO",
    views: "1.5M views",
    thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "THEY'RE",
    views: "3.2M views",
    thumbnail: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 5,
    title: "BRENDAN'S",
    views: "1.1M views",
    thumbnail: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
  },
])

const subscriptions = ref([
  { name: "Google Career C...", avatar: "#4285f4", live: true },
  { name: "penguinz0", avatar: "#ea4335" },
  { name: "Abel Mutua", avatar: "#34a853", active: true },
  { name: "Fireship", avatar: "#fbbc05", active: true },
  { name: "Hashtag House", avatar: "#ff6b6b", active: true },
  { name: "Levinho", avatar: "#4ecdc4" },
])

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/auth')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <div class="user-dash">
    <div class="dashboard">
      <ComponentUserDashboard />
    </div>

    <div class="content">
      <!-- YouTube Header -->
      <header class="yt-header">
        <div class="header-left">
          <svg class="icon menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12h18M3 6h18M3 18h18" stroke-width="2" stroke-linecap="round"/>
          </svg>
          
          <div class="logo">
            <svg class="play-icon" viewBox="0 0 24 24" fill="#ff0000">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span class="logo-text">YouTube</span>
            <span class="region">KE</span>
          </div>
        </div>
        
        <div class="search-container">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search" 
            class="search-input"
          />
          <button class="search-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" stroke-width="2"/>
              <path d="m21 21-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="voice-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </button>
        </div>
        
        <div class="header-right">
          <button class="icon-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </button>
          <button class="create-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>Create</span>
          </button>
          <button class="icon-btn notification-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="notification-badge">9+</span>
          </button>
          <div class="user-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </header>

      <!-- Main Layout with Sidebar -->
      <div class="main-layout">
        <!-- Sidebar Navigation -->
        <aside class="sidebar-nav">
          <div class="nav-section">
            <a href="#" class="nav-item active">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span>Home</span>
            </a>
            <a href="#" class="nav-item">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span>Shorts</span>
            </a>
          </div>

          <div class="nav-divider"></div>

          <div class="nav-section">
            <div class="nav-header">
              <span>Subscriptions</span>
              <svg class="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            <a v-for="sub in subscriptions" :key="sub.name" href="#" class="nav-item subscription">
              <div class="sub-avatar" :style="{ background: sub.avatar }">
                <span v-if="sub.live" class="live-badge"></span>
              </div>
              <span>{{ sub.name }}</span>
              <span v-if="sub.active" class="active-dot"></span>
            </a>
            <a href="#" class="nav-item">
              <span>Show more</span>
              <svg class="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </a>
          </div>

          <div class="nav-divider"></div>

          <div class="nav-section">
            <div class="nav-header">You</div>
            <a href="#" class="nav-item">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>History</span>
            </a>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
          <!-- Category Pills -->
          <div class="categories">
            <button 
              v-for="cat in categories" 
              :key="cat"
              :class="['category-pill', { active: selectedCategory === cat }]"
              @click="selectedCategory = cat"
            >
              {{ cat }}
            </button>
          </div>

          <!-- Video Grid -->
          <div class="video-grid">
            <div v-for="video in videos" :key="video.id" class="video-card">
              <div class="video-thumbnail">
                <div class="thumbnail-bg" :style="{ background: video.thumbnail }"></div>
                <span class="video-duration">{{ video.duration }}</span>
              </div>
              
              <div class="video-info">
                <div class="channel-avatar-small" :style="{ background: video.thumbnail }"></div>
                <div class="video-details">
                  <h3 class="video-title">{{ video.title }}</h3>
                  <div class="video-meta">
                    <span class="channel-name">
                      {{ video.channel }}
                      <svg v-if="video.channelVerified" class="verified-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </span>
                    <div class="view-time">{{ video.views }} views • {{ video.time }}</div>
                  </div>
                </div>
                <button class="video-menu">
                  <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="19" r="2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Shorts Section -->
          <div class="shorts-section">
            <div class="section-header">
              <svg class="shorts-icon" viewBox="0 0 24 24" fill="#ff0000">
                <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"/>
              </svg>
              <h2>Shorts</h2>
              <button class="more-btn">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="2"/>
                  <circle cx="19" cy="12" r="2"/>
                  <circle cx="5" cy="12" r="2"/>
                </svg>
              </button>
            </div>

            <div class="shorts-grid">
              <div v-for="short in shorts" :key="short.id" class="short-card">
                <div class="short-thumbnail">
                  <div class="short-bg" :style="{ background: short.thumbnail }"></div>
                </div>
                <div class="short-info">
                  <h4 class="short-title">{{ short.title }}</h4>
                  <span class="short-views">{{ short.views }}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>


.content {
  flex: 1;
  background: #0f0f0f;
  color: #fff;
  overflow-y: auto;
}

/* Header */
.yt-header {
  position: sticky;
  top: 0;
  background: #0f0f0f;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 200px;
}

.icon {
  width: 24px;
  height: 24px;
}

.icon-sm {
  width: 18px;
  height: 18px;
}

.menu-icon {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s;
}

.menu-icon:hover {
  background: #272727;
}

.logo {
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
}

.play-icon {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.region {
  font-size: 10px;
  color: #aaa;
  align-self: flex-start;
  margin-top: 2px;
}

.search-container {
  flex: 1;
  max-width: 600px;
  display: flex;
  gap: 12px;
  margin: 0 40px;
}

.search-input {
  flex: 1;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 40px 0 0 40px;
  padding: 10px 16px;
  color: #fff;
  font-size: 16px;
  outline: none;
}

.search-input:focus {
  border-color: #1c62b9;
}

.search-btn {
  background: #222222;
  border: 1px solid #303030;
  border-left: none;
  border-radius: 0 40px 40px 0;
  padding: 0 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #303030;
}

.voice-btn {
  background: #181818;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.voice-btn:hover {
  background: #272727;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  background: transparent;
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: #272727;
}

.create-btn {
  background: transparent;
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.create-btn:hover {
  background: #272727;
}

.notification-btn {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #cc0000;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 4px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: #3ea6ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.user-avatar svg {
  width: 20px;
  height: 20px;
}

/* Main Layout */
.main-layout {
  display: flex;
  gap: 0;
}

/* Sidebar Navigation */
.sidebar-nav {
  width: 240px;
  flex-shrink: 0;
  padding: 12px 0;
  overflow-y: auto;
  height: calc(100vh - 56px);
  position: sticky;
  top: 56px;
}

.nav-section {
  padding: 8px 0;
}

.nav-header {
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 10px 24px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}

.nav-item:hover {
  background: #272727;
}

.nav-item.active {
  background: #272727;
  font-weight: 500;
}

.subscription {
  gap: 16px;
}

.sub-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
}

.live-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background: #cc0000;
  border: 2px solid #0f0f0f;
  border-radius: 50%;
}

.active-dot {
  width: 8px;
  height: 8px;
  background: #3ea6ff;
  border-radius: 50%;
  margin-left: auto;
}

.nav-divider {
  height: 1px;
  background: #272727;
  margin: 12px 0;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 24px;
  max-width: 1800px;
}

/* Categories */
.categories {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.categories::-webkit-scrollbar {
  height: 0;
}

.category-pill {
  background: #272727;
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}

.category-pill:hover {
  background: #3f3f3f;
}

.category-pill.active {
  background: #f1f1f1;
  color: #0f0f0f;
}

/* Video Grid */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 16px;
  margin-bottom: 48px;
}

.video-card {
  cursor: pointer;
}

.video-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-bottom: 12px;
}

.thumbnail-bg {
  width: 100%;
  height: 100%;
  transition: transform 0.2s;
}

.video-card:hover .thumbnail-bg {
  transform: scale(1.05);
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.video-info {
  display: flex;
  gap: 12px;
}

.channel-avatar-small {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}

.video-details {
  flex: 1;
}

.video-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #fff;
}

.video-meta {
  font-size: 12px;
  color: #aaa;
}

.channel-name {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 2px;
}

.verified-icon {
  width: 14px;
  height: 14px;
  color: #aaa;
}

.video-menu {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0;
  opacity: 0;
  transition: opacity 0.2s;
}

.video-card:hover .video-menu {
  opacity: 1;
}

/* Shorts Section */
.shorts-section {
  margin-top: 48px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.shorts-icon {
  width: 24px;
  height: 24px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 600;
}

.more-btn {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: auto;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s;
}

.more-btn:hover {
  background: #272727;
}

.shorts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.short-card {
  cursor: pointer;
}

.short-thumbnail {
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 8px;
}

.short-bg {
  width: 100%;
  height: 100%;
  transition: transform 0.2s;
}

.short-card:hover .short-bg {
  transform: scale(1.05);
}

.short-info {
  padding: 0 4px;
}

.short-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.short-views {
  font-size: 12px;
  color: #aaa;
}

@media (max-width: 1280px) {
  .sidebar-nav {
    width: 72px;
  }
  
  .nav-item span {
    display: none;
  }
  
  .nav-item {
    justify-content: center;
    gap: 0;
  }
  
  .nav-header {
    display: none;
  }
  
  .active-dot {
    display: none;
  }
}

@media (max-width: 768px) {
  .sidebar-nav {
    display: none;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>