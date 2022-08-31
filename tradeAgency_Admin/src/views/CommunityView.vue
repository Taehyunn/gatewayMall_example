<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Commnunity화면 입니다.</v-card-title>
        </v-card>

        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col md="3">
                    <v-select
                            item-text="selectName"
                            item-value="selectId"
                            label="선택"
                            :items="selectItems"
                            required
                            v-model="selectCon"
                            return-object

                            class="pl-3"
                            v-on:change="fn_MoveRoutes(`${selectCon.selectId}`)"
                    ></v-select>
                </v-col>


            </v-row>
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
                            label=" 검색"
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
                    :headers="headers"
                    :items="returnCommunityList"
                    hide-default-footer
                    disable-pagination
            >
                <template v-slot:item="{ item }">
                    <tr @click="rowClick(item)" >
                        <td style="text-align: center;">{{item.contest}}</td>
                        <td style="text-align: center;">{{item.contest}}</td>
                        <td style="text-align: center;">{{item.contest}}</td>
                        <td style="text-align: center;">{{item.contest}}</td>
                        <td style="text-align: center;">{{item.contest}}</td>
                        <td style="text-align: center;">{{item.contest}}</td>
                    </tr>
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
        <v-dialog v-model="eDialog" width="900">
            <v-card style="overflow-x: hidden; overflow-y:hidden">
                <v-card-title class="text-h5 primary white--text">
                  Community 수정화면입니다.
                </v-card-title>
                <!--제목 입력-->
                <v-row  class=" pt-5 pl-4 pr-4" width="700">
                <v-text-field
                        label="Title"
                        hide-details="auto"
                        class="pl-4 pr-4"
                        required
                />
                <v-text-field
                        label="Date"
                        hide-details="auto"
                        class="pr-4"
                        required
                        readonly
                />
                </v-row>
                <v-row  class=" pt-5 pl-4 pr-4" width="700">
                <v-text-field
                        label="ID"
                        hide-details="auto"
                        class=" pl-4 pr-4"
                        required
                        readonly
                />
                <v-text-field
                        label="Status"
                        hide-details="auto"
                        class="pr-4 mb-9"
                        required
                        readonly
                />
                </v-row>
                <!--vue Editor-->
                <vue-editor
                        class="mb-2 pl-4 pr-4"
                ></vue-editor>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" dark @click="fn_Delete"> 삭제 </v-btn>
                    <v-btn color="primary" dark @click="fn_Cancel"> 취소 </v-btn>
                    <v-btn color="primary" dark @click="fn_Save"> 재등록 </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </v-container>
</template>

<script>
    import store from "@/store/index.js";

    export default {
        name: "CommunityView",

        data: () => ({
            page:1,
            pageCount:0,
            eDialog:false,
            // 이미지 업로드 ruels
            rules: [
                value => !value || value.size < 2000000 || ' 2 MB보다 큰 이미지는 넣을 수 없습니다.',
            ],

            editedItem:{
                // orderDt:'',
                // deliveryDt:'',
                // regDt:'',
                // totalPrice:'',
                // useYn:'',
                // orderIdx:''
            },

            selectCon: {selectId: 1},
            searchType: {ID_id: 1},
            selectSearchItems: [
                {
                    ID_id: 1,
                    ID_name: "ID",
                },
                {
                    ID_id: 2,
                    ID_name: "Subject",
                },
            ],
            selectItems: [
                {
                    selectId: 1,
                    selectName: "자유 게시판",
                },
                {
                    selectId: 2,
                    selectName: "공략 게시판",
                },
            ],
            headers: [
                {
                    text: "Num",
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
                    text: "date",
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
                    text: "Status",
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
            returnCommunityList:[

                {
                    contest: '280/280 (280)',
                    rate: '98.71% / 100%',
                    deviceRate: '271/9',
                },


            ],

        }),
        mounted() {
            store.commit('offProgress');
        },

        methods: {
            // async fn_Delete() {
            //     // console.log(this.editedItem.boardNum);
            //     // console.log(this.editedItem.boardStatus);
            //     // console.log(this.editedItem.boardStatus);
            //     if (confirm("정말로 삭제하시겠습니까?")) {
            //         form.delete("num");
            //         form.delete("status");
            //         form.set("num", this.editedItem.boardNum);
            //         form.set("status", "D");
            //         await this.$store
            //             .dispatch("HideOrDelete", form)
            //             .then((response) => {
            //                 if (response.res_code == 200) {
            //                     this.status = response.boardStatus;
            //                     // console.log(response.boardStatus);
            //                     // console.log(this.editedItem.boardStatus);
            //                     if (response.res_code === '200') {
            //                         this.fn_openAlert({
            //                             // timeout: 5000,
            //                             emoji: "✅",
            //                             title: "게시물이 삭제 되었습니다.",
            //                             //firstLineText: "",
            //                             secondLineText: "2WinChance",
            //                             // thirdLineText: "셋째줄",
            //                         });
            //                     }
            //                     this.readCallBoardList();
            //                     this.eDialog = false;
            //
            //                 }
            //             })
            //             .catch((error) => {
            //                 this.fn_openAlert({
            //                     // timeout: 5000,
            //                     emoji: "❌",
            //                     title: "요청이 실패하였습니다.",
            //                     //firstLineText: "",
            //                     secondLineText: "2WinChance",
            //                     // thirdLineText: "셋째줄",
            //                 });
            //                 console.log(error);
            //
            //             });
            //
            //     }
            // },
            rowClick() {
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
            fn_MoveRoutes() {
                // if (selectId == "2") {
                //     return this.$router.push({name: "ReportWeekly"});
                // } else if (selectId == "3") {
                //     return this.$router.push({name: "ReportMonthly"});
                // }
            },
            fn_Delete() {

            }
        },
    };
</script>

<style lang="scss" scoped></style>
