<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title>공통 코드 중분류 등록 화면 입니다.</v-card-title>
    </v-card>
    <v-card class="mb-6">
      <v-row class="pl-4 pr-4">
        <v-col md="3">
          <v-select
                  ref="selectCommune"
              item-text="cmmncdNm"
              item-value="cmmncdId"
              label="선택"
              :items="CommonIdItem"
              required
              v-model="Cm_select"
              return-object
              style="width: 200px"
              class="pl-3"
              v-on:change="changeRoute()"
          ></v-select>
        </v-col>
      </v-row>
    </v-card>

    <!--하위 데이터 테이블 시작-->
    <v-card >

      <v-dialog v-model="Cm_lowdialog" width="450" @click:outside="detailrowCancel()">
        <v-card style="overflow-x:hidden">
          <v-card-title class="text-h5 primary white--text">
            중분류 코드 등록 화면입니다.
          </v-card-title>

          <v-text-field
              label="대분류코드"
              v-model="low_UpCode"
              readonly
              required
              hide-details="auto"
              class="pt-5 pl-4 pr-4"
          />
          <v-text-field
              label="코드명"
              v-model="low_CommonName"
              required
              hide-details="auto"
              class="pt-5 pl-4 pr-4"
          />
          <v-text-field
              label="비고"
              v-model="low_CommonRemark"
              required
              hide-details="auto"
              class="pt-5 pl-4 pr-4"
          />
          <v-select
              item-text="Cm_Name"
              item-value="Cm_Id"
              label="사용유무"
              :items="useYNItem"
              required
              hide-details="auto"
              v-model="useYNSelectItem"
              return-object

              class="pt-5 pl-4 pr-4 mb-2"
          ></v-select>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="detailrowCancel"> 취소</v-btn>
            <v-btn color="primary" dark @click="detailrowSave"> 확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-card>
    <v-card>
      <v-card-title>
        <v-row justify="end" class="pr-4 pt-2 mb-1">
          <v-btn  color="primary" @click="fn_ExcelDownload">
            <v-icon>mdi-download-circle-outline</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-data-table
              dense
              :headers="lowheaders"
              :items="returnUpCommonList"
              :items-per-page="itemsPerPage"
              :page="page1"
              hide-default-footer
              disable-pagination

      >
        <template v-slot:item="{ item }">
          <tr @click="detailrowClick(item)">
            <td style="text-align: center">{{ item.cmmncdIdList.cmmncdId }}</td>
            <td style="text-align: center">{{ item.detailId }}</td>
            <td style="text-align: center">{{ item.detailNm }}</td>
            <td style="text-align: center">{{ item.regId }}</td>
            <td style="text-align: center">{{ item.regDt }}</td>
            <td style="text-align: center">{{ item.useYn }}</td>
          </tr>
        </template>
      </v-data-table>

    </v-card>

    <div class="text-center pt-2">
      <v-pagination
              v-model="page1"
              :length="pageCount1"
              @input="handlePage1"
      ></v-pagination>
    </div>
    <template>
      <v-row class="d-flex justify-end mr-1 pt-3 ">
        <v-btn
                color="primary"
                dark
                class="text-right mr2"
                @click="low_addStart"
        >
          등록
        </v-btn>
      </v-row>
    </template>
    <!-- 하위 데이터 테이블 끝 -->
    <!-- 로우클릭 팝업 -->
    <v-dialog v-model="Cm_lowEdialog" width="800" @click:outside="detailrowCancel()">
      <v-card style="overflow-x:hidden">
        <v-card-title class="text-h5 primary white--text">
          중분류 코드 수정 화면입니다.
        </v-card-title>

        <v-text-field
            label="대분류코드"
            v-model="codeDetaileditedItem.codeId"
            readonly
            required
            class="pt-5 pl-4 pr-4"
        />
        <v-text-field
            label="코드ID"
            readonly
            v-model="codeDetaileditedItem.codeDetailId"
            required
            class="pl-4 pr-4"
        />
        <v-text-field
            label="코드명"
            v-model="codeDetaileditedItem.codeDetailNm"
            required
            class="pl-4 pr-4"
        />
        <v-text-field
            label="비고"
            v-model="codeDetaileditedItem.codeDetailNote"
            required
            class="pl-4 pr-4"
        />
        <v-row  class=" pt-5 pl-4 pr-4" width="700">
        <v-text-field
            label="정렬순서"
            v-model="codeDetaileditedItem.codeDetailOrder"
            required
            class="pl-4 pr-4"
            style="width: 200px"
        />
        <v-select
            item-text="Cm_Name"
            item-value="Cm_Id"
            label="사용유무"
            :items="useYNItem"
            required
            v-model="Cm_select1"
            return-object

            class="pr-4"
        ></v-select>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="detailrowCancel"> 취소</v-btn>
          <v-btn color="primary" dark @click="detailrowUpdate"> 확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <input type="hidden" name="returnUpCommonListCnt" :value="returnUpCommonListCnt"/>


  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import fn_commonService from "@/common/common_fn_service"
