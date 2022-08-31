<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title>공지사항 게시판입니다. </v-card-title>
      <v-card-subtitle> </v-card-subtitle>
    </v-card>

    <v-card height="270px" class="mb-6">
      <v-form ref="form" lazy-validation>
        <v-row class="pl-4 pt-4 pr-4">
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="s_date"
              :nudge-right="40"
              :value="s_date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="s_date"
                  label="검색범위시작일자"
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
                <v-btn color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn color="primary" @click="$refs.menu.save(s_date)"
                >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="e_date"
              :nudge-right="40"
              :value="e_date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="e_date"
                  label="검색범위종료일자"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                      v-model="e_date"
                      no-title scrollable
                      :max="new Date().toISOString().substr(0, 10)"
              >
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn color="primary" @click="$refs.menu1.save(e_date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-card-title>
          <v-row >
            <v-col>
              <v-select

                      item-text="Sr_boardName"
                      item-value="Sr_boardId"
                      label="선택"
                      :items="selectItems"
                      required
                      v-model="selectCon"
                      return-object
                      class="pl-2"

              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                      v-model="searchText"
                      prepend-inner-icon="mdi-magnify"
                      label="제목 검색"
                      @keyup.enter="fn_getSearch"
              ></v-text-field>
            </v-col>
          </v-row>

        </v-card-title>
        <v-row class="pt-5 pl-8 pr-8">
          <v-btn block color="primary" width="50px" @click.prevent="fn_getSearch"
            >검색</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
<v-card>
  <v-card-title>
    <v-row justify="end" class="pr-4 pt-2 mb-1">
      <v-btn  color="primary" @click="fn_ExcelDownload">
        <v-icon>mdi-download-circle-outline</v-icon>
      </v-btn>
    </v-row>
  </v-card-title>
  <!--목록-->
  <v-data-table
          dense
          :headers="headers"
          :items="returnDetailList"
          :items-per-page="itemsPerPage"
          :page="page"
          class="elevation-1"
          hide-default-footer
          disable-pagination
  >
    <template v-slot:body="{ items }">
      <tbody v-for="(item,index) in items" :key="index">
      <tr
              @click="rowClick(item)"
              :class="{
            backgroundColor: item.boardStatus === 'T',
            delete_backgroundColor: item.boardStatus === 'D',
          }"
              class="table-board-set"
      >
        <td style="text-align: left">{{ item.TITLE }}</td>
        <td >{{ item.CREATED_BY }}</td>
        <td >{{ item.CREATED_AT }}</td>
        <td >{{ item.SHOW_YN }}</td>
      </tr>


      <!--        <tr v-for="(c,i) in items" :key="i">-->
      <!--          <td >{{ c.boardSubject }}</td>-->
      <!--          <td style="text-align: center">{{ c.boardRegister }}</td>-->
      <!--          <td style="text-align: center">{{ c.boardDate }}</td>-->
      <!--          <td style="text-align: center">{{ c.boardStatus }}</td>-->
      <!--        </tr>-->
      </tbody>
    </template>
  </v-data-table>
