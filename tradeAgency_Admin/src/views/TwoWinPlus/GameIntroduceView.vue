<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title>게임소개 메뉴입니다.</v-card-title>
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
            @click.prevent="GameItrdReg"
        >
          게임소개 등록
        </v-btn>
      </v-col>
    </template>

    <!--DataTable-->
    <v-card>
      <v-data-table :headers="gameItrdHeaders"
                    :items="retGameItrdList"
                    hide-default-footer
                    class="transparent elevation-0 my-4"
                    disable-pagination
                    disable-sort
                    :items-per-page="gameItrdPerPage"
      >
        <template v-slot:item="{ item }">
          <tr @click="fn_updateItrd(item)">
            <td class="tb-border-style text-center">{{ item.tab_name }}</td>
            <td class="tb-border-style text-center">{{ item.use_yn }}</td>
            <td class="tb-border-style text-center">{{ item.reg_id }}</td>
            <td class="tb-border-style text-center">{{ item.reg_dt }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <div class="text-center mb-6">
      <v-pagination
          v-model="page"
          :length="totalPages"
          @input="handlePage"
      ></v-pagination>
    </div>

  <!--  게임소개 등록 다이얼로그  -->
    <GameItrdRegDialog
        :selGameItrdObject="selGameItrdObject"
        :regFormDialogToggle="regFormDialogToggle"
        :save-type="saveType"
        @closeDialog="closeDialog"
        @syncDialogToggle="syncDialogToggle"
        @itrdSaveComplete="getGameItrdList"
    ></GameItrdRegDialog>

  </v-container>

</template>

<script>
import store from "@/store/index.js";
import GameItrdRegDialog from "../Components/GameItrdRegDialog";
import {mapGetters, mapState} from "vuex";
import axios from "axios";

export default {
  name: 'GameIntroduceView',
  components: {
    GameItrdRegDialog
  },
  computed: {
    ...mapGetters(['getItrdDialogToggle']),
    ...mapState(['itrdDialogToggle']),
  },
  data: () => ({
    //Dialog제어
    regFormDialogToggle: false,
    selGameItrdObject: {},
    saveType: 'I',

    searchText: '',
    page: 1,
    pageSize: 10,
    totalPages: 0,
    gameItrdHeaders: [
      {
        text: "TabName",
        align: "center",
        sortable: false,
        value: ""
      },
      {
        text: "UseYn",
        align: "center",
        sortable: false,
        value: ""
      },
      {
        text: "Register",
        align: "center",
        sortable: false,
        value: ""
      },
      {
        text: "Reg Date",
        align: "center",
        sortable: false,
        value: ""
      },
    ],
    searchType: {sr_Id: 1, sr_Name: "제목"},
    selectSearchItems: [
      {
        sr_Id: 1, sr_Name: "종목",
      },
      {
        sr_Id: 2, sr_Name: "내용",
      },
    ],

    retGameItrdList: [],
    gameItrdPerPage: 10,
  }),

  beforeMount() {
    store.commit('onProgress');
  },
  mounted() {
    this.getGameItrdList();
    store.commit('offProgress');
  },

  methods: {
    //자식컴포넌트와 부모컴포넌트의 값을 일치시켜주자.
    syncDialogToggle(syncToggleVal) {
      this.regFormDialogToggle = syncToggleVal;
    },
    closeDialog() {
      this.regFormDialogToggle = false;
    },
    openDialog() {
      this.regFormDialogToggle = true;
    },
    GameItrdReg() {
      this.saveType = 'I';
      this.selGameItrdObject = {
        useYn: 'Y'
      };
      this.openDialog();
    },
    async searchListCall() {
      if (this.$refs.form.validate()) {
        await this.getGameItrdList();
      }
    },
    fn_getSearch() {
      //검색시엔 다시 1페이지로
      this.page = 1;
      if (this.searchText == "") {
        this.getGameItrdList();
      } else {
        this.searchListCall();
      }
    },
    handlePage() {
      this.getGameItrdList();
    },
    getGameItrdList() {
      let srchForm = new FormData();
      srchForm.append('searchType', this.searchType.sr_Id);
      srchForm.append('searchVal', this.searchText);
      srchForm.append('page', this.page);
      srchForm.append('size', this.pageSize);

      axios.post('/api/v1/Get_GameItrdList', srchForm)
          .then(resp => {
            if(resp.status === 200) {
              this.retGameItrdList = resp.data.gameItrdList.content;
              this.totalPages = resp.data.gameItrdList.totalPages;
            }
          }).catch(error => {
        console.error(error);
      });
    },
    fn_updateItrd(itrdObject) {
      this.selGameItrdObject = {
        gameIdx: itrdObject.game_idx,
        gameUsage: itrdObject.game_usage,
        tabName: itrdObject.tab_name,
        useYn: itrdObject.use_yn,
        sortOrder: itrdObject.sort_order
      };
      this.saveType = 'U';

      this.openDialog();

    }
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