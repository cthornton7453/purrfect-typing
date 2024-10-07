<template>
  <div class="typing-box bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
    <div class="word-lines font-mono text-lg leading-relaxed">
      <div v-for="(line, lineIndex) in displayedLines" :key="lineIndex" class="line mb-2">
        <span v-for="(word, wordIndex) in line" :key="wordIndex" class="word">
          <span
            v-for="(char, charIndex) in word.split('')"
            :key="charIndex"
            :class="getCharClass(lineIndex, wordIndex, charIndex)"
            :data-char-pos="getCursorPosition(lineIndex, wordIndex, charIndex)"
          >
            {{ char }}
          </span>
          <!-- Space between words -->
          <span class="space">&nbsp;</span>
        </span>
      </div>
    </div>
    <!-- Cursor -->
    <span class="cursor" :style="cursorStyle" ref="cursorRef"></span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import '../../css/TypingTest.css'; 


const typingBoxRef = ref(null);
const cursorRef = ref(null);


const wordsPool = [
  'example', 'typing', 'speed', 'test', 'practice', 'improve', 'accuracy',
  'keyboard', 'challenge', 'performance', 'development', 'application', 'monitor',
  'reactivity', 'responsive', 'interface', 'component', 'function', 'variable',
  'javascript', 'vue', 'react', 'angular', 'framework', 'library', 'design',
  'pattern', 'optimization', 'syntax', 'debugging'
];
const userInput = ref('');
const words = ref(generateWords());
const currentPosition = ref(0);


function generateWords() {
  return Array.from({ length: 30 }, () => wordsPool[Math.floor(Math.random() * wordsPool.length)]);
}


const displayedLines = computed(() => {
  const wordsPerLine = 10;
  return [
    words.value.slice(0, wordsPerLine),
    words.value.slice(wordsPerLine, wordsPerLine * 2),
    words.value.slice(wordsPerLine * 2, wordsPerLine * 3),
  ];
});


const targetText = computed(() => {
  return words.value.join(' ');
});


function getCursorPosition(lineIndex, wordIndex, charIndex) {
  const wordsPerLine = 10;
  let pos = 0;


  for (let i = 0; i < lineIndex; i++) {
    const line = displayedLines.value[i];
    line.forEach(word => {
      pos += word.length + 1; 
    });
  }

  const currentLine = displayedLines.value[lineIndex];
  for (let i = 0; i < wordIndex; i++) {
    pos += currentLine[i].length + 1; 
  }

 
  pos += charIndex;

  return pos;
}

function isCursor(lineIndex, wordIndex, charIndex) {
  const cursorPos = getCursorPosition(lineIndex, wordIndex, charIndex);
  return currentPosition.value === cursorPos;
}


const cursorStyle = ref({
  top: '0px',
  left: '0px',
  position: 'absolute',
});

function handleKeyDown(event) {
  if (event.key === 'Backspace') {
    if (currentPosition.value > 0) currentPosition.value--;
    userInput.value = userInput.value.slice(0, -1);
  } else if (event.key === ' ' || event.key.length === 1) {
    if (event.key === ' ') {
      if (currentPosition.value < targetText.value.length) {
        userInput.value += ' ';
        currentPosition.value++;
      }
    } else if (event.key.length === 1) {
      if (currentPosition.value < targetText.value.length) {
        userInput.value += event.key;
        currentPosition.value++;
      }
    }
  }
}

function getCharClass(lineIndex, wordIndex, charIndex) {
  const charPosition = getCursorPosition(lineIndex, wordIndex, charIndex);
  if (charPosition > currentPosition.value) return 'untyped';

  const targetChar = targetText.value[charPosition] || '';
  const typedChar = userInput.value[charPosition] || '';

  if (typedChar === '') return 'untyped';
  return typedChar === targetChar ? 'correct' : 'incorrect';
}

onMounted(() => {
  currentPosition.value = 0;
  document.addEventListener('keydown', handleKeyDown);
  if (typingBoxRef.value) {
    typingBoxRef.value.focus();
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

watch(currentPosition, async (newVal) => {
  if (newVal > targetText.value.length) {
    currentPosition.value = targetText.value.length;
  }

  await nextTick();
  const targetElement = document.querySelector(`[data-char-pos="${newVal}"]`);
  if (targetElement && cursorRef.value && typingBoxRef.value) {
    const rect = targetElement.getBoundingClientRect();
    const parentRect = typingBoxRef.value.getBoundingClientRect();
    cursorStyle.value.top = `${rect.top - parentRect.top}px`;
    cursorStyle.value.left = `${rect.left - parentRect.left}px`;
  } else {
    const lastChar = document.querySelector(`[data-char-pos="${targetText.value.length - 1}"]`);
    if (lastChar && cursorRef.value && typingBoxRef.value) {
      const rect = lastChar.getBoundingClientRect();
      const parentRect = typingBoxRef.value.getBoundingClientRect();
      cursorStyle.value.top = `${rect.top - parentRect.top}px`;
      cursorStyle.value.left = `${rect.right - parentRect.left}px`;
    } else {
      cursorStyle.value.top = `0px`;
      cursorStyle.value.left = `0px`;
    }
  }
});
</script>

<style scoped src="../../css/TypingTest.css"></style>
