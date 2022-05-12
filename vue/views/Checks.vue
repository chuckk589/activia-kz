<template>
  <div>
    <CExtendedModal @modal-closed="closeModalHandler()" :vis="modalConfig.show" :mData="modalConfig.data">
      <template #content>
        <CImg fluidGrow :src="modalConfig.data.cur.checkPath"></CImg>
      </template>
    </CExtendedModal>
    <CDataTable :items="items" :fields="fields" pagination sorter itemsPerPageSelect column-filter>
      <template #action="{ item }">
        <td>
          <CButton @click="viewCheck(item)" size="sm" color="primary">
            <CIcon size="lg" name="cilImage" />
          </CButton>
        </td>
      </template>
      <template #over-table>
        <CLink class="btn btn-primary mb-2 btn-sm" :href="getCurrentItems()" download="table-data.csv" target="_blank">Скачать
          (.csv)</CLink>
      </template>
      <template #createdAt="{ item }">
        <td>{{ new Date(item.createdAt).toLocaleString() }}</td>
      </template>
    </CDataTable>
  </div>

</template>


<script>
import CExtendedModal from '../components/table/CExtendedModal.vue'

export default {
  name: 'Checks',
  components: {
    CExtendedModal
  },
  data() {
    return {
      modalConfig: {
        show: false,
        data: {
          cur: {}
        },
      },
      items: [],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'fancyId', label: 'Id чека' },
        { key: 'credentials', label: 'Имя' },
        { key: 'phone', label: 'Номер' },
        { key: 'city', label: 'Город' },
        { key: 'status', label: 'Статус чека' },
        { key: 'createdAt', label: 'Дата загрузки' },
        { key: 'action', label: '', filter: false, sorter: false }
      ]
    }
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/check/` }).then(e => {
      this.items = e.data
    })
  },
  computed: {
    getRejectReasons() {
      return this.$ctable.check_statuses.filter(e => e.comment)
    }
  },
  methods: {
    isCheckBeingRejected(value) {
      return value.includes('REJECTED')
    },
    viewCheck(item) {
      this.modalConfig.data = {
        cur: item,
        fields: [
          { label: 'status', label: 'Статус', key: "status", select: this.$ctable.check_statuses, value: this.$ctable.check_statuses.find(c => c.label == item.status).value },
        ],
        footer: 'Сохранить',
        header: 'Просмотр чека',
        type: 'viewCheck'
      }
      this.modalConfig.show = true
    },
    closeModalHandler() {
      if (this.modalConfig.data.type == 'viewCheck') {
        const status_id = this.modalConfig.data.fields[0].value
        this.$http({
          method: 'PUT',
          url: `/v1/check/${this.modalConfig.data.cur.id}`,
          data: {
            status: status_id,
          }
        })
          .then(() => {
            this.modalConfig.data.cur.status = this.$ctable.check_statuses.find(c => c.value == status_id).label
          })
      }
    },
    getCurrentItems(items = this.items) {
      const cols = 'Id,Id чека,Имя,Номер,Город,Статус чека,Дата загрузки'
      const csvCode = 'data:text/csv;charset=utf-8,' + cols + '%0A' + encodeURIComponent(
        items.reduce((sum, cur) => {
          sum += `${cur.id},${cur.fancyId},${cur.credentials},${cur.phone},${cur.city},${cur.status},${cur.createdAt}\n`
          return sum
        }, '')
      )
      return csvCode
    },
  },

}
</script>
