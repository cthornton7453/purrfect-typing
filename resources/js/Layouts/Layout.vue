<template>
  <div class="flex flex-col h-screen">
    <!-- App Bar -->
    <header class="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      <!-- App Name -->
      <div class="text-2xl font-bold flex items-center">
        🐱 <span class="ml-2">Purrfect Typing</span>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        @click="handleLogin"
      >
        Login
      </button>
    </header>
   <main class="flex-grow flex items-center justify-center bg-gray-900">
      <slot />
    </main>    
  </div>
</template>

<script setup>
  function handleLogin() {
    console.log('Login button clicked!');
  }
</script>

<style scoped>

</style>
