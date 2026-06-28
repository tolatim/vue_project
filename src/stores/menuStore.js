import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    categories: ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'],
    activeCategory: 'All',
    searchQuery: '',
    items: [
      { id: 1, name: 'Bruschetta', category: 'Starters', price: 6.5, description: 'Toasted bread with tomatoes & basil', emoji: '🍅', available: true, popular: true },
      { id: 2, name: 'Caesar Salad', category: 'Starters', price: 8.0, description: 'Romaine, parmesan, croutons', emoji: '🥗', available: true, popular: false },
      { id: 3, name: 'Garlic Shrimp', category: 'Starters', price: 11.0, description: 'Pan-seared in garlic butter', emoji: '🍤', available: true, popular: true },
      { id: 4, name: 'Margherita Pizza', category: 'Mains', price: 14.0, description: 'San Marzano tomato, mozzarella, basil', emoji: '🍕', available: true, popular: true },
      { id: 5, name: 'Beef Burger', category: 'Mains', price: 15.5, description: 'Angus beef, cheddar, lettuce, tomato', emoji: '🍔', available: true, popular: true },
      { id: 6, name: 'Grilled Salmon', category: 'Mains', price: 19.0, description: 'Lemon herb butter, seasonal veg', emoji: '🐟', available: false, popular: false },
      { id: 7, name: 'Pasta Carbonara', category: 'Mains', price: 13.5, description: 'Pancetta, egg, pecorino, black pepper', emoji: '🍝', available: true, popular: true },
      { id: 8, name: 'Tiramisu', category: 'Desserts', price: 7.0, description: 'Classic Italian with espresso', emoji: '🍰', available: true, popular: true },
      { id: 9, name: 'Crème Brûlée', category: 'Desserts', price: 6.5, description: 'Vanilla custard, caramel crust', emoji: '🍮', available: true, popular: false },
      { id: 10, name: 'Chocolate Lava Cake', category: 'Desserts', price: 8.5, description: 'Warm center, vanilla ice cream', emoji: '🎂', available: true, popular: true },
      { id: 11, name: 'Lemonade', category: 'Drinks', price: 4.0, description: 'Freshly squeezed, mint garnish', emoji: '🍋', available: true, popular: false },
      { id: 12, name: 'Espresso', category: 'Drinks', price: 3.0, description: 'Double shot, Italian roast', emoji: '☕', available: true, popular: true },
      { id: 13, name: 'Sparkling Water', category: 'Drinks', price: 2.5, description: 'San Pellegrino, 500ml', emoji: '💧', available: true, popular: false },
    ]
  }),

  getters: {
    // Getter 1: Filtered items by category + search
    filteredItems: (state) => {
      return state.items.filter(item => {
        const matchCat = state.activeCategory === 'All' || item.category === state.activeCategory
        const matchSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        return matchCat && matchSearch
      })
    },

    // Getter 2: Popular items only
    popularItems: (state) => state.items.filter(i => i.popular && i.available),

    // Getter 3: Total items available per category
    categoryCount: (state) => {
      const counts = {}
      state.categories.forEach(cat => {
        counts[cat] = cat === 'All'
          ? state.items.filter(i => i.available).length
          : state.items.filter(i => i.category === cat && i.available).length
      })
      return counts
    }
  },

  actions: {
    // Action 1: Set category filter
    setCategory(category) {
      this.activeCategory = category
    },

    // Action 2: Search
    setSearch(query) {
      this.searchQuery = query
    },

    // Action 3: Toggle item availability (admin)
    toggleAvailability(itemId) {
      const item = this.items.find(i => i.id === itemId)
      if (item) item.available = !item.available
    }
  }
})
