<template>
  <div>
    <CExtendedModal @modal-closed = "closeModalHandler()" :vis="modalConfig.show" :mData="modalConfig.data">
      <template #content><CImg fluidGrow :src="modalConfig.data.cur.path"></CImg></template>
      <template #status="{item}">
        <CSelect label="Статус" :options="$ctable.CHECK" :value.sync="item.value"/>
        <CSelect v-if="isCheckBeingRejected(item.value)" label="Причина отклонения" :options="$ctable.RJ" :value.sync="item.rejectReason"/>
      </template>
    </CExtendedModal>
    <CDataTable 
    :items="items" 
    :fields = "fields"
    pagination
    sorter
    itemsPerPageSelect
     column-filter
     >
      <template #statusId="{item}"><td>{{$ctable.CHECK.find(c=>c.value == item.statusId).label}}</td></template>
      <template #credentials="{item}"><td>{{item.user.credentials}}</td></template>
      <template #city="{item}"><td>{{$ctable.CITY.find(c=>c.value == item.user.cityId).label}}</td></template>
      <template #phone="{item}"><td>{{item.user.phone}}</td></template>
      <template #action="{item}">
        <td>
          <CButton @click="viewCheck(item)" color="primary"><CIcon size="lg" name="cilImage"/></CButton>
        </td>
      </template>
      <template #over-table>
        <CLink class="btn btn-primary mb-2" :href="getCurrentItems()" download="table-data.csv" target="_blank">Скачать (.csv)</CLink>
      </template>
      <template #createdAt="{item}"><td>{{new Date(item.createdAt).toLocaleString()}}</td></template>
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
  data () {
    return {
       modalConfig:{
        show:false,
        data:{
          cur:{}
        },
      },
      items: [],
      fields:[
        {key:'id', label:'Id'},
        {key:'fancyId', label:'Id чека'},
        {key:'credentials', label:'Имя'},
        {key:'phone', label:'Номер'},
        {key:'city', label:'Город'},
        {key:'statusId', label:'Статус чека'},
        {key:'createdAt', label:'Дата загрузки'},
        {key:'action', label: '', filter: false, sorter: false}
      ]
    }
  },
  mounted() {
    this.$http({method: 'GET', url: `/v1/check/`}).then(e => {
      this.items  = e.data
    })
  },
  methods:{
    isCheckBeingRejected(value){
      return this.$ctable.CHECK.find(c=>c.value == value)?.meaning == 'rejected'
    },
    viewCheck(item){
      this.modalConfig.data = {
        cur:item,
        fields:[
          {label:'status', key:"statusId", value: item.statusId, rejectReason:item.rejectReasonId || this.$ctable.RJ[0].value},
        ],
        footer:'Сохранить',
        header: 'Просмотр чека',
        type:'viewCheck'
      }
      this.modalConfig.show = true
    },
    closeModalHandler(){
      if(this.modalConfig.data.type == 'viewCheck'){
        this.$http({
          method: 'PUT',
          url: `/v1/check/${this.modalConfig.data.cur.id}`, 
          data: {
            statusId: this.modalConfig.data.fields[0].value,
            rejectReasonId:this.modalConfig.data.fields[0].rejectReason
          }})
        .then(()=>{
          this.modalConfig.data.cur.statusId = this.modalConfig.data.fields[0].value
          this.modalConfig.data.cur.rejectReasonId = this.modalConfig.data.fields[0].rejectReason
        })
      }
    },
    getCurrentItems(items = this.items){
      const cols = 'Id,Id чека,Имя,Номер,Город,Статус чека,Дата загрузки'
      const csvCode = 'data:text/csv;charset=utf-8,'+ cols + '%0A' + encodeURIComponent(
        items.reduce((sum,cur)=>{
          sum+=`${cur.id},${cur.fancyId},${cur.user.credentials},${cur.user.phone},${this.$ctable.CITY.find(c=>c.value == cur.user.cityId).label},${cur.status.ru},${new Date(cur.createdAt).toLocaleString().replace(',','')}\n`
          return sum
        },'')
      )
      return csvCode
    },
  }, 
  
}
</script>
