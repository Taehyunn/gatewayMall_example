<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>사용자 등록 화면입니다.</v-card-title>
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
                    :headers="RegHeaders"
                    :items="returnRegList"
                    :loading="loading"
                    loading-text="불러오는 중입니다."
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    disable-pagination
            >

                <template v-slot:item="{ item }">
                    <tr
                            @click="getMenuDetail(item)"
                    >
                        <td
                            style="text-align: center;color: cornflowerblue;cursor: pointer">{{ item.memberName }}
                        </td>
                        <td style="text-align: center">{{ item.memberId }}</td>

                        <td style="text-align: center">{{ item.memberEmail }}</td>
                        <td style="text-align: center">{{ item.authGrade  }}</td>
                        <td style="text-align: center">{{ item.lastLoginDt }}</td>
                        <td style="text-align: center">{{ item.lastLoginIp }}</td>
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

        <div class="text-right pt-2">
            <v-dialog v-model="dialog" width="750"  >
                <template v-slot:activator="{ on }">
                    <v-row class="d-flex justify-end mr-1 ">
                        <v-btn color="primary" dark class="text-right mr2" v-on="on" @click.prevent="initVariables">
                            사용자등록
                        </v-btn>
                    </v-row>
                </template>

                <!-- 등록 팝업-->
                <v-card style="overflow-x: hidden" >
                    <v-card-title class="text-h5 primary white--text">
                        사용자 등록 화면입니다.
                    </v-card-title>
                    <v-row class=" pt-5 pl-4 pr-4" width="700">
                        <v-text-field
                                label="이름"
                                v-model="reg_name"
                                :rules="[() => !!reg_name || '이름은 필수입니다.']"
                                required
                                class="pl-4 pr-4"

                        />
                        <v-text-field
                                label="ID"
                                v-model="reg_id"
                                :rules="[() => !!reg_id || 'ID는 필수입니다.']"
                                required
                                class="pr-4"

                        />
                    </v-row  >
                    <v-row class=" pl-4 pr-4" width="650">
                        <v-text-field
                                label="비밀번호"
                                v-model="reg_pwd"
                                :rules="[() => !!reg_pwd || '비밀번호는 필수입니다.']"
                                required
                                class="pl-4 pr-4"

                        />
                        <v-text-field
                                label="이메일"
                                v-model="reg_email"
                                :rules="[v => !!v || 'E-mail을 입력해 주세요.',
                                v => /.+@.+/.test(v) || '이메일 형식이 맞지 않습니다.' ]"
                                required
                                class=" pr-4"

                        />
                    </v-row>
                    <v-row class=" pl-4 pr-4"  width="650" >
                        <v-select
                                v-model="reg_auth"
                                label="사용 권한"
                                required
                                class="pl-4 pr-4"

                                :items="reg_auth_List"
                                item-text="detailNm"
                                item-value="detailId"

                        >
                        </v-select>
                    </v-row>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="fn_Cancel"> 취소</v-btn>

                        <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!--  수정 및 상세 화면 팝업  -->
            <v-dialog v-model="eDialog" width="800">
                <v-card style="overflow-x: hidden">
                    <v-card-title class="text-h5 primary white--text">
                        사용자 수정 화면입니다.
                    </v-card-title>
                    <v-row class=" pt-5 pl-4 pr-4" width="700">
                        <v-text-field
                                label="이름"
                                v-model="reg_name"
                                :rules="[() => !!reg_name || '이름은 필수입니다.']"
                                required
                                class="pl-4 pr-4"
                        />
                        <v-text-field
                                label="ID"
                                v-model="reg_id"
                                :rules="[() => !!reg_id || 'ID는 필수입니다.']"
                                required
                                class="pl-4 pr-4"
                        />
                    </v-row>
                    <v-row class="  pl-4 pr-4" width="700">
