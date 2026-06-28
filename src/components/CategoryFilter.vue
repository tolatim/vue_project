<template>
  <div class="category-bar">
    <button
      v-for="cat in menuStore.categories"
      :key="cat"
      class="cat-btn"
      :class="{ active: menuStore.activeCategory === cat }"
      @click="menuStore.setCategory(cat)"
    >
      {{ cat }}
      <span class="cat-count">{{ menuStore.categoryCount[cat] }}</span>
    </button>
  </div>
</template>

<script setup>
import { useMenuStore } from '../stores/menuStore'
const menuStore = useMenuStore()
</script>

<style scoped>
.category-bar {
  display: flex; gap: 8px; flex-wrap: wrap;
}

.cat-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 24px;
  border: 1.5px solid var(--lgray); background: var(--white);
  font-size: 13px; font-weight: 500; color: var(--gray);
  cursor: pointer; transition: all 0.15s;
}
.cat-btn:hover { border-color: var(--rust); color: var(--rust); }
.cat-btn.active {
  background: var(--rust); border-color: var(--rust);
  color: #fff; font-weight: 600;
}
.cat-count {
  font-size: 11px; font-weight: 700;
  background: rgba(255,255,255,0.25);
  padding: 1px 6px; border-radius: 10px;
}
.cat-btn:not(.active) .cat-count { background: var(--warm); color: var(--gray); }
</style>
