<template>
    <div>
        <CExtendedModal @modal-closed="closeModalHandler()" :vis="modalConfig.show" :mData="modalConfig.data">
            <template #content>
                <CImg v-if="modalConfig.data.path" fluidGrow :src="modalConfig.data.path"></CImg>
            </template>
            <template #footer>
                <div v-if="modalConfig.data.type == 'editWinner'">
                    <CLoadingButton color="info" :timeout="2000">Submit</CLoadingButton>
                    <CLoadingButton color="success" variant="outline" :timeout="2000">Submit</CLoadingButton>
                    <CLoadingButton color="warning" variant="ghost" :timeout="2000">Submit</CLoadingButton>
                </div>
            </template>
        </CExtendedModal>
        <ag-grid-vue @someEvent="tst" style="width: 100%; height: 100vh;" class="ag-theme-alpine"
            :columnDefs="columnDefs" @grid-ready="onGridReady" :defaultColDef="defaultColDef" :masterDetail="true"
            :embedFullWidthRows="true" :animateRows="true" :getRowId="getRowId"
            :detailCellRendererParams="detailCellRendererParams" :rowData="rowData">
        </ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import LotteryActions from '../components/LotteryActions.vue'
import LotteryWinnerActions from '../components/LotteryWinnerActions.vue'
import CExtendedModal from '../components/table/CExtendedModal.vue'

export default {
    name: "aaxa",
    data() {
        return {
            modalConfig: {
                show: false,
                data: {},
            },
            columnDefs: [
                { field: 'id', cellRenderer: 'agGroupCellRenderer' },
                { field: 'start', headerName: 'Начало' },
                { field: 'end', headerName: 'Конец' },
                { field: 'status', headerName: 'Статус' },
                { field: 'prize', headerName: 'Приз' },
                { field: 'primaryWinners', headerName: 'Основные победители' },
                { field: 'reserveWinners', headerName: 'Резервные победители' },
                { field: 'createdAt', headerName: 'Дата создания' },
                {
                    field: 'action',
                    headerName: '',
                    cellRenderer: 'LotteryActions',
                },

            ],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
                flex: 1,
            },
            getRowId: function (params) {
                return params.data.id
            },
            detailCellRendererParams: {
                detailGridOptions: {
                    columnDefs: [
                        { field: 'primary', cellRenderer: params => params ? "Да" : "Нет" },
                        { field: 'confirmed', cellRenderer: params => params ? "Да" : "Нет" },
                        { field: 'notified', cellRenderer: params => params ? "Да" : "Нет" },
                        { field: 'fancyId' },
                        { field: 'credentials' },
                        { field: 'phone' },
                        { field: 'city' },
                        {
                            field: 'action',
                            headerName: '',
                            cellRenderer: 'LotteryWinnerActions',
                            cellRendererParams: {
                                context: this,
                                lol:228
                            },
                        },
                    ],
                    defaultColDef: {
                        flex: 1,
                    },
                },
                getDetailRowData: (params) => {
                    params.successCallback(params.data.winners);
                },
            },
            rowData: null,
        };
    },
    components: {
        AgGridVue,
        LotteryWinnerActions,
        LotteryActions,
        CExtendedModal
    },
    beforeMount() {
       //this.context = { componentParent: this };
    },
    methods: {
        editLottery(rowData) {
            this.modalConfig.data = {
                cur: rowData,
                fields: [
                    { key: 'status', label: 'Статус', select: this.$ctable.lottery_statuses, value: this.$ctable.lottery_statuses.find(c => c.label == rowData.status)?.value },
                ],
                footer: 'Сохранить',
                header: 'Редактировать',
                type: 'editLottery'
            }
            this.modalConfig.show = true
        },
        editWinner(rowData) {
            this.modalConfig.data = {
                cur: rowData,
                fields: [
                    { key: 'primary', label: 'Статус', select: bool, value: +rowData.primary },
                    { key: 'confirmed', label: 'Подтвержден', select: bool, value: +rowData.confirmed },
                ],
                footer: 'Сохранить',
                header: 'Редактировать',
                type: 'editWinner'
            }
            this.modalConfig.show = true
        },
        closeModalHandler() {
            if (this.modalConfig.data.type == 'newLottery') {
                const data = this.modalConfig.data.fields.reduce((s, c) => {
                    s[c.key] = c.value
                    return s
                }, {})
                this.$http({ method: 'POST', url: `/v1/lottery/`, data: data })
                    .then((r) => {
                        this.modalConfig.show = false
                        this.rowData.push(r.data)
                    })
            } else if (this.modalConfig.data.type == 'editLottery') {
                const status_id = this.modalConfig.data.fields[0].value
                this.$http({ method: 'PUT', url: `/v1/lottery/${this.modalConfig.data.cur.id}`, data: { status: status_id } })
                    .then(() => {
                        // this.gridApi.getRowNode(this.modalConfig.data.cur.id).setData(newData); ROW
                        //console.log(this.modalConfig.data.cur.id)
                        this.gridApi.getRowNode(this.modalConfig.data.cur.id.toString()).setDataValue('status', this.$ctable.lottery_statuses.find(c => c.value == status_id).label)
                    })
            } else if (this.modalConfig.data.type == 'deleteLottery') {
                this.$http({
                    method: 'DELETE',
                    url: `/v1/lottery/${this.modalConfig.data.cur.id}`,
                })
                    .then(() => {
                        const idx = this.rowData.findIndex(i => i.id == this.modalConfig.data.cur.id)
                        this.rowData.splice(idx, 1)
                        this.modalConfig.show = false
                    })
            }
        },
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;

            this.$http({ method: 'GET', url: `/v1/lottery/` }).then(e => {
                this.rowData = e.data
            })
        },
    },
};
</script>
<style scoped>
>>>.ag-theme-alpine .ag-details-row {
    padding: 10px;
}

.ag-cell-focus,
.ag-cell-no-focus {
    border: none !important;
}
</style>
<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>