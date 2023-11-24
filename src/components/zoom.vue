<template>
  <div
    @wheel="handleWeel"
    :style="`transform: scale(${zoom});position:absolute; top:${elLeft}px;left:${elTop}px`">
    <div ref="outerRef">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  minZoom: {
    type: Number,
    default: 0.5
  },
  maxZoom: {
    type: Number,
    default: 2
  }
})

// 滚轮放大缩小事件
const zoom = ref(1)

const handleWeel = (e) => {
  // console.log(e)
  if (e.wheelDelta < 0) {
    zoom.value -= 0.05
  } else {
    zoom.value += 0.05
  }
  // console.log(zoom.value)

  if (zoom.value <= props.minZoom) {
    zoom.value = props.minZoom
  } else if (zoom.value >= props.maxZoom) {
    zoom.value = props.maxZoom
  }
}
</script>
