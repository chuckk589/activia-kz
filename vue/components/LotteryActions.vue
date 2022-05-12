<template>
  <CIcon @click.native="openConfigModal()" name="cil-pencil" height="18" width="18" />
</template>

<script>

export default {
  name: "LotteryActions",
  data() {
    return {}
  },
  methods: {
    openConfigModal() {
      this.params.context.componentParent.editLottery(this.params.data)
    }
  }
}
</script>