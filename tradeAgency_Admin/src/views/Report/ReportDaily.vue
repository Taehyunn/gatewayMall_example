<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Report Main화면 입니다.</v-card-title>

        </v-card>
        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col>
                    <v-select
                            ref="menu"
                            item-text="selectName"
                            item-value="selectId"
                            label="일/주/월"
                            :items="reportSelectBox"
                            required
                            v-model="reportSelectId"
                            return-object
                            class="pl-3"
                            v-on:change="changeRoute(`${reportSelectId.selectId}`)"
                    >

                    </v-select>
                </v-col>
                <v-col>

                    <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :value="daily_dt"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field class="pl-8"
                                          v-model="daily_dt"
                                          label="검색날짜"
                                          prepend-icon="event"
                                          readonly
                                          v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="daily_dt"
                                no-title scrollable
                                :max="new Date().toISOString().substr(0, 10)"
                        >
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn color="primary" @click="$refs.menu.save(daily_dt)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col class="pt-6">
                    <v-btn block color="primary" @click.prevent="fn_getDailySearch">검색</v-btn>
                </v-col>


            </v-row>
        </v-card>
        <!--    1-->
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="DailyItems"
                    :items="returnDailyJoinuserList"
                    hide-default-footer
                    hide-default-header
                    disable-pagination

                    style="white-space: break-spaces"
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
                    <tbody v-for="(item, index) in items" :key="index">
                    <tr   >
                        <td :rowspan="item.contents.length + 1"
                            style="text-align: center"
                            :class="[index === items.length-1 ?'blueLightTheme' : 'lastRowTheme'  ]"
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
<!--                <template v-slot:body="{ item }">-->
<!--                    <tbody>-->
<!--                    <tr-->
<!--                            v-for="(lheader, index) in ExampleHeaders"-->
<!--                            :key="index"-->
<!--                            class="table-board-set"-->
<!--                    >-->
<!--                        <td style="background: rosybrown">{{ lheader.text }}</td>-->
<!--                        <td v-for="(el, idx) in item" :key="idx"-->
<!--                            v-if="index==0"-->

<!--                        >{{ el.total }}-->
<!--                        </td>-->
<!--                        <td v-for="(el, idx) in item" :key="idx"-->

<!--                            v-if="index==1" >{{ el.newuser }}-->
<!--                        </td>-->
<!--                        <td v-for="(el, idx) in item" :key="idx"-->
<!--                            v-if="index==2"-->
<!--                        >{{ el.dau }}-->
<!--                        </td>-->
<!--                        <td v-for="(el, idx) in item" :key="idx"-->
<!--                            v-if="index==3"-->
<!--                        >{{ el.drop }}-->
<!--                        </td>-->


<!--                    </tr>-->

<!--                    </tbody>-->

<!--                </template>-->

                <!--         <template v-slot:item="{ item, index }">
                           <tr
                            v-bind:class="{'lastRowTheme' : ExampleItems.length == index+1, 'grayTheme' : ExampleItems.length-1 == index+1}"
                           >
                             <td style="text-align: center">{{ item.ofc }}</td>
                             <td style="text-align: center">{{ item.total }}</td>
                             <td style="text-align: center">{{ item.newuser }}</td>
                             <td style="text-align: center">{{ item.dau }}</td>
                             <td style="text-align: center">{{ item.drop }}</td>
                           </tr>
                         </template>-->

            </v-data-table>

        </v-card>
<!--        <v-card class="mb-6">-->
<!--            <LineChart/>-->
<!--        </v-card>-->
        
        <!--2 ACU/MCU-->
        <v-card
                class="mb-6"
                style="width :200px"
        >
            <v-data-table
                    dense
                    :headers="DailyItems2"
                    hide-default-footer
                    disable-pagination

            >

            </v-data-table>
        </v-card>
        <!--    3-->
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="GameHeaders"
                    :items="returnGameConetstList"
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
                <tbody>
<!--                <tr   >-->
<!--                    <td :rowspan="item.contents.length + 1"-->
<!--                        style="text-align: center; background: rosybrown"-->

