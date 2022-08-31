<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title>웹 회원 메뉴입니다.</v-card-title>
    </v-card>
    <v-form ref="form">
      <v-card class="mb-6">
        <v-row class="pl-2 pr-4">
          <v-col>
            <v-select

                item-text="sr_Name"
                item-value="sr_Id"
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
                v-model="searchText"
                prepend-inner-icon="mdi-magnify"
                label="검색"
                @keyup.enter="fn_getSearch"

            ></v-text-field>
          </v-col>

          <v-col class="pt-6">
            <v-btn
                block color="primary"
                @click.prevent="fn_getSearch">검색
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>

    <template>
      <v-col class="pt-6">
        <v-btn
            color="primary "
            dark
            class="text-Center ml-3"
            @click.prevent="ItemRegFn"
        >
          웹 회원 등록
        </v-btn>
      </v-col>
    </template>
    <v-dialog v-model="dialog" width="800" @click:outside="fn_Cancel()">
      <v-card style="overflow-x: hidden">
        <v-card-title
            class="text-h5 primary white--text">
          Member 등록
        </v-card-title>

        <v-row class="pl-4 pr-4" width="700">
          <v-text-field
              v-model="memberInfo.memberId"
              label="member Id"
              hide-details="auto"
              class="pt-5 pl-4 pr-4"
          >
          </v-text-field>
        </v-row>

        <v-row class="pl-4 pr-4" width="700">
          <v-text-field
              v-model="memberInfo.memberNm"
              label="member Name"
              hide-details="auto"
              class="pt-5 pl-4 pr-4"
          >
          </v-text-field>

          <v-text-field
              v-model="memberInfo.memberPwd"
              label="member Password"
              hide-details="auto"
              class="pt-5 pr-4"
          >
          </v-text-field>
        </v-row>

        <v-row class="pl-4 pr-4" width="700">
          <v-text-field
              v-model="memberInfo.memberEmail"
              label="member Email"
              hide-details="auto"
              class="pt-5 pl-4 pr-4"
          >
          </v-text-field>
        </v-row>

        <v-card-actions class="pt-10 pl-8 pr-8">
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="fn_Cancel">취소</v-btn>
          <v-btn color="primary" dark @click="fn_memberSave"> 확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--DataTable-->
    <v-card>
      <v-data-table :headers="memberHeaders"
                    :items="returnAllMemberList"
                    hide-default-footer
                    class="transparent elevation-0 my-4"
                    disable-pagination
                    disable-sort
                    :items-per-page="itemsPerPage"
      >
        <!--                 <template #item="props">-->
        <!--                  <tr>-->
        <!--                    <td v-for="(c,ci) in getRows(props.item)" :key="ci">-->
        <!--                      {{ c }}-->
        <!--                    </td>-->
        <!--                  </tr>-->
        <!--                </template> -->
        <template v-slot:item="{ item }">
          <tr @click="fn_giveGold(item)">
            <td class="tb-border-style text-center">{{ item.memberIdx }}</td>
            <td class="tb-border-style text-center">{{ item.signinType }}</td>
            <td class="tb-border-style text-center">{{ item.memberId }}</td>
            <td class="tb-border-style text-center">{{ item.memberName }}</td>
            <td class="tb-border-style text-center">{{ item.goldBalance }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <div class="text-center mb-6">
      <v-pagination
          v-model="page"
          :length="pageCount"
          @input="handlePage"
      ></v-pagination>
    </div>
    <!--        <template >-->
    <!--            <v-row class="d-flex justify-end mr-3 pt-3 mb-6">-->
    <!--                <v-btn-->
    <!--                        color="primary"-->
    <!--                        dark-->
    <!--                        class="text-right mr2"-->

    <!--                >-->
    <!--                    Member팝업창-->
    <!--                </v-btn>-->
    <!--            </v-row>-->
    <!--        </template>-->
    <!--DataTable-->

<!--    사용자 상세정보-->
    <v-dialog v-model="eDialog" width="600" class="mb-6" @click:outside="fn_Cancel()">
      <v-card style="overflow-x : hidden" >
        <v-card-title class="text-h5 primary white--text">
          골드지급
        </v-card-title>
        <v-row class=" pt-5 pl-8 pr-8" width="700">
          <v-text-field
              v-model="setGold"
              label="골드지급"
              hide-details="auto"
              class="pl-4 pr-4"
          ></v-text-field>
        </v-row>

        <v-card-actions class="pt-10 pl-8 pr-8">
          <v-spacer></v-spacer>
          <v-btn color="primary"
                 dark
                 @click="fn_Cancel"> 취소</v-btn>

          <v-btn color="primary"
                 dark
                 @click="fn_Save(setGold)"
          > 확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

</template>

<script>
import store from "@/store/index.js";
import axios from "@/plugins/axios";
// import ticket from "@/store/module/ticket";

let form = new FormData();
export default {
  name: 'MemberView',

  data: () => ({
    memberInfo: {},
    setGold: '',
    memberIdx: '',
    mId: '',
    mLevel: '',
    searchText: '',
    page: 1,
    pageCount: 0,
    cash_dialog: false,
    balance_dialog: false,
    bp_dialog: false,
    loginCnt_dialog: false,
    NormalChecked: true,
    BlockChecked: false,
    eDialog: false,
    dialog: false,
    memberHeaders: [
      {
        text: "IDX",
        align: "center",
        sortable: false,
        value: ""
      },
      {
        text: "Type",
        align: "center",
        sortable: false,
        value: ""
      },
      {
        text: "ID",
        align: "center",
        sortable: false,
        value: ""
      },
      {
        text: "Name",
        align: "center",
        sortable: false,
        value: ""
      }, {
        text: "Gold",
        align: "center",
        sortable: false,
        value: ""
      },
    ],
    searchType: {sr_Id: 1, sr_Name: "ID"},
    selectSearchItems: [
      {
        sr_Id: 1, sr_Name: "ID",

      },
      {
        sr_Id: 2, sr_Name: "Name",
      },
      {
        sr_Id: 3, sr_Name: "IDX"
      },

    ],

    returnAllMemberList: [],
    itemsPerPage: 10,
    m_Idx: '',
    m_Id: '',
  }),

  beforeMount() {
    store.commit('onProgress');
  },


  mounted() {

    this.getMemberList();
    store.commit('offProgress');
  },
  computed: {

  },

  methods: {
    ItemRegFn() {
      this.dialog = true;
    },
    fn_giveGold(item){
      // console.log(item);
      this.setGold = item.setGold;
      this.memberIdx = item.memberIdx;
      this.eDialog = true;
    },
    async searchListCall() {

      if (this.$refs.form.validate()) {
        await this.getMemberList();
      }
    },
    fn_getSearch() {
      this.balance_dialog = false;
      this.bp_dialog = false;
      this.loginCnt_dialog = false;
      //검색시엔 다시 1페이지로
      this.page = 1;
      if (this.searchText == "") {
        this.getMemberList();
      } else {
        this.searchListCall();

        // alert(2);
      }
    },
    handlePage() {
      this.getMemberList();
      // this.cash_dialog = false;
      this.balance_dialog = false;
      this.bp_dialog = false;
      this.loginCnt_dialog = false;
    },
    async getMemberList() {
      // console.log(memberName);

      form.delete("searchUserStatus");
      form.delete("mId");
      form.delete("mName");
      form.delete("mIdx");
      form.delete("page");
      form.delete("size");

      form.set("page", this.page);
      form.set("size", this.itemsPerPage);

      if (this.searchType.sr_Id === 1) form.set("mId", this.searchText);
      if (this.searchType.sr_Id === 2) form.set("mName", this.searchText);
      if (this.searchType.sr_Id === 3) form.set("mIdx", this.searchText);


      // if(this.searchType.sr_Id === 1) form.set()

      await this.$store
          .dispatch("GETALLMEMBERLIST", form)
          .then((response) => {
            console.log(response);

            this.returnAllMemberList = response.memberList.content;
            // console.log(response.memberList.content)

            this.pageCount = response.memberList.totalPages;

          })
          .catch((error) => {
            console.log(error);
          });


    },
    fn_Cancel() {
      if(this.dialog){
        this.dialog = false;
        this.memberInfo = {};
      } else {
        this.setGold = '';
        this.eDialog = false;
      }
    },
    fn_memberSave(){
      // console.log(this.memberInfo.memberAuth);
      let formData = new FormData();

      //등록할 멤버 정보
      formData.append("memberId", this.memberInfo.memberId);
      formData.append("memberName", this.memberInfo.memberNm);
      formData.append("memberEmail", this.memberInfo.memberEmail);
      formData.append("memberPwd", this.memberInfo.memberPwd);
      formData.append("signInType", "SITE");
      formData.append("authGrade", "10");



      axios.post('/api/v1/ISET_RegistMember', formData)
          .then((res) => {
            console.log(res);

            if (res.status === 200) {
              this.$store.dispatch('openAlertDialog',{
                // timeout: 5000,
                emoji: "✅",
                title: "성공적으로 등록 되었습니다.",
                //firstLineText: "",
                secondLineText: "2WinChance",
                // thirdLineText: "셋째줄",
              });
            } else {
              this.$store.dispatch('openAlertDialog',{
                // timeout: 5000,
                emoji: "❌",
                title: "요청에 실패하였습니다.",
                //firstLineText: "",
                secondLineText: "2WinChance",
                // thirdLineText: "셋째줄",
              });
            }

            //폼 데이터 비워주기.
            formData.forEach(value => {
              console.log(value);
              // formData.delete(value.name);
            });

            //검색 파라미터
            formData.append("page", this.page);
            formData.append("size", this.itemsPerPage);

            if (this.searchType.sr_Id === 1) formData.append("mId", this.searchText);
            if (this.searchType.sr_Id === 2) formData.append("mName", this.searchText);
            if (this.searchType.sr_Id === 3) formData.append("mIdx", this.searchText);

            //회원 등록 후 갱신
            this.getMemberList();
          })
          .catch((err) => {
            console.error(err);
          });

      this.memberInfo = {};
      this.dialog = false;

    },
    fn_Save(setGold) {
      form.delete("setGold");
      form.delete("memberIdx");
      form.set("setGold", setGold);
      form.set("memberIdx", this.memberIdx);

      this.$store.dispatch("GETGOLDTOMEMBER", form)
          .then(() => {
            this.getMemberList();

          })
          .catch((error) => {
            console.log(error);
          });
      this.setGold = '';
      this.eDialog = false;
    }

    // getRows(rows) {
    //   const result = {};
    //   _.forEach(rows, (i, key) => {
    //     if (i.children) {
    //       _.forEach(i.children, (i1, key1) => {
    //         result["c" + key1] = i1;
    //       });
    //     } else result[key] = i;
    //   });
    //   return result;
    // }


  },
};
</script>

<style lang="scss" scoped>
.tb-border-style {
  border-right: thin solid rgba(0, 0, 0, 0.12);

}

.tb-border-tdSet > td {
  border-right: thin solid rgba(0, 0, 0, 0.12);

}
</style>