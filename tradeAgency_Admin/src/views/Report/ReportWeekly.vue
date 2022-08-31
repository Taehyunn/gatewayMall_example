<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Weekly화면 입니다.</v-card-title>

        </v-card>
        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col>
                    <v-select
                            ref="menu"
                            item-text="selectName"
                            item-value="selectId"
                            label="일/주/월"
                            :items="selectItems"
                            required
                            v-model="selectCon"
                            return-object

                            class="pl-3"
                            v-on:change="fn_MoveRoute(`${selectCon.selectId}`)"
                    >

                    </v-select>
                </v-col>
                <v-col>

                    <v-menu
                            ref="weekMenu"
                            v-model="weekMenu"
                            :close-on-content-click="false"
                            :return-value.sync="weekDates"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"


                    >
                        <template v-slot:activator="{ on}">
                            <v-text-field
                                    v-model="weekList"
                                    multiple
                                    chips
                                    small-chips
                                    label="검색날짜"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-on="on"
                                    min-width="400"


                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="weekDates"
                                no-title
                                scrollable
                                @input="fn_WeekChange"
                                range
                                :max="max"
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    @click="$refs.weekMenu.save(weekDates)"
                            >OK
                            </v-btn>
                        </v-date-picker>
                        <v-spacer></v-spacer>

                    </v-menu>
                </v-col>
                <v-col class="pt-6">
                    <v-btn  block color="primary" @click.prevent="fn_getSearch">검색</v-btn>
                </v-col>

            </v-row>
        </v-card>


        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="WeeklyJoinUserHeaders"
                    :items="returnWeeklyJoinuserList"
                    hide-default-footer
                    hide-default-header
                    disable-pagination
                    class="table"
            >

                <template v-slot:header="{ props: { headers } }">
                    <thead >
                    <tr>
                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align }"
                            class="tb-border-right thead"
                        >{{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }">
                    <tbody v-for="(item, index) in items" :key="index">
                    <tr   >
                        <td :rowspan="item.contents.length + 1"
                            style="text-align: center; border-right: thin solid rgba(0,0,0,0.12); "
                            :class="[index==items.length-1 ?'blueLightTheme' : 'lastRowTheme']"
                        >{{item.Type }}</td>
                    </tr>
                    <tr v-for="(content, idx) in item.contents" :key="idx" class="table-board-set">

                        <td >

                            {{content.gettotal}}
                        </td>
                        <td>{{ content.getnew }}</td>
                        <td>{{ content.getdau }}</td>
                        <td>{{ content.getdrop }}</td>

                    </tr>
                    </tbody>
                </template>

                <!--                <template v-slot:body="{ items }">-->
                <!--                    <tbody>-->
                <!--                    <tr-->
                <!--                            v-for="(lheader, index) in OfficeLeftHeaders"-->
                <!--                            :key="index"-->
                <!--                    >-->
                <!--                        <td style="text-align: center;background: rosybrown">{{ lheader.text }}</td>-->

                <!--                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==0">{{-->
                <!--                            item.total }}-->
                <!--                        </td>-->
                <!--                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==1">{{-->
                <!--                            item.newuser }}-->
                <!--                        </td>-->
                <!--                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==2">{{-->
                <!--                            item.dau }}-->
                <!--                        </td>-->
                <!--                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==3">{{-->
                <!--                            item.drop }}-->
                <!--                        </td>-->

                <!--                    </tr>-->
                <!--                    </tbody>-->
                <!--                </template>-->

            </v-data-table>
        </v-card>
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="WeeklyGameContestHeaders"
                    :items="returnWeeklyGameConetstList"
                    hide-default-footer
                    hide-default-header
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align, borderRight:header.borderRight }">{{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }">
                    <tbody >
                    <tr  v-for="(item, index) in items" :key="index" class="table-board-set">
                        <td style="background: rosybrown">
                            {{item.gc_name}}
                        </td>
                        <td>{{ item.contestUser }}</td>
                        <td>{{ item.rateUser }}</td>
                        <td>{{ item.PCMOBILE }}</td>

                    </tr>
                    </tbody>
                </template>

                <!--                <template v-slot:body="{ items }">-->
                <!--                    <tbody>-->
                <!--                    <tr-->
                <!--                            v-for="(lheader, index) in GameLeftHeaders"-->
                <!--                            :key="index"-->
                <!--                    >-->
                <!--                        <td style="text-align: center;background: rosybrown">{{ lheader.text }}</td>-->

                <!--                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==0">{{-->
                <!--                            item.contest }}-->
                <!--                        </td>-->
                <!--                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==1">{{-->
                <!--                            item.rate }}-->
                <!--                        </td>-->
                <!--                        <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==2">{{-->
                <!--                            item.deviceRate }}-->
                <!--                        </td>-->

                <!--                    </tr>-->
                <!--                    </tbody>-->
                <!--                </template>-->

            </v-data-table>
        </v-card>

        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="PaymentWeeklyStatHeaders"
                    :items="PaymentWeeklyStatItems"
                    hide-default-header
                    hide-default-footer
                    disable-pagination
            >

                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th rowspan="2"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);border-right: thin solid rgba(0, 0, 0, 0.12);text-align: center;">
                            PaymentType
                        </th>
                        <th rowspan="2"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);border-right: thin solid rgba(0, 0, 0, 0.12);text-align: center;">
                            Server Hold
                        </th>
                        <th rowspan="1" :colspan="PaymentWeeklyStatHeaders.length"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);text-align: center;">Sale
                        </th>
                    </tr>
                    <tr>
                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align }">{{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>

                <template v-slot:body="{ items }">
                    <tbody>
                    <tr v-for="item in items" :key="item.type">
                        <td style="text-align: center;background: rosybrown">{{ item.type }}</td>
                        <td style="text-align: center;">{{ item.serverHold }}</td>
                        <td style="text-align: center;">{{ item.sum }}</td>
                        <td style="text-align: center;">{{ item.danal }}</td>
                        <td style="text-align: center;">{{ item.paypal }}</td>
                        <td style="text-align: center;">{{ item.etc1 }}</td>
                        <td style="text-align: center;">{{ item.etc2 }}</td>
                        <td style="text-align: center;">{{ item.etc3 }}</td>
                    </tr>
                    </tbody>
                </template>

            </v-data-table>
        </v-card>

        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="WeeklyOpenJoinUser"
                    :items="returnWeeklyOpenJoinUserList"
                    hide-default-footer
                    disable-pagination
            >
                <template v-slot:body="{ items }">
                    <tbody v-for="(item, index) in items" :key="index">
                    <tr>
                        <th :rowspan="item.contents.length + 1"
                            style="text-align: center; background: rosybrown"
                            v-if="item.contents != ''"
                        >{{item.type }}</th>
                    </tr>
                    <tr v-for="(content, idx) in item.contents" :key="idx" class="table-board-set">
                        <td style="background:lightblue">{{content.mt_type}}</td>
                        <td >{{content.sun}}</td>
                        <td >{{content.mon}}</td>
                        <td >{{content.tue}}</td>
                        <td >{{content.wed}}</td>
                        <td >{{content.thu}}</td>
                        <td >{{content.fri}}</td>
                        <td >{{content.sat}}</td>


                    </tr>
                    </tbody>
                </template>

            </v-data-table>
        </v-card>


        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="WeeklyOpenGameContestHeaders"
                    :items="returnWeeklyOpenGameContestList"
                    hide-default-footer

                    disable-pagination
            >
                <template v-slot:body="{ items }">
                    <tbody v-for="item in items" :key="item.type">
                    <tr>
                        <th :rowspan="item.contents.length + 1" style="background: rosybrown;">{{item.type }}</th>
                    </tr>
                    <tr v-for="(content, idx) in item.contents" :key="idx" class="table-board-set">

                        <td style="background: lightblue">
                            {{content.TYPE}}
                        </td>
                        <td>{{ content.Sun }}</td>
                        <td>{{ content.Mon }}</td>
                        <td>{{ content.Tue }}</td>
                        <td>{{ content.Wed}}</td>
                        <td>{{ content.Thu}}</td>
                        <td>{{ content.Fri}}</td>
                        <td>{{ content.Sat}}</td>

                    </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-card>

        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="GameWeeklyBatStatHeaders"
                    :items="returnWeeklyJoinGameList"
                    hide-default-footer
                    hide-default-header
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead class="table-header-board-set">
                    <tr>
                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{textAlign:header.align}">{{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }">
                    <tbody v-for="(item, index) in items" :key="index">
                    <tr>
                        <th :rowspan="item.contents.length + 1" style="background: rosybrown;">{{item.game }}</th>
                    </tr>
                    <tr v-for="(content, idx) in item.contents" :key="idx" class="table-board-set">

                        <td style="background: lightblue">
                            {{content.batType}}
                        </td>
                        <td>{{ content.count }}</td>
                        <td>{{ content.AllTotalCnt }}</td>
                        <td>{{ content.fee }}</td>
                        <td>{{ content.prize }}</td>

                    </tr>
                    </tbody>
                </template>

                <!--                <template v-slot:item="{ item }">-->
                <!--                    <tr>-->
                <!--                        <th :rowspan="item.contents.length + 1" style="background: rosybrown">{{ item.game }}</th>-->
                <!--                    </tr>-->
                <!--                    <tr v-for="(content, idx) in item.contents" :key="item.game + idx">-->
                <!--                        <td style="text-align: center;border-right: thin solid rgba(0, 0, 0, 0.12);background: lightblue">-->
                <!--                            {{ content.batType }}-->
                <!--                        </td>-->
                <!--                        <td style="text-align: center;">{{ content.count }}</td>-->
                <!--                        <td style="text-align: center;">{{ content.AllTotalCnt }}</td>-->
                <!--                        <td style="text-align: center;">{{ content.fee }}</td>-->
                <!--                        <td style="text-align: center;">{{ content.prize }}</td>-->
                <!--                    </tr>-->
                <!--                </template>-->

            </v-data-table>
        </v-card>
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="PaymentWeeklyExtends"
                    :items="PaymentWeeklyExtendsItems"
                    hide-default-footer
                    disable-pagination
            >
                <!--                <template v-slot:body="{ items }">-->
                <!--                    <tbody>-->
                <!--                    <tr v-for="item in items" :key="item.type">-->
                <!--                        <td style="text-align: center;background: rosybrown">{{ item.type }}</td>-->
                <!--                        <td style="text-align: center;">{{ item.serverHold }}</td>-->
                <!--                        <td style="text-align: center;">{{ item.sum }}</td>-->
                <!--                        <td style="text-align: center;">{{ item.danal }}</td>-->
                <!--                        <td style="text-align: center;">{{ item.paypal }}</td>-->
                <!--                        <td style="text-align: center;">{{ item.etc1 }}</td>-->
                <!--                        <td style="text-align: center;">{{ item.etc2 }}</td>-->
                <!--                        <td style="text-align: center;">{{ item.etc3 }}</td>-->

                <!--                    </tr>-->
                <!--                    </tbody>-->
                <!--                </template>-->
                <template v-slot:item="{ item }">
                    <tr>
                        <th :rowspan="item.contents.length + 1" style="background: rosybrown">{{ item.typeTitle }}</th>
                    </tr>
                    <tr v-for="(content, idx) in item.contents" :key="item.typeTitle + idx">
                        <td style="text-align: center;border-right: thin solid rgba(0, 0, 0, 0.12);background: lightblue">
                            {{ content.mon }}
                        </td>
                        <!--                        <td style="text-align: center;">{{ content.mon }}</td>-->
                        <td style="text-align: center;">{{ content.tue }}</td>
                        <td style="text-align: center;">{{ content.wed }}</td>
                        <td style="text-align: center;">{{ content.thu }}</td>
                        <td style="text-align: center;">{{ content.fri }}</td>
                        <td style="text-align: center;">{{ content.sat }}</td>
                        <td style="text-align: center;">{{ content.sun }}</td>
                    </tr>

                </template>
            </v-data-table>
        </v-card>
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="PaymentWeeklyExtends2"
                    :items="returnWeeklyArpList"
                    hide-default-header
                    hide-default-footer
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th style="border-right: thin solid rgba(0, 0, 0, 0.12);"></th>

                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align,  borderRight:header.borderRight}">{{ header.text }}
                        </th>

                    </tr>

                    </thead>

                </template>
                <template v-slot:body="{ items }">
                    <tbody>
                    <tr class="table-board-set">
                        <td style="background: rosybrown">
                            ARPPU/PU
                        </td>
                        <td   v-for="(content,i) in items" :key="i" >
                            {{content.ARPPUPU}}
                        </td>

                        <!--                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);">-->
                        <!--                            {{item.ARPPU}}/{{item.PU}}-->
                        <!--                        </td>-->
                        <!--                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);">-->
                        <!--                            {{item.ARPPU}}/{{item.PU}}-->
                        <!--                        </td>-->
                        <!--                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);">-->
                        <!--                            {{item.ARPPU}}/{{item.PU}}-->
                        <!--                        </td>-->

                    </tr>
                    </tbody>
                </template>


            </v-data-table>
        </v-card>

    </v-container>
