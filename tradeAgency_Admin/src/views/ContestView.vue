<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Contest 화면입니다.</v-card-title>
        </v-card>
        <v-card class="mb-6">
            <v-row class="pl-3 pr-4">

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
                    <v-btn block color="primary" @click.prevent="getSearch">검색</v-btn>
                </v-col>
            </v-row>
        </v-card>

        <v-card>
            <v-data-table
                    dense
                    :headers="GameHeaders"
                    :items="returnSummaryList"
                    hide-default-footer
                    hide-default-header
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align }"
                            class="tb-border-header"
                        >{{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }">
                    <tbody v-for="(item, index) in items" :key="index">
                    <!--                    <tr   >-->
                    <!--                        <td :rowspan="item.contents.length + 1"-->
                    <!--                            style="text-align: center; background: rosybrown"-->

                    <!--                        >{{item.name }}</td>-->
                    <!--                    </tr>-->
                    <tr class="table-board-set">
                        <td style="background: rosybrown; text-align: center">
                            {{item.gleagueAlias}}
                        </td>
                        <td style=" text-align: center">
                            {{item.totalGameCnt}}
                        </td>
                        <td style=" text-align: center">
                            {{item.totalSizeCnt}}
                        </td>
                        <td style=" text-align: center">
                            {{item.totalEntryCnt}}
                        </td>
                        <td style=" text-align: center">
                            {{item.totalFee}}
                        </td>
                        <td style=" text-align: center">
                            {{item.gsport}}
                        </td>



                    </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-card>
        <div class="text-center pt-2 mb-6">
            <v-pagination
                    v-model="page"
                    :length="pageCount"
                    @input="TopHandlePage"
            ></v-pagination>
        </div>

        <v-card>
            <v-data-table
                    dense
                    :headers="LeagueHeaders"
                    :items="returnInfoList"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    hide-default-header
                    disable-pagination

            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th rowspan="1" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align }"
                            class="tb-border-header"
                        >{{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }">
                    <tbody v-for="(item, index) in items" :key="index">
                    <tr @click="rowClick(item)" style="text-align: center; cursor:pointer " class="tb-border-body">
                        <td>
                            {{item.gleagueAlias}}
                        </td>
                        <td>
                            {{item.gidx}}
                        </td>
                        <td>
                            {{item.gdate}}
                        </td>
                        <td>
                            {{item.gname}}
                        </td>
                        <td>
                            {{item.gprizeType}}
                        </td>
                        <td>
                            {{item.gentry}}
                        </td>
                        <td>
                            {{item.gfee}}
                        </td>
                        <td>
                            {{item.gmultiMax}}
                        </td>
                        <td>
                            {{item.gprizeType}}
                        </td>
                        <td>
                            {{item.gstatusName}}
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-card>
        <div class="text-center pt-2 mb-6">
            <v-pagination
                    v-model="page1"
                    :length="pageCount1"
                    @input="LowHandlePage"
            ></v-pagination>
        </div>

        <v-row class="pl-3 pr-3">
            <v-col>

                <v-card v-model="isActive" v-if="isActive">
                    <v-data-table
                            dense
                            :headers="PlayerHeaders"
                            :items="returnUserResultList"
                            hide-default-footer
                            hide-default-header
                            disable-pagination
                    >

                        <template v-slot:header="{ props: { headers } }">
                            <thead>
                            <tr>
                                <th rowspan="1" v-for="(header) in headers" :key="header.text"
                                    :style="{ textAlign: header.align }"
                                    class="tb-border-header"
                                >{{ header.text }}
                                </th>
                            </tr>
                            </thead>
                        </template>
                        <template v-slot:body="{ items }">
                            <tbody v-for="(item, index) in items" :key="index">
                            <tr @click="getLineups(item)" class="table-board-set" style="cursor:pointer">
                                <td>
                                    {{item.mname}}
                                </td>
                                <td>
                                    {{item.jcRank}}
                                </td>
                                <td>
                                    {{item.jcPrize}}
                                </td>
                                <td>
                                    {{item.jcPoint}}
                                </td>

                            </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>

            <v-col>
                <v-card v-model="isActive2" v-if="isActive2">
                    <v-data-table
                            dense
                            :headers="CurrentInfo"
                            :items="returnUserLineupsList"
                            hide-default-footer
                            hide-default-header
                            disable-pagination
                    >
                        <template v-slot:header="{ props: { headers } }">
                            <thead>
                            <tr>
                                <th v-for="(header) in headers" :key="header.text"
                                    :style="{ textAlign: header.align }"
                                    class="tb-border-header"
                                >{{ header.text }}
                                </th>
                            </tr>
                            </thead>
                        </template>

                        <template v-slot:body="{ items }">
                            <tbody v-for="(item, idx) in items" :key="idx">
                            <tr class="table-board-set" style="cursor:pointer">
                                <td>
                                    {{item.playerPositionName}}
                                </td>
                                <td>
                                    {{item.playerName}}
                                </td>
                                <td>
                                    {{item.gname}}
                                </td>
                                <td>
                                    <v-tooltip
                                            left
                                            color="white"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                    color="primary"
                                                    dark
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    class="mt-3 mb-3"
                                            >
                                                상세 점수
                                            </v-btn>
                                        </template>
                                        <div>
                                            <span style="color: black;font-size: large" class="ml-4 font-weight-bold">상세점수</span>
                                            <v-divider></v-divider>
                                            <div class="v-data-table v-data-table--dense theme--light">
                                                <div class="v-data-table__wrapper">
                                                    <table class="v-data-table">
                                                        <tbody>
                                                        <tr>
                                                            <td class="font-weight-bold">팀 순위</td>
                                                            <td v-for="(pDetail, index) in item.playerResultJson"
                                                                v-bind:key="`pDetail_SCORE_${index}`">{{
                                                                pDetail.TEAM_SCORE }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="font-weight-bold">킬수</td>
                                                            <td v-for="(pDetail, index) in item.playerResultJson"
                                                                v-bind:key="`pDetail_KILLED_${index}`">{{ pDetail.KILLED
                                                                }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="font-weight-bold">팀킬</td>
                                                            <td v-for="(pDetail, index) in item.playerResultJson"
                                                                v-bind:key="`pDetail_TEAMKILLED_${index}`">{{
                                                                pDetail.TEAMKILLED }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="font-weight-bold">자살</td>
                                                            <td v-for="(pDetail, index) in item.playerResultJson"
                                                                v-bind:key="`pDetail_SELFKILLED_${index}`">{{
                                                                pDetail.SELFKILLED }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="font-weight-bold">부활</td>
                                                            <td v-for="(pDetail, index) in item.playerResultJson"
                                                                v-bind:key="`pDetail_REVIVED_${index}`">{{
                                                                pDetail.REVIVED }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </v-tooltip>
                                </td>
                                <td>
                                    {{item.gamePlayersPoints}}
                                </td>

                            </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>


    </v-container>

</template>

<script>
    import store from "@/store/index.js";

    let prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    let form = new FormData();
    export default {

        name: 'ContestView',
        data: () => ({
            isActive2: false,
            isActive: false,
            menu1: false,
            menu2: false,
            s_date: prevDate.toISOString().substr(0, 10),
            e_date: new Date().toISOString().substr(0, 10),
            page: 1,
            pageCount: 0,
            page1: 1,
            pageCount1: 0,
            itemsPerPage: 10,
            itemsPerPage1: 10,
            GameHeaders: [
                {text: "League", align: "center", sortable: false, value: ""},
                // {text: "LOL", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
                {
                    text: "Games",
                    align: "center",
                    sortable: false,
                    value: "",

                },
                {
                    text: "Count",
                    align: "center",
                    sortable: false,
                    value: "",

                },
                {
                    text: "Entry cnt",
                    align: "center",
                    sortable: false,
                    value: "",

                },
                {
                    text: "Fee",
                    align: "center",
                    sortable: false,
                    value: "",

                },
                {
                    text: "Prizes",
                    align: "center",
                    sortable: false,
                    value: "",

                }
            ],
            LeagueHeaders: [
                {
                    text: "League",
                    align: "center",
                    value: "gleagueAlias",

                }, {
                    text: "C-IDX",
                    align: "center",
                    value: "gidx",

                }, {
                    text: "Live in",
                    align: "center",
                    value: "gstatusName",

                }, {
                    text: "Title",
                    align: "center",
                    value: "gname",

                }, {
                    text: "Type",
                    align: "center",
                    value: "gprizeType",

                }, {
                    text: "Entry",
                    align: "center",
                    value: "gentry",

                }, {
                    text: "Fee",
                    align: "center",
                    value: "gfee",

                }, {
                    text: "Multi",
                    align: "center",
                    value: "gmultiMax",

                }, {
                    text: "Prizes",
                    align: "center",
                    sortable: false,
                    value: "gprize",

                }, {
                    text: "Status",
                    align: "center",
                    value: "gstatus",

                },
            ],
            returnSummaryList: [],
            returnInfoList: [],
            PlayerHeaders: [
                {
                    text: "Player",
                    align: "center",
                    value: "",

                }, {
                    text: "Rank",
                    align: "center",
                    value: "",

                }, {
                    text: "Prize",
                    align: "center",
                    value: "",

                }, {
                    text: "Score",
                    align: "center",
                    value: "",

                },
            ],
            CurrentInfo: [
                {
                    text: "Pos",
                    align: "center",
                    value: "",

                }, {
                    text: "Player",
                    align: "center",
                    value: "",

                }, {
                    text: "Game",
                    align: "center",
                    value: "",

                }, {
                    text: "Details",
                    align: "center",
                    value: "",

                }, {
                    text: "Score",
                    align: "center",
                    value: "",

                },
            ],
            returnUserResultList: [],
            returnUserLineupsList: [],
            g_Idx: '',
            jc_UIdx: '',
        }),
        // beforeMount() {
        //     store.commit('onProgress');
        // },
        mounted() {
            store.commit('onProgress');
            this.getSummaryList();
            this.getInfoList();
            store.commit('offProgress');

        },
        methods: {
            getLineups(item) {
                console.log(item);
                this.isActive2 = true;
                this.jc_UIdx = item.jcUIdx;
                this.returnUserLineupsList = [];
                console.log("gIdx : " + this.g_Idx);
                console.log("mIdx :" + this.jc_UIdx);

                form.delete("gIdx");
                form.delete("mIdx");
                form.set("gIdx", this.g_Idx);
                form.set("mIdx", this.jc_UIdx);

                this.$store
                    .dispatch("GETUSERLINEUPS", form)
                    .then((response) => {
                        // console.log(response);
                        this.returnUserLineupsList = response.contestUserLineups;

                    })
                    .catch((error) => {
                        console.log(error);
                    });

            },
            rowClick(item) {
                console.log(item);
                if (item.gstatusName == "종료") {
                    this.isActive = true;
                    this.isActive2 = false;

                } else {
                    this.isActive = false;
                    this.isActive2 = false;
                }
                this.g_Idx = item.gidx;

                form.delete("gIdx");
                form.set("gIdx", this.g_Idx);

                this.$store
                    .dispatch("GETUSERRESULT", form)
                    .then((response) => {
                        // console.log(response);
                        this.returnUserResultList = response.contestUserResultList;


                    })
                    .catch((error) => {
                        console.log(error);
                    });


            },
            getSearch() {
                this.getSummaryList();
                this.getInfoList();
                this.isActive = false;
                this.isActive2 = false;
            },
            doMouseOver() {

            },
            TopHandlePage() {
                this.getSummaryList();
                this.isActive = false;
                this.isActive2 = false;

            },
            LowHandlePage() {
                this.getInfoList();
                this.isActive = false;
                this.isActive2 = false;
            },
            async getSummaryList() {
                form.delete("st");
                form.delete("et");
                form.delete("page");
                form.delete("size");
                form.set("searchStDate", this.s_date);
                form.set("searchEdDate", this.e_date);
                form.set("page", this.page);
                form.set("size", this.itemsPerPage);

                await this.$store
                    .dispatch("GETSUMMARYLIST", form)
                    .then((response) => {
                        console.log(response);
                        this.returnSummaryList = response.contestSummaryList.content;
                        this.pageCount = response.contestSummaryList.totalPages;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            async getInfoList() {
                form.delete("st");
                form.delete("et");
                form.delete("page");
                form.delete("size");
                form.set("searchStDate", this.s_date);
                form.set("searchEdDate", this.e_date);
                form.set("page", this.page1);
                form.set("size", this.itemsPerPage1);

                await this.$store
                    .dispatch("GETINFOLIST", form)
                    .then((response) => {
                        console.log(response);
                        this.returnInfoList = response.contestInfoList.content;
                        this.pageCount1 = response.contestInfoList.totalPages;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

        },
    }

</script>

<style lang="scss" scoped>
    .tb-border-header {
        border-right: thin solid rgba(0, 0, 0, 0.12);
    }

    .tb-border-body > td {
        border-right: thin solid rgba(0, 0, 0, 0.12);
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
    }

    .table-board-set > td {
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        border-right: thin solid rgba(0, 0, 0, 0.12);
        text-align: center;
    }
</style>