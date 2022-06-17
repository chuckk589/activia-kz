<template>
  <div>
    <CExtendedModal @modal-closed="closeModalHandler()" :vis="modalConfig.show" :mData="modalConfig.data">
      <template #content>
        <CImg v-if="modalConfig.data.path" fluidGrow :src="modalConfig.data.path"></CImg>
      </template>
    </CExtendedModal>
    <CDataTable style="user-select: none;" sorter hover :items="items" :fields="fields" column-filter @row-clicked="rowClick">
      <template #over-table>
        <div style="display:flex;">
          <CLink class="btn-square btn btn-primary btn-sm" :href="getCurrentItems()" style="margin-right:3px;"
            download="table-data.csv" target="_blank">Скачать
            (.csv)</CLink>
          <CButton shape="square" size="sm" class="btn btn-primary " @click="newLotteryInit">
            Новый розыгрыш</CButton>
          <div style="margin-left:auto; display: flex; align-items: center;">
            <span style="margin-right:5px;">Режим для записи</span>
            <CSwitch color="primary" size="sm" :checked.sync="mode" />
          </div>
        </div>
      </template>
      <template #action="{ item }">
        <td>
          <CDropdown addTogglerClasses="btn-square" size="sm" toggler-text="Действия" class="m-2" color="primary">
            <CDropdownItem @click="changeLotteryStatus(item)">Изменить</CDropdownItem>
            <CDropdownItem @click="deleteLottery(item)">Удалить</CDropdownItem>
          </CDropdown>
        </td>
      </template>
      <template #details="{ item }">
        <CCollapse class="subtable" :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CRow>
            <CCol>Основной</CCol>
            <CCol>Подтвержден</CCol>
            <CCol>Уведомлен</CCol>
            <CCol>Id чека</CCol>
            <CCol>Id сертификата</CCol>
            <CCol>Имя</CCol>
            <CCol>Номер</CCol>
            <CCol>Город</CCol>
            <CCol>Чек</CCol>
            <CCol></CCol>
          </CRow>
          <CRow v-for="(winner, index) in item.winners" v-if="!mode || winner.primary" :key="index">
            <CCol>{{ winner.primary ? "Да" : "Нет" }}</CCol>
            <CCol>{{ winner.confirmed ? "Да" : "Нет" }}</CCol>
            <CCol>{{ winner.notified ? "Да" : "Нет" }}</CCol>
            <CCol>{{ winner.fancyId }}</CCol>
            <CCol>{{ winner.prizeId }}</CCol>
            <CCol>{{ winner.credentials }}</CCol>
            <CCol>{{ phoneFormatter(winner.phone) }}</CCol>
            <CCol>{{ winner.city }}</CCol>
            <CCol>
              <CButton shape="square" size="sm" @click="viewCheck(winner.checkPath)" color="primary">
                <CIcon size="sm" name="cilImage" />
              </CButton>
            </CCol>
            <CCol>
              <CDropdown addTogglerClasses="btn-square" toggler-text="Действия" class="btn-square m-2" size="sm"
                color="primary">
                <CDropdownItem @click="sendNotify(winner)">Уведомить о выигрыше</CDropdownItem>
                <CDropdownItem @click="approveWinner(winner)">Подтвердить</CDropdownItem>
              </CDropdown>
            </CCol>
          </CRow>
        </CCollapse>
      </template>
    </CDataTable>
  </div>

</template>


<script>
import CExtendedModal from '../components/table/CExtendedModal.vue'

