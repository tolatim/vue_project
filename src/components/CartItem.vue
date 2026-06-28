<template>
  <div class="cart-item">
    <span class="ci-emoji">{{ item.emoji }}</span>
    <div class="ci-info">
      <div class="ci-top">
        <span class="ci-name">{{ item.name }}</span>
        <span class="ci-total">${{ (item.price * item.quantity).toFixed(2) }}</span>
      </div>
      <span class="ci-unit">${{ item.price.toFixed(2) }} each</span>
      <input
        class="ci-note"
        v-model="localNote"
        placeholder="Special instructions..."
        @blur="cartStore.updateNote(item.id, localNote)"
      />
    </div>
    <div class="ci-controls">
      <button class="qty-btn" @click="cartStore.updateQuantity(item.id, -1)">−</button>
      <span class="qty-num">{{ item.quantity }}</span>
      <button class="qty-btn" @click="cartStore.updateQuantity(item.id, +1)">+</button>
      <button class="remove-btn" @click="cartStore.removeItem(item.id)" title="Remove">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({ item: Object })
const cartStore = useCartStore()
const localNote = ref(props.item.note || '')
</script>

<style scoped>
.cart-item {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--warm);
}
.cart-item:last-child { border-bottom: none; }

.ci-emoji { font-size: 28px; line-height: 1; padding-top: 2px; flex-shrink: 0; }

.ci-info { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.ci-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.ci-name { font-size: 15px; font-weight: 600; color: var(--charcoal); }
.ci-total { font-size: 15px; font-weight: 700; color: var(--rust); white-space: nowrap; }
.ci-unit { font-size: 12px; color: var(--gray); }

.ci-note {
  margin-top: 6px;
  width: 100%; padding: 6px 10px;
  border: 1px solid var(--lgray); border-radius: 6px;
  font-size: 12px; font-family: 'Inter', sans-serif; color: var(--charcoal);
  background: var(--cream); outline: none; transition: border 0.15s;
}
.ci-note:focus { border-color: var(--rust); }
.ci-note::placeholder { color: var(--lgray); }

.ci-controls {
  display: flex; align-items: center; gap: 8px;
  flex-shrink: 0;
}
.qty-btn {
  width: 28px; height: 28px; border-radius: 50%;
  border: 1.5px solid var(--lgray); background: var(--cream);
  font-size: 16px; font-weight: 700; color: var(--charcoal);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.qty-btn:hover { border-color: var(--rust); color: var(--rust); background: #FDE8DC; }
.qty-num { font-size: 14px; font-weight: 700; min-width: 16px; text-align: center; }
.remove-btn {
  width: 28px; height: 28px; border-radius: 50%;
  border: none; background: transparent;
  font-size: 12px; color: var(--gray);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.remove-btn:hover { background: #FAE0E0; color: var(--red); }
</style>
