<template>
  <div>
    <CDataTable 
    :items="items" 
    :fields = "fields"
    pagination
    itemsPerPageSelect
     column-filter
     >
     <template #primary="{item}"><td>{{item.primary?"Да":"Нет"}}</td></template>
     <template #confirmed="{item}"><td>{{item.confirmed?"Да":"Нет"}}</td></template>
     <template #notified="{item}"><td>{{item.notified?"Да":"Нет"}}</td></template>
     <template #createdAt="{item}"><td>{{new Date(item.createdAt).toLocaleString()}}</td></template>
     <template #action="{item}">
      <td>
        <CDropdown toggler-text="Действия" class="m-2" color="secondary">
          <CDropdownItem @click="sendNotify(item)">Уведомить о выигрыше</CDropdownItem>
          <CDropdownItem @click="approveWinner(item)">Подтвердить</CDropdownItem>
        </CDropdown>
      </td>
    </template>
    </CDataTable>
  </div>

</template>


<script>
import CExtendedModal from '../components/table/CExtendedModal.vue'

export default {
  name: 'Winners',
  components: {
    CExtendedModal
  },
  data () {
    return {
      items: [],
      fields:[
        {key:'id', label:'Id'},
        {key:'primary', label:'Основной'},
        {key:'checkId', label:'Id чека'},
        {key:'lotteryId', label:'Id розыгрыша'},
        {key:'createdAt', label:'Дата выигрыша'},
        {key:'confirmed', label:'Подтвержден'},
        {key:'notified', label:'Уведомлен'},
        {key:'action', label: '', filter: false, sorter: false}
      ]
    }
  },
  mounted() {
    this.$http({method: 'GET', url: `/v1/winner/`}).then(e => {
        //console.log(this.items.concat({id:"2112",chat_id:"11"}))
      this.items  = e.data
    })
  },
  methods:{
    sendNotify(item){
      this.$http({method: 'PUT', url: `/v1/winner/${item.id}/notification`}).then(e => {
        item.notified = 1
      })
    },
    approveWinner(item){
      this.$http({method: 'PUT', url: `/v1/winner/${item.id}`, data:{
        confirmed:1
      }}).then(e => {
        item.confirmed = 1
      })
    }
  }, 
}
</script>