export default {
  name: 'Lottery',
  components: {
    CExtendedModal
  },
  data() {
    return {
      mode: false,
      collapseDuration: 0,
      modalConfig: {
        show: false,
        data: {},
      },
      items: [{ winners: [] }],
      fields: [
        { key: 'id', label: 'Id Розыгрыша' },
        { key: 'start', label: 'Начало' },
        { key: 'end', label: 'Конец' },
        { key: 'status', label: 'Статус' },
        { key: 'prize', label: 'Приз' },
        { key: 'primaryWinners', label: 'Основные победители' },
        { key: 'reserveWinners', label: 'Резервные победители' },
        { key: 'createdAt', label: 'Дата создания' },
        { key: 'action', label: '', filter: false, sorter: false }
      ]
    }
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/lottery/` }).then(e => {
      this.items = e.data
    })
  },
  methods: {
    phoneFormatter(phone) {
      return phone.slice(0, -6) + 'XXXX' + phone.slice(-2)
    },
    viewCheck(path) {
      this.modalConfig.data = {
        path: path,
        footer: 'Ок',
        header: 'Просмотр чека',
        type: 'viewCheck'
      }
      this.modalConfig.show = true
    },
    rowClick(item, a, rowName) {
      if (rowName !== 'details' && rowName !== 'action') {
        item._toggled = !item._toggled
        this.collapseDuration = 300
        this.$nextTick(() => { this.collapseDuration = 0 })
      }
    },
    sendNotify(item) {
      this.$http({ method: 'POST', url: `/v1/winner/${item.id}/notification` }).then(e => {
        item.notified = true
      })
    },
    approveWinner(item) {
      this.$http({
        method: 'PUT', url: `/v1/winner/${item.id}`, data: {
          confirmed: !item.confirmed
        }
      }).then(e => {
        item.confirmed = !item.confirmed
      })
    },
    newLotteryInit() {
      this.modalConfig.data = {
        fields: [
          { label: 'Дата розыгрыша', key: "start", type: "date" },
          { label: 'Конец', key: 'end', type: "date" },
          { label: 'Что разыгрываем', key: "prize", select: this.$ctable.prizes, value: this.$ctable.prizes[0].value },
          { label: 'Основные победители', key: "primaryWinners", type: "number" },
          // { label: 'Запасные победители', key: "reserveWinners", type: "number" }
        ],
        footer: 'Создать',
        header: 'Новый розыгрыш',
        type: 'newLottery'
      }
      this.modalConfig.show = true
    },
    closeModalHandler() {
      if (this.modalConfig.data.type == 'newLottery') {
        let data = this.modalConfig.data.fields.reduce((s, c) => {
          s[c.key] = c.value
          return s
        }, {})
        data.reserveWinners = data.primaryWinners
        this.$http({ method: 'POST', url: `/v1/lottery/`, data: data })
          .then((r) => {
            this.items.push(r.data)
            this.modalConfig.show = false
          })
      } else if (this.modalConfig.data.type == 'editLottery') {
        const status_id = this.modalConfig.data.fields[0].value
        this.$http({ method: 'PUT', url: `/v1/lottery/${this.modalConfig.data.cur.id}`, data: { status: status_id } })
          .then(() => {
            this.modalConfig.data.cur.status = this.$ctable.lottery_statuses.find(c => c.value == status_id).label
          })
      } else if (this.modalConfig.data.type == 'deleteLottery') {
        this.$http({
          method: 'DELETE',
          url: `/v1/lottery/${this.modalConfig.data.cur.id}`,
        })
          .then(() => {
            const idx = this.items.findIndex(i => i.id == this.modalConfig.data.cur.id)
            this.items.splice(idx, 1)
            this.modalConfig.show = false
          })
      }
    },
    changeLotteryStatus(item) {
      this.modalConfig.data = {
        cur: item,
        fields: [
          { key: 'status', label: 'Статус', select: this.$ctable.lottery_statuses, value: this.$ctable.lottery_statuses.find(c => c.label == item.status)?.value },
        ],
        footer: 'Сохранить',
        header: 'Статус розыгрыша',
        type: 'editLottery'
      }
      this.modalConfig.show = true
    },
    deleteLottery(item) {
      this.modalConfig.data = {
        cur: item,
        fields: [],
        footer: 'Подтвердить',
        header: 'Удалить розыгрыш?',
        type: 'deleteLottery'
      }
      this.modalConfig.show = true
    },
    getCurrentItems(items = this.items) {
      const cols = 'Id Розыгрыша,Дата,Приз,Основной,Подтвержден,Уведомлен,Id чека,Имя,Номер,Город,Сертификат'
      const csvCode = 'data:text/csv;charset=utf-8,' + cols + '%0A' + encodeURIComponent(
        items.reduce((sum, cur) => {
          const header = `${cur.id},${cur.createdAt},${cur.prize},${cur.primary ? 'Да' : 'Нет'},${cur.confirmed ? 'Да' : 'Нет'},${cur.notified ? 'Да' : 'Нет'}`
          cur.winners.forEach(w => {
            sum = sum + header + `,${w.fancyId},${w.credentials},${w.phone},${w.city},${w.prize}\n`
          })
          return sum
        }, '')
      )
      return csvCode
    },
  },
  computed: {

  },
}
</script>
<style scoped>
.subtable {
  border-top: 2px solid;
  border-top-color: #d8dbe0;
}

.subtable .row {
  margin: 0;
}

.subtable .row:first-child {
  margin-bottom: 10px;
  font-weight: bold;
}

.subtable .col {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>