import store from "@/store/index.js";
let form = new FormData();
export default {
  name: "CommonCodeDetail",

  data: () => ({
    selectCommune:false,
    //하위 등록 팝업
    Cm_lowdialog: false,
    Cm_lowEdialog: false,
    page1: 0,
    pageCount1: 0,
    //하위 리스트 등록 시 사용 변수
    low_UpCode: "",
    low_CommonId: "",
    low_CommonName: "",
    low_CommonRemark: "",
    low_CommonSequence: "",
    low_CommonUseStatus: "",
    //하위 리스트 등록 시 사용 변수
    codeDetaileditedItem: {
      codeId: "",
      codeDetailId: "",
      codeDetailNm: "",
      codeDetailNote: "",
      codeDetailOrder: "",
      codeDetailUse: "",
    },
    codeDetaildefailtItem: {
    codeId: "",
    codeDetailId: "",
    codeDetailNm: "",
    codeDetailNote: "",
    codeDetailOrder: "",
    codeDetailUse: "",
    },
    //하위 리스트 수정 시 사용 변수
    low_editedItem: {
      low_UpCode: "",
      low_CommonId: "",
      low_CommonName: "",
      low_CommonRemark: "",
      low_CommonSequence: "",
      low_CommonUseStatus: "",
    },
    low_defaultItem: {
      CommonId: "",
      CommonName: "",
      boardRegister: "",
      CommonRemark: "",
      CommonSequence: "",
      CommonUseStatus: "",
    },
    //상위 페이지 및 카운트
    page: 0,
    pageCount: 0,
    itemsPerPage: 10,
    //상위 코드등록 시 팝업
    Cm_dialog: false,
    //상위 리스트 수정 시 팝업
    Cm_eDialog: false,
    //상위 리스트 등록 시 사용 변수

    cmmncdId: "",
    cmmncdNm: "",
    CommonRemark: "",
    CommonSequence: "",
    CommonUseStatus: "",
    //상위 리스트 수정 시 사용 변수
    Cm_editedItem: {
      CommonId: "",
      CommonName: "",
      boardRegister: "",
      CommonRemark: "",
      CommonSequence: "",
      CommonUseStatus: "",
    },
    Cm_defaultItem: {
      CommonId: "",
      CommonName: "",
      boardRegister: "",
      CommonRemark: "",
      CommonSequence: "",
      CommonUseStatus: "",
    },
    Cm_select: [],
    CommonIdItem: [],
    useYNItem: [
      {Cm_Id: "Y", Cm_Name: "Y",},
      {Cm_Id: "N", Cm_Name: "N",},
    ],
    useYNSelectItem: "",
    Cm_select1: "",
    lowheaders: [
      // {text: "순번", align: "center", value: ""},
      {text: "상위코드", align: "center", value: ""},
      {
        text: "코드ID",
        align: "center",
        sortable: false,
        value: "",
      },
      {
        text: "코드명",
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
        text: "사용여부",
        align: "center",
        sortable: false,
      },

    ],
    returnUpCommonList: [],
    returnselectboxList: [],
    returnUpCommonListCnt:0,
    returnCommonListTotal:"",
  }),
  beforeMount() {
    store.commit('onProgress');
  },

  mounted() {
    // this.readCallCommonList();
    this.changeSelectId();
    store.commit('offProgress');
  },

  // created() {
  //   this.readCallCommonList();
  //   this.loginId = this.$store.getters.currentCheckUser;
  // },

  computed: {
    ...mapGetters(["getCodeDetailTotalPage", "getCodeDetailTotalItems", "getCodeDetailTotalPage"]),
  },

  methods: {


    //팝업창 제어
    openAlert(dialogInfo) {
      let alertDialogInfo = dialogInfo;
      this.$store.dispatch("openAlertDialog", alertDialogInfo);
    },

    fn_ExcelDownload(){
      // alert(this.returnUpCommonListCnt);
      form.delete("page");
      form.delete("size");
      form.delete("cmmncdId");
      form.set("page", this.page1);
      form.set("size", this.returnUpCommonListCnt);
      form.set("cmmncdId", this.Cm_select.cmmncdId);
      this.$store.dispatch("GETCODEIDLIST", form).then((response) => {
        // console.log("3");
        // this.returnUpCommonList = response.list.content;
        this.returnCommonListTotal = response.list.content;
        fn_commonService.makeExcelFile5( this.returnCommonListTotal);
        console.log(response);
        this.page1 = response.CurrentPage;
        this.pageCount1 = response.totalPages;
        this.returnUpCommonListCnt = response.totalItems;

      })


    },
    //저장 시 상위 등록,수정 로직 수행
    // CommonSave() {
    //   if (this.Cm_lowEdialog) {
    //     //저장이후에 아래와 같이 처리를 해줘야한다.
    //     this.Cm_editedItem = this.Cm_defaultItem;
    //
    //     if (this.Cm_lowEdialog) {
    //       this.Cm_lowEdialog = false;
    //     }
    //     this.readCallCommonList();
    //
    //   } else {
    //     this.readCallCommonList();
    //     if (this.Cm_dialog) this.Cm_dialog = false;
    //     this.CommonId = "";
    //     this.CommonName = "";
    //     this.CommonRemark = "";
    //     this.CommonSequence = "";
    //     this.CommonUseStatus = "";
    //   }
    // },
    //하위 목록 등록
    low_addStart() {
      if (this.Cm_select == "") {
        this.Cm_lowdialog = false;
        alert("먼저 대분류 코드를 선택해주세요");
        //selectBox 포커스 부분
        this.$nextTick(() => {
          this.$refs.selectCommune.focus();
        })
      } else {
        this.low_UpCode = this.Cm_select.cmmncdId;
        this.useYNSelectItem = "";
        this.low_CommonName = "";
        this.low_CommonRemark = "";
        this.low_CommonSequence = "";
        this.low_CommonUseStatus = "";
        this.Cm_lowdialog = true;
      }
    },
    //하위 리스트 페이지 이동
    handlePage1() {
      this.changeRoute();
    },
    //호출 성공 시 불러온다
    async readCallCommonList() {
      form.delete("page");
      form.delete("size");
      form.set("page", this.page1);
      form.set("size", this.itemsPerPage);
      await this.$store.dispatch("GETCODEDETAILLIST", form).then((response) => {
        console.log(response);
        this.returnUpCommonList = response.detailList.content;

        this.page1 = response.CurrentPage;
        this.pageCount1 = response.totalPages;
        console.log(this.returnUpCommonList);
      })
          .catch((error) => {
            console.log(error);
          });
    },
    //selectbox 목록
    changeSelectId() {
      this.$store.dispatch("GETCODEID", form).then((response) => {
        console.log(response);
        this.CommonIdItem = response.list;
        // console.log(this.CommonIdItem);
      })
    },
    //selectbox 선택
    changeRoute() {
      // alert("1");
      form.delete("page");
      form.delete("size");
      form.delete("cmmncdId");
      form.set("page", this.page1);
      form.set("size", this.itemsPerPage);
      form.set("cmmncdId", this.Cm_select.cmmncdId);
      // alert("2");
      // console.info(form.get("cmmncdId"));
      this.$store.dispatch("GETCODEIDLIST", form).then((response) => {
        // console.log("3");
        this.returnUpCommonList = response.list.content;
        console.log(response);
        this.page1 = response.CurrentPage;
        this.pageCount1 = response.totalPages;
        this.returnUpCommonListCnt = response.totalItems;

        console.log("returnUpCommonListCnt : " + this.returnUpCommonListCnt);
        // console.log(this.cmmncdNm);
        // console.log('id : '+this.Cm_select.cmmncdId);
      })
    },
    //row 선택
    detailrowClick(item) {
      this.codeDetaileditedItem.codeId = item.cmmncdIdList.cmmncdId;
      this.codeDetaileditedItem.codeDetailId = item.detailId;
      this.codeDetaileditedItem.codeDetailNm = item.detailNm;
      this.codeDetaileditedItem.codeDetailNote = item.note;
      this.codeDetaileditedItem.codeDetailOrder = item.sortOrder;
      this.codeDetaileditedItem.codeDetailUse = item.useYn;
      this.Cm_select1 = item.useYn;
      this.Cm_lowEdialog = true;
      console.log(item);
    },
    detailrowCancel() {
      if (this.Cm_lowdialog) {
        this.useYNSelectItem = "";
        this.low_CommonName = "";
        this.low_CommonRemark = "";
        this.low_CommonSequence = "";
        this.low_CommonUseStatus = "";
        this.Cm_lowdialog = false;
      } else {
        this.codeDetaileditedItem.codeId = "";
        this.codeDetaileditedItem.codeDetailId = "";
        this.codeDetaileditedItem.codeDetailNm = "";
        this.codeDetaileditedItem.codeDetailNote = "";
        this.codeDetaileditedItem.codeDetailOrder = "";
        this.Cm_select1 = "";
        this.Cm_lowEdialog = false;
      }
    },
    detailrowSave() {
      form.delete("cmmncdId");
      form.delete("detailNm");
      form.delete("note");
      form.delete("useyn");
      form.set("cmmncdId", this.low_UpCode);
      form.set("detailNm", this.low_CommonName);
      form.set("note", this.low_CommonRemark);
      form.set("useyn", this.useYNSelectItem);

      if(confirm('정말로 저장하시겠습니까?')) {
        this.$store.dispatch("ISETCODEDETAIL", form).then((response) => {
          this.Cm_lowdialog = false;
          if (response.res_code === "200") {
            this.openAlert({
              // timeout: 5000,
              emoji: "✅",
              title: "중분류코드가 성공적으로 등록 되었습니다.",
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
          this.useYNSelectItem = this.useYNItem
          this.changeRoute();
        })
      }
    },
    detailrowUpdate() {
      form.delete("cmmncdId");
      form.delete("detailnm");
      form.delete("note");
      form.delete("useyn");
      form.delete("sortOrder");
      form.delete("detailid");
      form.set("cmmncdId", this.codeDetaileditedItem.codeId);
      form.set("detailnm", this.codeDetaileditedItem.codeDetailNm);
      form.set("note", this.codeDetaileditedItem.codeDetailNote);
      form.set("useyn", this.codeDetaileditedItem.codeDetailUse);
      form.set("sortOrder", this.codeDetaileditedItem.codeDetailOrder);
      form.set("detailid", this.codeDetaileditedItem.codeDetailId);


      if(confirm('정말로 수정하시겠습니까?')) {
        this.$store.dispatch("USETCODEDETAIL", form).then((response) => {

          // console.log(this.Cm_select1.Cm_Id);
          if (response.res_code === "200") {
            this.openAlert({
              // timeout: 5000,
              emoji: "✅",
              title: "중분류코드가 성공적으로 수정 되었습니다.",
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
          if(this.Cm_lowEdialog ){
              this.Cm_lowEdialog = false;
          }
          this.Cm_select1 = this.useYNItem
          this.changeRoute();
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