</v-card>


    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        @input="fn_handlePage"
      ></v-pagination>
    </div>
    <v-dialog v-model="dialog" width="900">
      <template v-slot:activator="{ on }">
        <v-row class="d-flex justify-end mr-3 pt-3">
          <v-btn
            color="primary"
            dark
            class="text-right mr2"
            v-on="on"
            @click="fn_addClick"
          >
            글쓰기
          </v-btn>
        </v-row>
      </template>

      <v-card style="overflow-x: hidden">
        <v-card-title class="text-h5 primary white--text">
          게시글 작성 화면입니다.
        </v-card-title>

        <!--제목 입력-->
        <v-row class="pt-5 pl-8 pr-10 mb-1">
          <v-text-field
            label="제목"
            v-model="contentTitle"
            :rules="[() => !!contentTitle || '제목 입력은 필수입니다.']"
            required
          />

          <v-checkbox v-model="checked" label="Top Notice" class="pl-10"> </v-checkbox>
        </v-row>
        
        <!--vue Editor-->
        <vue-editor
                useCustomImageHandler
                @image-added="handleImageAdded"
          v-model="content"
                class="mb-2 pl-4 pr-4"
        ></vue-editor>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="fn_Cancel"> 취소 </v-btn>

          <v-btn color="primary" dark @click="fn_Save"> 저장 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 목록 업데이트 팝업-->
    <v-dialog v-model="eDialog" width="900">
      <v-card style="overflow-x: hidden; overflow-y:hidden">
        <v-card-title class="text-h5 primary white--text">
          게시글 수정 화면입니다.
        </v-card-title>
        <!--제목 입력-->
        <v-row class="pt-5 pl-8 pr-10 mb-1">
          <v-text-field
            label="제목"
            v-model="editedItem.TITLE"
            :rules="[
              () => !!editedItem.TITLE || '제목 입력은 필수입니다.',
            ]"
            required
          />
          <v-checkbox v-model="editedItem.BoardChecked" label="Top Notice" class="pl-10"></v-checkbox>
        </v-row>
        
        <!--vue Editor-->
        <vue-editor
                v-model="editedItem.CONTENT"
                useCustomImageHandler
                @image-added="handleImageAdded"
                class="mb-2 pl-4 pr-4"
        ></vue-editor>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="fn_Delete"> 삭제 </v-btn>
          <v-btn color="primary" dark @click.prevent="fn_Hide"> 숨김 </v-btn>

          <v-btn color="primary" dark @click="fn_Cancel"> 취소 </v-btn>
          <v-btn color="primary" dark @click="fn_Save"> 완료 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import store from "@/store/index.js";

  import fn_commonService from "@/common/common_fn_service"
  import IMAGE_URL from "@/common/api.serivice"
  import { VueEditor } from "vue2-editor";
  import { mapGetters } from "vuex";
  // import axios from "axios";
  import imageAxios from "axios";



  let form = new FormData();
  let preDate = new Date();

  preDate.setDate(preDate.getDate() - 30);

  export default {
    // beforeRouteLeave (to, from, next) {
    //   const answer = window.confirm('떠나자!')
    //   if (answer) {
    //
    //     return answer;
    //   } else {
    //     next(false)
    //   }
    // },
    name: "BoardList",
    props: {
      userId: {
        type: String,
        required: false,
      },
    },
    components: {
      VueEditor,
    },

    data: () => ({
      selectCon: {Sr_boardId: 1, Sr_boardName: "TITLE"},
      selectItems: [
        {
          Sr_boardId: 1, Sr_boardName: "TITLE",

        },
        {
          Sr_boardId: 2, Sr_boardName: "CONTENT",
        },
     

      ],
      s_date: preDate.toISOString().substr(0, 10),
      e_date: new Date().toISOString().substr(0, 10),

      searchText: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      returnDetailList: [],
      dialog: false,
      menu: false,
      menu1: false,
      eDialog: false,
      content: "",
      contentTitle: "",
      loginId: "",
      status: "Y",
      checked: false,
      editedItem: {
        SEQ: "",
        TITLE: "",
        CONTENT: "",
        //조회수
        READ_CNT: "",
        SHOW_YN: "",
        //작성자
        CREATED_BY: "",
        //등록날짜
        CREATED_AT: "",
        //등록IP
        CREATED_IP: "",
        BoardChecked:"",

      },
      defaultItem: {
        SEQ: "",
        TITLE: "",
        CONTENT: "",
        //조회수
        READ_CNT: "",
        SHOW_YN: "",
        //작성자
        CREATED_BY: "",
        //등록날짜
        CREATED_AT: "",
        //등록IP
        CREATED_IP: "",
        BoardChecked:"",
      },

      headers: [
        // { text: "Num", align: "d-none", value: "boardNum" },
        { text: "Subject", align: "left",  sortable: false,value: "boardSubject" },
        {
          text: "Register",
          align: "center",
          sortable: false,
          value: "boardRegister",
        },
        {
          text: "DateTime",
          align: "center",
          sortable: false,
          value: "boardDate",
        },
        {
          text: "Status",
          align: "center",
          sortable: false,
          value: "boardStatus",
        },
        {
          text: "content",
          align: " d-none",
          sortable: false,
          value: "boardContent",
        },
      ],
      returnDetailListCnt: "",
      returnDetailListTotal: [],
    }),
    beforeMount() {
      store.commit('onProgress');
    },


    mounted() {
      this.readCallBoardList();
      // console.log('created : ' + this.pageCount);
      this.loginId = this.$store.getters.currentCheckUser;
      // console.log(this.date);
      // console.log(this.loginId);
      store.commit('offProgress');
    },
    computed: {
      ...mapGetters([
        "getBoardCurrentPage",
        "getBoardCommonId",
        "getDetailBoardList",
        // "currentCheckUser"
        // getCurrentUserCompanyId
      ]),
    },
    methods: {
      fn_ExcelDownload() {
        let params = {
          page : this.page,
          size : this.returnDetailListCnt,

        }

        this.$store
                .dispatch("FETCHBOARDLIST", params)
                .then((response) => {
                  //각 게시글 내용은 제외 => 내용까지 같이 출력되므로 32767 characters 를 넘을 수 없음.
                  response.data.list.forEach(el => {
                    this.returnDetailListTotal.push({
                      //한글가능
                      제목 : el.TITLE,
                      Register: el.CREATED_BY,
                      Datetime: el.CREATED_AT,
                      Status: el.SHOW_YN
                    })

                  })
                  console.log( this.returnDetailListTotal);
                  //엑셀 다운로드 공통함수
                  fn_commonService.makeExcelFile5(this.returnDetailListTotal);
                })
                .catch((error) => {
                  console.log(error);
                });

      },
      //팝업창 제어
      fn_openAlert(dialogInfo) {
        let alertDialogInfo = dialogInfo
        this.$store.dispatch("openAlertDialog", alertDialogInfo)
      },
      handleImageAdded(file, Editor, cursorLocation, resetUploader) {

        let arr = ["png", "jpg", "jpeg", "bmp", "webp"];
        // alert(file.type.substring(6))
        // alert(file.type);
        if (arr.includes(file.type.substring(6))) {
          //  console.log(file.type.includes(arr));
          // console.log("이미지 파일 추가 : "+file);
          // console.log("이미지 파일 타입 : "+ file.type.substring(6));
          console.log("<ㅡㅡㅡㅡㅡ내가  등록한 파일ㅡㅡㅡㅡㅡ>");
          console.log(file);
          // console.log(IMAGE_URL);

          form.delete("image");
          form.set("image", file);

          imageAxios.defaults.baseURL = IMAGE_URL; //서버주소
          imageAxios({

            url:"/api/image.php",
            method: "POST",
            data: form,
          })
            .then((result) => {
              
              console.log(result);
              const url = result.data.fileUrl;

              Editor.insertEmbed(cursorLocation, "image", url);
              resetUploader();
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (!arr.includes(file.type.substring(6))) {
          alert("이미지 파일만 올려주세요.");
        }
      },

      fn_handlePage() {
        this.readCallBoardList();
      },
      fn_addClick() {
        this.content = "";
        this.contentTitle = "";
        this.checked = false;
     
      },
      fn_Save() {
        if (this.eDialog) {
          if (this.editedItem.BoardChecked == true) {
            this.editedItem.SHOW_YN = "T";
          } else if (this.editedItem.BoardChecked == false) {
            this.editedItem.SHOW_YN = "Y";
          }
          if(confirm("정말로 수정하시겠습니까?")) {

            form.delete("mode");
            form.delete("seq");
            form.delete("title");
            form.delete("content");
            form.delete("show_yn");
            form.delete("reg_nm");
            form.set("mode", "u");
            form.set("seq", this.editedItem.SEQ );
            form.set("title", this.editedItem.TITLE);
            form.set("content", this.editedItem.CONTENT);
            form.set("show_yn", this.editedItem.SHOW_YN);
            form.set("reg_nm",  this.editedItem.CREATED_BY);


            this.$store
                    .dispatch("UPDATEBOARD", form)
                    .then((response) => {

                      // console.log(response);
                      if (response.code == "200") {
                        this.fn_openAlert({
                          // timeout: 5000,
                          emoji: "✅",
                          title: "게시물이 성공적으로 수정 되었습니다.",
                          //firstLineText: "",
                          secondLineText: "2WinChance",
                          // thirdLineText: "셋째줄",
                        });
                        this.readCallBoardList();
                        this.eDialog = false;
                      }

                    })
                    .catch((error) => {
                      this.fn_openAlert({
                        // timeout: 5000,
                        emoji: "❌",
                        title: "요청이 실패하였습니다.",
                        //firstLineText: "",
                        secondLineText: "2WinChance",
                        // thirdLineText: "셋째줄",
                      });
                      console.log(error);


                    });
            //저장이후에 아래와 같이 처리를 해줘야한다.
            this.editedItem = this.defaultItem;
            

          }
        } else {
          if (this.contentTitle != "" ) {
            if (this.checked == false) {
              this.status = "Y";
              console.log(this.loginId);
              form.delete("mode");
              form.delete("title");
              form.delete("content");
              form.delete("show_yn");
              form.delete("reg_nm");
              form.set("mode", "c");
              form.set("title", this.contentTitle);
              form.set("content", this.content);
              form.set("show_yn", this.status);
              form.set("reg_nm", this.loginId);

            }
              // else if (this.checked == true) {
            //   this.status = "T";
            //   // console.log(this.checked);
            //
            //   form.delete("mode");
            //   form.delete("title");
            //   form.delete("content");
            //   form.delete("show_yn");
            //   form.delete("reg_nm");
            //   // form.set("register", this.loginId);
            //   form.set("mode", "c");
            //   form.set("title", this.contentTitle);
            //   form.set("content", this.content);
            //   form.set("show_yn", this.status);
            //   form.set("reg_nm", this.loginId);
            // }

            this.$store
              .dispatch("INSERTBOARD", form)
              .then((response) => {
                // console.log(response.code);
                if (response.code == '200') {
                  this.fn_openAlert({
                    // timeout: 5000,
                    emoji: "✅",
                    title: "게시물이 성공적으로 등록 되었습니다.",
                    //firstLineText: "",
                    secondLineText: "2WinChance",
                    // thirdLineText: "셋째줄",
                  });
                }

                this.readCallBoardList();
              })
              .catch((error) => {
                this.fn_openAlert({
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
            this.contentTitle = "";
          } else {
            alert("필수값을 입력해주세요");
          }
        }
      },
      rowClick: function (item) {
        // console.log("ㅡㅡㅡㅡㅡ클릭한 Itemㅡㅡㅡㅡㅡ");
        // console.log(item);
        // console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
        this.editedItem.SEQ = item.SEQ;
        this.editedItem.TITLE = item.TITLE;
        this.editedItem.CONTENT = item.CONTENT;
        this.editedItem.SHOW_YN = item.SHOW_YN;
        this.editedItem.CREATED_BY = item.CREATED_BY;
        if (item.SHOW_YN === "T") {
          this.editedItem.BoardChecked = true;
        } else if (item.SHOW_YN === "Y") {
          this.editedItem.BoardChecked = false;
        }
        this.eDialog = true;
      },

      fn_Cancel() {
        this.dialog = false;
        this.eDialog = false;
      },
      //숨김
      async fn_Hide() {
        if(confirm("숨김처리 하시시겠습니까?")){
          form.delete("num");
          form.delete("status");
          form.set("num", this.editedItem.boardNum);
          form.set("status", "H");

          await this.$store
                  .dispatch("HideOrDelete", form)
                  .then((response) => {
                    if (response.res_code == 200) {
                      this.status = response.boardStatus;
                      if (response.res_code === '200') {
                        this.fn_openAlert({
                          // timeout: 5000,
                          emoji: "✅",
                          title: "게시물이 숨김처리 되었습니다.",
                          //firstLineText: "",
                          secondLineText: "2WinChance",
                          // thirdLineText: "셋째줄",
                        });
                      }
                      this.readCallBoardList();

                      this.eDialog = false;

                    }
                  })
                  .catch((error) => {
                    this.fn_openAlert({
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
      //삭제
      async fn_Delete() {

        if(confirm("정말로 삭제하시겠습니까?")){

          form.delete("mode");
          form.delete("seq");
          form.delete("title");
          form.delete("content");
          form.delete("show_yn");
          form.delete("reg_nm");
          form.set("mode", "d");
          form.set("seq", this.editedItem.SEQ );
          form.set("title", this.editedItem.TITLE);
          form.set("content", this.editedItem.CONTENT);
          form.set("show_yn", this.editedItem.SHOW_YN);
          form.set("reg_nm",  this.editedItem.CREATED_BY);

          await this.$store
                  .dispatch("HideOrDelete", form)
                  .then((response) => {
                      if (response.code == '200') {
                        this.fn_openAlert({
                          // timeout: 5000,
                          emoji: "✅",
                          title: "게시물이 삭제 되었습니다.",
                          //firstLineText: "",
                          secondLineText: "2WinChance",
                          // thirdLineText: "셋째줄",
                        });
                      }
                      this.readCallBoardList();
                      this.eDialog = false;
                  })
                  .catch((error) => {
                    this.fn_openAlert({
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

      async readCallBoardList() {
        //Axios get 쿼리파라미터.
          let params = {
            page : this.page,
            size : this.itemsPerPage,
            searchKey: this.selectCon.Sr_boardId,
            searchVal: this.searchText,
          }
          if (this.selectCon.Sr_boardId === 1) {
            params = {...params, searchKey : "TITLE"}
            // console.log(params);
          }
          if (this.selectCon.Sr_boardId === 2) {
            params = {...params, searchKey : "CONTENT"}

          }
          await this.$store
                  .dispatch("FETCHBOARDLIST", params)
                  .then((response) => {
                    // this.returnDetailList = response.detailList;
                    this.returnDetailListCnt = response.data.total_cnt;

                    console.log(" <ㅡㅡㅡㅡ 내가 get으로 받아온 것 ㅡㅡㅡㅡ> ");
                    console.log(response);

                    this.returnDetailList = response.data.list;

                    // console.log(response);
                    // this.page = response.data.page;
                    this.pageCount = response.data.total_page;

                    //계층형게시판함수호출
                    // fn_Depth(this.returnDetailList);


                  })
                  .catch((error) => {
                    console.log(error);
                  });

      },
      async searchListCall() {
        // form.delete("subject");
        // form.set("subject", this.searchText);
        if (this.$refs.form.validate()) {
          await this.readCallBoardList();
        }
      },
      fn_getSearch() {
        // console.log(this.searchText);
        if(this.s_date > this.e_date) {
          alert("종료일보다 큰 날짜를 선택할 수 없습니다.\n다시 선택해 주세요");
        }
        else if (this.searchText == "" && this.s_date < this.e_date) {
          this.readCallBoardList();
        } else {
          this.searchListCall();
        }
      },
      //계층형 게시판 함수
      // fn_Depth(List) {
      //   for(let i=0; i<List.length; i++) {
      //     let Depth =List[i].boardDepth;
      //     let a ="";
      //     for (let j=0; j<Depth; j++) {
      //       a += "공백특수문자 삽입할것";
      //     }
      //     List[i].boardSubject = a + List[i].boardSubject
      //   }
      // }
    },
  };
</script>

<style lang="scss">
  .backgroundColor {
    background-color: bisque;
  }
  .delete_backgroundColor {
    background-color: #bfb9b6;
    // pointer-events : none;
  }
  .table-board-set > td {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    border-right: thin solid rgba(0, 0, 0, 0.12);
    text-align: center;
  }
</style>
