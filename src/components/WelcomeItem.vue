<!-- src/components/WelcomeItem.vue -->
<template>
  <div class="welcome-item">
    <div class="welcome-item__icon">
      <slot name="icon"></slot>
    </div>
    <div class="welcome-item__content">
      <div class="welcome-item__heading">
        <slot name="heading"></slot>
      </div>
      <div class="welcome-item__text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps(['icon', 'heading'])
</script>


