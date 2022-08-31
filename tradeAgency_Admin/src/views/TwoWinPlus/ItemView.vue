<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title>Item화면 입니다.</v-card-title>
    </v-card>

    <v-card class="mb-6">
      <v-row class="pl-4 pr-4">
        <v-col md="3">
          <v-select
              item-text="selectName"
              item-value="selectId"
              label="선택"
              :items="selectItems"
              required
              v-model="selectCon"
              @change="getItemList"
              return-object
              style="width: 450px"


          ></v-select>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mb-6">
      <template>
        <v-col class="pt-6">
              <span

              >{{ selectCon.selectName }} Item List </span>
          <v-btn
              color="primary "
              dark
              class="text-Center ml-3"
              @click.prevent="ItemRegFn"

          >
            Item Reg
          </v-btn>
        </v-col>
      </template>
      <v-dialog v-model="dialog" width="800" @click:outside="fn_Cancel()">

        <v-card style="overflow-x: hidden">
          <v-card-title
              class="text-h5 primary white--text"

          >
            Item 등록
          </v-card-title>

          <v-row class="pt-5 pl-4 pr-4" width="700" style="max-height: 76px">
            <v-col md="3">
              <v-select
                  item-text="selectName"
                  item-value="selectId"
                  label="Item Type"
                  :items="selectItems"
                  required
                  v-model="selectCon"
                  return-object
                  style="width: 450px"
                  disabled
              ></v-select>
            </v-col>
          </v-row>

          <v-row class="pl-4 pr-4" width="700">
            <v-text-field
                v-model="regItem.name"
                label="Item Name"
                hide-details="auto"
                class="pt-5 pl-4 pr-4"
            >
            </v-text-field>

          </v-row>

          <v-row class="pl-4 pr-4" width="700">
            <v-text-field
                v-model="regItem.money"
                label="Item Money"
                hide-details="auto"
                class="pt-5 pl-4 pr-4"
            >
            </v-text-field>
            <v-text-field
                v-model="regItem.sortOrder"
                label="Sort Order"
                hide-details="auto"
                class="pt-5 pr-4"
            >
            </v-text-field>
          </v-row>


          <v-row class="  pl-4 pr-4" width="700">
            <small class=" pl-4 mb-8">
              * 등록된 상품 노출 영역
            </small>
          </v-row>


          <v-file-input
              class="pl-4 pr-4"
              show-size
              dense
              accept="image/png, image/jpeg, image/bmp"
              v-model="regItem.imgfileItem"
              prepend-icon="mdi-camera"
              label="Image Upload"

          ></v-file-input>
          <!--                    <v-row dense class=" pl-6 ">
                                  <v-btn @click.prevent="fn_addImageFile">이미지 파일 추가</v-btn>
                                  <small class="pl-6 pt-3"> * 120 x 120 JPG, PNG Upload</small>
                              </v-row>-->


          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="fn_Cancel">취소</v-btn>
            <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>
          </v-card-actions>
        </v-card>
        <!--        수정 영역-->
      </v-dialog>
      <v-dialog v-model="eDialog" width="800">
        <v-card style="overflow-x: hidden">
          <v-card-title
              class="text-h5 primary white--text"

          >
            Item 수정
          </v-card-title>
          <v-row class=" pt-5 pl-4 pr-4" width="700">
            <v-text-field
                label="Item Name"
                hide-details="auto"
                class="pt-5 pl-4 pr-4"
                v-model="rowItem.itemNm"
            >
            </v-text-field>
            <v-text-field
                label="Admin ID"
                hide-details="auto"
                class="pt-5 pr-4"
                readonly
                v-model="rowItem.adminId"
            >
            </v-text-field>
          </v-row>

          <v-row class="pl-4 pr-4" width="700">
            <v-text-field
                label="sortOrder"
                hide-details="auto"
                class="pt-5 pl-4 pr-4"
                v-model="rowItem.sortOrder"
            >
            </v-text-field>
            <v-text-field
                label="Buy Price"
                hide-details="auto"
                class="pt-5 pr-4"
                v-model="rowItem.buyPrice"
            >
            </v-text-field>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                  label="Item"
                  class="pl-5 pr-1"
                  hide-details="auto"

              >
              </v-text-field>
            </v-col>
            <v-col class="pt-7">
              <v-btn color="primary">Reg</v-btn>
            </v-col>
          </v-row>


          <v-row class="  pl-4 pr-4" width="700">
            <small class=" pl-4 mb-8">
              * 등록된 상품 노출 영역
            </small>
          </v-row>

          <v-file-input
              v-for=" (imgRow, index) in imageUploadList" v-bind:key="index"
              class="pl-4 pr-4"
              show-size
              dense
              accept="image/png, image/jpeg, image/bmp"
              v-model="imgfileItem"
              prepend-icon="mdi-camera"
              label="Image Upload"

          ></v-file-input>
          <v-row dense class=" pl-6 ">
            <v-btn @click.prevent="fn_addImageFile">이미지 파일 추가</v-btn>
            <small class="pl-6 pt-3"> * 120 x 120 JPG, PNG Upload</small>
          </v-row>


          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="fn_Cancel">취소</v-btn>
            <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
    </v-card>
    <!-- 테이블 영역 start -->
    <v-card>
      <v-data-table
          dense
          :headers="ItemHeader"
          :items="ItemList"
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
            <td class="td-border-style">{{ item.itemIdx }}</td>
            <td class="td-border-style">{{ item.itemType }}</td>
            <td class="td-border-style" style="align-content: center;"><img style="max-width: 120px;max-height: 120px" :src="item.fileUrl"  :alt="item.itemNm"/></td>
            <td class="td-border-style">{{ item.itemNm }}</td>
            <td class="td-border-style">{{ item.itemMoney }}</td>
            <td class="td-border-style">{{ item.sortOrder }}</td>
            <td class="td-border-style">{{ item.useYn }}</td>
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
    <!--  <v-form ref="form"  lazy-validation>-->
    <!--    <table class="v-data-table" style="width: 100%">-->
    <!--      <thead class="v-data-table-header">-->
    <!--      <tr>-->
    <!--        <td style="text-align: left"><Strong>Num</Strong></td>-->
    <!--        <td style="text-align: left"><Strong>Name</Strong></td>-->
    <!--        <td style="text-align: left; width: 20%;"><Strong>Item</Strong></td>-->
    <!--        <td style="text-align: left"><Strong>Result FP</Strong></td>-->
    <!--&lt;!&ndash;        <td style="text-align: left"><Strong>비고</Strong></td>&ndash;&gt;-->
    <!--        <td style="text-align: left"><Strong>Buy Price</Strong></td>-->
    <!--        <td style="text-align: left"><Strong>Status</Strong></td>-->
    <!--      </tr>-->
    <!--      </thead>-->
    <!--      <tbody>-->
    <!--      <tr v-for=" (row, index) in ItemList" v-bind:key="index">-->
    <!--        <td style="width: 20%;">-->
    <!--           <v-text-field-->
    <!--              disable-->
    <!--            ></v-text-field>-->
    <!--        </td>-->
    <!--        <td style="width: 20%;">-->
    <!--          <v-text-field-->
    <!--              disabled-->
    <!--            ></v-text-field>-->
    <!--        </td>-->
    <!--        <td style="width: 20%;">-->
    <!--          <v-text-field-->
    <!--              label="수량"-->
    <!--          >-->
    <!--          </v-text-field>-->
    <!--        </td>-->
    <!--        <td style="width: 20%;">-->
    <!--          <v-text-field-->
    <!--              label="금액"-->
    <!--              type="number"-->
    <!--              class="text-xg-right"-->
    <!--          >-->
    <!--          </v-text-field>-->
    <!--        </td>-->
    <!--        <td style="width: 20%;">-->
    <!--           <v-text-field-->
    <!--              label="금액"-->
    <!--              type="number"-->

    <!--              class="text-xg-right"-->
    <!--          >-->
    <!--          </v-text-field>-->
    <!--        </td>-->
    <!--        <td>-->
    <!--          <v-btn small @click.prevent="fn_removeRow(row)">delete</v-btn>-->
    <!--            &lt;!&ndash;          <a @click="fn_removeRow(row)">삭제</a>&ndash;&gt;-->
    <!--        </td>-->
    <!--      </tr>-->
    <!--      </tbody>-->
    <!--    </table>-->
    <!--    </v-form>-->
    <!-- 테이블 영역 End -->
  </v-container>
