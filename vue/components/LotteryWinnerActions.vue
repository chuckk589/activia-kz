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
      console.log(this.params)
      this.params.context.editWinner(this.params.data)
    }
  }
}
</script>