<!--                    >{{item.Type }}</td>-->
<!--                </tr>-->
<!--                <tr v-for="(content, idx) in item.contents" :key="idx" class="table-board-set">-->
<!--                    <td >-->
<!--                        {{content.Contest}}-->
<!--                    </td>-->
<!--                    <td>{{ content.Rate }}</td>-->
<!--                    <td>{{ content.PcMobile }}</td>-->
<!--                </tr>  -->
                <tr v-for="(item, index) in items" :key="index" class="table-board-set">
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

<!--                        <td v-for="(item, idx) in items" :key="idx"-->
<!--                            style="text-align: center; border-right: thin solid rgba(0,0,0,0.12)" v-if="index==0">{{-->
<!--                            item.contest }}-->
<!--                        </td>-->
<!--                        <td v-for="(item, idx) in items" :key="idx"-->
<!--                            style="text-align: center;border-right: thin solid rgba(0,0,0,0.12)" v-if="index==1">{{-->
<!--                            item.rate }}-->
<!--                        </td>-->
<!--                        <td v-for="(item, idx) in items" :key="idx"-->
<!--                            style="text-align: center;border-right: thin solid rgba(0,0,0,0.12)" v-if="index==2">{{-->
<!--                            item.deviceRate }}-->
<!--                        </td>-->

<!--                    </tr>-->
<!--                    </tbody>-->
<!--                </template>-->

            </v-data-table>
        </v-card>
        <!--4 Server Hold-->
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="GameBatHeaders"
                    :items="returnDailyJoinGameList"
                    hide-default-footer
                    hide-default-header
                    disable-pagination
            >
                <!--<template v-slot:item=" { item } ">

                  <tr v-for="(cont, idx) in item" :key="cont.gameName + idx">
                      <td :rowspan="cont.length + 1" style="background: rosybrown">{{ cont.gameName }}</td>
                  </tr>

                </template>-->
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

            </v-data-table>
        </v-card>
        <!--5-->
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="DailyCashHeaders"
                    :items="returnDailyFPCashList"
                    hide-default-header
                    hide-default-footer
                    disable-pagination
            >

                <template v-slot:header="{ props: { headers } }">
                    <thead class="table-header-board-set">
                    <tr>
                        <th rowspan="2" style="text-align: center">
                        </th>
                        <th rowspan="2" style="text-align: center">
                            Server Hold
                        </th>
                        <th rowspan="1" :colspan="DailyCashHeaders.length" style="text-align: center"
                        >Sale
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
                    <tr v-for="(item,index) in items" :key="index" class="table-board-set">
                        <td style="background: rosybrown;">{{ item.type }}
                        </td>
                        <td>{{ item.sumServerFP }}
                        </td>
                        <td>{{ item.dailySumFP }}/{{dailySellFP}}</td>
