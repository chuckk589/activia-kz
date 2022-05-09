<template>
  <div>
    <CExtendedModal @modal-closed = "closeModalHandler()" :vis="modalConfig.show" :mData="modalConfig.data">
      <template #content><CImg v-if="modalConfig.data.path" fluidGrow :src="modalConfig.data.path"></CImg></template>
    </CExtendedModal>
    <CDataTable sorter hover :items="items" :fields = "fields" column-filter @row-clicked="rowClick">
      <template #start="{item}"><td>{{new Date(item.start).toLocaleString()}}</td></template>
      <template #end="{item}"><td>{{new Date(item.end).toLocaleString()}}</td></template>
      <template #prizeId="{item}"><td>{{$ctable.PRIZE.find(c=>c.value == item.prizeId).label}}</td></template>
      <template #statusId="{item}"><td>{{$ctable.LOTTERY.find(c=>c.value == item.statusId).label}}</td></template>
      <template #createdAt="{item}"><td>{{new Date(item.createdAt).toLocaleString()}}</td></template>
      <template #over-table>
        <CLink class="btn btn-primary mb-2" :href="getCurrentItems()" download="table-data.csv" target="_blank">Скачать (.csv)</CLink>
        <CButton style="margin-left:3px;" class="btn btn-primary mb-2" @click="newLotteryInit">Новый розыгрыш</CButton>
      </template>
      <template #action="{item}">
      <td>
        <CDropdown toggler-text="Действия" class="m-2" color="secondary">
          <CDropdownItem @click="changeLotteryStatus(item)">Изменить</CDropdownItem>
          <CDropdownItem :href="getCurrentItems([item])" download="table-data.csv" target="_blank">Скачать (.csv)</CDropdownItem>
          <CDropdownItem @click="deleteLottery(item)">Удалить</CDropdownItem>
        </CDropdown>
      </td>
    </template>
    <template #details="{item}">
      <CCollapse class="subtable" :show="Boolean(item._toggled)" :duration="collapseDuration">
        <CRow>
          <CCol>Основной</CCol>
          <CCol>Подтвержден</CCol>
          <CCol>Уведомлен</CCol>
          <CCol>Id чека</CCol>
          <CCol>Имя</CCol>
          <CCol>Номер</CCol>
          <CCol>Город</CCol>
          <CCol>Чек</CCol>
          <CCol></CCol>
        </CRow>
        <CRow  v-for="(winner, index) in item.winners" :key="index">
          <CCol>{{winner.primary?"Да":"Нет"}}</CCol>
            <CCol>{{winner.confirmed?"Да":"Нет"}}</CCol>
            <CCol>{{winner.notified?"Да":"Нет"}}</CCol>
            <CCol>{{winner.check.fancyId}}</CCol>
            <CCol>{{winner.check.user.credentials}}</CCol>
            <CCol>{{winner.check.user.phone}}</CCol>
            <CCol>{{$ctable.CITY.find(c=>c.value == winner.check.user.cityId).label}}</CCol>
            <CCol><CButton @click="viewCheck(winner.check.path)" color="primary"><CIcon size="lg" name="cilImage"/></CButton></CCol>
            <CCol>
              <CDropdown toggler-text="Действия" class="m-2" color="secondary">
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
  data () {
    return {
      collapseDuration: 0,
      modalConfig:{
        show:false,
        data:{},
      },
      items: [],
      fields:[
        {key:'id', label:'Id Розыгрыша'},
        {key:'start', label:'Начало'},
        {key:'end', label:'Конец'},
        {key:'statusId', label:'Статус'},
        {key:'prizeId', label:'Приз'},
        {key:'primaryWinners', label:'Основные победители'},
        {key:'reserveWinners', label:'Резервные победители'},
        {key:'createdAt', label:'Дата создания'},
        {key:'action', label: '', filter: false, sorter: false}
      ]
    }
  },
  mounted() {
    this.$http({method: 'GET', url: `/v1/lottery/`}).then(e => {
      this.items  = e.data
    })
  },
  methods:{
    viewCheck(path){
      this.modalConfig.data = {
        path: path,
        footer:'Ок',
        header: 'Просмотр чека',
        type:'viewCheck'
      }
      this.modalConfig.show = true
    },
    rowClick (item,a,rowName) {
      if(rowName!=='details' && rowName!=='action'){
        item._toggled = !item._toggled
        this.collapseDuration = 300
        this.$nextTick(() => { this.collapseDuration = 0})
      }
    },
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
    },
    newLotteryInit(){
      this.modalConfig.data = {
        fields:[
          {label:'Дата розыгрыша', key:"start", type:"date"},
          {label:'Конец', key:'end',  type:"date"},
          {label:'Что разыгрываем', key: "prizeId", select:this.$ctable.PRIZE, value:this.$ctable.PRIZE[0].value},
          {label:'Основные победители', key: "primaryWinners", type:"number"},
          {label:'Запасные победители', key: "reserveWinners", type:"number"}
        ],
        footer:'Создать',
        header: 'Новый розыгрыш',
        type:'newLottery'
      }
      this.modalConfig.show = true
    },
    closeModalHandler(){
      if(this.modalConfig.data.type == 'newLottery'){
        const data = this.modalConfig.data.fields.reduce((s,c)=>{
          s[c.key] = c.value
          return s
        },{})
        this.$http({method: 'POST', url: `/v1/lottery/`, data: data})
        .then((r)=>{
          this.modalConfig.show = false
          this.items.push(r.data)
        })
        .catch(er=>alert('Недостаточно свободных чеков для проведения розыгрыша'))
      }else if(this.modalConfig.data.type == 'editLottery'){
        this.$http({method: 'PUT', url: `/v1/lottery/${this.modalConfig.data.cur.id}`, data: {statusId: this.modalConfig.data.fields[0].value}}).then(()=>{
          this.modalConfig.data.cur.statusId = this.modalConfig.data.fields[0].value
        })
      }else if(this.modalConfig.data.type == 'deleteLottery'){
        this.$http({
          method: 'DELETE',
          url: `/v1/lottery/${this.modalConfig.data.cur.id}`, 
         })
        .then(()=>{
          const idx = this.items.findIndex(i=>i.id==this.modalConfig.data.cur.id)
          this.items.splice(idx,1)
          this.modalConfig.show = false
        })
      }
    },
    changeLotteryStatus(item){
      this.modalConfig.data = {
        cur: item,
        fields:[
          {key:'statusId', label:'Статус', select: this.$ctable.LOTTERY, value:item.statusId},
        ],
        footer:'Сохранить',
        header: 'Статус розыгрыша',
        type:'editLottery'
      }
      this.modalConfig.show = true
    },
    deleteLottery(item){
      this.modalConfig.data = {
        cur:item,
        fields:[],
        footer:'Подтвердить',
        header: 'Удалить розыгрыш?',
        type:'deleteLottery'
      }
      this.modalConfig.show = true
    },
    getCurrentItems(items = this.items){
      const cols = 'Id Розыгрыша,Дата,Приз,Основной,Подтвержден,Уведомлен,Id чека,Имя,Номер,Город'
      const csvCode = 'data:text/csv;charset=utf-8,'+ cols + '%0A' + encodeURIComponent(
        items.reduce((sum,cur)=>{
          const header = `${cur.id},${new Date(cur.createdAt).toLocaleString().replace(',','')},${cur.prize.ru},${cur.primary?'Да':'Нет'},${cur.confirmed?'Да':'Нет'},${cur.notified?'Да':'Нет'}`
          cur.winners.forEach(w=>{
            sum = sum + header + `,${w.check.fancyId},${w.check.user.credentials},${w.check.user.phone},${this.$ctable.CITY.find(c=>c.value == w.check.user.cityId).label}\n`
          })
          return sum
        },'')
      )
      return csvCode
    },
  },
  computed:{
    
  },
}
</script>
<style scoped>
.subtable{
  border-top: 2px solid;
  border-top-color: #d8dbe0;
}
.subtable .row{
  margin:0;
}
.subtable .row:first-child{
  margin-bottom:10px ;
  font-weight: bold;
}
.subtable .col{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>