import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],       // { ...menuItem, quantity, note }
    tableNumber: null,
    promoCode: '',
    discount: 0,
    promos: { FEAST20: 0.20, WELCOME10: 0.10 }
  }),

  getters: {
    // Getter 1: Total item count (badge)
    itemCount: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),

    // Getter 2: Subtotal before discount
    subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),

    // Getter 3: Final total after discount
    total: (state) => {
      const sub = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      return sub * (1 - state.discount)
    },

    cartIsEmpty: (state) => state.items.length === 0
  },

  actions: {
    // Action 1: Add item (or increment)
    addItem(menuItem) {
      const existing = this.items.find(i => i.id === menuItem.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...menuItem, quantity: 1, note: '' })
      }
    },

    // Action 2: Remove item entirely
    removeItem(itemId) {
      this.items = this.items.filter(i => i.id !== itemId)
    },

    // Action 3: Change quantity
    updateQuantity(itemId, delta) {
      const item = this.items.find(i => i.id === itemId)
      if (!item) return
      item.quantity += delta
      if (item.quantity <= 0) this.removeItem(itemId)
    },

    // Action 4: Apply promo code
    applyPromo(code) {
      const rate = this.promos[code.toUpperCase()]
      if (rate !== undefined) {
        this.promoCode = code.toUpperCase()
        this.discount = rate
        return { success: true, message: `${rate * 100}% discount applied!` }
      }
      return { success: false, message: 'Invalid promo code.' }
    },

    // Action 5: Clear cart
    clearCart() {
      this.items = []
      this.promoCode = ''
      this.discount = 0
      this.tableNumber = null
    },

    setTable(num) {
      this.tableNumber = num
    },

    updateNote(itemId, note) {
      const item = this.items.find(i => i.id === itemId)
      if (item) item.note = note
    }
  }
})
