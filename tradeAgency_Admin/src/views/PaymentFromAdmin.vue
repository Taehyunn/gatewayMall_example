<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>PaymentFromAdmin화면 입니다.</v-card-title>
        </v-card>

        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col md="3">
                    <v-select
                            item-text="ID_name"
                            item-value="ID_id"
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
                            prepend-inner-icon="mdi-magnify"
                            label="검색"
                    ></v-text-field>
                </v-col>

                <v-col class="pt-6">
                    <v-btn block color="primary" @click.prevent="fn_getSearch">검색</v-btn>
                </v-col>
            </v-row>
        </v-card>


<!--                <v-dialog v-model="dialog" width="800">-->
<!--                    <template v-slot:activator="{ on }">-->
<!--                        <v-col class="pt-6">-->
<!--                            <v-btn color="primary" dark class="text-right mr2" v-on="on">-->
<!--                                Event Reg-->
<!--                            </v-btn>-->
<!--                        </v-col>-->
<!--                    </template>-->
<!--                    <v-card style="overflow-x:hidden">-->
<!--                        <v-card-title class="text-h5 primary white&#45;&#45;text">-->
<!--                            Event 등록-->
<!--                        </v-card-title>-->
<!--                        <v-text-field-->
<!--                                label="Event Title"-->
<!--                                hide-details="auto"-->
<!--                                class="pt-5 pl-4 pr-4"-->
<!--                                required-->
<!--                        />-->
<!--                        <v-text-field-->
<!--                                label="Event FP"-->
<!--                                hide-details="auto"-->
<!--                                class="pt-5 pl-4 pr-4"-->
<!--                                required-->
<!--                        />-->
<!--                        <v-text-field-->
<!--                                label="Date Set"-->
<!--                                hide-details="auto"-->
<!--                                class="pt-5 pl-4 pr-4"-->
<!--                                required-->
<!--                        />-->


<!--                        <v-row class="pt-5 pl-4 pr-4" width="700">-->
<!--                            <v-file-input-->
<!--                                    class="pl-4 pr-4"-->
<!--                                    show-size-->
<!--                                    :rules="rules"-->
<!--                                    accept="image/png, image/jpeg, image/bmp"-->
<!--                                    label="Image Upload"-->
<!--                                    style="max-width: 400px"-->
<!--                                    prepend-icon="mdi-camera"-->
<!--                            ></v-file-input>-->
<!--                            <small class="pt-6">* 120 x 120 JPG, PNG Upload</small>-->
<!--                        </v-row>-->
<!--                        <v-card-actions>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-btn color="primary" dark @click="fn_Cancel"> 취소</v-btn>-->
<!--                            <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>-->
<!--                        </v-card-actions>-->
<!--                    </v-card>-->
<!--                </v-dialog>-->


        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="headers"
                    :items="returnPFAList"
                    hide-default-footer
                    disable-pagination
            >
                <template v-slot:item="{ item }" >
                    <tr @click="rowClick(item)">
                        <td >{{item.contest}}</td>
                        <td style="text-align:center">{{item.contest}}</td>
                        <td style="text-align:center">{{item.contest}}</td>
                        <td style="text-align:center">{{item.contest}}</td>
                        <td style="text-align:center">{{item.contest}}</td>
                        <td style="text-align:center">{{item.contest}}</td>

                        <!-- <td style="text-align:center">
                        <v-icon small @click.prevent="deleteOrder(item.orderIdx)">delete</v-icon>
                      </td> -->
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col md="3">
                    <v-select
                            item-text="ID_name"
                            item-value="ID_id"
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
                            prepend-inner-icon="mdi-magnify"
                            label="검색"
                    ></v-text-field>
                </v-col>

                <v-col class="pt-6">
                    <v-btn block color="primary" @click.prevent="fn_getSearch">검색</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="headers2"
                    :items="PaymentAdminItems"
                    hide-default-header
                    hide-default-footer
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr  >
                        <th rowspan="2" v-for="(header) in headers" :key="header.text"
                            :style="{ textAlign: header.align,  borderRight:header.borderRight}">{{ header.text }}
                        </th>
                        <th rowspan="1" :colspan="2"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);text-align: center;border-right: thin solid rgba(0, 0, 0, 0.12)">Cash
                        </th>
                        <th rowspan="1" :colspan="2"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);text-align: center;border-right: thin solid rgba(0, 0, 0, 0.12)">FP
                        </th>
                        <th rowspan="1" :colspan="2"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);text-align: center;border-right: thin solid rgba(0, 0, 0, 0.12)">BP
                        </th>
                        <th rowspan="1"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);text-align: center;border-right: thin solid rgba(0, 0, 0, 0.12)">Item
                        </th>
                        <th rowspan="1"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);text-align: center;border-right: thin solid rgba(0, 0, 0, 0.12)">Reason
                        </th>
                    </tr>

                    </thead>
                </template>
                <template v-slot:body="{items}">
                    <tbody>
                    <tr v-for="(content,i) in items" :key="i">
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);">
                            {{content.Num}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);">
                            {{content.ID}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);">
                            {{content.IDX}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);">
                            {{content.Name}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);">
                            {{content.Date}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);" >
                            {{content.Cash.plus}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);" >
                            {{content.Cash.minus}}
                        </td> <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);" >
                            {{content.FP.plus}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);" >
                            {{content.FP.minus}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);" >
                            {{content.BP.plus}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);" >
                            {{content.BP.minus}}
                        </td> <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);" >
                            {{content.itemNm}}
                        </td>
                        <td  style="text-align:center; border-right: thin solid rgba(0, 0, 0, 0.12);" >
                            {{content.Reason}}
                        </td>

                    </tr>
                    </tbody>
                </template>