<!--                        <v-text-field-->
<!--                                label="비밀번호"-->
<!--                                v-model="reg_pwd"-->
<!--                                :rules="[() => !!reg_pwd || '비밀번호는 필수입니다.']"-->
<!--                                required-->
<!--                                class="pl-4 pr-4"-->
<!--                        />-->
                        <v-text-field
                                label="이메일"
                                v-model="reg_email"
                                :rules="[v => !!v || 'E-mail을 입력해 주세요.',
                                v => /.+@.+/.test(v) || '이메일 형식이 맞지 않습니다.' ]"
                                required
                                class="pl-4 pr-4"

                        />
                    </v-row>
                    <v-row class="  pl-4 pr-4" width="700">
                        <v-select
                                v-model="reg_auth"
                                label="사용 권한"
                                required
                                class="pl-4 pr-4"
                                style="width: 200px"
                                :items="reg_auth_List"
                                item-text="detailNm"
                                item-value="detailId"
                        >
                        </v-select>
                        <v-select
                                v-model="reg_Yn"
                                label="사용유무"
                                required
                                class="pl-4 pr-4"
                                style="width: 200px"
                                :items="Reg_Use_Yn"
                                item-text="name"
                                item-value="value"
                        >
                        </v-select>
                    </v-row>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="fn_Cancel"> 취소</v-btn>

                        <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>


    </v-container>
</template>

