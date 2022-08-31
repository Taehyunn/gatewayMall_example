<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>공통 코드 등록 화면 입니다.</v-card-title>
            <v-card-subtitle>
                코드등록을 누르면 등록이 가능합니다.<br/>
                원하시는 리스트(행)를 클릭하시면 출력 및 삭제가 가능합니다.
            </v-card-subtitle>
        </v-card>
        <v-card class="mb-6">
            <v-form ref="form" lazy-validation>
                <v-row class="pl-4 pr-4">
                    <v-col>
                        <v-select
                                item-text="sr_Name"
                                item-value="sr_Type"
                                label="선택"
                                :items="CommonIdItem"
                                required
                                v-model="common_srType"
                                return-object

                                class="pl-3"
                        ></v-select>
                    </v-col>

                    <v-col>
                        <v-text-field
                                v-model="searchText"
                                prepend-inner-icon="mdi-magnify"
                                label="검색"
                                @keyup.enter="getCommonSearch"
                        ></v-text-field>
                    </v-col>

                    <v-col class="pt-6">
                        <v-btn
                                block
                                color="primary"
                                @click.prevent="getCommonSearch"

                        >검색
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
        <v-card>
            <v-card-title>
                <v-row justify="end" class="pr-4 mb-1 pt-2">
                    <v-btn color="primary" @click="fn_ExcelDownload">
                      <v-icon>mdi-download-circle-outline</v-icon>
                    </v-btn>
                </v-row>
            </v-card-title>
            <v-data-table
                    dense
                    :headers="Cmheaders"
                    :items="returnUpCommonList"
                    :items-per-page="itemPage"
                    :page="page"
                    hide-default-footer
                    disable-paginationS
            >
                <template v-slot:item="{ item }">
                    <tr
                            :class="{
              backColor: item.useYn === 'N',
            }"
                            @click="UprowClick(item)"
                    >
                        <td style="text-align: center">{{ item.cmmncdId }}</td>
                        <td style="text-align: center" @click.prevent="lowListStart">
                            <a href="#">{{ item.cmmncdNm }}</a>
                        </td>
                        <td style="text-align: center">{{ item.regId }}</td>
                        <td style="text-align: center">{{ item.regDt }}</td>
                        <td style="text-align: center">{{ item.useYn }}</td>
                    </tr>
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
        <v-dialog v-model="dialog" width="800">
            <!-- <template v-slot:activator="{ on }">
              <v-row class="d-flex justify-end mr-3 pt-3 mb-6">
                <v-btn
                  color="primary"
                  dark
                  class="text-right mr2"
                  v-on="on"
                  @click.prevent="InsertClick"
                >
                  코드등록
                </v-btn>
              </v-row>
            </template> -->
            <!-- 상위 목록 등록 팝업-->
            <v-card style="overflow-x:hidden">
                <v-card-title class="text-h5 primary white--text">
                    코드 등록 화면입니다.
                </v-card-title>
                <v-row class=" pt-5 pl-4 pr-4" width="700">
                    <v-text-field
                            label="코드ID"
                            v-model="CommonId"
                            :rules="[() => !!CommonId || '코드ID는 필수입니다.']"
                            required
                            class="pl-4 pr-4"
                    />
                    <v-text-field
                            label="코드명"
                            v-model="CommonName"
                            :rules="[() => !!CommonName || '코드명은 필수입니다.']"
                            required
                            class="pr-4"
                    />
                </v-row>
                <v-row class="pl-4 pr-4" width="700">
                    <v-text-field
                            label="비고"
                            v-model="CommonRemark"
                            required
                            class="pl-4 pr-4"
                    />
                    <v-text-field
                            label="정렬순서"
                            v-model="CommonSequence"
                            required
                            class="pr-4"

                    />
                </v-row>

                <!-- <v-select
                  v-model="CommonUseStatus"
                  class="pl-4 pr-4"
                  label="사용유무"
                  :items="useYnItems"
                  item-text="stName"
                  item-value="stValue"
                  style="width: 200px"
                  required
                ></v-select> -->

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click="CommonCancel"> 취소</v-btn>

                    <v-btn color="primary" dark @click="CommonSave"> 확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 상위 목록 수정 팝업-->
        <v-dialog v-model="eDialog" width="800">
            <v-card style="overflow-x:hidden">
                <v-card-title class="text-h5 primary white--text">
                    공통코드 수정 화면입니다.
                </v-card-title>
                <v-row class=" pt-5 pl-4 pr-4" width="700">
                    <v-text-field
                            label="코드ID"
                            v-model="editedItem.CommonId"
                            :rules="[() => !!editedItem.CommonId || '코드ID는 필수입니다.']"
                            required
                            class="pl-4 pr-4"
                    />
                    <v-text-field
                            label="코드명"
                            v-model="editedItem.CommonName"
                            :rules="[() => !!editedItem.CommonName || '코드명은 필수입니다.']"
                            required
                            class="pr-4"
                    />
                </v-row>

                <v-row class="  pl-4 pr-4" width="700">
                    <v-text-field
                            label="비고"
                            v-model="editedItem.CommonRemark"
                            required
                            class="pl-4 pr-4"
                    />
                    <v-text-field
                            label="정렬순서"
                            v-model="editedItem.CommonSequence"
                            required
                            class=" pr-4"

                    />

                </v-row>
                <v-row dense class=" pl-4 pr-4" width="700">
                    <v-col>
                        <v-select
                                v-model="editedItem.CommonUseStatus"
                                class="pl-1"
                                label="사용유무"
                                :items="useYnItems1"
                                item-text="E_stName"
                                item-value="E_stValue"

                                required
                        ></v-select>

                    </v-col>
                    <v-col></v-col>
                </v-row>


                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click="CommonCancel"> 취소</v-btn>

                    <v-btn color="primary" dark @click="CommonSave"> 확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template>
            <v-row class="d-flex justify-end mr-3 pt-3 mb-6">
                <v-btn
                        color="primary"
                        dark
                        class="text-right mr2"
                        @click.prevent="InsertClick"
                >
                    코드등록
                </v-btn>
            </v-row>
        </template>

        <!-- 상위 코드 끝 -->
    </v-container>
