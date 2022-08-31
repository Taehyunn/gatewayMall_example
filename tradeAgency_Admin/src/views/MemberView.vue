<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Member 게시판입니다.</v-card-title>
        </v-card>
        <v-form ref="form">
        <v-card class="mb-6">
            <v-row class="pl-2 pr-4">
                <v-col md="2">
                    <v-select
                            item-text="memberName"
                            item-value="memberId"
                            label="선택"
                            :items="selectItems"
                            required
                            v-model="selectCon"
                            return-object

                            class="pl-3"

                    ></v-select>
                </v-col>

                <v-col>
                    <v-select

                            item-text="sr_Name"
                            item-value="sr_Id"
                            label="선택"
                            :items="selectSearchItems"
                            required
                            v-model="searchType"
                            return-object

                            class="pl-3"

                    ></v-select>
                </v-col>

                <v-col>
                    <v-text-field
                            v-model="searchText"
                            prepend-inner-icon="mdi-magnify"
                            label="검색"
                            @keyup.enter="fn_getSearch"

                    ></v-text-field>
                </v-col>

                <v-col class="pt-6">
                    <v-btn
                            block color="primary"
                            @click.prevent="fn_getSearch">검색
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        </v-form>
        <!--DataTable-->
        <v-card >
            <v-data-table :headers="memberHeaders"
                          :items="returnAllMemberList"
                          hide-default-footer
                          class="transparent elevation-0 my-4"
                          hide-default-header
                          disable-pagination
                          disable-sort
                          :items-per-page="itemsPerPage"
            >
                <template #header="{ }">
                    <thead class="v-data-table-header">
                    <tr>
                        <th v-for="(h,i) in memberHeaders" :key="i"
                            class="text-center parent-header tb-border-style"
                            :rowspan="h.children?1:2"
                            :colspan="h.children?h.children.length:1"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);border-right: thin solid rgba(0, 0, 0, 0.12);"
                        >
                            {{ h.text }}
                        </th>
                    </tr>
                    <tr>
                        <th v-for="(h1,i1) in getSubHeader(memberHeaders)"
                            :key="i1"
                            class="text-center child-header tb-border-style"

                        >
                            {{ h1.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
<!--                 <template #item="props">-->
<!--                  <tr>-->
<!--                    <td v-for="(c,ci) in getRows(props.item)" :key="ci">-->
<!--                      {{ c }}-->
<!--                    </td>-->
<!--                  </tr>-->
<!--                </template> -->
                <template v-slot:body="{ items }" >
                    <tbody>
                    <tr
                            v-for="(item, index) in items"
                            :key="index"
                            class="text-center"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"


                    >
                    <td   class="tb-border-style">{{ item.midx }}</td>
                    <td  class="tb-border-style">{{ item.mtType }}</td>
                    <td  class="tb-border-style" style="cursor: pointer;" @click="fn_clickID(item)">{{ item.mid }}</td>
                    <td  class="tb-border-style" >{{ item.mname }}</td>
                    <td  class="tb-border-style" style="cursor: pointer;" @click="fn_clickCash(item)">{{ item.mdeposit }}</td>
                    <td   class="tb-border-style">{{ item.waitingTicketCount }}</td>
                    <td   class="tb-border-style">{{ item.answerTicketCount }}</td>
                    <td  class="tb-border-style" >{{ item.earnTotalFP }}</td>
                    <td   class="tb-border-style">{{ item.useTotalFP }}</td>
                    <td   class="tb-border-style"  style="cursor: pointer;" @click="fn_clickFpBalance(item)">{{ item.mfpBalance }}</td>
                    <td   class="tb-border-style" style="cursor: pointer;" @click="fn_clickBP">{{ item.BP }}</td>
                    <td   class="tb-border-style">{{ item.mEnterDateTime }}</td>
                    <td   class="tb-border-style">{{ item.mrealDateTime }}</td>
                    <td   class="tb-border-style" style="cursor: pointer;" @click="fn_clickLoginCnt(item)" >{{ item.mloginCount }}</td>
                    <td   class="tb-border-style">{{ item.mlevel }}</td>
                    <td   class="tb-border-style">{{ item.joinContestCountLOL }}</td>
                    <td   class="tb-border-style">{{ item.joinContestCountPUBG }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-data-table>

        </v-card>
        <div class="text-center mb-6">
            <v-pagination
                    v-model="page"
                    :length="pageCount"
                    @input="handlePage"
            ></v-pagination>
        </div>
<!--        <template >-->
<!--            <v-row class="d-flex justify-end mr-3 pt-3 mb-6">-->
<!--                <v-btn-->
<!--                        color="primary"-->
<!--                        dark-->
<!--                        class="text-right mr2"-->

<!--                >-->
<!--                    Member팝업창-->
<!--                </v-btn>-->
<!--            </v-row>-->
<!--        </template>-->
        <!--DataTable-->
        <v-dialog v-model="eDialog" width="600" class="mb-6">

            <v-card style="overflow-x : hidden" >
                <v-card-title class="text-h5 primary white--text">
                    정보창
                </v-card-title>
                <v-row class=" pt-5 pl-8 pr-8" width="700">
                    <v-text-field
                            v-model="mId"
                            label="ID"
                            readonly
                            hide-details="auto"
                            class="pl-4 pr-4"

                    ></v-text-field>

                </v-row>
                <v-row class=" pl-8 pr-8" width="700">
                    <v-text-field
                            v-model="mLevel"
                            label="Status"
                            readonly
                            hide-details="auto"
                            class="pl-4 pr-4"

                    ></v-text-field>

                </v-row>
                <v-row  class="pl-8 pr-8" width="700">
                    <v-list class="pt-5 pl-4">
                        <v-list-item-title>Change</v-list-item-title>
                    </v-list>
                    <v-checkbox label="Normal"
                                v-model="NormalChecked"
                                class="pl-4"
                    ></v-checkbox>
                    <v-checkbox label="Block"
                                v-model="BlockChecked"
                                class="pl-4"
                    >
                    </v-checkbox>
                    <v-text-field
                            label="Day"
                            hide-details="auto"
                            class="pl-4 pr-4"
                            v-if="BlockChecked"

                    ></v-text-field>

                </v-row>




                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click="fn_Cancel"> 취소</v-btn>

                    <v-btn color="primary" dar
                           @click="fn_Save"
                    > 확인
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--클릭시 나오는 메뉴들-->
        <!-- <v-card class="mb-6">
             <v-data-table
               dense
               :headers="CashList"
               hide-default-footer
               disable-pagination
             >

             </v-data-table>
        </v-card>
         <v-card class="mb-6">
             <v-data-table
               dense
               :headers="BalanceList"
               hide-default-footer
               disable-pagination
             >

             </v-data-table>
        </v-card>
         <v-card class="mb-6">
             <v-data-table
               dense
               :headers="BPList"
               hide-default-footer
               disable-pagination
             >

             </v-data-table>
        </v-card>
         <v-card class="mb-6">
             <v-data-table
               dense
               :headers="LoginCntList"
               hide-default-footer
               disable-pagination
             >

             </v-data-table>
        </v-card> -->



        <v-card class="mb-6" v-if="cash_dialog">
            <small class="pl-4">IDX: {{m_Idx}} ID:{{m_Id}}</small>
            <v-data-table :headers="CashHistoryHeaders"
                          :items="returnMemberPaymentHistoryList"
                          hide-default-footer
                          disable-pagination
                          disable-sort

            >
                <template v-slot:item="{ item }" >
                    <tr
                            class="text-center"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12); border-right: thin solid rgba(0,0,0,0.12)"

                    >
                        <td   class="tb-border-style">{{ item.dhReqDate }}</td>
                        <td  class="tb-border-style">{{ item.dhIdx }}</td>
                        <td  class="tb-border-style">{{ item.dhContent }}</td>
                        <td  class="tb-border-style">{{ item.dhAmount }}</td>
                        <td  class="tb-border-style">{{ item.dhCondition }}</td>

                    </tr>
                </template>

            </v-data-table>
        </v-card>




        <v-card class="mb-6" v-if="balance_dialog">
            <small class="pl-4">IDX: {{m_Idx}} ID:{{m_Id}}</small>
            <v-data-table :headers="BalanceHistoryHeaders"
                          :items="returnMemberFPHistoryList"
                          hide-default-footer
                          disable-pagination
                          disable-sort

            >
                <template v-slot:item="{ item }" >
                    <tr
                            class="tb-border-tdSet text-center"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"
                    >
                        <td>{{ item.regDate }}</td>
                        <td>{{ item.gname }}</td>
                        <td>{{ item.content }}</td>
                        <td>{{ item.resultType }}</td>
                        <td>{{ item.tableNm }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.balance }}</td>


                    </tr>
                </template>
            </v-data-table>

        </v-card>
        <v-card class="mb-6" v-if="bp_dialog">
            <small class="pl-4">IDX: 0000000000 ID:XXXXXXX@XXXXXX.com</small>
            <v-data-table :headers="BPHistoryHeaders"
                          hide-default-footer
                          disable-pagination
                          disable-sort

            >

            </v-data-table>

        </v-card>
        <v-card class="mb-6" v-if="loginCnt_dialog">
            <small class="pl-4">IDX: {{m_Idx}} ID:{{m_Id}}</small>
            <v-data-table :headers="LoginCntHistoryHeaders"
                          :items="returnMemberLoginHistoryList"
                          hide-default-footer
                          disable-pagination
                          disable-sort

            >
                <template v-slot:item="{ item }" >
                    <tr
                            class="tb-border-tdSet text-center"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"
                    >
                        <td>{{ item.regDatetime }}</td>
                        <td>{{ item.loginIp }}</td>
                        <td>{{ item.mname }}</td>
                        <td>{{ item.mtype }}</td>


                    </tr>
                </template>
            </v-data-table>

        </v-card>

    </v-container>

</template>

<script>
    import store from "@/store/index.js";

    let form = new FormData();
    export default {
        name: 'MemberView',

        data: () => ({
            mId:'' ,
            mLevel:'',
            searchText:'',
            page:1,
            pageCount:0,
            cash_dialog:false,
            balance_dialog:false,
            bp_dialog:false,
            loginCnt_dialog:false,
            NormalChecked:true,
            BlockChecked: false,
            eDialog: false,
            memberHeaders: [
                {
                    text: "IDX",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Type",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "ID",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Name",
                    align: "center",
                    sortable: false,
                    value: ""
                },{
                    text: "Cash",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Ticket",
                    value: "",
                    divider: true,
                    children: [{text: "W"}, {text: "A"}]
                },
                {
                    text: "FP",
                    value: "",
                    divider: true,
                    children: [{text: "Won"}, {text: "Lost"}, {text: "balance"}]
                },
                {
                    text: "BP",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "RegData",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "LastLogin",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Login Cnt",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Status",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Contest",
                    value: "",
                    divider: true,
                    children: [{text: "LOL"}, {text: "PUBG"}, {text: "DOTA2"}]
                },


            ],
            selectCon: {memberId: 1, memberName:"all"},
            selectItems: [
                {
                    memberId: 1, memberName: "all",

                },
                {
                    memberId: 2, memberName: "online",

                },
                {
                    memberId: 3, memberName: "offline",

                },
            ],
            searchType: {sr_Id: 1,sr_Name: "ID"},
            selectSearchItems: [
                {
                    sr_Id: 1, sr_Name: "ID",

                },
                {
                    sr_Id: 2, sr_Name: "Name",
                },
                {
                    sr_Id: 3, sr_Name: "IDX"
                },

            ],
            CashList: [
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "PG사",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "결제방식",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "충전Cash",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Stats",
                    align: "center",
                    sortable: false,
                    value: ""
                },
            ],
            BalanceList: [
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "League",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Infor",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Result",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "PG",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "FP",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Balance",
                    align: "center",
                    sortable: false,
                    value: ""
                },
            ],
            BPList: [
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Reason",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "BP",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Balance",
                    align: "center",
                    sortable: false,
                    value: ""
                },

            ],
            LoginCntList: [
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "접속IP",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "접속지역",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "PC/Mobile",
                    align: "center",
                    sortable: false,
                    value: ""
                },

            ],
            CashHistoryHeaders: [
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "PG사",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "결제방식",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "충전 Cash",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Status",
                    align: "center",
                    sortable: false,
                    value: ""
                },
            ],
            BalanceHistoryHeaders: [
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "League",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Infor",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Result",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "PG",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "FP",
                    align: "center",
                    sortable: false,
                    value: ""
                }, {
                    text: "Balance",
                    align: "center",
                    sortable: false,
                    value: ""
                },

            ],
            BPHistoryHeaders: [
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Reason",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "BP",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "Balance",
                    align: "center",
                    sortable: false,
                    value: ""
                },


            ],
            LoginCntHistoryHeaders: [
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "접속 IP",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "접속 지역",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "PC/Mobile",
                    align: "center",
                    sortable: false,
                    value: ""
                },


            ],
            desserts: [
                {
                    IDX: 1,
                    type: "A",
                    ID: 'test',
                    name:'test',
                    TicketW: 1,
                    TicketA: 2,
                    cash:1,
                    FpWon:1,
                    FpLost:2,
                    FpBalance:3,
                    BP:1,
                    RegData:1,
                    LastLogin:1,
                    LoginCnt:11,
                    status:1
                },{
                    IDX: 1,
                    type: "A",
                    ID: 'test',
                    name:'test',
                    TicketW: 1,
                    TicketA: 2,
                    cash:1,
                    FpWon:1,
                    FpLost:2,
                    FpBalance:3,
                    BP:1,
                    RegData:1,
                    LastLogin:1,
                    LoginCnt:11,
                    status:1
                },

            ],
            returnAllMemberList:[],
            returnMemberPaymentHistoryList:[],
            returnMemberLoginHistoryList:[],
            returnMemberFPHistoryList:[],
            itemsPerPage:10,
            m_Idx:'',
            m_Id:'',
            // editedItem: {
            //     IDX: '',
            //     type: '',
            //     ID: '',
            //     name:'',
            //     TicketW: '',
            //     TicketA: '',
            //     FpWon:'',
            //     FpLost:'',
            //     FpBalance:'',
            //     BP:'',
            //     RegData:'',
            //     LastLogin:'',
            //     Status:''
            // },
        }),

        beforeMount() {
            store.commit('onProgress');
        },


        mounted() {

        this.getMemberList();
            store.commit('offProgress');
        },

        methods: {
            async searchListCall() {

                if (this.$refs.form.validate()) {
                    await this.getMemberList();
                }
            },
            fn_getSearch() {
                this.balance_dialog = false;
                this.bp_dialog = false;
                this.loginCnt_dialog = false;
                //검색시엔 다시 1페이지로
                this.page = 1;
                if (this.searchText == "") {
                    this.getMemberList();
                } else {
                    this.searchListCall();

                    // alert(2);
                }
            },
            handlePage(){
                this.getMemberList();
                // this.cash_dialog = false;
                this.balance_dialog = false;
                this.bp_dialog = false;
                this.loginCnt_dialog = false;
            },
            async getMemberList() {
              // console.log(memberName);

                form.delete("searchUserStatus");
                form.delete("mId");
                form.delete("mName");
                form.delete("mIdx");
                form.delete("page");
                form.delete("size");

                form.set("page" , this.page);
                form.set("size" , this.itemsPerPage);

                    // form.set("searchUserStatus", "all");
                //
                if (this.selectCon.memberId === 1) form.set("searchUserStatus", this.selectCon.memberName );
                if (this.selectCon.memberId === 2) form.set("searchUserStatus", this.selectCon.memberName );
                if (this.selectCon.memberId === 3) form.set("searchUserStatus", this.selectCon.memberName );

                if (this.searchType.sr_Id === 1) form.set("mId", this.searchText );
                if (this.searchType.sr_Id === 2) form.set("mName", this.searchText );
                if (this.searchType.sr_Id === 3) form.set("mIdx", this.searchText );



                // if(this.searchType.sr_Id === 1) form.set()

                    await this.$store
                        .dispatch("GETALLMEMBERLIST", form)
                        .then((response) => {
                            this.returnAllMemberList = response.memberList.content;
                            // console.log(response.memberList.content)

                            this.pageCount = response.memberList.totalPages;

                        })
                        .catch((error) => {
                            console.log(error);
                        });


            },
            // StartAdd() {
            //     this.eDialog = true;
            // },

            getSubHeader(headers) {
                let result = [];
                headers
                    .filter((i) => i.children)
                    .forEach((v) => {
                        result = result.concat(v.children);
                    });
                return result;
            },

            fn_clickID(item){
                console.log(item);
                this.mId = item.mid;
                this.mLevel = item.mlevel;
                this.eDialog = true;

            },
            fn_clickCash(item) {
                // console.log(midx);
                this.m_Idx = '';
                this.m_Id = '';
                this.m_Idx = item.midx;
                this.m_Id = item.mid;
                form.delete("mIdx");
                form.set("mIdx",  this.m_Idx);

                this.$store
                    .dispatch("GETPAYMENTHISTORY", form)
                    .then((response) => {
                        this.returnMemberPaymentHistoryList = response.memberList;
                        // console.log(response.memberList.content)



                    })
                    .catch((error) => {
                        console.log(error);
                    });


                this.cash_dialog = true;
                this.balance_dialog = false;
                this.bp_dialog = false;
                this.loginCnt_dialog = false;
            },
            fn_clickFpBalance(item) {
                this.m_Idx = '';
                this.m_Id = '';
                this.m_Idx = item.midx;
                this.m_Id = item.mid;
                form.delete("mIdx");
                form.set("mIdx",  this.m_Idx);

                this.$store
                    .dispatch("GETFPHISTORY", form)
                    .then((response) => {
                        this.returnMemberFPHistoryList = response.memberList;
                        // console.log(response.memberList.content)



                    })
                    .catch((error) => {
                        console.log(error);
                    });
                this.cash_dialog = false;
                this.balance_dialog = true;
                this.bp_dialog = false;
                this.loginCnt_dialog = false;
            },
            fn_clickBP() {
                this.cash_dialog = false;
                this.balance_dialog = false;
                this.bp_dialog = true;
                this.loginCnt_dialog = false;
            },
            fn_clickLoginCnt(item) {
                console.log(item);

                this.m_Idx = '';
                this.m_Id = '';
                this.m_Id = item.mid;
                this.m_Idx = item.midx;
                console.log(this.m_Id);
                console.log(this.m_Idx);
                form.delete("mIdx");
                form.set("mIdx",this.m_Idx);

                this.$store
                    .dispatch("GETLOGINHISTORY", form)
                    .then((response) => {
                        this.returnMemberLoginHistoryList = response.memberList;
                        // console.log(response.memberList.content)



                    })
                    .catch((error) => {
                        console.log(error);
                    });
                this.cash_dialog = false;
                this.balance_dialog = false;
                this.bp_dialog = false;
                this.loginCnt_dialog = true;
            },
            fn_Cancel() {
                this.eDialog = false;
            },
            fn_Save() {
                this.eDialog = false;
            }

            // getRows(rows) {
            //   const result = {};
            //   _.forEach(rows, (i, key) => {
            //     if (i.children) {
            //       _.forEach(i.children, (i1, key1) => {
            //         result["c" + key1] = i1;
            //       });
            //     } else result[key] = i;
            //   });
            //   return result;
            // }


        },
    };
</script>

<style lang="scss" scoped>
    .tb-border-style {
        border-right: thin solid rgba(0, 0, 0, 0.12);

    }
    .tb-border-tdSet > td {
        border-right: thin solid rgba(0, 0, 0, 0.12);

    }
</style>