<script>
    let form = new FormData();
    import store from "@/store/index.js";

    export default {

        name: 'AddRegister',
        data: () => ({
            //검색어 변수
            searchText: '',
            //API요청 성공 다이얼로그 제어
            //메뉴 데이터 위한 변수
            dialog: false,
            eDialog: false,
            reg_Yn : "",
            reg_name : "",
            reg_id : "",
            reg_pwd : "",
            reg_email : "",
            reg_auth : "",
            //권한목록 셀렉트 박스
            reg_auth_List: [],
            //사용유무 셀렉트 박스
            Reg_Use_Yn: [
                {name: '사용', value: 'Y'},
                {name: '미사용', value: 'N'}
            ],

            //상위 페이지 및 카운트 변수 선언
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            loading: true,
            //검색용 셀렉트 박스
            Sel_Mn_Type: {Srch_Type: 1, Srch_Name: "이름"},
            SrchMenuItem: [
                {
                    Srch_Type: 1,
                    Srch_Name: "이름",
                },
                {
                    Srch_Type: 2,
                    Srch_Name: "ID",
                },
            ],
            //메뉴 테이블 헤더목록
            RegHeaders: [
                // { text: "순번", align: "center", value: "" },
                {
                    text: "이름",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "ID",
                    align: "center",
                    sortable: false,
                    value: ""
                },

                {
                    text: "E-Mail",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "권한",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "마지막 접속일자",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "접속IP",
                    align: "center",
                    sortable: false,
                }, {
                    text: "사용유무",
                    align: "center",
                    sortable: false,
                },
            ],
            returnRegList: [],

        }),
        beforeMount() {
            store.commit('onProgress');
        },

        mounted() {
            this.readCallRegList();
            //권한목록 값 주입
            this.getAuthCodeList();
            store.commit('offProgress');

        },

        methods: {
            getMenuDetail(item) {
                this.reg_Yn = item.useYn;
                this.reg_name = item.memberName;
                this.reg_id = item.memberId;
                this.reg_pwd = item.memberPwd;
                this.reg_email = item.memberEmail;
                this.reg_auth = item.authGrade;
                this.reg_Yn = item.useYn;
                //권한목록 셀렉트 박스
                // this.reg_auth_List= [];
                // console.log(this.reg_Yn);

                this.eDialog = true;
            },
            //팝업창 제어
            openAlert(dialogInfo) {
                let alertDialogInfo = dialogInfo
                this.$store.dispatch("openAlertDialog", alertDialogInfo)
            },

            //검색 관련 변수
            async searchListCall() {
                form.delete("memberName");
                form.set("memberName", this.searchText);
                if (this.$refs.form.validate()) {
                    await this.readCallRegList();
                }
            },
            getSearch() {
                //검색시엔 다시 1페이지로
                this.page = 1;
                if (this.searchText == "") {
                    this.readCallRegList();
                } else {
                    this.searchListCall();

                    // alert(2);
                }
            },

            fn_Cancel() {
                this.initVariables();
                this.dialog = false;
                this.eDialog = false;
            },
            //저장 시 상위 등록,수정 로직 수행
            fn_Save() {


                if (this.eDialog) {
                    if(confirm("정말로 수정하시겠습니까?")) {
                        form.delete("memberName");
                        form.delete("memberId");
                        form.delete("memberPwd");
                        form.delete("memberEmail");
                        form.delete("authGrade");
                        form.delete("useYn");
                        //저장이후에 아래와 같이 처리를 해줘야한다.
                        form.set("memberName", this.reg_name);
                        form.set("memberId", this.reg_id);
                        form.set("memberPwd", this.reg_pwd);
                        form.set("memberEmail", this.reg_email);
                        form.set("authGrade", this.reg_auth);
                        form.set("useYn", this.reg_Yn);


                        // this.saveMenu(saveForm);
                        this.$store
                            .dispatch("UPDATEADMINMEMBER", form)
                            .then((response) => {
                                // console.log(response);
                                if (response.res_code === '200') {
                                    this.openAlert({
                                        // timeout: 5000,
                                        emoji: "✅",
                                        title: "사용자가 성공적으로 수정 되었습니다.",
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
                                this.readCallRegList();
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

                        if (this.eDialog) {
                            this.eDialog = false;
                        }
                        this.initVariables();
                    }


                } else {
                    //저장이후에 아래와 같이 처리를 해줘야한다.
                    form.delete("memberName");
                    form.delete("memberId");
                    form.delete("memberPwd");
                    form.delete("memberEmail");
                    form.delete("authGrade");
                    form.set("memberName", this.reg_name);
                    form.set("memberId", this.reg_id);
                    form.set("memberPwd", this.reg_pwd);
                    form.set("memberEmail", this.reg_email);
                    form.set("authGrade", this.reg_auth);
                    // saveForm.set("useYn", this.reg_Yn);


                     this.$store
                        .dispatch("ADDREGLSIT", form)
                        .then((response) => {
                            // console.log(response);
                            if (response.res_code === '200') {
                                this.openAlert({
                                    // timeout: 5000,
                                    emoji: "✅",
                                    title: "사용자가 성공적으로 등록 되었습니다.",
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
                            this.readCallRegList();
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
                    if (this.dialog) this.dialog = false;
                    this.initVariables();


                }
            },


            handlePage() {
                console.log(`현재 클릭한 페이지 : ${this.page}`);

                this.readCallRegList();
            },

            async getAuthCodeList() {
                await this.$store
                    .dispatch("GETAUTHCODELIST", "")
                    .then((response) => {
                        // console.log(response);
                        let authList = response.authList;
                        authList.forEach((value, key) => {
                            authList[key].detailId = Number(authList[key].detailId);
                        });
                        this.reg_auth_List = authList;
                        // console.log(this.reg_auth_List);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            },

            initVariables() {
                this.reg_Yn = "";
                this.reg_name = "";
                this.reg_id = "";
                this.reg_pwd = "";
                this.reg_email = "";
                this.reg_auth = "";
            },

            //호출 성공 시 불러온다
            async readCallRegList() {
                form.delete("page");
                form.delete("size");
                form.delete("memberName");
                form.delete("memberId");
                form.delete("authGrade");

                form.set("page", this.page);
                form.set("size", this.itemsPerPage);

                if (this.Sel_Mn_Type.Srch_Type === 1) form.set("memberName", this.searchText);
                if (this.Sel_Mn_Type.Srch_Type === 2) form.set("memberId", this.searchText);

                // console.log(form.get("memberName"));

                await this.$store
                    .dispatch("FETCHREGLIST", form)
                    .then((response) => {
                        // console.log(response);
                        this.returnRegList = response.adminMembers.content
                        this.loading = false;
                        this.pageCount = response.adminMembers.totalPages;

                        //todo:리스트 권한 한글로 표현
                        // this.returnRegList.forEach(el => {
                        //     if(el.authGrade == 100) {
                        //         el.authGrade = {
                        //             name:"일반관리자",
                        //             authValue:100
                        //         }
                        //     }
                        //     else if(el.authGrade == 1000) {
                        //         el.authGrade = {
                        //             name:"시스템관리자",
                        //             authValue:1000
                        //         }
                        //     }
                        //     else if(el.authGrade == 50) {
                        //         el.authGrade = {
                        //             name:"테스트용",
                        //             authValue:50
                        //         }
                        //     }
                        // })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },


        },
    };
</script>

<style lang="scss" scoped>

</style>