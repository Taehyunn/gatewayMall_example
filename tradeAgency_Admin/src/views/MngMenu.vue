<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>메뉴관리 화면입니다.</v-card-title>
        </v-card>
        <v-form ref="form">
            <v-card class="mb-6">
                <v-row class="pl-4 pr-4">
                    <v-col >
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
                        <v-btn block color="primary" @click.prevent="getSearch"
                        >검색
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-form>
        <v-card>
            <v-data-table
                    dense
                    :headers="MnHeaders"
                    :items="returnMenuList"
                    :loading="loading"
                    loading-text="불러오는 중입니다."
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    disable-pagination
            >

                <template v-slot:item="{ item }">
                    <tr>
                        <td @click="getMenuDetail(item)"
                            style="text-align: center;color: cornflowerblue;cursor: pointer">{{ item.menuName }}
                        </td>
                        <td style="text-align: center">{{ item.menuAddr }}</td>
                        <td style="text-align: center">{{ item.menuOrder }}</td>
                        <td style="text-align: center">{{ item.menuYn }}</td>
                        <td style="text-align: center">{{ item.menuRegid }}</td>
                        <td style="text-align: center">{{ item.menuRegdtm }}</td>
                        <td style="text-align: center">{{ item.menuAuth }}</td>
                        <td style="" hidden>{{ item.menuIdx }}</td>
                    </tr>
                </template>
                <!--        <template v-slot:item="{ item }">
                          <tr>
                            <td style="text-align: center" v-if="indexOf(item) == 2">PUBG</td>
                            <td @click="getMenuDetail(item)" style="text-align: center;color: cornflowerblue;cursor: pointer">{{ item.menuName }}</td>
                            <td style="text-align: center">{{ item.menuAddr }}</td>
                            <td style="text-align: center">{{ item.menuOrder }}</td>
                            <td style="text-align: center">{{ item.menuYn }}</td>
                            <td style="text-align: center">{{ item.menuRegid }}</td>
                            <td style="text-align: center">{{ item.menuRegdtm }}</td>
                            <td style="" hidden>{{ item.menuIdx }}</td>
                          </tr>
                        </template>-->
            </v-data-table>
        </v-card>
        <div class="text-center pt-2">
            <v-pagination
                    v-model="page"
                    :length="pageCount"
                    @input="handlePage"
            ></v-pagination>
        </div>

        <div class="text-right pt-2">
        <v-dialog v-model="Menu_dialog" width="750"  >
            <template v-slot:activator="{ on }">
                <v-row class="d-flex justify-end mr-1 ">
                    <v-btn color="primary" dark class="text-right mr2" v-on="on" @click.prevent="initVariables">
                        메뉴등록
                    </v-btn>
                </v-row>
            </template>

            <!-- 등록 팝업-->
            <v-card style="overflow-x: hidden" >
                <v-card-title class="text-h5 primary white--text">
                    메뉴 등록 화면입니다.

                </v-card-title>
                <v-row class=" pt-5 pl-4 pr-4" width="700">
                        <v-text-field
                                label="메뉴명"
                                v-model="Menu_Name"
                                :rules="[() => !!Menu_Name || '메뉴명은 필수입니다.']"
                                required
                                class="pl-4 pr-4"

                        />
                        <v-text-field
                                label="메뉴경로"
                                v-model="Menu_Addr"
                                :rules="[() => !!Menu_Addr || '메뉴경로는 필수입니다.']"
                                required
                                class="pr-4"

                        />
                </v-row  >
                <v-row class=" pl-4 pr-4" width="650">
                        <v-text-field
                                label="컴포넌트"
                                v-model="Menu_Comp"
                                required
                                class="pl-4 pr-4"

                        />
                        <v-text-field
                                label="정렬순서"
                                v-model="Menu_Order"
                                required
                                class=" pr-4"

                        />
                </v-row>
                <v-row class="pl-4 pr-4" width="650">
                    <v-text-field
                            label="아이콘"
                            v-model="Menu_Icon"
                            required
                            class="pl-4 pr-4"

                    />
                </v-row>

                <v-row class=" pl-4 pr-4"  width="650" >
                        <v-select
                                v-model="Menu_Auth"
                                label="사용 권한"
                                required
                                class="pl-4 pr-4"

                                :items="Menu_Auth_List"
                                item-text="detailNm"
                                item-value="detailId"

                        >
                        </v-select>
                        <v-select
                                v-model="Menu_Yn"
                                label="사용유무"
                                required
                                class="pr-4"

                                :items="Menu_Use_Yn"
                                item-text="name"
                                item-value="value"

                        >
                        </v-select>

                </v-row>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click="MenuCancel"> 취소</v-btn>

                    <v-btn color="primary" dark @click="MenuSave"> 확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

       <!--  수정 및 상세 화면 팝업  -->
        <v-dialog v-model="Menu_eDialog" width="800">
            <v-card style="overflow-x: hidden">
                <v-card-title class="text-h5 primary white--text">
                    메뉴 수정 화면입니다.
                </v-card-title>
                <v-row class=" pt-5 pl-4 pr-4" width="700">
                <v-text-field
                        label="메뉴명"
                        v-model="Menu_Name"
                        :rules="[() => !!Menu_Name || '메뉴명은 필수입니다.']"
                        required
                        class="pl-4 pr-4"
                />
                <v-text-field
                        label="메뉴경로"
                        v-model="Menu_Addr"
                        :rules="[() => !!Menu_Addr || '메뉴경로는 필수입니다.']"
                        required
                        class="pl-4 pr-4"
                />
                </v-row>
                <v-row class="  pl-4 pr-4" width="700">
                <v-text-field
                        label="컴포넌트"
                        v-model="Menu_Comp"
                        required
                        class="pl-4 pr-4"
                />
                <v-text-field
                        label="정렬순서"
                        v-model="Menu_Order"
                        required
                        class="pl-4 pr-4"

                />
                </v-row>
                <v-row class="  pl-4 pr-4" width="700">
                    <v-text-field
                            label="아이콘"
                            v-model="Menu_Icon"
                            required
                            class="pl-4 pr-4"
                    />

                </v-row>
                <v-row class="  pl-4 pr-4" width="700">
                <v-select
                        v-model="Menu_Auth"
                        label="사용 권한"
                        required
                        class="pl-4 pr-4"
                        style="width: 200px"
                        :items="Menu_Auth_List"
                        item-text="detailNm"
                        item-value="detailId"
                >
                </v-select>
                <v-select
                        v-model="Menu_Yn"
                        label="사용유무"
                        required
                        class="pl-4 pr-4"
                        style="width: 200px"
                        :items="Menu_Use_Yn"
                        item-text="name"
                        item-value="value"
                >
                </v-select>
                </v-row>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click="MenuCancel"> 취소</v-btn>

                    <v-btn color="primary" dark @click="MenuSave"> 확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </div>


    </v-container>
