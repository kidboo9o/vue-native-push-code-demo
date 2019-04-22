<template>
    <view class="container">
        <view class="header"
              :style="{
                    width: viewScreen(100, 'vw'),
                    height: viewScreen(12, 'vh'),
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderBottomWidth: 0.5
                }">
            <nb-text class="text-light">TÙY CHỌN THỜI GIAN(Tháng/Năm) </nb-text>
        </view>
        <select-month-year-date></select-month-year-date>
        <application-information :objApplicationInformation="getobjApplicationInformation"></application-information>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import SelectMonthYearDate from "./SelectMonthYearDate.vue";
    import ApplicationInformation from "./ApplicationInformation.vue";
    import {mapGetters, mapActions} from 'vuex';
    import axios from "axios";
    import qs from "qs";
    const url_phikhac = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH/lay_ds_phikhac";
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    export default {
        props: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                objApplicationInformation: {
                    title: "THÔNG TIN CHI TIẾT",
                    tableData: [
                        {id: 0, title: 'Phí xe đạp (VND):', noidung: ''},
                        {id: 1, title: 'Phí xe máy (VND):', noidung: ''},
                        {id: 2, title: 'Phí ô tô (VND):', noidung: ''},
                        {id: 3, title: 'Tổng tiền (VND):', noidung: ''}
                    ],
                    styleTextRowLast: {
                        fontWeight: 'bold',
                        color: 'red',
                    }
                }
            };
        },
        components: {
            SelectMonthYearDate,
            ApplicationInformation
        },
        computed: {
            getmaCanHoCurrentUser: function(){
                return this.getIndexSelected().ma_canho;
            },
            getobjApplicationInformation: function(){
                let temp = this.getSearch();
                if(temp === true){
                    // da nhan nut tra cuu
                    let month = this.$options.filters.formatMonthDate(this.getMonth());
                    let year = this.$options.filters.formatYearDate(this.getYear());
                    console.log("month and year : "+month+" "+year);
                    let data = {
                        ma_canho: this.getmaCanHoCurrentUser,
                        thang: month,
                        nam: year,
                        maChungThuc: LibCustom.ma_hoa(this.getmaCanHoCurrentUser+month+year),
                    };
                    axios.post(url_phikhac, qs.stringify(data), config).then((response) => {
                        console.log(response.data);
                       if(response.data.data.length > 0 && response.data.code === "1"){
                           this.objApplicationInformation.tableData[0].noidung = response.data.data[0].TIEN_XEDAP;
                           this.objApplicationInformation.tableData[1].noidung = response.data.data[0].TIEN_XEMAY;
                           this.objApplicationInformation.tableData[2].noidung = response.data.data[0].TIEN_OTO;
                           this.objApplicationInformation.tableData[3].noidung = response.data.data[0].TONG_TIEN;
                           this.setSearch(false);
                       }else{
                           let str = "không có dữ liệu";
                           this.objApplicationInformation.tableData[0].noidung = str;
                           this.objApplicationInformation.tableData[1].noidung = str;
                           this.objApplicationInformation.tableData[2].noidung = str;
                           this.objApplicationInformation.tableData[3].noidung = str;
                       }
                    }).catch((error) => {
                        console.log(error);
                        this.setSearch(false);
                    });
                }
                return this.objApplicationInformation;
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("getMonthYearinSearch", ["getMonth", "getYear", "getSearch"]),
            ...mapGetters("login", ['getIndexSelected']),
            ...mapActions("getMonthYearinSearch", ["setSearch"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
        }
    }
</script>
<style>
    .container{
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .header{
        background-color: rgba(0,0,0,0.08);
        flex: 1;
        justify-content: flex-end;
        padding-left: 20;
        padding-right: 20;
        padding-bottom: 10;
    }
    .text-light{
        color: rgba(0,0,0,0.4);
    }


</style>