<!-- resources/js/Layouts/AppLayout.vue -->
<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <!-- Navigation Bar -->
        <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <!-- Left Side: Purrfect Typing Title -->
                    <div class="flex-shrink-0">
                        <span class="text-xl font-bold text-gray-800 dark:text-white">Purrfect Typing</span>
                    </div>

                    <!-- Right Side: Authentication Links -->
                    <div class="flex items-center space-x-4">
                        <!-- Guest Links -->
                        <template v-if="!auth.user">
                            <Link
                                href="/login"
                                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Log in
                            </Link>

                            <Link
                                v-if="canRegister"
                                href="/register"
                                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Register
                            </Link>
                        </template>

                        <!-- Authenticated User Dropdown -->
                        <template v-else>
                            <Dropdown align="right" width="48">
                                <template #trigger>
                                    <button class="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span>{{ auth.user.name }}</span>

                                        <svg class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </template>

                                <template #content>
                                    <!-- Account Management -->
                                    <div class="py-1">
                                        <DropdownLink href="/profile">
                                            Profile
                                        </DropdownLink>

                                        <!-- Add more links if needed -->
                                    </div>

                                    <!-- Authentication -->
                                    <div class="py-1 border-t border-gray-200 dark:border-gray-700">
                                        <button
    type="button"
    @click.stop="logout"
    class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors duration-200"
>
    Log Out
</button>
                                    </div>
                                </template>
                            </Dropdown>
                        </template>
                    </div>
                </div>
            </div>
        </nav>

       

        <!-- Page Content -->
        <main>
            <slot />
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'; 
import { usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import { Link } from '@inertiajs/vue3';


const { auth, canRegister } = usePage().props;


const isLoggingOut = ref(false);

const logout = async () => {
    isLoggingOut.value = true;
    try {
        await Inertia.post('/logout'); 
    } catch (error) {
        // Optionally, display a user-friendly error message
    } finally {
        isLoggingOut.value = false;
    }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
