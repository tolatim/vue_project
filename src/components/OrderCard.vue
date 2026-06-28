<template>
  <div class="order-card card">
    <div class="oc-header">
      <div class="oc-id-row">
        <span class="oc-id">#{{ order.id }}</span>
        <span class="tag" :class="statusClass[order.status]">{{ order.status }}</span>
        <span v-if="order.tableNumber" class="oc-table">Table {{ order.tableNumber }}</span>
      </div>
      <span class="oc-time">{{ timeAgo(order.placedAt) }}</span>
    </div>

    <div class="oc-items">
      <div v-for="item in order.items" :key="item.id" class="oc-item">
        <span>{{ item.emoji }} {{ item.name }}</span>
        <span class="oc-item-qty">×{{ item.quantity }}</span>
      </div>
    </div>

    <div class="oc-footer">
      <div class="oc-total-row">
        <span class="oc-total-label">Total</span>
        <span class="oc-total">${{ order.total.toFixed(2) }}</span>
      </div>

      <!-- Rating (only for delivered orders) -->
      <div v-if="order.status === 'Delivered'" class="oc-rating">
        <span v-for="n in 5" :key="n" class="star"
          :class="{ filled: n <= (order.rating || 0) }"
          @click="ordersStore.rateOrder(order.id, n)">★</span>
      </div>

      <!-- Actions -->
      <div class="oc-actions">
        <button
          v-if="!['Delivered', 'Cancelled'].includes(order.status)"
          class="btn btn-outline btn-sm"
          @click="ordersStore.advanceStatus(order.id)"
        >
          Mark as {{ nextStatus[order.status] }}
        </button>
        <button
          v-if="order.status === 'Pending'"
          class="btn btn-sm"
          style="color: var(--red); border: 1.5px solid var(--red);"
          @click="ordersStore.cancelOrder(order.id)"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '../stores/ordersStore'

defineProps({ order: Object })
const ordersStore = useOrdersStore()

const statusClass = {
  Pending:   'tag-amber',
  Preparing: 'tag-blue',
  Ready:     'tag-rust',
  Delivered: 'tag-green',
  Cancelled: 'tag-red'
}

const nextStatus = {
  Pending: 'Preparing',
  Preparing: 'Ready',
  Ready: 'Delivered'
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}
</script>

<style scoped>
.order-card { padding: 20px; display: flex; flex-direction: column; gap: 14px; }

.oc-header { display: flex; justify-content: space-between; align-items: flex-start; }
.oc-id-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.oc-id { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--charcoal); }
.oc-table { font-size: 12px; color: var(--gray); }
.oc-time { font-size: 12px; color: var(--gray); white-space: nowrap; }

.oc-items { display: flex; flex-direction: column; gap: 5px; }
.oc-item {
  display: flex; justify-content: space-between;
  font-size: 13px; color: var(--charcoal);
  padding: 4px 0; border-bottom: 1px solid var(--warm);
}
.oc-item:last-child { border-bottom: none; }
.oc-item-qty { font-weight: 600; color: var(--gray); }

.oc-footer { display: flex; flex-direction: column; gap: 10px; }
.oc-total-row { display: flex; justify-content: space-between; align-items: baseline; }
.oc-total-label { font-size: 13px; color: var(--gray); font-weight: 500; }
.oc-total { font-size: 18px; font-weight: 700; color: var(--rust); }

.oc-rating { display: flex; gap: 4px; }
.star { font-size: 22px; color: var(--lgray); cursor: pointer; transition: color 0.15s; }
.star:hover, .star.filled { color: #F5A623; }

.oc-actions { display: flex; gap: 8px; }
</style>
