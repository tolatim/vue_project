<template>
  <div class="menu-view">
    <!-- Hero -->
    <div class="menu-hero">
      <div class="hero-text">
        <h1>Our Menu</h1>
        <p>Fresh ingredients, crafted with care — order directly from your table.</p>
      </div>
      <!-- Search -->
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          class="search-input"
          v-model="menuStore.searchQuery"
          placeholder="Search dishes..."
          @input="menuStore.setSearch(menuStore.searchQuery)"
        />
        <button v-if="menuStore.searchQuery" class="search-clear" @click="menuStore.setSearch('')">✕</button>
      </div>
    </div>

    <div class="menu-body">
      <!-- Popular strip (only on All + no search) -->
      <section v-if="menuStore.activeCategory === 'All' && !menuStore.searchQuery" class="popular-strip">
        <h2 class="section-title">⭐ Most Ordered</h2>
        <div class="popular-grid">
          <div
            v-for="item in menuStore.popularItems.slice(0, 4)"
            :key="item.id"
            class="popular-chip"
            @click="cartStore.addItem(item)"
          >
            <span class="pc-emoji">{{ item.emoji }}</span>
            <div class="pc-info">
              <span class="pc-name">{{ item.name }}</span>
              <span class="pc-price">${{ item.price.toFixed(2) }}</span>
            </div>
            <span class="pc-add">+</span>
          </div>
        </div>
      </section>

      <!-- Category filter -->
      <CategoryFilter />

      <!-- Results -->
      <div class="results-header">
        <span class="results-count">{{ menuStore.filteredItems.length }} item{{ menuStore.filteredItems.length !== 1 ? 's' : '' }}</span>
      </div>

      <div v-if="menuStore.filteredItems.length" class="items-grid">
        <MenuCard v-for="item in menuStore.filteredItems" :key="item.id" :item="item" />
      </div>
      <div v-else class="empty-state">
        <div class="icon">🍽️</div>
        <h3>Nothing found</h3>
        <p>Try a different category or clear the search.</p>
        <button class="btn btn-outline btn-sm" @click="menuStore.setSearch(''); menuStore.setCategory('All')">
          Reset filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from '../stores/menuStore'
import { useCartStore } from '../stores/cartStore'
import MenuCard from '../components/MenuCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

const menuStore = useMenuStore()
const cartStore = useCartStore()
</script>

<style scoped>
.menu-view { max-width: 860px; margin: 0 auto; padding: 0 24px 80px; }

.menu-hero {
  padding: 36px 0 24px;
  display: flex; justify-content: space-between; align-items: flex-end; gap: 24px;
  flex-wrap: wrap;
}
.hero-text h1 { font-size: 36px; font-weight: 700; line-height: 1.1; }
.hero-text p { font-size: 14px; color: var(--gray); margin-top: 6px; }

.search-box {
  position: relative; display: flex; align-items: center;
  background: var(--white); border: 1.5px solid var(--lgray);
  border-radius: 10px; overflow: hidden;
  box-shadow: var(--shadow);
  min-width: 220px;
}
.search-icon { padding: 0 10px 0 14px; font-size: 14px; color: var(--gray); }
.search-input {
  flex: 1; padding: 10px 8px 10px 0;
  border: none; outline: none; background: transparent;
  font-size: 14px; font-family: 'Inter', sans-serif; color: var(--charcoal);
}
.search-input::placeholder { color: var(--lgray); }
.search-clear {
  padding: 0 12px; border: none; background: transparent;
  font-size: 12px; color: var(--gray); cursor: pointer;
}
.search-clear:hover { color: var(--rust); }

.menu-body { display: flex; flex-direction: column; gap: 24px; }

.popular-strip { display: flex; flex-direction: column; gap: 12px; }
.section-title { font-size: 18px; font-weight: 700; }
.popular-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }

.popular-chip {
  display: flex; align-items: center; gap: 10px;
  background: var(--white); border-radius: var(--radius-sm);
  padding: 10px 12px; cursor: pointer;
  box-shadow: var(--shadow); border: 1.5px solid transparent;
  transition: all 0.15s;
}
.popular-chip:hover { border-color: var(--rust); transform: translateY(-1px); box-shadow: var(--shadow-lg); }
.pc-emoji { font-size: 26px; }
.pc-info { flex: 1; display: flex; flex-direction: column; }
.pc-name { font-size: 13px; font-weight: 600; color: var(--charcoal); }
.pc-price { font-size: 12px; color: var(--rust); font-weight: 700; }
.pc-add {
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--rust); color: #fff;
  font-size: 16px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.results-header { display: flex; align-items: center; justify-content: space-between; }
.results-count { font-size: 13px; color: var(--gray); }

.items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 14px; }

@media (max-width: 600px) {
  .menu-hero { flex-direction: column; align-items: flex-start; }
  .popular-grid { grid-template-columns: 1fr; }
  .items-grid { grid-template-columns: 1fr; }
}
</style>
