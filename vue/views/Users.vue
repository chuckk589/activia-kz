<template>
  <div>
    <CExtendedModal @modal-closed="closeModalHandler()" :vis="modalConfig.show" :mData="modalConfig.data" />
    <CDataTable :items="items" :fields="fields" column-filter sorter pagination itemsPerPageSelect>
      <template #credentials="{ item }">
        <td>{{ item.credentials || 'Не указано' }}</td>
      </template>
      <template #promo="{ item }">
        <td>{{ item.promo || 'Не указано' }}</td>
      </template>
      <template #registered="{ item }">
        <td>{{ item.registered ? 'Да' : 'Нет' }}</td>
      </template>

      <template #locale="{ item }">
        <td>{{ locale(item.locale) }}</td>
      </template>
      <template #role="{ item }">
        <td>{{ role(item.role) }}</td>
      </template>

      <template #over-table>
        <CLink  class="btn btn-primary mb-2 btn-sm" :href="getCurrentItems" download="table-data.csv" target="_blank">Скачать
          (.csv)</CLink>
      </template>
      <template #action="{ item }">
        <td>
          <CDropdown toggler-text="Действия" class="m-2" size="sm" color="primary">
            <CDropdownItem @click="editUser(item)">Изменить</CDropdownItem>
          </CDropdown>
        </td>
      </template>
    </CDataTable>
    
  </div>

</template>


<script>
import CExtendedModal from '../components/table/CExtendedModal.vue'
import { AgGridVue } from "ag-grid-vue";
//@filtered-items-change="getCurrentItems"
export default {
  name: 'Users',
  components: {
    CExtendedModal
  },
  data() {
    return {
      modalConfig: {
        show: false,
        data: {},
      },
      items: [],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'chatId', label: 'Telegram Id' },
        { key: 'city', label: 'Город' },
        { key: 'credentials', label: 'Имя' },
        { key: 'locale', label: 'Язык' },
        { key: 'phone', label: 'Номер' },
        { key: 'promo', label: 'Промо' },
        { key: 'role', label: 'Роль' },
        { key: 'registered', label: 'Регистрация пройдена' },
        { key: 'createdAt', label: 'Дата регистрации' },
        { key: 'action', label: '', filter: false, sorter: false }
      ]
    }
  },
  mounted() {
    this.$http({ method: 'GET', url: `/v1/user/` }).then(e => {
      this.items = e.data
    })
  },
  computed: {
    getCurrentItems() {
      const cols = this.fields.filter(f => f.label).map(f => f.label).join(',')
      const csvCode = 'data:text/csv;charset=utf-8,' + cols + '%0A' + encodeURIComponent(
        this.items.map((item) => `${item.id},${item.chatId},${item.city},${item.credentials},${item.locale},${item.phone},${item.promo},${item.role},${item.registered ? 'Да' : 'Нет'},${item.createdAt}`)
          .join('\n')
      )
      return csvCode
    },
  },
  methods: {
    locale(locale) {
      return locale == 'ru' ? 'Русский' : 'Узбекский'
    },
    role(role) {
      return role == 'user' ? 'Пользователь' : 'Администратор'
    },
    closeModalHandler() {
      if (this.modalConfig.data.type == 'edit') {
        const data = this.modalConfig.data.fields.reduce((s, c) => {
          s[c.key] = c.value
          this.modalConfig.data.cur[c.key] = c.value
          return s
        }, {})
        this.$http({ method: 'PUT', url: `/v1/user/${this.modalConfig.data.cur.id}`, data: data })
      }
    },
    editUser(item) {
      this.modalConfig.data = {
        cur: item,
        fields: [
          { key: 'city', label: 'Город', select: this.$ctable.cities, value: this.$ctable.cities.find(c => c.label == item.city)?.value },
          { key: 'credentials', label: 'Имя', value: item.credentials },
          { key: 'locale', label: 'Язык', select: this.$ctable.locales, value: item.locale },
          { key: 'phone', label: 'Номер', value: item.phone },
          { key: 'role', label: 'Роль', select: this.$ctable.roles, value: item.role },
          { key: 'registered', label: 'Регистрация пройдена', select: "bool", value: item.registered },
          { key: 'promo', label: 'Промо', select: this.$ctable.promotions, value: this.$ctable.promotions.find(c => c.label == item.promo)?.value },
        ],
        footer: 'Сохранить',
        header: 'Редактировать',
        type: 'edit'
      }
      this.modalConfig.show = true
    }
  },
}
</script>