<!--                        <td>{{ item.danal }}-->
<!--                        </td>-->
<!--                        <td>{{ item.paypal }}-->
<!--                        </td>-->
<!--                        <td>{{ item.etc1 }}-->
<!--                        </td>-->
<!--                        <td>{{ item.etc2 }}-->
<!--                        </td>-->
<!--                        <td>{{ item.etc3 }}</td>-->
                    </tr>
                    </tbody>
                </template>

            </v-data-table>
        </v-card>
        <!--        6-->
        <v-row>
            <v-col>
                <v-card class="mb-6">
                    <v-data-table
                            dense
                            :headers="FPItemHeaders"
                            :items="returnDailyFPProductList"
                            hide-default-footer
                            hide-default-header
                            disable-pagination
                            :items-per-page="FP_itemsPerPage"
                    >
                        <template v-slot:header="{ props: { headers } }">
                            <thead>
                            <tr>
                                <th rowspan="1" v-for="(header) in headers" :key="header.text"
                                    :style="{ textAlign: header.align, borderRight:header.borderRight }">
                                    {{ header.text }}
                                </th>
                            </tr>
                            </thead>
                        </template>
                        <template v-slot:body="{ items }">
                            <tbody>
                            <tr v-for="item in items" :key="item.Num" class="table-board-set">
                                <td>{{item.num }}
                                </td>
                                <td>{{item.fp_product }}
                                </td>
                                <td>{{item.price }}
                                </td>
                                <td>{{ item.cnt}}
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </v-card>
                <div class="text-center pt-2 mb-6">
                    <v-pagination
                            v-model="FP_page"
                            :length="FP_pageCount"
                            @input="fn_FPHandlePage"
                    ></v-pagination>
                </div>
            </v-col>
            <v-col>
                <v-card class="mb-6">
                    <v-data-table
                            dense
                            :headers="BPItemHeaders"
                            hide-default-footer
                            hide-default-header
                            disable-pagination
                    >
                        <template v-slot:header="{ props: { headers } }">
                            <thead>
                            <tr>
                                <th rowspan="1" v-for="(header) in headers" :key="header.text"
                                    :style="{ textAlign: header.align, borderRight:header.borderRight }">{{ header.text
                                    }}
                                </th>
                            </tr>
                            </thead>
                        </template>
                        <template v-slot:body="{ items }">
                            <tbody>
                            <tr v-for="item in items" :key="item.Num" class="table-board-set">
                                <td >{{item.Num }}
                                </td>
                                <td >{{item.FpProduct }}
                                </td>
                                <td >{{item.Price }}
                                </td>
                                <td >{{ item.Cnt}}
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <!--        7-->
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="TotalBoardHeaders"
                    :items="returnDailyContestList"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    hide-default-header
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align, borderRight:header.borderRight }">{{ header.text
                            }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }">
                    <tbody>
                    <tr v-for="item in items" :key="item.cidx" class="table-board-set">
                        <td>{{item.cidx }}
                        </td>
                        <td >{{item.league }}
                        </td>
                        <td >{{item.leagueName}}<br/>
                            {{item.livein }}

                        </td>
                        <td >{{ item.entryfee }}
                        </td>
                        <td >{{ item.price }}
                        </td>
                        <td >{{ item.maxmulti }}
                        </td>
                        <td >{{ item.g_dummy }}
                        </td>
                        <td >{{ item.g_real }}
                        </td>
                        <td >{{ item.status }}
                        </td>
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
    </v-container>

</template>

