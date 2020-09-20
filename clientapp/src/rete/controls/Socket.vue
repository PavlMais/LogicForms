<template lang="pug">
    .socket(
    :class="[type, socket.name, used ? 'used' : ''] | kebab",
    :title="socket.name+'\\n'+socket.hint"
    )

</template>


<script>
import VueRender from 'rete-vue-render-plugin';
export default {
  extends: VueRender.Socket,
  props: ['used']
}
</script>


<style lang="sass" scoped>
$socket-size: 16px
$socket-margin: 10px

.socket
  display: inline-block
  cursor: pointer
  border: 2px solid white
  border-radius: $socket-size/2.0
  width: $socket-size
  height: $socket-size
  vertical-align: middle
  background: transparent
  position: relative
  z-index: 2
  &.used
    background: white
  &:hover
    border: 2px solid #777
  &.multiple
    border-color: yellow
</style>
