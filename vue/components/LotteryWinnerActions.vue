<template>
  <CIcon @click.native="openConfigModal()" name="cil-pencil" height="18" width="18" />
</template>

<script>

export default {
  name: "LotteryWinnerActions",
  data() {
    return {}
  },
  methods: {
    openConfigModal() {
      this.params.context.editWinner(this.params.data)
    }
  }
}
</script>