</template>

<script>
    import store from "@/store/index.js";

    let form = new FormData();

    export default {

        name: 'MngMenu',
        data: () => ({

            //검색어 변수
            searchText: '',
            //API요청 성공 다이얼로그 제어
            //메뉴 데이터 위한 변수
            Menu_dialog: false,
            Menu_eDialog: false,
            Menu_Idx: '',
            Menu_Yn: '',
            Menu_Name: '',
            Menu_Addr: '',
            Menu_Icon: '',
            Menu_Comp: '',
            Menu_Auth: '',
            Menu_Order: '',
            //권한목록 셀렉트 박스
            Menu_Auth_List: [],
            //사용유무 셀렉트 박스
            Menu_Use_Yn: [
                {name: '사용', value: 'Y'},
                {name: '미사용', value: 'N'}
            ],

            //상위 페이지 및 카운트 변수 선언
            page: 1,
            pageCount: 0,
            itemsPerPage: 20,
            loading: true,
            //검색용 셀렉트 박스
            Sel_Mn_Type: {Srch_Type: 1, Srch_Name: "메뉴명"},
            SrchMenuItem: [
                {
                    Srch_Type: 1,
                    Srch_Name: "메뉴명",
                },
                {
                    Srch_Type: 2,
                    Srch_Name: "경로",
                },
            ],
            //메뉴 테이블 헤더목록
            MnHeaders: [
                // { text: "순번", align: "center", value: "" },
                {
                    text: "메뉴명",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "메뉴경로",
                    align: "center",
                    sortable: false,
                    value: ""
                },
                {
                    text: "순서",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "사용여부",
                    align: "center",
                    sortable: false,
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
                    text: "사용권한",
                    align: "center",
                    sortable: false,
                },
            ],
            returnMenuList: [],

        }),
        beforeMount() {
            store.commit('onProgress');
        },


        mounted() {
            this.readCallMenuList();
            //권한목록 값 주입
            this.getAuthCodeList();
            store.commit('offProgress');
        },

        methods: {
            //팝업창 제어
            openAlert(dialogInfo) {
                let alertDialogInfo = dialogInfo
                this.$store.dispatch("openAlertDialog", alertDialogInfo)
            },

            //검색 관련 변수
            async searchListCall() {
                // form.delete("menuName");
                // form.set("menuAddr", this.searchText);
                if (this.$refs.form.validate()) {
                    await this.readCallMenuList();
                }
            },
            getSearch() {
                //검색시엔 다시 1페이지로
                this.page = 1;
                if (this.searchText == "") {
                    this.readCallMenuList();
                } else {
                    this.searchListCall();

                    // alert(2);
                }
            },
            //상세보기 (수정)
            getMenuDetail(item) {
                this.Menu_Idx = item.menuIdx;
                // this.Menu_Yn = item.menuYn;
                this.Menu_Yn = item.menuYn;
                this.Menu_Name = item.menuName;
                this.Menu_Addr = item.menuAddr;
                this.Menu_Comp = item.menuComp;
                this.Menu_Order = item.menuOrder;
                this.Menu_Auth = item.menuAuth;
                this.Menu_Icon = item.menuIconStr;

                // console.log(this.Menu_Auth);
                // console.log(this.Menu_Yn);

                this.Menu_eDialog = true;
            },

            //상위 취소 시 닫기 함수
            MenuCancel() {
                this.initVariables();
                this.Menu_dialog = false;
                this.Menu_eDialog = false;
            },
            //저장 시 상위 등록,수정 로직 수행
            MenuSave() {
                let saveForm = new FormData();

                if (this.Menu_eDialog) {
                    //저장이후에 아래와 같이 처리를 해줘야한다.
                    saveForm.set("menuName", this.Menu_Name);
                    saveForm.set("menuAddr", this.Menu_Addr);
                    saveForm.set("menuComp", this.Menu_Comp);
                    saveForm.set("menuOrder", this.Menu_Order);
                    saveForm.set("menuAuth", this.Menu_Auth);
                    saveForm.set("menuYn", this.Menu_Yn);
                    saveForm.set("menuIdx", this.Menu_Idx);
                    saveForm.set("mType", 'U');
                    saveForm.set("menuIconStr", this.Menu_Icon);

                    this.saveMenu(saveForm);

                    if (this.Menu_eDialog) {
                        this.Menu_eDialog = false;
                    }
                    this.initVariables();

                } else {
                    //저장이후에 아래와 같이 처리를 해줘야한다.
                    saveForm.set("menuName", this.Menu_Name);
                    saveForm.set("menuAddr", this.Menu_Addr);
                    saveForm.set("menuComp", this.Menu_Comp);
                    saveForm.set("menuOrder", this.Menu_Order);
                    saveForm.set("menuAuth", this.Menu_Auth);
                    saveForm.set("menuYn", this.Menu_Yn);
                    saveForm.set("mType", 'I');
                    saveForm.set("menuIconStr", this.Menu_Icon);
                    

                    /*saveForm.forEach((value, key) => {
                      console.log(`${key} : ${value}`);
                    });*/
                    this.saveMenu(saveForm);

                    if (this.Menu_dialog) this.Menu_dialog = false;
                    this.initVariables();


                }
            },

            handlePage() {
                console.log(`현재 클릭한 페이지 : ${this.page}`);

                this.readCallMenuList();
            },

            async getAuthCodeList() {
                await this.$store
                    .dispatch("GETAUTHCODELIST", "")
                    .then((response) => {
                        console.log(response);
                        let authList = response.authList;
                        authList.forEach((value, key) => {
                            authList[key].detailId = Number(authList[key].detailId);
                        });
                        this.Menu_Auth_List = authList;
                        console.log(this.Menu_Auth_List);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            },

            initVariables() {
                this.Menu_Yn = "";
                this.Menu_Name = "";
                this.Menu_Addr = "";
                this.Menu_Comp = "";
                this.Menu_Order = "";
                this.Menu_Auth = "";
                this.Menu_Icon = "";
            },

            //호출 성공 시 불러온다
            async readCallMenuList() {
                form.delete("page");
                form.delete("size");
                form.delete("menuName");
                form.delete("menuAddr");

                form.set("page", this.page);
                form.set("size", this.itemsPerPage);

                if (this.Sel_Mn_Type.Srch_Type === 1) form.set("menuName", this.searchText);
                if (this.Sel_Mn_Type.Srch_Type === 2) form.set("menuAddr", this.searchText);

                await this.$store
                    .dispatch("MENUADDSTART", form)
                    .then((response) => {
                        this.returnMenuList = response.menuList.content;
                        this.loading = false;
                        this.page = response.CurrentPage;
                        this.pageCount = response.totalPages;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            async saveMenu(payload, type) {
                console.log(`MngMenu : ${type}`);

                await this.$store
                    .dispatch("SAVEMENUCODE", payload, type)
                    .then((response) => {
                        console.log(response);
                        if (response.res_code === '200') {
                            this.openAlert({
                                // timeout: 5000,
                                emoji: "✅",
                                title: "메뉴가 성공적으로 등록 되었습니다.",
                                //firstLineText: "",
                                secondLineText: "2WinChance",
                                // thirdLineText: "셋째줄",
                            });
                        } else {
                            this.openAlert({
                                // timeout: 5000,
                                emoji: "❌",
                                title: "요청에 실패하였습니다.",
                                //firstLineText: "",
                                secondLineText: "2WinChance",
                                // thirdLineText: "셋째줄",
                            });
                        }
                        // 저장 후에 리스트 다시 불러오기.
                        this.readCallMenuList();
                    })
                    .catch((error) => {
                        this.openAlert({
                            // timeout: 5000,
                            emoji: "❌",
                            title: "요청이 실패하였습니다.",
                            //firstLineText: "",
                            secondLineText: "2WinChance",
                            // thirdLineText: "셋째줄",
                        });
                        console.log(error);
                    });
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>