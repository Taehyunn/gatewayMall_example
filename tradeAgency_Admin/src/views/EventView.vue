<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Event화면 입니다.</v-card-title>
        </v-card>

        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col md="2">
                    <v-select
                            item-text="selectName"
                            item-value="selectId"
                            label="이벤트 선택"
                            :items="selectItems"
                            required
                            v-model="selectCon"
                            return-object

                            class="pl-3"
                            v-on:change="fn_MoveRoutes(`${selectCon.selectId}`)"
                    ></v-select>
                </v-col>

                <v-dialog v-model="eDialog" width="800">

                    <v-card style="overflow-x:hidden">
                        <v-card-title class="text-h5 primary white--text">
                            Event 수정 화면입니다.
                        </v-card-title>
                        <v-text-field
                                label="Event Title"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                                required
                        />
                        <v-text-field
                                label="Event FP"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                                required
                        />
                        <v-text-field
                                label="Date Set"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                                required
                        />

               
                        <v-row class="pt-5 pl-4 pr-4" width="700">
                            <v-file-input
                                    class="pl-4 pr-4"
                                    show-size
                                    :rules="rules"
                                    accept="image/png, image/jpeg, image/bmp"
                                    label="Image Upload"
                                    style="max-width: 400px"
                                    prepend-icon="mdi-camera"
                            ></v-file-input>
                            <small class="pt-6">* 120 x 120 JPG, PNG Upload</small>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark @click="fn_Cancel"> 취소</v-btn>
                            <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                    <v-dialog v-model="dialog" width="800">
                        <template v-slot:activator="{ on }">
                            <v-col class="pt-6">
                                <v-btn color="primary" dark class="text-right mr2" v-on="on">
                                    Event Reg
                                </v-btn>
                            </v-col>
                        </template>
                        <v-card style="overflow-x:hidden">
                            <v-card-title class="text-h5 primary white--text">
                                Event 등록
                            </v-card-title>
                            <v-text-field
                                    label="Event Title"
                                    hide-details="auto"
                                    class="pt-5 pl-4 pr-4"
                                    required
                            />
                            <v-text-field
                                    label="Event FP"
                                    hide-details="auto"
                                    class="pt-5 pl-4 pr-4"
                                    required
                            />
                            <v-text-field
                                    label="Date Set"
                                    hide-details="auto"
                                    class="pt-5 pl-4 pr-4"
                                    required
                            />


                            <v-row class="pt-5 pl-4 pr-4" width="700">
                                <v-file-input
                                        class="pl-4 pr-4"
                                        show-size
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp"
                                        label="Image Upload"
                                        style="max-width: 400px"
                                        prepend-icon="mdi-camera"
                                ></v-file-input>
                                <small class="pt-6">* 120 x 120 JPG, PNG Upload</small>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" dark @click="fn_Cancel"> 취소</v-btn>
                                <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
            </v-row>
        </v-card>

        <v-card class="mb-6">
            <v-data-table
                    dense
                    :headers="headers"
                    :items="presentEventList"
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
                            @click="rowClick(item)"


                    >
                        <td class="td-border-style">{{ item.title }}</td>
                        <td class="td-border-style">{{ item.date }}</td>
                        <td class="td-border-style">{{ item.leftTime}}</td>
                        <td class="td-border-style">{{ item.fp }}</td>
                        <td class="td-border-style">{{ item.adminID }}</td>
                        <td class="td-border-style">{{ item.status }}</td>

                    </tr>
                    </tbody>
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
                            label="제목 검색"
                    ></v-text-field>
                </v-col>

                <v-col class="pt-6">
                    <v-btn block color="primary" @click.prevent="fn_getSearch">검색</v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card >
            <v-data-table
                    dense
                    :headers="headers2"
                    :items="eventAttendList"
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
                        <td class="td-border-style">{{ item.num }}</td>
                        <td class="td-border-style">{{ item.IDX }}</td>
                        <td class="td-border-style">{{ item.ID}}</td>
                        <td class="td-border-style">{{ item.data }}</td>
                        <td class="td-border-style">{{ item.selfAuth }}</td>
                        <td class="td-border-style">{{ item.AttendYn }}</td>
                        <td class="td-border-style">{{ item.ClearReward}}</td>

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
    import store from "@/store/index.js";
    export default {
        name: "EventView",

        data: () => ({
            page:1,
            pageCount:0,

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
            selectItems: [
                {
                    selectId: 1,
                    selectName: "Outline",
                },
            ],
            headers: [
                {
                    text: "EventTitle",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Date Set",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Left Time",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Event FP",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Admin ID",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Status",
                    align: "center",
                    sortable: false,
                    value: "",
                },
            ],
            presentEventList:[
                {
                    title:"test",
                    date:"2022-06-01",
                    leftTime:"2022-06-01",
                    fp:1,
                    adminID:"test",
                    status:"Y"
                }
            ],

            headers2: [
                {
                    text: "Num",
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
                    text: "ID",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Data",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "본인 인증",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "참여 가능",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "보상 획득",
                    align: "center",
                    sortable: false,
                    value: "",
                },
            ],
            eventAttendList: [
                {
                    num:1,
                    IDX:1,
                    ID:"test",
                    data:1,
                    selfAuth:"Y",
                    AttendYn:"Y",
                    ClearReward:"Y"
                }
            ],
            editedItem: {
                title:'',
                date:'',
                leftTime:'',
                fp:'',
                adminID:'',
                status:'',
            },
            eDialog: false,

        }),
        beforeMount() {
            store.commit('onProgress');
        },
        mounted() {
            store.commit('offProgress');
        },

        methods: {
            rowClick: function(item){

                this.editedItem.title = item.title;
                this.editedItem.date = item.date;
                this.editedItem.leftTime = item.leftTime;
                this.editedItem.fp = item.fp;
                this.editedItem.adminID = item.adminID;
                this.editedItem.status = item.status;

                this.eDialog = true;


            },
            handlePage() {

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

<style lang="scss" scoped>
    .td-border-style {
        border-right: thin solid rgba(0, 0, 0, 0.12);

    }

</style>
