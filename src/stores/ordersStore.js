import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    nextId: 1000,
  }),

  getters: {
    // Getter 1: All orders sorted newest first
    sortedOrders: (state) => [...state.orders].sort((a, b) => b.id - a.id),

    // Getter 2: Revenue total
    totalRevenue: (state) => state.orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0),

    // Getter 3: Orders by status
    ordersByStatus: (state) => {
      const groups = { Pending: [], Preparing: [], Ready: [], Delivered: [], Cancelled: [] }
      state.orders.forEach(o => { if (groups[o.status]) groups[o.status].push(o) })
      return groups
    },

    activeOrderCount: (state) =>
      state.orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).length
  },

  actions: {
    // Action 1: Place order from cart
    placeOrder({ items, tableNumber, subtotal, discount, total, promoCode }) {
      const order = {
        id: this.nextId++,
        items: items.map(i => ({ ...i })),
        tableNumber,
        subtotal,
        discount,
        total,
        promoCode,
        status: 'Pending',
        placedAt: new Date(),
        estimatedMinutes: 15 + Math.floor(items.length * 2.5)
      }
      this.orders.unshift(order)
      return order
    },

    // Action 2: Advance order status
    advanceStatus(orderId) {
      const flow = ['Pending', 'Preparing', 'Ready', 'Delivered']
      const order = this.orders.find(o => o.id === orderId)
      if (!order) return
      const idx = flow.indexOf(order.status)
      if (idx < flow.length - 1) order.status = flow[idx + 1]
    },

    // Action 3: Cancel order
    cancelOrder(orderId) {
      const order = this.orders.find(o => o.id === orderId)
      if (order && order.status === 'Pending') order.status = 'Cancelled'
    },

    // Action 4: Add rating
    rateOrder(orderId, rating) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) order.rating = rating
    }
  }
})
