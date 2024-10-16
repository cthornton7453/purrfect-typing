<!-- resources/js/Pages/TypingTestPage.vue -->
<template>
    <AppLayout>
        <Head title="Typing Test" />
        <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black text-black/50 dark:text-white/50">
            <div class="relative w-full max-w-4xl px-6 lg:px-8">
                <TypingTestBox />
                <!-- Footer -->
                <footer class="mt-16 py-6 text-center text-sm text-gray-600 dark:text-white/70">
                    Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
                </footer>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import TypingTestBox from '@/Components/TypingTestBox.vue';

const props = defineProps({
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
