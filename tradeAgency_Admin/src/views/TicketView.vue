<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Ticket 화면 입니다.</v-card-title>
        </v-card>
        <v-card class="mb-6">
            <v-row class="pl-3 pr-4">
                <v-col>
                    <v-select
                            ref="menu"
                            item-text="tStatusName"
                            item-value="tStatusId"
                            label="선택"
                            :items="selectItems"
                            required
                            v-model="selectCon"
                            return-object
                            class="pl-2"

                    ></v-select>
                </v-col>
                <v-col>
                    <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :value="s_date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="s_date"
                                    label="시작일자"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"

                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="s_date"
                                no-title scrollable
                                :max="new Date().toISOString().substr(0,10)"

                        >
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="menu1 = false">Cancel</v-btn>
                            <v-btn color="primary" @click="$refs.menu1.save(s_date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col>
                    <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :value="e_date"
                            transition="scale-transition"
                            offset-y

                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="e_date"
                                    label="종료일자"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"

                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="e_date"
                                no-title scrollable
                                :max="new Date().toISOString().substr(0,10)"


                        >
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="menu2 = false">Cancel</v-btn>
                            <v-btn color="primary" @click="$refs.menu2.save(e_date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col class="pt-5 pl-xl-4 pr-8">
                    <v-btn block color="primary" @click.prevent="getStatusSearch">검색</v-btn>
                </v-col>
            </v-row>
        </v-card>

        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="TicketHeaders"
                    :items="TicketItems"
                    hide-default-footer
                    disable-pagination
            >

                <template v-slot:body="{ items }">
                    <tbody>
                    <tr
                            v-for="(lheader, index) in TicketLeftHeaders"
                            :key="index"
                    >
                        <td style="text-align: center;background: rosybrown">{{ lheader.text }}</td>

                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==0">{{
                            item.in }}
                        </td>
                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==1">{{
                            item.out }}
                        </td>

                    </tr>
                    </tbody>
                </template>

            </v-data-table>

        </v-card>
        <v-form ref="form">
        <v-card class="mb-6">
            <v-row class=" pl-2 pr-4">
                <v-col>
                    <v-select

                            item-text="Srch_Name"
                            item-value="Srch_Type"
                            label="선택"
                            :items="SrchMenuItem"
                            required
                            v-model="Sel_Mn_Type"
                            return-object

                            class="pl-3"

                    ></v-select>
                </v-col>

                <v-col>
                    <v-text-field
                            v-model="searchText"
                            prepend-inner-icon="mdi-magnify"
                            label="검색"
                            @keyup.enter="getSearch"
                    ></v-text-field>
                </v-col>

                <v-col class="pt-6">
                    <v-btn
                            block color="primary"
                            @click.prevent="getSearch">검색
                    </v-btn>
                </v-col>
            </v-row>

        </v-card>
        </v-form>
        <v-card>
            <v-data-table
                    dense
                    :headers="TicketHeaders2"
                    :items="returnTicketList"
                    hide-default-footer
                    hide-default-header
                    :items-per-page="itemsPerPage"
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr class="tb-border-header">
                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align }"

                        >{{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }" >
                    <tbody>
                    <tr
                            v-for="(item, index) in items"
                            :key="index"
                            class="text-center tb-board-td-right"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"
                            @click="rowClick(item)"

                    >
                        <td   class="td-border-style">{{ item.cuIdx }}</td>
                        <td  class="td-border-style">{{ item.cuReqDate }}</td>
                        <td  class="td-border-style">{{ item.cuTopic }}</td>
                        <td  class="td-border-style" >{{ item.cuSubject }}</td>
                        <td   class="td-border-style">{{ item.cuUIdx }}</td>
                        <td   class="td-border-style">{{ item.cuMail }}</td>
                        <td   class="td-border-style">{{ item.cuResDate }}</td>
                        <td  class="td-border-style" >{{ item.cuResponseId }}</td>
                     
                    </tr>
                    </tbody>
                </template>
            </v-data-table>

        </v-card>
        <div class="text-center pt-2">
            <v-pagination
                    v-model="page"
                    :length="pageCount"
                    @input="handlePage"

            ></v-pagination>
        </div>
        <!-- 팝 업 창 -->
        <v-dialog v-model="eDialog" width="800">
<!--            <template v-slot:activator="{ on }">-->
<!--                <v-row class="d-flex justify-end mr-3 pt-3">-->
<!--                    <v-btn-->
<!--                            color="primary"-->
<!--                            dark-->
<!--                            class="text-right mr2"-->
<!--                            v-on="on"-->
<!--                    >-->
<!--                        팝업창-->
<!--                    </v-btn>-->
<!--                </v-row>-->
<!--            </template>-->
            <v-card style="overflow-x : hidden; overflow-y:hidden ">
                <v-card-title class="text-h5 primary white--text">
                    Ticket 정보
                </v-card-title>

                <!--                <v-text-field-->
                <!--                        label="Num"-->
                <!--                        hide-details="auto"-->
                <!--                        class="pl-4 pr-4"-->

                <!--                        readonly-->
                <!--                >-->
                <!--                </v-text-field>-->
                <v-text-field
                        label="Date"
                        hide-details="auto"
                        class="pl-4 pr-4"
                        readonly
                        v-model="ticketDate"
                >
                </v-text-field>
                <v-text-field
                        label="Topic"
                        hide-details="auto"
                        class="pl-4 pr-4"
                        readonly
                        v-model="ticketTopic"
                >
                </v-text-field>
                <v-text-field
                        label="Name"
                        hide-details="auto"
                        class="pl-4 pr-4"
                        readonly
                        v-model="ticketName"
                >
                </v-text-field>
                <v-text-field
                        label="E-Mail"
                        hide-details="auto"
                        class="pl-4 pr-4"
                        readonly
                        v-model="ticketEmail"
                >
                </v-text-field>
                <v-text-field
                        label="Subject"
                        hide-details="auto"
                        class="pl-4 pr-4"
                        readonly
                        v-model="ticketSubject"
                >
                </v-text-field>
                <v-text-field
                        label="Message"
                        hide-details="auto"
                        class="pl-4 pr-4 mb-6"
                        readonly
                        v-model="ticketMessage"
                >
                </v-text-field>

                <!--에디터 -->
                <vue-editor
                        v-model="content"
                        class="mb-2 pl-4 pr-4"
                >

                </vue-editor>
                <v-card-actions>

                    <v-btn color="primary" dark @click="fn_Refund"> Refund</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click="fn_Cancel"> 취소</v-btn>

                    <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>

                </v-card-actions>
                <!--에디터 -->
            </v-card>
        </v-dialog>

        <!-- 팝 업 창 -->

    </v-container>
</template>

<script>
    import {VueEditor} from "vue2-editor";
    import store from "@/store/index.js";


    let prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    let form = new FormData();
    export default {
        name: 'TicketView',
        components: {
            VueEditor,
        },

        data: () => ({
            ticketDate:'',
            ticketTopic:'',
            ticketName:'',
            ticketEmail:'',
            ticketSubject:'',
            ticketMessage:'',
            menu1: false,
            menu2: false,
            page: 1,
            pageCount: 0,
            eDialog: false,
            content: "",
            s_date: prevDate.toISOString().substr(0, 10),
            e_date: new Date().toISOString().substr(0, 10),
         
            Sel_Mn_Type: {Srch_Type: 1, Srch_Name: "ID"},
            selectCon: {tStatusId: 1, tStatusName: "Wating"},
            selectItems: [
                {
                    tStatusId: 1, tStatusName: "Wating",

                },
                {
                    tStatusId: 2, tStatusName: "Completed",
                },
                {
                    tStatusId: 3, tStatusName: "All"
                },

            ],
            SrchMenuItem: [
                {
                    Srch_Type: 1, Srch_Name: "ID",

                },
                {
                    Srch_Type: 2, Srch_Name: "Name",
                },
                {
                    Srch_Type: 3, Srch_Name: "IDX"
                },
                {
                    Srch_Type: 4, Srch_Name: "Subject"
                },
            ],

            //Office Variables
            TicketItems: [
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
                {
                    in: '0',
                    out: '0',
                },
            ],
            TicketLeftHeaders: [
                /*{ text: "분류", align: "center",sortable: false, value: "" },*/
                {text: "IN", align: "center", sortable: false, value: ""},
                {text: "OUT", align: "center", sortable: false, value: ""},
            ],

            TicketHeaders: [
                {
                    text: "",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Sum",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Log_in",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Account",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Technical issue",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Contest",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Bonus",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Shop",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Complaints",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Proposal",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Refund",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Etc",
                    align: "center",
                    sortable: false,
                    value: "",
                },
            ],
            TicketHeaders2: [
                {
                    text: "Num",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Time",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Topic",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Subject",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Name",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "ID",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Reply Date",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Reply ID",
                    align: "center",
                    sortable: false,
                    value: "",
                },

            ],
            TicketItems2: [
                {
                    Num:1,
                    Time:1,
                    Topic:1,
                    Subject:1,
                    Name:'test',
                    ID:1,
                    ReplyDate:1,
                    ReplyID:1
                }
            ],
            returnTicketList:[],
            itemsPerPage:10,
            searchText:'',

        }),
        beforeMount() {
            store.commit('onProgress');
        },

        mounted() {
        this.readCallTicketList();
            store.commit('offProgress');
        },

        methods: {
           getStatusSearch() {
                // console.log(this.s_date);
                // console.log(this.e_date);
               this.searchText='';
                this.page = 1;
                this.fn_getDateTicketList();




            },
            async fn_getDateTicketList() {
                form.delete("page");
                form.delete("size");
                form.delete("ST");
                form.delete("ET");
                form.delete("RESYN");
                form.delete("ID");
                form.delete("NAME");
                form.delete("IDX");
                form.delete("SUBJECT");

                form.set("ST",this.s_date);
                form.set("ET", this.e_date);
                form.set("page", this.page);
                form.set("size", this.itemsPerPage);

                if (this.selectCon.tStatusId === 1) form.set("RESYN", this.selectCon.tStatusName);
                if (this.selectCon.tStatusId === 2) form.set("RESYN", this.selectCon.tStatusName);
                if (this.selectCon.tStatusId === 3) form.set("RESYN", this.selectCon.tStatusName);

                await this.$store
                    .dispatch("GETTICKETSTATUS", form)
                    .then((response) => {
                        console.log(response);
                        this.returnTicketList = response.List.content
                        this.page = response.CurrentPage;
                        this.pageCount = response.totalPages;
                        if(this.returnTicketList == '' ) {
                            alert("티켓 리스트가 존재하지 않습니다.\n다른날짜를 선택해 주세요.");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            async searchListCall() {

                if (this.$refs.form.validate()) {
                    await this.readCallTicketList();
                }
            },
            getSearch() {

                //검색시엔 다시 1페이지로
                this.page = 1;
                if (this.searchText == "") {
                    this.readCallTicketList();
                }
                else {
                    this.searchListCall();

                    // alert(2);
                }
            },
            handlePage() {
                console.log(`현재 클릭한 페이지 : ${this.page}`);
                this.readCallTicketList();
            },
            async readCallTicketList() {
                form.delete("page");
                form.delete("size");
                form.delete("ID");
                form.delete("NAME");
                form.delete("IDX");
                form.delete("SUBJECT");
                form.delete("ST");
                form.delete("ET");
                form.delete("RESYN");


                form.set("ST",this.s_date);
                form.set("ET", this.e_date);
                form.set("page", this.page);
                form.set("size", this.itemsPerPage);

                if (this.selectCon.tStatusId === 1) form.set("RESYN", this.selectCon.tStatusName);
                if (this.selectCon.tStatusId === 2) form.set("RESYN", this.selectCon.tStatusName);
                if (this.selectCon.tStatusId === 3) form.set("RESYN", this.selectCon.tStatusName);

                if (this.Sel_Mn_Type.Srch_Type === 1) form.set("ID", this.searchText);
                if (this.Sel_Mn_Type.Srch_Type === 2) form.set("NAME",this.searchText );
                if (this.Sel_Mn_Type.Srch_Type === 3) form.set("IDX",this.searchText );
                if (this.Sel_Mn_Type.Srch_Type === 4) form.set("SUBJECT",this.searchText );

                await this.$store
                    .dispatch("GETTICKETLIST", form)
                    .then((response) => {
                        // console.log(response);
                        this.returnTicketList = response.List.content
                        this.page=response.CurrentPage;
                        this.pageCount = response.totalPages;

                    })
                    .catch((error) => {
                        console.log(error);
                    });



            },
            rowClick(item) {
                console.log(item);
                this.ticketDate = item.cuReqDate;
                this.ticketTopic = item.cuTopic;
                this.ticketName = item.cuUIdx;
                this.ticketEmail = item.cuMail;
                this.ticketSubject = item.cuSubject;
                this.ticketMessage = item.cuMessage;
                this.eDialog = true;
            },

            fn_Refund() {

            },
            fn_Cancel() {
                this.eDialog = false;
                this.content = '';
            },
            fn_Save() {
                this.eDialog = false;
            },
            getTicketSearch() {
                if (this.s_date > this.e_date) {
                    alert("종료일보다 큰 날짜는 선택할 수 없습니다.\n다시 선택해 주세요");

                }

            }
        },
    };
</script>

<style lang="scss" scoped>
.tb-board-td-right > td {
    border-right: thin solid rgba(0, 0, 0, 0.12);
}
.tb-border-header > th {
    border-right: thin solid rgba(0, 0, 0, 0.12);

}
</style>