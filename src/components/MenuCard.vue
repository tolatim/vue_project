<template>
  <div class="menu-card" :class="{ unavailable: !item.available }">
    <div class="card-emoji">{{ item.emoji }}</div>
    <div class="card-body">
      <div class="card-header">
        <h3 class="item-name">{{ item.name }}</h3>
        <span v-if="item.popular && item.available" class="tag tag-rust">⭐ Popular</span>
        <span v-if="!item.available" class="tag tag-gray">Unavailable</span>
      </div>
      <p class="item-desc">{{ item.description }}</p>
      <div class="card-footer">
        <span class="item-price">${{ item.price.toFixed(2) }}</span>
        <div v-if="item.available" class="qty-controls">
          <template v-if="inCart">
            <button class="qty-btn" @click="cartStore.updateQuantity(item.id, -1)">−</button>
            <span class="qty-num">{{ inCart.quantity }}</span>
            <button class="qty-btn" @click="cartStore.updateQuantity(item.id, +1)">+</button>
          </template>
          <button v-else class="btn btn-primary btn-sm" @click="cartStore.addItem(item)">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({ item: Object })
const cartStore = useCartStore()
const inCart = computed(() => cartStore.items.find(i => i.id === props.item.id))
</script>

<style scoped>
.menu-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex; gap: 16px;
  padding: 16px;
  transition: transform 0.18s, box-shadow 0.18s;
}
.menu-card:hover:not(.unavailable) { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.unavailable { opacity: 0.52; }

.card-emoji {
  font-size: 40px; line-height: 1;
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  background: var(--warm); border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.card-body { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }

.card-header { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.item-name { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--charcoal); }
.item-desc { font-size: 13px; color: var(--gray); line-height: 1.45; }

.card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
.item-price { font-size: 17px; font-weight: 700; color: var(--rust); }

.qty-controls { display: flex; align-items: center; gap: 10px; }
.qty-btn {
  width: 30px; height: 30px; border-radius: 50%;
  border: 1.5px solid var(--lgray); background: var(--cream);
  font-size: 16px; font-weight: 700; color: var(--charcoal);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.qty-btn:hover { border-color: var(--rust); color: var(--rust); background: #FDE8DC; }
.qty-num { font-size: 15px; font-weight: 700; min-width: 16px; text-align: center; }
</style>
