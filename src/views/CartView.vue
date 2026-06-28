<template>
  <div class="cart-view">
    <div class="cart-header">
      <h1>Your Cart</h1>
      <span v-if="!cartStore.cartIsEmpty" class="cart-count">{{ cartStore.itemCount }} item{{ cartStore.itemCount !== 1 ? 's' : '' }}</span>
    </div>

    <!-- Empty cart -->
    <div v-if="cartStore.cartIsEmpty" class="empty-state">
      <div class="icon">🛒</div>
      <h3>Your cart is empty</h3>
      <p>Head back to the menu and add something delicious.</p>
      <RouterLink to="/menu" class="btn btn-primary">Browse Menu</RouterLink>
    </div>

    <!-- Cart content -->
    <div v-else class="cart-layout">
      <!-- Left: Items -->
      <div class="card items-panel">
        <div class="panel-header">
          <h2>Order Items</h2>
          <button class="btn btn-ghost btn-sm" @click="cartStore.clearCart()">Clear all</button>
        </div>
        <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
      </div>

      <!-- Right: Summary -->
      <div class="summary-panel">
        <!-- Table number -->
        <div class="card summary-card">
          <h2>Table Info</h2>
          <div class="table-selector">
            <label class="ts-label">Table number</label>
            <div class="table-btns">
              <button
                v-for="n in 10" :key="n"
                class="table-btn"
                :class="{ active: cartStore.tableNumber === n }"
                @click="cartStore.setTable(n)"
              >{{ n }}</button>
            </div>
          </div>
        </div>

        <!-- Promo -->
        <div class="card summary-card">
          <h2>Promo Code</h2>
          <div class="promo-row">
            <input
              class="promo-input"
              v-model="promoInput"
              placeholder="Enter code..."
              @keydown.enter="applyPromo"
            />
            <button class="btn btn-outline btn-sm" @click="applyPromo">Apply</button>
          </div>
          <div v-if="promoMsg" class="promo-msg" :class="promoOk ? 'promo-ok' : 'promo-err'">
            {{ promoMsg }}
          </div>
          <p class="promo-hint">Try: FEAST20 or WELCOME10</p>
        </div>

        <!-- Totals -->
        <div class="card summary-card totals-card">
          <h2>Summary</h2>
          <div class="totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>
            <div v-if="cartStore.discount > 0" class="total-row discount-row">
              <span>Discount ({{ cartStore.promoCode }})</span>
              <span>−${{ (cartStore.subtotal * cartStore.discount).toFixed(2) }}</span>
            </div>
            <div class="total-row grand-total">
              <span>Total</span>
              <span>${{ cartStore.total.toFixed(2) }}</span>
            </div>
          </div>
          <button
            class="btn btn-primary place-btn"
            :disabled="!cartStore.tableNumber"
            @click="placeOrder"
          >
            {{ cartStore.tableNumber ? 'Place Order' : 'Select a table first' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useOrdersStore } from '../stores/ordersStore'
import CartItem from '../components/CartItem.vue'

const cartStore = useCartStore()
const ordersStore = useOrdersStore()
const router = useRouter()

const promoInput = ref('')
const promoMsg = ref('')
const promoOk = ref(false)

function applyPromo() {
  if (!promoInput.value) return
  const result = cartStore.applyPromo(promoInput.value)
  promoMsg.value = result.message
  promoOk.value = result.success
}

function placeOrder() {
  ordersStore.placeOrder({
    items: cartStore.items,
    tableNumber: cartStore.tableNumber,
    subtotal: cartStore.subtotal,
    discount: cartStore.discount,
    total: cartStore.total,
    promoCode: cartStore.promoCode
  })
  cartStore.clearCart()
  router.push('/orders')
}
</script>

<style scoped>
.cart-view { max-width: 900px; margin: 0 auto; padding: 36px 24px 80px; }
.cart-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 28px; }
.cart-header h1 { font-size: 34px; font-weight: 700; }
.cart-count { font-size: 14px; color: var(--gray); }

.cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: 24px; align-items: start; }

.items-panel { padding: 20px; }
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.panel-header h2 { font-size: 18px; font-weight: 700; }

.summary-panel { display: flex; flex-direction: column; gap: 16px; }
.summary-card { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
.summary-card h2 { font-size: 16px; font-weight: 700; }

.table-selector { display: flex; flex-direction: column; gap: 8px; }
.ts-label { font-size: 12px; color: var(--gray); }
.table-btns { display: flex; gap: 6px; flex-wrap: wrap; }
.table-btn {
  width: 36px; height: 36px; border-radius: 8px;
  border: 1.5px solid var(--lgray); background: var(--cream);
  font-size: 13px; font-weight: 600; color: var(--gray);
  cursor: pointer; transition: all 0.15s;
}
.table-btn:hover { border-color: var(--rust); color: var(--rust); }
.table-btn.active { background: var(--rust); border-color: var(--rust); color: #fff; }

.promo-row { display: flex; gap: 8px; }
.promo-input {
  flex: 1; padding: 9px 12px;
  border: 1.5px solid var(--lgray); border-radius: var(--radius-sm);
  font-size: 14px; font-family: 'Inter', sans-serif; color: var(--charcoal);
  background: var(--cream); outline: none; transition: border 0.15s; text-transform: uppercase;
}
.promo-input:focus { border-color: var(--rust); }
.promo-msg { font-size: 13px; font-weight: 500; }
.promo-ok { color: var(--green); }
.promo-err { color: var(--red); }
.promo-hint { font-size: 11px; color: var(--lgray); }

.totals { display: flex; flex-direction: column; gap: 10px; }
.total-row { display: flex; justify-content: space-between; font-size: 14px; color: var(--gray); }
.discount-row { color: var(--green); font-weight: 500; }
.grand-total {
  padding-top: 10px; border-top: 1.5px solid var(--lgray);
  font-size: 18px; font-weight: 700; color: var(--charcoal);
}
.place-btn { width: 100%; justify-content: center; padding: 14px; font-size: 15px; }

@media (max-width: 680px) {
  .cart-layout { grid-template-columns: 1fr; }
}
</style>
