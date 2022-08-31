<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Banner 등록화면 입니다.</v-card-title>
        </v-card>
    <v-card class="mb-6">
        <v-row class="pl-4">
            <v-col >
        <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :value="currentDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                              v-model="currentDate"
                              label="검색날짜"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                    v-model="currentDate"
                    no-title scrollable
                    :max="new Date().toISOString().substr(0, 10)"
            >
                <v-spacer></v-spacer>
                <v-btn    color="primary"  @click="menu = false">Cancel</v-btn>
                <v-btn   color="primary"  @click="$refs.menu.save(currentDate)">OK</v-btn>
            </v-date-picker>
        </v-menu>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-card>
        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col md="3">
                    <v-select
                            item-text="selectName"
                            item-value="selectId"
                            label=" 선택"
                            :items="selectItems"
                            required
                            v-model="selectCon"
                            return-object
                            class="pl-3"

                            v-on:change="fn_MoveRoutes(`${selectCon.selectId}`)"
                    ></v-select>
                </v-col>
                <template >
                    <v-col class="pt-6">
                        <v-btn
                                color="primary"
                                dark class="text-right mr2"
                                @click.prevent="StartAddBanner"
                        >
                            Banner Reg
                        </v-btn>
                    </v-col>
                </template>
                <v-dialog v-model="dialog" width="800">

                    <v-card style="overflow-x:hidden">
                        <v-card-title class="text-h5 primary white--text">
                            Banner 등록
                        </v-card-title>
                        <v-text-field
                                label="Banner Title"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                                required
                        />
                        <v-text-field
                                label="Banner Date"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                                required
                        />
                        <v-text-field
                                label="Link"
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

        <v-card >
            <v-data-table
                    dense
                    :headers="headers"
                    hide-default-footer
                    disable-pagination
            >
            </v-data-table>
        </v-card>
        <div class="text-center pt-2 mb-6">
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
        name: "BannerView",

        data: () => ({
            menu:false,
            currentDate:new Date().toISOString().substr(0, 10),
            max:new Date().toISOString().substr(0, 10),
            page:1,
            pageCount:0,
            // 이미지 업로드 ruels
            rules: [
                value => !value || value.size < 2000000 || ' 2 MB보다 큰 이미지는 넣을 수 없습니다.',
            ],

            dialog: false,
            selectCon: {selectId: 1},

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
                    text: "Banner Title",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Banner Position",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Banner Date",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Admin Id",
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

        }),

        beforeMount() {
            store.commit('onProgress');
        },

        mounted() {
            store.commit('offProgress');
        },

        methods: {
            StartAddBanner() {
                this.dialog = true;
            },
            handlePage() {

            },
            fn_getSearch() {

            },
            fn_Cancel() {
                if (this.dialog) this.dialog = false;
            },
            fn_Save() {
            },
            fn_MoveRoutes() {
                // if (selectId == "1") {
                //     return this.$router.push({name: "ReportWeekly"});
                // } else if (selectId == "2") {
                //     return this.$router.push({name: "ReportMonthly"});
                // }
            },
        },
    };
</script>

<style lang="scss" scoped></style>