</template>

<script>
    import store from "@/store/index.js";
    import fn_commonService from "@/common/common_fn_service"

    let form = new FormData();
    export default {
        name: "CommonCode",

        data: () => ({

            page1: 1,
            pageCount1: 0,
            //상위 리스트 검색 시 사용
            searchText: "",
            //상위 페이지 및 카운트
            page: 1,
            pageCount: 0,
            itemPage: 10,
            //상위 코드등록 시 팝업
            dialog: false,
            //상위 리스트 수정 시 팝업
            eDialog: false,

            //상위 리스트 '수정' 시 사용할 값
            useYnItems1: [
                {id: "useYn", E_stName: "사용", E_stValue: "Y"},
                {id: "useYn", E_stName: "미사용", E_stValue: "N"},
            ],
            //상위 리스트 등록 시 사용 변수

            CommonId: "",
            CommonName: "",
            CommonRemark: "",
            CommonSequence: "",
            CommonUseStatus: "",
            //상위 리스트 수정 시 사용 변수
            editedItem: {
                CommonId: "",
                CommonName: "",
                CommonRemark: "",
                CommonSequence: "",
                CommonUseStatus: "",
            },
            defaultItem: {
                CommonId: "",
                CommonName: "",

                CommonRemark: "",
                CommonSequence: "",
                CommonUseStatus: "",
            },
            common_srType: {sr_Type: 1, sr_Name: "코드 ID"},
            CommonIdItem: [
                {
                    sr_Type: 1,
                    sr_Name: "코드 ID",
                },
                {
                    sr_Type: 2,
                    sr_Name: "코드명",
                },
            ],
            //상위 테이블 헤더목록들
            Cmheaders: [
                // { text: "순번", align: "center", value: "" },
                {text: "코드ID", align: "center", value: ""},
                {
                    text: "코드명",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "등록자",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "등록일",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "사용유무",
                    align: "center",
                    sortable: false,
                },
            ],

            returnUpCommonList: [],
            returnUpCommonListTotal: [],
            returnUpCommonListCnt: "",


        }),
        beforeMount() {
            store.commit('onProgress');
        },
        mounted() {
            this.readCallCommonList();
            store.commit('offProgress');
        },

        methods: {
            fn_ExcelDownload() {
                form.delete("page");
                form.delete("size");
                form.delete("cmmncdNm");
                form.delete("cmmncdId");
                form.set("page", this.page);
                form.set("size", this.returnUpCommonListCnt);

                this.$store
                    .dispatch("FETCHCOMMONCODE", form)
                    .then((response) => {
                        this.returnUpCommonListTotal = response.cmmncdList.content;

                        fn_commonService.makeExcelFile5(this.returnUpCommonListTotal);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            },
            //상위 '코드등록' 클릭 시 변수 초기화
            InsertClick() {
                this.dialog = true;
                this.CommonId = "";
                this.CommonName = "";
                this.CommonRemark = "";
                this.CommonSequence = "";
                this.CommonUseStatus = "";
            },
            //상위 리스트 클릭 시 수정 팝업
            UprowClick(item) {
                // console.log(item);
                //클릭 한 item 'Pop-up' 및 item value 삽입.
                this.editedItem.CommonId = item.cmmncdId;
                this.editedItem.CommonName = item.cmmncdNm;
                this.editedItem.CommonRemark = item.note;
                this.editedItem.CommonSequence = item.sortOrder;
                this.editedItem.CommonUseStatus = item.useYn;

                this.eDialog = true;
                // console.log(item.useYn);
                // console.log(this.editedItem.CommonUseStatus);
            },
            //상위 리스트 삭제 -> 사용유무 N으로 변경.
            // async CommonDelete() {
            //   this.editedItem.CommonUseStatus = "N";
            //   // console.log(
            //   //   "삭제 클릭 시 사용유무 : " + this.editedItem.CommonUseStatus
            //   // );
            //   form.delete("cmmncdId");
            //   form.delete("cmmncdNm");
            //   form.delete("note");
            //   form.delete("useYn");
            //   form.delete("sortOrder");
            //   form.set("cmmncdId", this.editedItem.CommonId);
            //   form.set("cmmncdNm", this.editedItem.CommonName);
            //   form.set("note", this.editedItem.CommonRemark);
            //   form.set("sortOrder", this.editedItem.CommonSequence);
            //   form.set("useYn", this.editedItem.CommonUseStatus);

            //   await this.$store
            //     .dispatch("COMMONDELETEOREDITOR", form)
            //     .then((response) => {
            //       if (response.res_code == 200) {
            //         form.delete("cmmncdId");
            //         form.delete("cmmncdNm");
            //         this.readCallCommonList();
            //       }
            //     })
            //     .catch((error) => {
            //       console.log(error);
            //     });

            //   this.eDialog = false;
            // },

            //상위 취소 시 닫기 함수
            CommonCancel() {
                this.dialog = false;
                this.eDialog = false;
            },
            //저장 시 상위 등록,수정 로직 수행
            CommonSave() {
                //상위 리스트 '수정' 팝업이 켜져있으면,
                //사용 유무가 N 이라면 N을 넣어준다.

                if (this.eDialog) {
                    if (this.editedItem.CommonUseStatus == "N") {
                        this.editedItem.CommonUseStatus = "N";

                        console.log(
                            "바뀌면 넣어준다 : " + this.editedItem.CommonUseStatus
                        );
                    } else if (this.editedItem.CommonUseStatus == "Y") {
                        this.editedItem.CommonUseStatus == "Y";
                    }
                    // console.log(
                    //   "확인 시 사용유무 상태 : " + this.editedItem.CommonUseStatus
                    // );
                    form.delete("cmmncdId");
                    form.delete("cmmncdNm");
                    form.delete("note");
                    form.delete("sortOrder");
                    form.delete("useYn");
                    form.set("cmmncdId", this.editedItem.CommonId);
                    form.set("cmmncdNm", this.editedItem.CommonName);
                    form.set("note", this.editedItem.CommonRemark);
                    form.set("sortOrder", this.editedItem.CommonSequence);
                    form.set("useYn", this.editedItem.CommonUseStatus);

                    this.$store
                        .dispatch("COMMONDELETEOREDITOR", form)
                        .then((response) => {
                            console.info(response.res_code);
                            form.delete("cmmncdId");
                            form.delete("cmmncdNm");

                            this.readCallCommonList();
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    //저장이후에 아래와 같이 처리를 해줘야한다.
                    this.editedItem = this.defaultItem;
                    //확인 시 팝업 종료.
                    if (this.eDialog) {
                        this.eDialog = false;
                    }
                } else {

                    //상위 리스트 '등록' 팝업이 켜져있으면,
                    if (this.dialog) {

                        // console.log(this.CommonUseStatus);
                        form.delete("cmmncdId");
                        form.delete("cmmncdNm");
                        form.delete("note");
                        form.delete("sortOrder");
                        form.set("cmmncdId", this.CommonId);
                        form.set("cmmncdNm", this.CommonName);
                        form.set("note", this.CommonRemark);
                        form.set("sortOrder", this.CommonSequence);

                        this.$store
                            .dispatch("SAVECOMMONCODE", form)
                            .then((response) => {
                                console.info("저장 후 성공 코드" + response.res_code);

                                form.delete("cmmncdId");
                                form.delete("cmmncdNm");
                                this.readCallCommonList();
                                // form.delete("page");
                                // form.delete("size");

                                // form.set("page", this.page);
                                // form.set("size", this.itemPage);

                                // // console.log("page" + this.page);
                                // // console.log("size" + this.itemPage);

                                // this.$store
                                //   .dispatch("FETCHCOMMONCODE", form)
                                //   .then((response) => {
                                //     this.returnUpCommonList = response.cmmncdList.content;

                                //     console.log(response);
                                //     // console.log(response.CurrentPage);

                                //     // console.log(response.cmmncdList);
                                //     this.page = response.CurrentPage;
                                //     this.pageCount = response.totalPages;
                                //   })
                                //   .catch((error) => {
                                //     console.log(error);
                                //   });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        if (this.dialog) this.dialog = false;
                        this.initVariables;
                    } else {
                        alert("필수값을 입력해주세요");
                    }
                }
            },
            initVariables() {
                this.Menu_Yn = "";
                this.Menu_Name = "";
                this.Menu_Addr = "";
                this.Menu_Comp = "";
                this.Menu_Order = "";
                this.Menu_Auth = "";
            },

            //상위 리스트 페이지 이동
            handlePage() {
                this.readCallCommonList();
            },

            // 상위 코드명 클릭 시 하위 목록 출력
            lowListStart() {
            },

            //상위 리스트 '검색' 시 '검색어' 가 있을 경우
            async searchListCall() {
                // console.log("서치리스트 콜 : " + this.common_srType.sr_Type);

                // console.log("서치리스트 콜 : " + this.common_srType.sr_Type);
                form.delete("cmmncdId");
                form.set("cmmncdId", this.searchText);
                // console.log(this.$refs.form.validate());
                if (this.$refs.form.validate()) {
                    await this.readCallCommonList();
                }


            },
            //상위 리스트 '검색' 시 출력
            getCommonSearch() {
                // console.log(this.common_srType.sr_Type);
                // console.log(this.searchText);
                // console.log("검색어의 type : " + this.searchText);
                if (this.searchText == "") {
                    // alert("검색어 없음");
                    this.readCallCommonList();
                } else {
                    this.searchListCall();

                    // alert(2);
                }
            },

            //하위 목록 등록
            low_addStart() {
            },
            low_CommonSave() {
            },
            low_CommonCancel() {
                this.Cm_lowdialog = false;
                this.low_CommonName = "";
                this.low_CommonRemark = "";
                this.low_CommonSequence = "";
                this.low_CommonUseStatus = "";
            },
            //하위 리스트 페이지 이동
            handlePage1() {
            },
            //하위 리스트 수정 버튼 클릭 시
            lowEdit(lowItem) {
                this.low_editedItem.low_UpCode = lowItem.UpCode;
                this.low_editedItem.low_CommonId = lowItem.CommonId;
                this.low_editedItem.low_CommonName = lowItem.CommonName;
                this.low_editedItem.low_CommonRemark = lowItem.CommonRemark;
                this.low_editedItem.low_CommonSequence = lowItem.CommonSequence;
                this.low_editedItem.low_CommonUseStatus = lowItem.CommonUseStatus;
                this.Cm_loweDialog = true;
            },
            //호출 성공 시 불러온다
            async readCallCommonList() {
                form.delete("page");
                form.delete("size");
                form.delete("cmmncdNm");
                form.delete("cmmncdId");

                form.set("page", this.page);
                form.set("size", this.itemPage);

                if (this.common_srType.sr_Type === 2) form.set("cmmncdNm", this.searchText)
                if (this.common_srType.sr_Type === 1) form.set("cmmncdId", this.searchText)
                // console.log("page" + this.page);
                // console.log("size" + this.itemPage);

                await this.$store
                    .dispatch("FETCHCOMMONCODE", form)
                    .then((response) => {
                        this.returnUpCommonList = response.cmmncdList.content;

                        // console.log(response);
                        // console.log(response.CurrentPage);

                        // console.log(response.cmmncdList);
                        this.page = response.CurrentPage;
                        this.pageCount = response.totalPages;
                        this.returnUpCommonListCnt = response.totalItems;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .backColor {
        background-color: gray;
    }
</style>
