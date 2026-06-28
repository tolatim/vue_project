<template>
  <div class="app-shell">
    <!-- Top Nav -->
    <nav class="navbar">
      <div class="nav-brand">
        <span class="brand-icon">🍽️</span>
        <span class="brand-name">La Tavola</span>
      </div>
      <div class="nav-links">
        <RouterLink to="/menu" class="nav-link">Menu</RouterLink>
        <RouterLink to="/cart" class="nav-link cart-link">
          Cart
          <span v-if="cartStore.itemCount > 0" class="cart-badge">{{ cartStore.itemCount }}</span>
        </RouterLink>
        <RouterLink to="/orders" class="nav-link orders-link">
          Orders
          <span v-if="ordersStore.activeOrderCount > 0" class="orders-badge">{{ ordersStore.activeOrderCount }}</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Page -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useCartStore } from './stores/cartStore'
import { useOrdersStore } from './stores/ordersStore'

const cartStore = useCartStore()
const ordersStore = useOrdersStore()
</script>

<style scoped>
.app-shell { min-height: 100vh; display: flex; flex-direction: column; }

.navbar {
  position: sticky; top: 0; z-index: 100;
  background: var(--white);
  border-bottom: 1px solid var(--lgray);
  padding: 0 32px;
  height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 1px 8px rgba(0,0,0,0.06);
}

.nav-brand {
  display: flex; align-items: center; gap: 10px;
}
.brand-icon { font-size: 22px; }
.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-weight: 700;
  color: var(--charcoal);
  letter-spacing: -0.3px;
}

.nav-links { display: flex; align-items: center; gap: 6px; }

.nav-link {
  position: relative;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: var(--radius-sm);
  font-size: 14px; font-weight: 500; color: var(--gray);
  text-decoration: none; transition: all 0.15s;
}
.nav-link:hover { background: var(--warm); color: var(--charcoal); }
.nav-link.router-link-active { background: #FDE8DC; color: var(--rust); font-weight: 600; }

.cart-badge, .orders-badge {
  min-width: 18px; height: 18px; padding: 0 5px;
  border-radius: 20px; font-size: 11px; font-weight: 700;
  display: inline-flex; align-items: center; justify-content: center;
  line-height: 1;
}
.cart-badge { background: var(--rust); color: #fff; }
.orders-badge { background: var(--green); color: #fff; }

.main-content { flex: 1; }
</style>