<script>
    // import LineChart from '@/components/LineChart'
    import store from "@/store/index.js";

    let form = new FormData();
    let prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    export default {
        name: 'ReportDaily',
        // components: {
        //     LineChart
        // },

        data: () => ({
            returnDailyFPCashList:[],
            FP_page:1,
            FP_pageCount:0,
            FP_itemsPerPage:10,
            returnGameConetstList:[],
            returnDailyFPProductList:[],
            TestApiItems: [],
            returnDailyJoinuserList:[],
            ExampleItems: [
                {
                    ofc: "2Winchance",
                    contents: [
                        {
                            newuser: 0,
                            drop:0,
                            total: 524,
                            dau: 0
                        }
                    ]
                },
                // {
                //     ofc: 'Google',
                //     total: '279',
                //     newuser: '012\n(012/270)',
                //     dau: '000',
                //     drop: '003'
                // },
                // {
                //     ofc: 'Meta',
                //     total: '123',
                //     newuser: `001\n(001/122)`,
                //     dau: '000',
                //     drop: '000'
                // },
                // {
                //     ofc: 'Kakao',
                //     total: '330',
                //     newuser: `000\n(000/350)`,
                //     dau: '000',
                //     drop: '020'
                // },
                // {
                //     ofc: 'Naver',
                //     total: '144',
                //     newuser: `003\n(003/143)`,
                //     dau: '001',
                //     drop: '003'
                // },
                // {
                //     ofc: '',
                //     total: '',
                //     newuser: ``,
                //     dau: '',
                //     drop: ''
                // },

            ],
            ExampleHeaders: [
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
            GameHeaders: [
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

                    //Games Variables
            // GameLeftHeaders: [
            //     {
            //         text: "Contest",
            //         align: "center",
            //         sortable: false,
            //         value: "",
            //     },
            //     {
            //         text: "Rate",
            //         align: "center",
            //         sortable: false,
            //         value: "",
            //     },
            //     {
            //         text: "PC/Mobile",
            //         align: "center",
            //         sortable: false,
            //         value: "",
            //     },
            // ],
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
            //        contents:[
            //            {
            //                contest: '280/280 (280)',
            //                rate: '98.71% / 100%',
            //                deviceRate: '271/9',
            //            }
            //        ]
            //     },
            //     // {
            //     //     name:'CS.GO',
            //     //     contest: '280/280 (280)',
            //     //     rate: '98.71% / 100%',
            //     //     deviceRate: '271/9',
            //     // },
            // ],


            //화면정의서 9페이지 관련 객체
            GameBatHeaders: [
                {text: "Game", align: "center", sortable: false, value: ""},
                {text: "Batting Type", align: "center", sortable: false, value: ""},
                {text: "Count", align: "center", sortable: false, value: "",},
                {text: "Entry Cnt", align: "center", sortable: false, value: "",},
                {text: "Fee", align: "center", sortable: false, value: "",},
                {text: "Prize", align: "center", sortable: false, value: ""},
            ],
            // GameBatItems: [
            //     {
            //         game: 'LoL',
            //         contents: [
            //             {
            //                 batType: 'Free Zone',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: 'Below Top',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: 'Double Up',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: 'Triple Up',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: '10x Up',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: '50/50',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //         ]
            //     },
            //     {
            //         game: 'PUBG',
            //         contents: [
            //             {
            //                 batType: 'Free Zone',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: 'Below Top',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: 'Double Up',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: 'Triple Up',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: '10x Up',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //             {
            //                 batType: '50/50',
            //                 count: '100',
            //                 entryCnt: '200 (200/300)',
            //                 fee: '10,000 원',
            //                 prize: '300,000,000 원'
            //             },
            //         ]
            //     },
            //
            // ],
            //오늘은 제외. 어제날짜(완성됨) 기준 출력.
            daily_dt: prevDate.toISOString().substr(0, 10),
            menu: false,
            reportSelectId: {selectId: 1},
            reportSelectBox: [
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
            DailyItems: [
                {
                    text: "",
                    align: " center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {text: "Total", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
                {
                    text: "New",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "DAU",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "Drop",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                // {
                //     text: "Kakao",
                //     align: "center",
                //     sortable: false,
                //     value: "",
                //     borderRight: "thin solid rgba(0,0,0,0.12)"
                // },
                // {
                //     text: "Naver",
                //     align: "center",
                //     sortable: false,
                //     value: "",
                //     borderRight: "thin solid rgba(0,0,0,0.12)"
                // },
                // {
                //     text: "",
                //     align: " center",
                //     sortable: false,
                //     value: "",
                //     borderRight: "thin solid rgba(0,0,0,0.12)"
                // },
                // {
                //     text: "Sum",
                //     align: "center",
                //     sortable: false,
                //     value: "",
                //
                // },


            ],
            DailyItems2: [
                {
                    text: "ACU",
                    align: "center",
                    sortable: false,
                    value: "",

                },
                {
                    text: "MCU",
                    align: "center",
                    sortable: false,
                    value: "",

                },
            ],
            DailyItems3: [
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
                    text: "Rocket",
                    align: "center",
                    sortable: false,
                    value: "",

                },
            ],
            returnDailyJoinGameList: [],
            DailyCashHeaders: [
                {text: "Sum", align: "center", sortable: false, value: "",},
                {
                    text: "Danal",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {text: "3", align: "center", sortable: false, value: "",},
                {text: "4", align: "center", sortable: false, value: "",},
                {text: "5", align: "center", sortable: false, value: "",},
                {text: "6", align: "center", sortable: false, value: "",},
            ],
            // ReportStatItems: [
            //     {
            //         type: 'FP',
            //         serverHold: '000',
            //         sum: '000 (000)',
            //         danal: '000',
            //         paypal: '000',
            //         etc1: '000',
            //         etc2: '000',
            //         etc3: '000',
            //     },
            //     {
            //         type: 'Cash',
            //         serverHold: '000',
            //         sum: '000 (000)',
            //         danal: '000',
            //         paypal: '000',
            //         etc1: '000',
            //         etc2: '000',
            //         etc3: '000',
            //     },
            //     {
            //         type: 'FC',
            //         serverHold: '000',
            //         sum: '000 (000)',
            //         danal: '000',
            //         paypal: '000',
            //         etc1: '000',
            //         etc2: '000',
            //         etc3: '000',
            //     },
            // ],

            BPItemHeaders: [
                {text: "Num", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
                {
                    text: "BP Product",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "Price",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {text: "Cnt", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
            ],
            TotalBoardHeaders: [
                {
                    text: "C-IDX",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {text: "League", align: "center", value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
                {
                    text: "GameName / Live in",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "Entry free",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "Price",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "Max Multi",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "Dummy",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {text: "Real", align: "center", value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
                {text: "Status", align: "center", value: ""},

            ],
            // TotalBoardItems: [
            //     {
            //         CIDX: "1",
            //         League: "1",
            //         LiveIn: "1",
            //         EntryFree: "1",
            //         Price: "1",
            //
            //     }
            // ],
            //화면정의서 p.10 18,19번
            FPItemHeaders: [
                {text: "Num", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
                {
                    text: "FP Product",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {
                    text: "Price",
                    align: "center",
                    sortable: false,
                    value: "",
                    borderRight: "thin solid rgba(0,0,0,0.12)"
                },
                {text: "Cnt", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
            ],
            // FpItemStatusHeaders: [
            //     {
            //         Num: '1',
            //         FpProduct: '아이템 명',
            //         Price: '1000(원)',
            //         Cnt: '00',
            //     },
            //     {
            //         Num: '2',
            //         FpProduct: '아이템 명',
            //         Price: '1000(원)',
            //         Cnt: '00',
            //     },
            //     {
            //         Num: '3',
            //         FpProduct: '아이템 명',
            //         Price: '1000(원)',
            //         Cnt: '00',
            //     },
            //     {
            //         Num: '4',
            //         FpProduct: '아이템 명',
            //         Price: '1000(원)',
            //         Cnt: '00',
            //     },
            // ],
            // FcItemStatusHeaders: [
            //     {
            //         Num: '1',
            //         FpProduct: '아이템 명',
            //         Price: '1000(원)',
            //         Cnt: '00',
            //     },
            //     {
            //         Num: '2',
            //         FpProduct: '아이템 명',
            //         Price: '1000(원)',
            //         Cnt: '00',
            //     },
            //     {
            //         Num: '3',
            //         FpProduct: '아이템 명',
            //         Price: '1000(원)',
            //         Cnt: '00',
            //     },
            //     {
            //         Num: '4',
            //         FpProduct: '아이템 명',
            //         Price: '1000(원)',
            //         Cnt: '00',
            //     },
            // ],
            returnDailyContestList:[],
            page:1,
            itemsPerPage:10,
            pageCount:0,

        }),

        beforeMount() {
            store.commit('onProgress');
            console.log("ㅡㅡ시작ㅡㅡ");

        },
        mounted() {
            // this.getDailyGameContest();
            // this.getReturnDailyJoinUserList();
            // this.getDailyContest();

            this.getDailyGameContest();
            this.getReturnDailyJoinUserList();
            this.getDailyContest();
            // this.getTestDailyList();
            this.getDailyJoinGame();
            this.getDailyFPProduct();
            // this.getDailyFPCash();
            // console.log("현재 Mounted ");
            store.commit('offProgress');
        },



        computed: {},

        methods: {
            fn_FPHandlePage(){
                this.getDailyFPProduct();
            },
            handlePage(){
                this.getDailyContest();
            },
            //상단 날짜 선택 후 검색 시 해당 날짜에 대한 데이터 받아온다.
             fn_getDailySearch() {

                this.getDailyGameContest();
                this.getReturnDailyJoinUserList();
                this.getDailyContest();
                this.getDailyJoinGame();
                this.getDailyFPProduct();
            },
            //Get_DailyFPCash
            async getDailyFPCash() {
                form.delete("dailyDt");
                form.set("dailyDt", this.daily_dt);


                await this.$store
                    .dispatch("GETDAILYFPCASH", form)
                    .then((response) => {
                        this.returnDailyFPCashList = response;
                        

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //Get_DailyFPProduct
            async getDailyFPProduct() {
                console.log("get 5번 함수");
                form.delete("dailyDt");
                form.delete("page");
                form.delete("size");
                form.set("dailyDt", this.daily_dt);
                form.set("page", this.FP_page);
                form.set("size", this.FP_itemsPerPage);

                await this.$store
                    .dispatch("GETDAILYFPPRODUCT", form)
                    .then((response) => {
                        this.returnDailyFPProductList = response.List.content;

                        this.FP_page = response.CurrentPage;
                        this.FP_pageCount = response.totalPages;

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //Get_DailyGameContest
            async getDailyGameContest() {
                console.log("get 1번 함수");
                form.delete("dt");
                form.set("dt", this.daily_dt);


                await this.$store
                    .dispatch("GETDAILYGAMECONTEST", form)
                    .then((response) => {
                        this.returnGameConetstList = response.List;

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //Get_DailyJoinGame
            async getDailyJoinGame() {
                console.log("get 4번 함수");
                form.delete("dailyDt");

                form.set("dailyDt", this.daily_dt);

                await this.$store
                    .dispatch("GETDAILYJOINGAME", form)
                    .then((response) => {
                        this.returnDailyJoinGameList = response.GameBatItems;

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            // async getTestDailyList() {
            //     await this.$store
            //         .dispatch("getTestDailyList", "")
            //         .then((response) => {
            //             this.TestApiItems = response;
            //             // console.log(this.TestApiItems);
            //
            //             this.exampleApiItemPusher();
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //         });
            // },


            //Get_DailyJoinUser
            async getReturnDailyJoinUserList() {
                console.log("get 2번 함수");
                form.delete("dt");
                form.set("dt", this.daily_dt);

                await this.$store
                    .dispatch("GETJOINUSERLIST", form)
                    .then((response) => {
                        this.returnDailyJoinuserList = response.RESULT;


                        this.exampleItemPusher();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },



            //Get_DailyContest
            async getDailyContest() {
                console.log("get 3번 함수");
                form.delete("dt");
                form.delete("page");
                form.delete("size");
                form.set("dt", this.daily_dt);
                form.set("page", this.page);
                form.set("size", this.itemsPerPage);

                await this.$store
                    .dispatch("GETDAILYCONTEST", form)
                    .then((response) => {
                        this.returnDailyContestList = response.List.content;

                        this.page = response.CurrentPage;
                        this.pageCount = response.totalPages;


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
                this.returnDailyJoinuserList.forEach((it) => {
                    // console.log(it.contents);
                    it.contents.forEach((el,index) => {
                        // console.log(el);
                        sumTotal += el.gettotal;
                        sumNew += el.getnew;
                        sumDau += el.getdau;
                        sumDrop += el.getdrop;

                        if (index === this.returnDailyJoinuserList.length - 1) {
                            this.returnDailyJoinuserList.push({});
                        }
                    })
                    // sumTotal += it.contents.total;
                    // sumNew += it.contents.newuser;
                    // sumDau += it.contents.dau;
                    // sumDrop += it.contents.drop;

                });

                this.returnDailyJoinuserList.push({
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

            changeRoute(sId) {
                // console.log(this.reportSelectId.selectId);
                if (sId == "2") {
                    return this.$router.push({name: "ReportWeekly"})
                } else if (sId == "3") {
                    return this.$router.push({name: "ReportMonthly"})
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    .lastRowTheme {
        background: rosybrown;
    }
    .blueLightTheme {
        background: lightblue;
    }

    .grayTheme {
        background: gray;
    }

    .table-board-set > td {
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        border-right: thin solid rgba(0, 0, 0, 0.12);
        text-align: center;
    }

    .table-header-board-set > tr > th {
        text-align: center;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        border-right: thin solid rgba(0, 0, 0, 0.12);


    }

</style>