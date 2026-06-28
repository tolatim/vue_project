<template>
  <div class="orders-view">
    <div class="orders-header">
      <h1>Orders</h1>
      <RouterLink to="/menu" class="btn btn-primary btn-sm">+ New Order</RouterLink>
    </div>

    <!-- Stats row -->
    <div class="stats-row">
      <div class="stat-card card">
        <span class="stat-icon">📋</span>
        <div>
          <div class="stat-val">{{ ordersStore.sortedOrders.length }}</div>
          <div class="stat-label">Total Orders</div>
        </div>
      </div>
      <div class="stat-card card">
        <span class="stat-icon">⏳</span>
        <div>
          <div class="stat-val">{{ ordersStore.activeOrderCount }}</div>
          <div class="stat-label">Active</div>
        </div>
      </div>
      <div class="stat-card card">
        <span class="stat-icon">💰</span>
        <div>
          <div class="stat-val">${{ ordersStore.totalRevenue.toFixed(2) }}</div>
          <div class="stat-label">Revenue</div>
        </div>
      </div>
      <div class="stat-card card">
        <span class="stat-icon">✅</span>
        <div>
          <div class="stat-val">{{ ordersStore.ordersByStatus.Delivered.length }}</div>
          <div class="stat-label">Delivered</div>
        </div>
      </div>
    </div>

    <!-- Status tabs -->
    <div class="status-tabs">
      <button
        v-for="s in statuses" :key="s"
        class="tab-btn"
        :class="{ active: activeTab === s }"
        @click="activeTab = s"
      >
        {{ s }}
        <span class="tab-count" v-if="countFor(s)">{{ countFor(s) }}</span>
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="!ordersStore.sortedOrders.length" class="empty-state">
      <div class="icon">📋</div>
      <h3>No orders yet</h3>
      <p>Place your first order from the menu.</p>
      <RouterLink to="/menu" class="btn btn-primary">Go to Menu</RouterLink>
    </div>

    <!-- Orders grid -->
    <div v-else-if="visibleOrders.length" class="orders-grid">
      <OrderCard v-for="order in visibleOrders" :key="order.id" :order="order" />
    </div>

    <div v-else class="empty-state">
      <div class="icon">🔍</div>
      <h3>No {{ activeTab.toLowerCase() }} orders</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useOrdersStore } from '../stores/ordersStore'
import OrderCard from '../components/OrderCard.vue'

const ordersStore = useOrdersStore()

const statuses = ['All', 'Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']
const activeTab = ref('All')

const visibleOrders = computed(() => {
  if (activeTab.value === 'All') return ordersStore.sortedOrders
  return ordersStore.sortedOrders.filter(o => o.status === activeTab.value)
})

function countFor(s) {
  if (s === 'All') return ordersStore.sortedOrders.length
  return ordersStore.ordersByStatus[s]?.length || 0
}
</script>

<style scoped>
.orders-view { max-width: 900px; margin: 0 auto; padding: 36px 24px 80px; }
.orders-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 28px;
}
.orders-header h1 { font-size: 34px; font-weight: 700; }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
.stat-card {
  padding: 16px 18px; display: flex; align-items: center; gap: 14px;
}
.stat-icon { font-size: 28px; }
.stat-val { font-size: 22px; font-weight: 700; color: var(--charcoal); }
.stat-label { font-size: 12px; color: var(--gray); margin-top: 2px; }

.status-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 24px; }
.tab-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 24px;
  border: 1.5px solid var(--lgray); background: var(--white);
  font-size: 13px; font-weight: 500; color: var(--gray);
  cursor: pointer; transition: all 0.15s;
}
.tab-btn:hover { border-color: var(--rust); color: var(--rust); }
.tab-btn.active { background: var(--rust); border-color: var(--rust); color: #fff; font-weight: 600; }
.tab-count {
  font-size: 11px; font-weight: 700;
  background: rgba(255,255,255,0.25);
  padding: 1px 6px; border-radius: 10px;
}
.tab-btn:not(.active) .tab-count { background: var(--warm); color: var(--gray); }

.orders-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }

@media (max-width: 600px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .orders-grid { grid-template-columns: 1fr; }
}
</style>
