<template lang="html">
  <div class="Button">
    <button type="button" name="button" class="add--tweet">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.Button {
  .add--tweet {
    background: $maastricht;
    min-width: 150px;
    color: white;
    font-weight: bold;
    padding: 12px 18px;
    border: none;
    border-radius: 25px;
    outline: 0;

    &:hover {
      background: $lapis;
      text-decoration: none;
      transition: .25s;
    }
  }
}
</style>
