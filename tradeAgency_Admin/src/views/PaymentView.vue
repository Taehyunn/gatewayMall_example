<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Payment 게시판입니다.</v-card-title>
        </v-card>
        <v-card class="mb-6">
            <v-form ref="form" lazy-validation>
                <v-row class="pl-4 pt-4 pr-4">
                    <v-col>
                        <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :value="s_date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        class="pl -8"
                                        v-model="s_date"
                                        label="검색범위시작일자"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="s_date"
                                    no-title scrollable
                                    :max="new Date().toISOString().substr(0, 10)"
                            >
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn color="primary" @click="$refs.menu.save(s_date)"
                                >OK
                                </v-btn
                                >
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col>
                        <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :value="e_date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        class="pl-8"
                                        v-model="e_date"
                                        label="검색범위종료일자"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="e_date"
                                    no-title
                                    scrollable
                                    :max="new Date().toISOString().substr(0, 10)"
                            >
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="menu1 = false">Cancel</v-btn>
                                <v-btn color="primary" @click="$refs.menu1.save(e_date)"
                                >OK
                                </v-btn
                                >
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col>
                        <v-btn
                                block
                                color="primary"
                                width="50px"
                                @click.prevent="fnDateCheck(s_date,e_date)"
                        >검색
                        </v-btn
                        >
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
        <!--전체 집계-->
        <v-card >
            <v-data-table
                    dense
                    :headers="total_headers"
                    :items="currentTotalPayment"
                    hide-default-footer
                    hide-default-header
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th v-for="(header) in headers" :key="header.text"
                            style="text-align: center; border-right:thin solid rgba(0, 0, 0, 0.12);">
                            {{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }">
                    <tbody>
                    <tr
                            v-for="(item, index) in items"
                            :key="index"
                            class="text-center"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"

                    >
                        <td class="td-border-style">{{ item.cash_charged_cnt }}</td>
                        <td class="td-border-style">{{ item.cash_charged_gross }}</td>
                        <td class="td-border-style">{{ item.acquired_fp_gross}}</td>
                        <td class="td-border-style">{{ item.used_fp_product_cnt }}</td>
                        <td class="td-border-style">{{ item.used_fp_product_gross }}</td>
                        <td class="td-border-style">{{ item.cash_product_cnt }}</td>
                        <td class="td-border-style">{{ item.cash_product_gross }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-card>
        <div class="text-center pt-2 mb-6">
            <v-pagination
                    v-model="page"
                    :length="pageCount"
                    @input="handlePage"
            ></v-pagination>
        </div>
        <v-card class="mb-6">
            <v-row class="pl-2 pr-4">
                <v-col md="3">
                    <v-select
                            item-text="Id_Name"
                            item-value="Id_id"
                            label="선택"
                            :items="selectSearchItems"
                            required
                            v-model="searchType"
                            return-object
                            style="width: 200px"
                            class="pl-3"
                    ></v-select>
                </v-col>

                <v-col>
                    <v-text-field
                            prepend-inner-icon="mdi-magnify"
                            label="제목 검색"
                    ></v-text-field>
                </v-col>

                <v-col class="pt-6">
                    <v-btn block color="primary" @click.prevent="getPaySearch">검색</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mb-6">
            <v-row class="pl-2 pr-4">
                <v-col md="4">
                    <v-select
                            item-text="selectName"
                            item-value="selectId"
                            label="선택"
                            :items="selectItems"
                            required
                            v-model="selectCon"
                            return-object
                            style="width: 200px"
                            class="pl-3"
                            @change="getItemList(`${selectCon.selectId}`)"
                    ></v-select>
                </v-col>
            </v-row>
        </v-card>

        <v-card class="mb-6">
            총 개수 : {{ this.returnPayList.length }}
            <v-data-table
                    dense
                    :headers="headers"
                    :item="returnPayList"
                    hide-default-footer
                    disable-pagination
            >
                <!-- <template v-slot:item="{ item }" >
                <tr @click="rowClick(item)">
                  <td >{{item.deliveryDt}}</td>
                  <td style="text-align:center">{{item.orderDt}}</td>
                  <td style="text-align:center">{{commaField(item.totalPrice)}}</td>
                  <td style="text-align:center">{{item.regId}}</td>
                  <td style="text-align:center">{{item.useYn}}</td>

                </tr>
              </template> -->
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>

    import store from "@/store/index.js";


    let prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    export default {
        name: "PaymentView",

        data: () => ({
            page:0,
            pageCount:0,
            returnPayList: [],
            menu: false,
            menu1: false,
            e_date: new Date().toISOString().substr(0, 10),
            s_date: prevDate.toISOString().substr(0, 10),
            editedItem: {
                boardNum: "",
                boardSubject: "",
                boardRegister: "",
                boardDate: "",
                boardStatus: "",
                boardContent: "",
                boardChecked: "",
            },
            headers: [
                {text: "IDX", align: "center", value: ""},
                {text: "ID", align: "center", value: ""},
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Cash (￦)",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Acquired FP",
                    align: "center",
                    sortable: false,
                },
            ],
            FPheaders: [
                {text: "IDX", align: "center", value: ""},
                {text: "ID", align: "center", value: ""},
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "FP Product",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Used FP",
                    align: "center",
                    sortable: false,
                },
            ],
            CPheaders: [
                {text: "IDX", align: "center", value: ""},
                {text: "ID", align: "center", value: ""},
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "CashProduct",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Used Cash (￦)",
                    align: "center",
                    sortable: false,
                },
            ],
            Cashheaders: [
                {text: "IDX", align: "center", value: ""},
                {text: "ID", align: "center", value: ""},
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Cash (￦)",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Acquired FP",
                    align: "center",
                    sortable: false,
                },
            ],
            selectCon: {selectId: 1, selectName: "Cash"},
            selectItems: [
                {
                    selectId: 1,
                    selectName: "Cash",
                },
                {
                    selectId: 2,
                    selectName: "FP",
                },
                {
                    selectId: 3,
                    selectName: "CashProduct",
                },
            ],
            searchType: {Id_id: 1},
            selectSearchItems: [
                {
                    Id_id: 1,
                    Id_Name: "ID",
                },
                {
                    Id_id: 2,
                    Id_Name: "IDX",
                },
            ],
            total_headers: [
                {
                    text: "Cash Charged Cnt",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Cash Charged Gross",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Acquired FP Gross",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Used FP Product Cnt",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Used FP Product Gross",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Cash Product Cnt",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "Cash Product Gross",
                    align: "center",
                    sortable: false,
                },
            ],
            currentTotalPayment: [
                {
                    cash_charged_cnt:1,
                    cash_charged_gross:1,
                    acquired_fp_gross:1,
                    used_fp_product_cnt:1,
                    used_fp_product_gross:1,
                    cash_product_cnt:1,
                    cash_product_gross:1

                }
            ]

        }),

        created() {
        },

        beforeMount() {
            store.commit('onProgress');
        },
        mounted() {
            store.commit('offProgress');
        },

        methods: {
            handlePage() {

            },
            fnDateCheck(prevDate, currentDate){
                if(this.$dateValidation(prevDate, currentDate)){

                    console.log('success');
                } else {

                    alert("종료일보다 큰 날짜는 선택할 수 없습니다.\n다시 선택해 주세요.");
                }


            },
            getItemList(pyitem) {
                // console.log(e)
                // if (pyitem == 1) {
                //   this.headers = ;
                // }

                if (pyitem == 1) {
                    this.headers = this.Cashheaders;
                }
                if (pyitem == 2) {
                    this.headers = this.FPheaders;
                    // this.$store
                    //   .dispatch("", )
                    //   .then((response) => {
                    //     this.returnPayList = response.detailList;
                    //     //  console.log('payList api call' + response.detailList);
                    //   })
                    //   .catch((error) => {
                    //     console.log(error);
                    //   });
                }
                if (pyitem == 3) {
                    this.headers = this.CPheaders;
                }
            },
            //원화 3자리마다 콤마 표시 함수
            commaField(number) {
                // return str.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                const parts = number.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            },
            // getPaySearch() {
            //     // console.log(new Date().getDate());
            //     // console.log(new Date(this.s_date).getDate());
            //     //시작일자 , 종료일자 를 time으로 받아온다.
            //     const diff_date = new Date(this.e_date).getTime();
            //     const diff_date1 = new Date(this.s_date).getTime();
            //     // 두 일자 사이의 값을 구한다.
            //     const diffDate = diff_date - diff_date1;
            //     //두 일자 사이의 일수를 구한다.
            //     const dateDays = Math.abs(diffDate / (1000 * 3600 * 24));
            //     // console.log(new Date(diff_date1));
            //     //두 일자 사이의 차이가 7 이상일 경우 ( 달 넘어가도 계산됨)
            //     if (dateDays >= 7) {
            //         alert("최대 7일까지만 설정 가능합니다.\n다시 선택해 주세요.")
            //
            //     }
            //     else {
            //         alert("검색 성공")
            //         // this.$store.dispatch("UPDATECODE",{
            //         //   "cmmncdId" : this.editedItem.cmmncdId,
            //         //   "detailId" : this.editedItem.detailId,
            //         //   "detailNm": this.editedItem.detailNm,
            //         //   "note": this.editedItem.detailNm,
            //         //   "useYn" : this.editedItem.useYn,
            //         //   "regDt": this.editedItem.regDt,
            //         //   "regId" : this.editedItem.regId,
            //         //   "upId" :   this.editedItem.regId,
            //         // }).then((response)=> {
            //         //   console.info(response.res_code);
            //         //   this.readCallCodeList();
            //         // }).catch(error => {
            //         //   console.log(error)
            //         // });
            //     }
            //
            //
            //
            // },
            getPaySearch() {

            },
            // IfMessage(pdate,pdate1){
                // console.log(new Date().getDate());
                // console.log(new Date(this.s_date).getDate());
                //시작일자 , 종료일자 를 time으로 받아온다.
                // const diff_date = new Date(pdate1).getTime();
                // const diff_date1 = new Date(pdate).getTime();
                // 두 일자 사이의 값을 구한다.
                // const diffDate = diff_date - diff_date1;
                //두 일자 사이의 일수를 구한다.
                // const dateDays = Math.abs(diffDate / (1000 * 3600 * 24));
                // console.log(new Date(diff_date1));
                //두 일자 사이의 차이가 7 이상일 경우 ( 달 넘어가도 계산됨)
                // if (dateDays >= 7) {
                //     alert("최대 7일까지만 설정 가능합니다.\n다시 선택해 주세요.")
                //
                // }
                // else {
                //     alert("검색 성공")
                    // this.$store.dispatch("UPDATECODE",{
                    //   "cmmncdId" : this.editedItem.cmmncdId,
                    //   "detailId" : this.editedItem.detailId,
                    //   "detailNm": this.editedItem.detailNm,
                    //   "note": this.editedItem.detailNm,
                    //   "useYn" : this.editedItem.useYn,
                    //   "regDt": this.editedItem.regDt,
                    //   "regId" : this.editedItem.regId,
                    //   "upId" :   this.editedItem.regId,
                    // }).then((response)=> {
                    //   console.info(response.res_code);
                    //   this.readCallCodeList();
                    // }).catch(error => {
                    //   console.log(error)
                    // });
                // }
            // },


        },
    };
</script>

<style lang="scss" scoped>
    .td-border-style {
        border-right: thin solid rgba(0, 0, 0, 0.12);
    }

</style>