</template>

<script>
    import store from "@/store/index.js";
    // let tdate = new Date();
    // alert(this.totalWeek[tdate.getDay()]);
    // firstDate.setDate(firstDate.getDate() - 6);
    let form = new FormData();
    export default {
        name: 'ReportWeekly',
        created() {
            // alert(this.totalWeek[tdate.getDay()]);
            // alert(this.lt_week);
            // console.log(this.getWeekly(new Date()));
        },
        data: () => ({
            returnWeeklyOpenGameContestList:[],
            returnWeeklyOpenJoinUserList:[],
            st:'',
            et:'',
            max: new Date().toISOString().substr(0, 10),
            weekList: [],
            weekDates: [],
            st_weekCombobox: [],
            st_preconstr: [],
            st_currentArr: [],
            weekMenu: false,
            selectCon: {selectId: 2},

            //Office constiables
            OfficeItems: [
                {
                    ofc: '2winchance',
                    total: '195',
                    newuser: `005\n(005/190)`,
                    dau: '000',
                    drop: '000'
                },
                {
                    ofc: 'Google',
                    total: '279',
                    newuser: '012\n(012/270)',
                    dau: '000',
                    drop: '003'
                },
                {
                    ofc: 'Meta',
                    total: '123',
                    newuser: `001\n(001/122)`,
                    dau: '000',
                    drop: '000'
                },
                {
                    ofc: 'Kakao',
                    total: '330',
                    newuser: `000\n(000/350)`,
                    dau: '000',
                    drop: '020'
                },
                {
                    ofc: 'Naver',
                    total: '144',
                    newuser: `003\n(003/143)`,
                    dau: '001',
                    drop: '003'
                },
                {
                    ofc: '',
                    total: '',
                    newuser: ``,
                    dau: '',
                    drop: ''
                },

            ],
            OfficeLeftHeaders: [
                /*{ text: "분류", align: "center",sortable: false, value: "" },*/
                {text: "Total", align: "center", sortable: false, value: ""},
                {text: "New", align: "center", sortable: false, value: ""},
                {
                    text: "DAU",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Drop",
                    align: "center",
                    sortable: false,
                    value: "",
                },

            ],

            WeeklyJoinUserHeaders: [
                {text: "", align: "center", sortable: false, value: ""},

                {
                    text: "Total",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "New",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "DAU",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Drop",
                    align: "center",
                    sortable: false,
                    value: "",

                },




            ],

            //Games constiables
            GameLeftHeaders: [
                {
                    text: "Contest",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Rate",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "PC/Mobile",
                    align: "center",
                    sortable: false,
                    value: "",
                },
            ],
            // GameItems: [
            //     {
            //         name:'LOL',
            //         contents: [
            //             {
            //                 contest: '280/280 (280)',
            //                 rate: '98.71% / 100%',
            //                 deviceRate: '271/9',
            //             }
            //         ]
            //
            //     },
            //     {
            //         name:'PUBG',
            //         contents:[
            //             {
            //                 contest: '480/580 (580)',
            //                 rate: '94.71% / 100%',
            //                 deviceRate: '418/62',
            //             }
            //         ]
            //     },
            //     {
            //         name:'Dota2',
            //         contents:[
            //             {
            //                 contest: '280/280 (280)',
            //                 rate: '98.71% / 100%',
            //                 deviceRate: '271/9',
            //             }
            //         ]
            //     },
            //     // {
            //     //     name:'CS.GO',
            //     //     contest: '280/280 (280)',
            //     //     rate: '98.71% / 100%',
            //     //     deviceRate: '271/9',
            //     // },
            // ],


            WeeklyGameContestHeaders: [
                {text: "", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
                // {text: "LOL", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
                {
                    text: "Contest",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "Rate",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "PC/Mobile",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                }
            ],
            //화면정의서 12페이지 관련 객체

            PaymentWeeklyStatHeaders: [
                {text: "Sum", align: "center", sortable: false, value: ""},
                {text: "Danal", align: "center", sortable: false, value: ""},
                {text: "Paypal", align: "center", sortable: false, value: ""},
                {text: "etc1", align: "center", sortable: false, value: ""},
                {text: "etc2", align: "center", sortable: false, value: ""},
                {text: "etc3", align: "center", sortable: false, value: ""},
            ],

            PaymentWeeklyStatItems: [
                {
                    type: 'FP',
                    serverHold: '000',
                    sum: '000 (000)',
                    danal: '000',
                    paypal: '000',
                    etc1: '000',
                    etc2: '000',
                    etc3: '000',
                },
                {
                    type: 'Cash',
                    serverHold: '000',
                    sum: '000 (000)',
                    danal: '000',
                    paypal: '000',
                    etc1: '000',
                    etc2: '000',
                    etc3: '000',
                },
                {
                    type: 'BP',
                    serverHold: '000',
                    sum: '000 (000)',
                    danal: '000',
                    paypal: '000',
                    etc1: '000',
                    etc2: '000',
                    etc3: '000',
                },
            ],
            //화면정의서 p.17
            PaymentWeeklyExtends: [
                {text: "", align: "center", sortable: false, value: ""},
                {text: "Sun", align: "center", sortable: false, value: ""},
                {text: "Mon", align: "center", sortable: false, value: ""},
                {text: "Tue", align: "center", sortable: false, value: ""},
                {text: "Wed", align: "center", sortable: false, value: ""},
                {text: "Thu", align: "center", sortable: false, value: ""},
                {text: "Fri", align: "center", sortable: false, value: ""},
                {text: "Sat", align: "center", sortable: false, value: ""},

            ],
            //화면정의서 p.17
            PaymentWeeklyExtendsItems: [
                {
                    typeTitle: 'FP',
                    contents: [
                        {
                            mon: '000 (000)',
                            tue: '000(000)',
                            wed: '000 (000)',
                            thu: '000 (000)',
                            fri: '000 (000)',
                            sat: '000 (000)',
                            sun: '000 (000)',
                        },

                    ],
                },
                {
                    typeTitle: 'Cash',
                    contents: [
                        {

                            mon: '000/000 (000)',
                            tue: '000/000 (000)',
                            wed: '000/000 (000)',
                            thu: '000/000 (000)',
                            fri: '000/000 (000)',
                            sat: '000/000 (000)',
                            sun: '000/000 (000)',
                        },
                        {

                            mon: '000/000 (￦)',
                            tue: '000/000 (￦)',
                            wed: '000/000 (￦)',
                            thu: '000/000 (￦)',
                            fri: '000/000 (￦)',
                            sat: '000/000 (￦)',
                            sun: '000/000 (￦)',
                        },

                    ],
                },
                // {
                //     type: 'FP',
                //     serverHold: '000',
                //     sum: '000 (000)',
                //     danal: '000',
                //     paypal: '000',
                //     etc1: '000',
                //     etc2: '000',
                //     etc3: '000',
                //
                // },
                // {
                //     type: 'Cash',
                //     serverHold: '000',
                //     sum: '000 (000)',
                //     danal: '000',
                //     paypal: '000',
                //     etc1: '000',
                //     etc2: '000',
                //     etc3: '000',
                //
                // },
                // {
                //     type: 'Danal',
                //     serverHold: '000',
                //     sum: '000 (000)',
                //     danal: '000',
                //     paypal: '000',
                //     etc1: '000',
                //     etc2: '000',
                //     etc3: '000',
                //
                // },
                // {
                //     type: '1',
                //     serverHold: '1',
                //     sum: '1',
                //     danal: '1',
                //     paypal: '1',
                //     etc1: '1',
                //     etc2: '1',
                //     etc3: '000',
                //
                // },
                // {
                //     type: '2',
                //     serverHold: '2',
                //     sum: '2',
                //     danal: '2',
                //     paypal: '2',
                //     etc1: '2',
                //     etc2: '2',
                //     etc3: '000',
                //
                // },
                // {
                //     type: 'BP',
                //     serverHold: '000',
                //     sum: '000 (000)',
                //     danal: '000',
                //     paypal: '000',
                //     etc1: '000',
                //     etc2: '000',
                //     etc3: '000',
                //
                // },
            ],
            PaymentWeeklyExtends2: [
                {text: "일", align: "center", sortable: false, value: "", borderRight:"thin solid rgba(0,0,0,0.12)"},
                {text: "월", align: "center", sortable: false, value: "", borderRight:"thin solid rgba(0,0,0,0.12)"},
                {text: "화", align: "center", sortable: false, value: "", borderRight:"thin solid rgba(0,0,0,0.12)"},
                {text: "수", align: "center", sortable: false, value: "", borderRight:"thin solid rgba(0,0,0,0.12)"},
                {text: "목", align: "center", sortable: false, value: "", borderRight:"thin solid rgba(0,0,0,0.12)"},
                {text: "금", align: "center", sortable: false, value: "", borderRight:"thin solid rgba(0,0,0,0.12)"},
                {text: "토", align: "center", sortable: false, value: "", borderRight:"thin solid rgba(0,0,0,0.12)"},

            ],
            returnWeeklyArpList: [

            ],


            //화면정의서 13페이지 관련 객체
            WeeklyOpenJoinUser: [
                {text: "", align: "center", sortable: false, value: ""},
                {text: "", align: "center", sortable: false, value: ""},
                {text: "Sun", align: "center", sortable: false, value: ""},
                {text: "Mon", align: "center", sortable: false, value: ""},
                {text: "Tue", align: "center", sortable: false, value: ""},
                {text: "Wed", align: "center", sortable: false, value: ""},
                {text: "Thu", align: "center", sortable: false, value: ""},
                {text: "Fri", align: "center", sortable: false, value: ""},
                {text: "Sat", align: "center", sortable: false, value: ""},

            ],

            CompanyWeeklyUserStatItems: [
                {
                    type: 'Total',
                    contents: [
                        {
                            company: '2winchance',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Google',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Meta',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Kakao',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Naver',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                    ],
                },
                {
                    type: 'New',
                    contents: [
                        {
                            company: '2winchance',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Google',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Meta',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Kakao',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Naver',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                    ],
                },
                {
                    type: 'DAU',
                    contents: [
                        {
                            company: '2winchance',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Google',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Meta',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Kakao',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Naver',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                    ],
                },
                {
                    type: 'ACU / FCU',
                    contents: [
                        {
                            company: '2winchance',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Google',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Meta',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Kakao',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                        {
                            company: 'Naver',
                            mon: '10',
                            tue: '10',
                            wed: '10',
                            thu: '10',
                            fri: '10',
                            sat: '10',
                            sun: '10',
                        },
                    ],
                },
                {
                    type: 'Drop',
                    contents: [
                        {
                            company: 'Sum',
                            mon: '50',
                            tue: '50',
                            wed: '50',
                            thu: '50',
                            fri: '50',
                            sat: '50',
                            sun: '50',
                        },
                    ],
                },
            ],

            WeeklyOpenGameContestHeaders: [
                {text: "", align: "center", sortable: false, value: ""},
                {text: "", align: "center", sortable: false, value: ""},
                {text: "Sun", align: "center", sortable: false, value: ""},
                {text: "Mon", align: "center", sortable: false, value: ""},
                {text: "Tue", align: "center", sortable: false, value: ""},
                {text: "Wed", align: "center", sortable: false, value: ""},
                {text: "Thu", align: "center", sortable: false, value: ""},
                {text: "Fri", align: "center", sortable: false, value: ""},
                {text: "Sat", align: "center", sortable: false, value: ""},

            ],

            GameWeeklyContestStatItems: [
                {
                    game: 'LoL',
                    contents: [
                        {
                            type: 'Contest',
                            mon: '000/000 (000)',
                            tue: '000/000 (000)',
                            wed: '000/000 (000)',
                            thu: '000/000 (000)',
                            fri: '000/000 (000)',
                            sat: '000/000 (000)',
                            sun: '000/000 (000)',
                        },
                        {
                            type: 'Rate',
                            mon: '00.00% / 00.00%',
                            tue: '00.00% / 00.00%',
                            wed: '00.00% / 00.00%',
                            thu: '00.00% / 00.00%',
                            fri: '00.00% / 00.00%',
                            sat: '00.00% / 00.00%',
                            sun: '00.00% / 00.00%',
                        }
                    ],
                },
                {
                    game: 'PUBG',
                    contents: [
                        {
                            type: 'Contest',
                            mon: '000/000 (000)',
                            tue: '000/000 (000)',
                            wed: '000/000 (000)',
                            thu: '000/000 (000)',
                            fri: '000/000 (000)',
                            sat: '000/000 (000)',
                            sun: '000/000 (000)',
                        },
                        {
                            type: 'Rate',
                            mon: '00.00% / 00.00%',
                            tue: '00.00% / 00.00%',
                            wed: '00.00% / 00.00%',
                            thu: '00.00% / 00.00%',
                            fri: '00.00% / 00.00%',
                            sat: '00.00% / 00.00%',
                            sun: '00.00% / 00.00%',
                        }
                    ],
                },
                {
                    game: 'Dota2',
                    contents: [
                        {
                            type: 'Contest',
                            mon: '000/000 (000)',
                            tue: '000/000 (000)',
                            wed: '000/000 (000)',
                            thu: '000/000 (000)',
                            fri: '000/000 (000)',
                            sat: '000/000 (000)',
                            sun: '000/000 (000)',
                        },
                        {
                            type: 'Rate',
                            mon: '00.00% / 00.00%',
                            tue: '00.00% / 00.00%',
                            wed: '00.00% / 00.00%',
                            thu: '00.00% / 00.00%',
                            fri: '00.00% / 00.00%',
                            sat: '00.00% / 00.00%',
                            sun: '00.00% / 00.00%',
                        }
                    ],
                },
                {
                    game: 'CS:GO',
                    contents: [
                        {
                            type: 'Contest',
                            mon: '000/000 (000)',
                            tue: '000/000 (000)',
                            wed: '000/000 (000)',
                            thu: '000/000 (000)',
                            fri: '000/000 (000)',
                            sat: '000/000 (000)',
                            sun: '000/000 (000)',
                        },
                        {
                            type: 'Rate',
                            mon: '00.00% / 00.00%',
                            tue: '00.00% / 00.00%',
                            wed: '00.00% / 00.00%',
                            thu: '00.00% / 00.00%',
                            fri: '00.00% / 00.00%',
                            sat: '00.00% / 00.00%',
                            sun: '00.00% / 00.00%',
                        }
                    ],
                }
            ],

            GameWeeklyBatStatHeaders: [
                {text: "Game", align: "center", sortable: false, value: ""},
                {text: "Batting Type", align: "center", sortable: false, value: ""},
                {text: "Count", align: "center", sortable: false, value: ""},
                {text: "Entry Cnt", align: "center", sortable: false, value: ""},
                {text: "Fee", align: "center", sortable: false, value: ""},
                {text: "Prize", align: "center", sortable: false, value: ""},
            ],
            GameWeeklyBatStatItems: [
                {
                    game: 'LoL',
                    contents: [
                        {
                            batType: 'Free Zone',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Below Top',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Double Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Triple Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: '10x Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: '50/50',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                    ]
                },
                {
                    game: 'PUBG',
                    contents: [
                        {
                            batType: 'Free Zone',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Below Top',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Double Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Triple Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: '10x Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: '50/50',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                    ]
                },
                {
                    game: 'Dota2',
                    contents: [
                        {
                            batType: 'Free Zone',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Below Top',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Double Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Triple Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: '10x Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: '50/50',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                    ]
                },
                {
                    game: 'CS:GO',
                    contents: [
                        {
                            batType: 'Free Zone',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Below Top',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Double Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: 'Triple Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: '10x Up',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                        {
                            batType: '50/50',
                            count: '100',
                            entryCnt: '200 (200/300)',
                            fee: '10,000 원',
                            prize: '300,000,000 원'
                        },
                    ]
                }
            ],

            selectItems: [
                {
                    selectId: 1, selectName: "Daily",

                },
                {
                    selectId: 2, selectName: "Weekly",
                },
                {
                    selectId: 3, selectName: "Monthly"
                },

            ],
            WeekItems: [
                {
                    text: "user",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "2winchance",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Google",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Meta",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Kakao",
                    align: "center",
                    sortable: false,
                    value: "",
                },
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
            ],
            WeekItems2: [
                {
                    text: "",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "LOL",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "PUBG",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Dota2",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "CS:GO",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "",
                    align: "center",
                    sortable: false,
                    value: "",
                },

            ],
            returnWeeklyJoinuserList:[],
            returnWeeklyGameConetstList:[],
            returnWeeklyJoinGameList:[]

        }),
        watch: {
            //  weekList: function(new_val, old_val){
            //    console.info('weekList ', new_val, old_val);
            //  }
        },

        beforeMount() {
            store.commit('onProgress');
        },
        mounted() {
            // console.log('mounted: '+ this.weekList);
            this.OfficeItemPusher();
            this.fn_dfWeek();
            this.getReturnWeeklyJoinUserList();
            this.getWeeklyGameContest();
            this.getWeeklyJoinGame();
            this.getWeeklyARP();
            this.getWeeklyOpenJoinUser();
            this.getWeeklyOpenGameContest();
            store.commit('offProgress');

        },
        computed: {},

        methods: {
            async getReturnWeeklyJoinUserList() {
                form.delete("st");
                form.delete("et");
                form.set("st", this.st);
                form.set("et", this.et);

                await this.$store
                    .dispatch("GETWEEKLYJOINUSERLIST", form)
                    .then((response) => {
                        this.returnWeeklyJoinuserList = response.RESULT;


                        this.exampleItemPusher();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //Get_WeeklyGameContest
            async getWeeklyGameContest() {
                form.delete("sdt");
                form.delete("edt");

                form.set("sdt", this.st);
                form.set("edt", this.et);


                await this.$store
                    .dispatch("GETWEEKLYGAMECONTEST", form)
                    .then((response) => {

                        this.returnWeeklyGameConetstList = response.List;

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            // returnWeeklyOpenJoinUserList
            async getWeeklyOpenJoinUser() {
                form.delete("weeklySt");
                form.delete("weeklyEt");

                form.set("weeklySt", this.st);
                form.set("weeklyEt", this.et);


                await this.$store
                    .dispatch("GETWEEKLYOPENJOINUSER", form)
                    .then((response) => {

                        this.returnWeeklyOpenJoinUserList = response.allItems;

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //Get_WeeklyJoinGame
            async getWeeklyJoinGame() {

                form.delete("weeklySt");
                form.delete("weeklyEt");

                form.set("weeklySt", this.st);
                form.set("weeklyEt", this.et);

                await this.$store
                    .dispatch("GETWEEKlYJOINGAME", form)
                    .then((response) => {
                        this.returnWeeklyJoinGameList = response.GameBatItems;

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            // Get_WeeklyARP
            async getWeeklyARP() {
                form.delete("weeklySt");
                form.delete("weeklyEt");

                form.set("weeklySt",  this.st);
                form.set("weeklyEt",  this.et);


                await this.$store
                    .dispatch("GETWEEKLYARP", form)
                    .then((response) => {
                        console.log(response);
                        this.returnWeeklyArpList = response.List;

                        // console.log(this.returnWeeklyArpList.length);
                    })

                    .catch((error) => {
                        console.log(error);
                    });
            },

            // Get_WeeklyGoldOpen
            // async getWeeklyGoldOpen() {
            //     form.delete("st");
            //     form.delete("et");
            //
            //     form.set("st", "2022-01-13");
            //     form.set("et", "2022-01-13");
            //
            //
            //     await this.$store
            //         .dispatch("GETWEEKLTGOLDOPEN", form)
            //         .then((response) => {
            //
            //
            //
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //         });
            // },

            // Get_WeeklyOpenGameContest
            async getWeeklyOpenGameContest() {
                form.delete("weeklySt");
                form.delete("weeklyEt");

                form.set("weeklySt",this.st );
                form.set("weeklyEt", this.et);


                await this.$store
                    .dispatch("GETWEEKLYOPENGAMECONTEST", form)
                    .then((response) => {

                        this.returnWeeklyOpenGameContestList = response.allItems;

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            exampleItemPusher() {
                let sumTotal = 0;
                let sumNew = 0;
                let sumDau = 0;
                let sumDrop = 0;
                // alert("1");
                //     console.log(this.returnDailyJoinuserList);
                this.returnWeeklyJoinuserList.forEach((it) => {
                    // console.log(it.contents);
                    it.contents.forEach((el, index) => {
                        // console.log(el);
                        sumTotal += el.gettotal;
                        sumNew += el.getnew;
                        sumDau += el.getdau;
                        sumDrop += el.getdrop;

                        if (index === this.returnWeeklyJoinuserList.length - 1) {
                            this.returnWeeklyJoinuserList.push({});
                        }
                    })
                    // sumTotal += it.contents.total;
                    // sumNew += it.contents.newuser;
                    // sumDau += it.contents.dau;
                    // sumDrop += it.contents.drop;

                });
                this.returnWeeklyJoinuserList.push({
                    Type: 'Sum',
                    contents: [
                        {
                            getnew: sumNew,
                            getdrop: sumDrop,
                            gettotal: sumTotal,
                            getdau: sumDau
                        }
                    ]
                });
            },
            //주(날짜) 검색
            fn_getSearch() {
                // console.log(this.weekDates);
                this.getWeeklyGameContest();
                this.getReturnWeeklyJoinUserList();
                this.getWeeklyJoinGame();
                this.getWeeklyARP();
                this.getWeeklyOpenJoinUser();
                this.getWeeklyOpenGameContest();
            },

            OfficeItemPusher() {
                let sumTotal = 0;
                let sumNew = 0;
                let sumDau = 0;
                let sumDrop = 0;

                this.OfficeItems.forEach((it) => {
                    sumTotal += Number(it.total);
                    sumNew += Number(it.newuser.substring(0, 3));
                    sumDau += Number(it.dau);
                    sumDrop += Number(it.drop);
                });

                this.OfficeItems.push({
                    ofc: 'Sum',
                    total: sumTotal,
                    newuser: sumNew,
                    dau: sumDau,
                    drop: sumDrop
                });
            },

            fn_dfWeek() {
                let mDate = new Date();
                const myear = mDate.getFullYear();
                const mmonth = mDate.getMonth();
                const mdate = mDate.getDate();
                let mDay = mDate.getDay();


                if (mDay > 0 && mDay < 7) {
                    mDate.setHours(0, 0, 0, 0);

                    const poffset = new Date().getTimezoneOffset() * 60000;

                    const today_monday = new Date(mDate - poffset);
                    today_monday.setDate(today_monday.getDate() - today_monday.getDay() + 1);
                    const today_tusday = new Date(mDate - poffset);
                    today_tusday.setDate(today_tusday.getDate() - today_tusday.getDay() + 2);
                    const today_wensday = new Date(mDate - poffset);
                    today_wensday.setDate(today_wensday.getDate() - today_wensday.getDay() + 3);
                    const today_turday = new Date(mDate - poffset);
                    today_turday.setDate(today_turday.getDate() - today_turday.getDay() + 4);
                    const today_friday = new Date(mDate - poffset);
                    today_friday.setDate(today_friday.getDate() - today_friday.getDay() + 5);

                    const today_saturday = new Date(mDate - poffset);
                    today_saturday.setDate(today_saturday.getDate() - today_saturday.getDay() + 6);
                    const today_sunday = new Date(mDate - poffset);
                    today_sunday.setDate(today_sunday.getDate() - today_sunday.getDay() + 0);

                    this.st_currentArr = [
                        today_sunday.toISOString().substr(0, 10),
                        today_monday.toISOString().substr(0, 10),
                        today_tusday.toISOString().substr(0, 10),
                        today_wensday.toISOString().substr(0, 10),
                        today_turday.toISOString().substr(0, 10),
                        today_friday.toISOString().substr(0, 10),
                        today_saturday.toISOString().substr(0, 10),
                    ];


                    const aa = 1 - (mDay + 1) - 7;

                    const mPrev = new Date(myear, mmonth, mdate + 1 + aa);

                    const m_monday = new Date(mPrev - poffset);
                    m_monday.setDate(m_monday.getDate() - m_monday.getDay() + 1);
                    const m_tusday = new Date(mPrev - poffset);
                    m_tusday.setDate(m_tusday.getDate() - m_tusday.getDay() + 2);
                    const m_wensday = new Date(mPrev - poffset);
                    m_wensday.setDate(m_wensday.getDate() - m_wensday.getDay() + 3);
                    const m_turday = new Date(mPrev - poffset);
                    m_turday.setDate(m_turday.getDate() - m_turday.getDay() + 4);
                    const m_friday = new Date(mPrev - poffset);
                    m_friday.setDate(m_friday.getDate() - m_friday.getDay() + 5);

                    const m_saturday = new Date(mPrev - poffset);
                    m_saturday.setDate(m_saturday.getDate() - m_saturday.getDay() + 6);

                    this.st_preconstr = [

                        mPrev.toISOString().substr(0, 10),

                        m_monday.toISOString().substr(0, 10),
                        m_tusday.toISOString().substr(0, 10),
                        m_wensday.toISOString().substr(0, 10),
                        m_turday.toISOString().substr(0, 10),
                        m_friday.toISOString().substr(0, 10),
                        m_saturday.toISOString().substr(0, 10)
                    ];


                    this.st_weekCombobox = [
                        mPrev.toISOString().substr(0, 10) + " ~ " + m_saturday.toISOString().substr(0, 10)

                    ];
                    this.weekList = this.st_weekCombobox;
                    this.weekDates = this.st_preconstr;
                    this.st = this.weekDates[0];
                    this.et = this.weekDates[6];
                    // console.log("st : " + this.st);
                    // console.log("dt : " + this.dt);

                }

            },
            fn_MoveRoute(sId) {
                if (sId == "1") {
                    return this.$router.push({name: "ReportDaily"})
                } else if (sId == "3") {
                    return this.$router.push({name: "ReportMonthly"})
                }
            },

            getWeekly(gDate) {
                const pyear = gDate.getFullYear();
                const pmonth = gDate.getMonth();
                const pdate = gDate.getDate();
                let pDay = gDate.getDay();

                if (pDay > 0 && pDay < 7) {


                    const aa = 1 - (pDay + 1) - 7;

                    const poffset = new Date().getTimezoneOffset() * 60000;

                    const Cal_st = new Date(pyear, pmonth, pdate + 1 + aa);

                    const pmonday = new Date(Cal_st - poffset);
                    pmonday.setDate(pmonday.getDate() - pmonday.getDay() + 1);
                    const ptusday = new Date(Cal_st - poffset);
                    ptusday.setDate(ptusday.getDate() - ptusday.getDay() + 2);
                    const pwensday = new Date(Cal_st - poffset);
                    pwensday.setDate(pwensday.getDate() - pwensday.getDay() + 3);
                    const pturday = new Date(Cal_st - poffset);
                    pturday.setDate(pturday.getDate() - pturday.getDay() + 4);
                    const pfriday = new Date(Cal_st - poffset);
                    pfriday.setDate(pfriday.getDate() - pfriday.getDay() + 5);

                    const psaturday = new Date(Cal_st - poffset);
                    psaturday.setDate(psaturday.getDate() - psaturday.getDay() + 6);


                    this.pweekDates = [
                        Cal_st.toISOString().substr(0, 10),
                        pmonday.toISOString().substr(0, 10),
                        ptusday.toISOString().substr(0, 10),
                        pwensday.toISOString().substr(0, 10),
                        pturday.toISOString().substr(0, 10),
                        pfriday.toISOString().substr(0, 10),
                        psaturday.toISOString().substr(0, 10)

                    ];
                    this.weekList = [
                        Cal_st.toISOString().substr(0, 10) + "~" + psaturday.toISOString().substr(0, 10)
                    ];
                    this.weekDates = this.pweekDates;
                    // console.log(this.pweekDates);


                }
            },
            fn_WeekChange(wDate) {
                // alert("하이");
                if (this.st_currentArr.includes(wDate[0])) {
                    alert('한 주가 완료되지 않았습니다.');
                    return this.weekDates = this.st_preconstr;

                } else {
                    //현재 날짜 받아오기
                    const now = wDate ? new Date(wDate[0]) : new Date();

                    const offset = new Date().getTimezoneOffset() * 60000;

                    // set time to some convenient value
                    now.setHours(0, 0, 0, 0);

                    // Get the previous Monday
                    const monday = new Date(now - offset);
                    monday.setDate(monday.getDate() - monday.getDay() + 1);
                    const tusday = new Date(now - offset);
                    tusday.setDate(tusday.getDate() - tusday.getDay() + 2);
                    const wensday = new Date(now - offset);
                    wensday.setDate(wensday.getDate() - wensday.getDay() + 3);
                    const turday = new Date(now - offset);
                    turday.setDate(turday.getDate() - turday.getDay() + 4);
                    const friday = new Date(now - offset);
                    friday.setDate(friday.getDate() - friday.getDay() + 5);

                    const saturday = new Date(now - offset);
                    saturday.setDate(saturday.getDate() - saturday.getDay() + 6);
                    // Get next Sunday
                    const sunday = new Date(now - offset);
                    sunday.setDate(sunday.getDate() - sunday.getDay() + 0);

                    // Return array of date objects
                    //값이 변경 되는것.
                    this.weekDates = [
                        sunday.toISOString().substr(0, 10),
                        monday.toISOString().substr(0, 10),
                        tusday.toISOString().substr(0, 10),
                        wensday.toISOString().substr(0, 10),
                        turday.toISOString().substr(0, 10),
                        friday.toISOString().substr(0, 10),
                        saturday.toISOString().substr(0, 10)
                    ];
                    this.weekList = [
                        sunday.toISOString().substr(0, 10) + "~" + saturday.toISOString().substr(0, 10)
                    ];
                    this.st = this.weekDates[0];
                    this.et = this.weekDates[6];
                    console.log("st :" + this.st);
                    console.log("et :" + this.et);


                }

            }


        },
    }
</script>

<style lang="scss" scoped>
    .tb-border-right {
        border-right: thin solid rgba(0,0,0,0.12);
    }
    .table-board-set > td {
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        border-right: thin solid rgba(0, 0, 0, 0.12);
        text-align: center;
    }
    .lastRowTheme {
        background: rosybrown;
    }
    .blueLightTheme {
        background: lightblue;
    }


    //

    /*.v-data-table > div.v-data-table__wrapper > table td {*/
    /*    padding: 10px 0px !important;*/

    /*}*/
    .v-data-table > div.v-data-table__wrapper > table  td {
        padding: 10px 0px !important;

    }

    .thead {
        font-weight: bold;

    }

    .table {

        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
        margin: 0 auto;
    }


</style>