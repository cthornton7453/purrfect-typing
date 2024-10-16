<!-- resources/js/Components/TypingTestBox.vue -->
<template>
    <div class="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Typing Test</h2>
        <div class="mb-4">
            <p class="text-gray-700 dark:text-gray-300">
                {{ testText }}
            </p>
        </div>
        <input
            type="text"
            v-model="userInput"
            @input="handleInput"
            placeholder="Start typing here..."
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-700 dark:text-white"
            :disabled="isTestCompleted"
        />
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>Words Typed: {{ wordsTyped }}</p>
            <p>Accuracy: {{ accuracy }}%</p>
            <p v-if="isTestCompleted" class="text-green-600 dark:text-green-400">Test Completed!</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Dummy text for the typing test
const testText = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.";

const userInput = ref('');
const isTestCompleted = ref(false);

// Calculate words typed based on spaces
const wordsTyped = computed(() => {
    if (userInput.value.trim() === '') return 0;
    return userInput.value.trim().split(/\s+/).length;
});

// Calculate accuracy
const accuracy = computed(() => {
    if (userInput.value.trim() === '') return 100;
    const correctChars = userInput.value
        .split('')
        .filter((char, index) => char === testText[index]).length;
    return ((correctChars / testText.length) * 100).toFixed(2);
});

const handleInput = () => {
    // Check if the user has completed typing the test text
    if (userInput.value === testText) {
        isTestCompleted.value = true;
    } else {
        isTestCompleted.value = false;
    }
};

// Watch for changes to reset the test if needed
watch(userInput, (newVal) => {
    if (newVal.length > testText.length) {
        userInput.value = testText;
        isTestCompleted.value = true;
    }
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