<!--                    <template #header="{ }">-->
<!--                        <thead class="v-data-table-header">-->
<!--                        <tr>-->
<!--                            <th v-for="(h,i) in headers2" :key="i"-->
<!--                                class="text-center parent-header td-border-style"-->
<!--                                :colspan="h.children?h.children.length:1"-->
<!--                                style="border-bottom: thin solid rgba(0, 0, 0, 0.12);border-right: thin solid rgba(0, 0, 0, 0.12);"-->
<!--                            >-->
<!--                                {{ h.text }}-->
<!--                            </th>-->
<!--                        </tr>-->
<!--                        <tr>-->
<!--                            <th v-for="(h1,i1) in getSubHeader(memberHeaders)"-->
<!--                                :key="i1"-->
<!--                                class="text-center child-header td-border-style"-->
<!--                                style="border-right: thin solid rgba(0, 0, 0, 0.12);"-->
<!--                            >-->
<!--                                {{ h1.text }}-->
<!--                            </th>-->
<!--                        </tr>-->
<!--                        </thead>-->
<!--                    </template>-->
            </v-data-table>
        </v-card>
        <v-dialog v-model="eDialog" width="900">
            <v-card style="overflow-x: hidden; overflow-y:hidden">
                <v-card-title class="text-h5 primary white--text">
                    PaymentFromAdmin 수정화면입니다.
                </v-card-title>
                <!--제목 입력-->
                <v-row class="pt-5 pl-4 pr-4" width="700">
                    <v-text-field
                            label="ID"
                            hide-details="auto"
                            class=" pl-4 pr-4"
                            required
                            readonly
                    />
                    <v-text-field
                            label="IDX"
                            hide-details="auto"
                            class=" pr-4"
                            required
                            readonly
                    />
                </v-row>
                <v-row class=" pl-4 pr-4" width="700">
                    <v-text-field
                            label="Name"
                            hide-details="auto"
                            class="pl-4 pr-4"
                            required
                            readonly
                    />
                    <v-text-field
                            label="Cash(Now)"
                            hide-details="auto"
                            class="pr-4"
                            required
                            readonly
                    />
                </v-row>
                <v-row class=" pl-4 pr-4" width="700">
                    <v-text-field
                            label="Modify"
                            hide-details="auto"
                            class=" pl-4 pr-4"
                            required
                    />
                    <v-text-field
                            label="Item"
                            hide-details="auto"
                            class=" pr-4"
                            required
                    />
                </v-row>
                <v-row class=" pl-4 pr-4 mb-2" width="700">
                    <v-text-field
                            label="Reason"
                            hide-details="auto"
                            class=" pl-4 pr-4"
                            required
                    />
                </v-row>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" dark @click="fn_Cancel"> 취소 </v-btn>
                    <v-btn color="primary" dark @click="fn_Save"> 확인 </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import store from "@/store/index.js";

    export default {
        name: "PaymentFromAdmin",

        data: () => ({
            eDialog:false,
            // 이미지 업로드 ruels
            rules: [
                value => !value || value.size < 2000000 || ' 2 MB보다 큰 이미지는 넣을 수 없습니다.',
            ],

            dialog: false,
            EventMenu: false,
            selectCon: {selectId: 1},
            evDate: new Date().toISOString().substr(0, 10),
            searchType: {ID_id: 1},
            selectSearchItems: [
                {
                    ID_id: 1,
                    ID_name: "ID",
                },
                {
                    ID_id: 2,
                    ID_name: "IDX",
                },
            ],
            PaymentAdminItems: [
                {
                    Num: "1",
                    ID:"1",
                    IDX:"1",

                    Name:"홍길동",
                    Date:"2022-06-02",
                    Cash: {
                        plus: +1000,
                        minus: -3000
                    },
                    FP: {
                        plus: +1000,
                        minus: -3000
                    },
                    BP: {
                        plus: +1000,
                        minus: -3000
                    },
                    itemNm:"아이템명",
                    Reason:"환불",
                    align: "center",

                    sortable: false,
                    value: ""
                },
                {
                    Num: "2",
                    ID:"2",
                    IDX:"2",
                    Name:"홍길동",
                    Date:"2022-06-02",
                    Cash: {
                        plus: +1000,
                        minus: -3000
                    },
                    FP: {
                        plus: +1000,
                        minus: -3000
                    },
                    BP: {
                        plus: +1000,
                        minus: -3000
                    },
                    itemNm:"아이템명",
                    Reason:"환불",
                    align: "center",

                    sortable: false,
                    value: ""
                },



            ],
            headers: [
                {
                    text: "ID",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "IDX",
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
                    text: "Cash",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "FP",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "BP",
                    align: "center",
                    sortable: false,
                    value: "",
                },
            ],
            headers2: [
                {
                    text: "Num",
                    align: "center",
                    borderRight:"thin solid rgba(0, 0, 0, 0.12)",
                    sortable: false,
                    value: "",
                },
                {
                    text: "ID",
                    align: "center",
                    sortable: false,
                    borderRight:"thin solid rgba(0, 0, 0, 0.12)",
                    value: "",
                },
                {
                    text: "IDX",
                    align: "center",
                    sortable: false,
                    borderRight:"thin solid rgba(0, 0, 0, 0.12)",
                    value: "",
                },
                {
                    text: "Name",
                    align: "center",
                    sortable: false,
                    borderRight:"thin solid rgba(0, 0, 0, 0.12)",
                    value: "",
                },
                {
                    text: "Date",
                    align: "center",
                    sortable: false,
                    borderRight:"thin solid rgba(0, 0, 0, 0.12)",
                    value: "",
                },


            ],
            returnPFAList:[

                {
                    contest: '280/280 (280)',
                    rate: '98.71% / 100%',
                    deviceRate: '271/9',
                },


            ],
        }),
        beforeMount() {
            store.commit('onProgress');
        },
        mounted() {
            store.commit('offProgress');
        },

        methods: {
            rowClick() {
                this.eDialog= true;
            },
            fn_getSearch() {

            },
            fn_Cancel() {
                if (this.dialog) this.dialog = false;
                if (this.eDialog) this.eDialog = false;
            },
            fn_Save() {
            },
            fn_MoveRoutes(selectId) {
                if (selectId == "2") {
                    return this.$router.push({name: "ReportWeekly"});
                } else if (selectId == "3") {
                    return this.$router.push({name: "ReportMonthly"});
                }
            },
        },
    };
</script>

<style lang="scss" scoped></style>
