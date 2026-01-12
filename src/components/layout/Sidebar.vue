<template>
  <div class="sidebar">
    <section class="block">
      <h3>Użytkownik</h3>
      <button>Zaloguj</button>
    </section>

    <section class="block">
      <h3>Info</h3>
      <p>SpiderMem frontend</p>
    </section>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.block {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 6px;
}
</style>
