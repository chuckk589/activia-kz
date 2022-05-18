<template>
  <div>
    <CDataTable sorter hover :items="items" :fields="fields" column-filter>
      <template #prizeId="{ item }"><td>{{ findPrize(item) }}</td></template>
    </CDataTable>
  </div>

</template>


<script>
import CExtendedModal from '../components/table/CExtendedModal.vue'

export default {
  name: 'Prizes',
  components: {
    CExtendedModal
  },
  data() {
    return {
      collapseDuration: 0,
      modalConfig: {
        show: false,
        data: {},
      },
      items: [],
      fields: [
        { key: 'id', label: 'Id приза' },
        { key: 'prizeId', label: 'Тип' },
        { key: 'qr_payload', label: 'Значение' },
      ]
    }
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/prize-value/` }).then(e => {
      this.items = e.data
    })
  },
  methods: {
    findPrize(item) {
      return this.$ctable.prizes.find(e => e.value == item.prizeId).label
    },
    newLotteryInit() {
      this.modalConfig.data = {
        fields: [
          { label: 'Дата розыгрыша', key: "start", type: "date" },
          { label: 'Конец', key: 'end', type: "date" },
          { label: 'Что разыгрываем', key: "prize", select: this.$ctable.prizes, value: this.$ctable.prizes[0].value },
          { label: 'Основные победители', key: "primaryWinners", type: "number" },
          { label: 'Запасные победители', key: "reserveWinners", type: "number" }
        ],
        footer: 'Создать',
        header: 'Новый розыгрыш',
        type: 'newLottery'
      }
      this.modalConfig.show = true
    },
    closeModalHandler() {
      switch (this.modalConfig.data.type) {
        case 'deletePrize': {
          this.$http({
            method: 'DELETE',
            url: `/v1/prize-value/${this.modalConfig.data.cur.id}`,
          })
            .then(() => {
              const idx = this.items.findIndex(i => i.id == this.modalConfig.data.cur.id)
              this.items.splice(idx, 1)
              this.modalConfig.show = false
            })
          break
        }
        default:
          break;
      }
      // if (this.modalConfig.data.type == 'newLottery') {
      //   const data = this.modalConfig.data.fields.reduce((s, c) => {
      //     s[c.key] = c.value
      //     return s
      //   }, {})
      //   this.$http({ method: 'POST', url: `/v1/lottery/`, data: data })
      //     .then((r) => {
      //       this.modalConfig.show = false
      //       this.items.push(r.data)
      //     })
      // } else if (this.modalConfig.data.type == 'editLottery') {
      //   const status_id = this.modalConfig.data.fields[0].value
      //   this.$http({ method: 'PUT', url: `/v1/lottery/${this.modalConfig.data.cur.id}`, data: { status: status_id } })
      //     .then(() => {
      //       this.modalConfig.data.cur.status = this.$ctable.lottery_statuses.find(c => c.value == status_id).label
      //     })
      // } else if (this.modalConfig.data.type == 'deletePrize') {
      //   this.$http({
      //     method: 'DELETE',
      //     url: `/v1/lottery/${this.modalConfig.data.cur.id}`,
      //   })
      //     .then(() => {
      //       const idx = this.items.findIndex(i => i.id == this.modalConfig.data.cur.id)
      //       this.items.splice(idx, 1)
      //       this.modalConfig.show = false
      //     })
      // }
    },
    // changeLotteryStatus(item) {
    //   this.modalConfig.data = {
    //     cur: item,
    //     fields: [
    //       { key: 'status', label: 'Статус', select: this.$ctable.lottery_statuses, value: this.$ctable.lottery_statuses.find(c => c.label == item.status)?.value },
    //     ],
    //     footer: 'Сохранить',
    //     header: 'Статус розыгрыша',
    //     type: 'editLottery'
    //   }
    //   this.modalConfig.show = true
    // },
    deletePrize(item) {
      this.modalConfig.data = {
        cur: item,
        fields: [],
        footer: 'Подтвердить',
        header: 'Удалить приз?',
        type: 'deletePrize'
      }
      this.modalConfig.show = true
    },
  },
  computed: {

  },
}
</script>