</template>

<script>
import store from "@/store/index.js";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: 'ItemView',

  data: () => ({
    regItem: {},
    rowItem: {},

    selectedGame: '',
    imgBaseUrl: '',

    page: 0,
    pageCount: 0,
    eDialog: false,
    imgfileItem: null,
    imageUploadList: [],
    prAddNum: 1,
    prDate: new Date().toISOString().substr(0, 10),
    ItemList: [],
    dialog: false,
    ItemMenu: false,
    selectCon: {selectId: 1},
    selectItems: [
      {
        selectId: 1, selectName: "Cash",
      },
      {
        selectId: 2, selectName: "Skin",
      }
    ],
    ItemHeader: [
      {
        text: "Num",
        align: "center",
        sortable: false,
        value: "",
      },
      {
        text: "Type",
        align: "center",
        sortable: false,
        value: "",
      },
      {
        text: "Image",
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
        text: "Money",
        align: "center",
        sortable: false,
        value: "",
      },
      {
        text: "SortOrder",
        align: "center",
        sortable: false,
        value: "",
      },
      {
        text: "UseYn",
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
    this.selectedGame = window.localStorage.getItem("selectedGame");
    if(this.selectedGame === '2WinChance') {
      this.imgBaseUrl = process.env.VUE_APP_API_BASE_URL_TWOWINCHANCE;
    } else if(this.selectedGame === '2WinPlus') {
      this.imgBaseUrl = process.env.VUE_APP_API_BASE_URL_TWOWINPLUS;
    }

    this.getItemList();
    store.commit('offProgress');
  },
  computed: {
    ...mapGetters([
        'getUserId'
    ])
  },

  methods: {
    getItemList() {
      let formData = new FormData();
      formData.set("page", this.page);
      formData.set("size", this.itemsPerPage);
      formData.append("itemType", this.selectCon.selectId);

      this.$store
          .dispatch("GETITEMLIST", formData)
          .then((response) => {
            console.log(response);
            this.ItemList = response.itemList;
          })
          .catch((error) => {
            console.log(error);
          });
    },

    handlePage() {
      this.getItemList();
    },
    ItemRegFn() {
      this.dialog = true;
    },
    fn_Cancel() {
      if (this.dialog) {
        this.dialog = false;
        this.regItem = {};
      }
      this.eDialog = false;
      this.imageUploadList = [];
      // console.log(this.imgfileItem);

    },
    fn_Save() {
      let formData = new FormData();
      if (this.dialog) {
        formData.append('itemType', this.selectCon.selectId);
        formData.append('itemNm', this.regItem.name);
        formData.append('itemMoney', this.regItem.money);
        formData.append('atchFile', this.regItem.imgfileItem);
        formData.append('sortOrder', this.regItem.sortOrder);
        formData.append('userId', this.getUserId);

        //현재 새로 추가한 환경변수가 먹질 않음
        console.log(process.env.VUE_APP_IMAGE_SERVER_DOMAIN);

        axios.create()
            .post(`${process.env.VUE_APP_IMAGE_SERVER_DOMAIN}/2winplus/ISet_ItemImage`, formData)
            .then((response) => {
              console.log(response);

              if (response.data.fileIdx !== undefined) {
                formData.append('itemImageIdx', response.data.fileIdx);

                axios.create()
                    .post(`${process.env.VUE_APP_API_BASE_URL_TWOWINPLUS}/api/v1/ISet_Item`, formData)
                    .then((response) => {
                      if (response.code == '200') {
                        this.fn_openAlert({
                          // timeout: 5000,
                          emoji: "✅",
                          title: "아이템이 성공적으로 등록 되었습니다.",
                          //firstLineText: "",
                          secondLineText: "2WinChance",
                          // thirdLineText: "셋째줄",
                        });

                        this.getItemList();

                      }
                    })
                    .catch((error) => {
                      this.fn_openAlert({
                        // timeout: 5000,
                        emoji: "❌",
                        title: "요청이 실패하였습니다.",
                        //firstLineText: "",
                        secondLineText: "2WinPlus",
                        // thirdLineText: "셋째줄",
                      });
                      console.log(error);
                    });

              } else {
                this.fn_openAlert({
                  // timeout: 5000,
                  emoji: "❌",
                  title: "파일등록에 실패하였습니다.",
                  //firstLineText: "",
                  secondLineText: "2WinPlus",
                  // thirdLineText: "셋째줄",
                });
              }

            }).catch((err) => {
          this.fn_openAlert({
            // timeout: 5000,
            emoji: "❌",
            title: "파일등록에 실패하였습니다.",
            //firstLineText: "",
            secondLineText: "2WinPlus",
            // thirdLineText: "셋째줄",
          });
          console.log(err);
        });

        this.dialog = false;
        this.eDialog = false;

      }

    },
    fn_addImageFile() {
      this.imageUploadList.push({});
    },
    // fn_removeRow: function(row){
    //   this.count--;
    //   // console.log('삭제');
    //   // console.log(row);
    //   this.ItemList.splice(this.ItemList.indexOf(row), 1);
    // },
    rowClick(item) {
      this.rowItem.itemIdx = item.itemIdx;
      this.rowItem.adminId = item.regId;
      this.rowItem.itemNm = item.itemNm;
      this.rowItem.buyPrice = item.itemMoney;
      this.rowItem.sortOrder = item.sortOrder;
      this.rowItem.imageItem = this.imgBaseUrl + '/api/v1' + item.fileUrl;
      console.log(item);
      this.eDialog = true;
    }
    // addPrRow() {
    //   this.ItemList.push(
    //     {
    //       pr_Num: 1,
    //       pr_Name: 1,
    //       pr_Item: '',
    //       pr_ResultFP:'',
    //       pr_BuyPrice:".",

    //     }
    //     );
    // }


  },
};
</script>

<style lang="scss" scoped>
.td-border-style {
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
</style>