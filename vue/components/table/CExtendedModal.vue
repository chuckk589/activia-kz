<template>
  <CModal :show.sync = "vis" :title ="mData.header">
    <slot name = "content"></slot>
    <template v-for="(field,index) in mData.fields">
      <template v-if="$scopedSlots[field.label]">
        <slot :name="field.label" :item="field" />
      </template>
      <CSelect v-else-if="field.select" :label="field.label" :value.sync="field.value" :options="field.select == 'bool'? boolSelect: field.select" :key="index"/>
      <CInput v-else :label="field.label" v-model="field.value" :key="index" :type="field.type"/>
    </template>
    <template #footer>
      <CButton color="primary" @click="closeModal()">{{mData.footer}}</CButton>
    </template>
  </CModal>
</template>

<script>
export default {
  name: 'ExtendedModal',
  
  data () {
    return {
      boolSelect:[{
        value:1,
        label:"Да"
      },
      {
        value:0,
        label:"Нет"
      }]
    }
  },
  props: {
    vis: Boolean,
    mData: Object
  },
  methods:{
    closeModal(){
      this.vis = false
      this.$emit('modal-closed')
    }
  },
}
</script>
