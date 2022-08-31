<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title>품목관리 리스트입니다.</v-card-title>
    </v-card>
    <v-card height="100px" class="mb-6">
      <v-form ref="form"  lazy-validation>
        <v-row>
          <v-col>
            <v-select
                class="pl-8"
                label="검색조건"
                v-model="searchCon"
                :items="items"
                item-text="name"
                item-value="id"
                :rules="[() => !!searchCon || '검색조건은 필수입니다.']"
                required
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
                v-model="searchTxt"
                :rules="[() => !!searchTxt || '검색어는 필수입니다.']"
                required
            >
            </v-text-field>
          </v-col>
          <v-col class="pt-5 pl-xl-4 pr-8">
            <v-btn block color="primary" @click.prevent="searchCall()">검색</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
        dense
        :headers="headers"
        :items="returnDetailList" 
        :items-per-page="itemsPerPage"
        :page="page"
        item-key="detailId"
        class="elevation-1 "
        hide-default-footer
        disable-pagination
        :loading="loading"
        loading-text="Loading... Please wait"
    >
      <template v-slot:item="{ item }">
        <tr @click="rowClick(item)" >
          <td >{{item.detailNm}}</td>
          <td>{{item.detailId}}</td>
          <td style="text-align: center;">{{item.regDt}}</td>
          <td style="text-align: center;">{{item.regId}}</td>  
          <td style="text-align: center;">{{item.useYn}}</td>
        </tr>
      </template>
      
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
          v-model="page"
          :length="pageCount"
          @input="handlePage"
      ></v-pagination> 
    </div>
    <!-- <v-row class="d-flex  ">
      <v-btn color="red" class="pt-2" v-if="this.searchState" @click.prevent="goToNomalList" >목록</v-btn>
    </v-row> -->
    <div class="text-right pt-2">
       <v-dialog 
          v-model="eDialog"
          width="450"
      >
        <v-card>
          <v-card-title class="text-h5 primary white--text">
            품목 수정 화면입니다.
          </v-card-title>
          <v-row class="pt-5 pl-8 pr-8" width="400">
              <v-text-field
                  label="품목명"
                  v-model=editedItem.detailNm
                  :rules="[() => !!editedItem.detailNm || '품목명은 필수입니다.']"
                  required
                  width="400"
                  />
          </v-row> 
          <v-row class=" pr-8">
               <v-select
                v-model=editedItem.useYn
                class="pl-8"
                label="사용유무" 
                :items="useYnItems"
                item-text="name"
                item-value="value" 
                required
            ></v-select>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="save"
            >
              저장
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="dialog"
          width="450"
      >
        <template v-slot:activator="{ on }">
          <v-row class="d-flex justify-end mr-1"> 
          <v-btn
              color="primary"
              dark
              v-on="on"
              class="text-right  mr-2" 
          >
            신규입력
          </v-btn> 
          </v-row>
          
        </template>
        <v-card>
          <v-card-title class="text-h5 primary white--text">
            품목 등록 화면입니다.
          </v-card-title>
          <v-row class="pt-5 pl-8 pr-8">
              <v-text-field
                  label="품목명"
                  v-model="newDetailNm"
                  :rules="[() => !!newDetailNm || '품목명은 필수입니다.']"
                  required
                  />
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="save"
            >
              저장
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-alert
      type="error"
      class="w-25"
      :value="checkAlert"
    >필수값을 입력해주세요.</v-alert>
  </v-container>


</template>

<script>
import { mapGetters } from "vuex";

let form = new FormData();
export default {
  name: "CodeList",
  props:{
     userId:{
       type:String,
       required: false 
     }
  },
  data: () => ({
    loading: false,
    //검색조건 
    items: [
      {id: 'detailNm', name: '코드명'},
      // {id: 'detailId', name: '코드'},
    ],
    //수정시 사용할 값 
    useYnItems:[
      {id:'useYn', name:'사용', value:'Y'},
      {id:'useYn', name:'미사용', value:'N'},
    ],
    searchCon: null,
    searchState: false,
    searchTxt:'',
    //검색어로 보낼 것.
    prevSearchTxt: '',
    returnDetailList:[],
    page:1,
    pageCount:0,
    itemsPerPage: 10,
    headers: [
      {
        text: '품목명',
        align: 'start',
        sortable: false,
        value: 'detailNm',
      },
      {text: '분류코드', value: 'detailId'},
      {text: '등록일시', value: 'regDt', align: 'center'},
      {text: '등록자', value: 'regId', align: 'center'},
      {text: '사용여부', value: 'useYn', align: 'center'},
      {text: '대분류코드', value: 'cmmncdId', align: ' d-none'},
    ],
    dialog:false,
    eDialog:false,
    newDetailNm:'',
    checkAlert: false,
    editedItem: {
      detailNm : '',
      detailId : '',
      regDt: '',
      regId: '',
      useYn:'',
      cmmncdId:'0005' 
    },
    defaultItem:{
      detailNm : '',
      detailId : '',
      regDt: '',
      regId: '',
      useYn:'',
      cmmncdId:'0005' 
    }

  }),
  mounted() {
    // this.readCallCodeList();
    // console.log('mount 될때 : '+this.pageCount);

    // console.log('mode check : '+process.env.VUE_APP_PHASE);

  },
  created() {
    this.readCallCodeList();
    // console.log('created : ' + this.pageCount);
  },
  computed:{
    ...mapGetters(["getCodeTotalPage", "getCodeTotalItems","getCodeTotalPage"]),
  },
  watch:{
    // pageCount: function(new_val, old_val){
    //    console.log('watch new : '+new_val);
    //    console.log('watch old : '+old_val)
    // }
  },
  methods:{ 
    handlePage() {
      if (this.searchTxt !== '') {
        this.searchCall();
      } else {
        this.readCallCodeList();
      }
    },
    rowClick: function(item){
      //  alert(item.useYn);
      // alert(item.detailId);
       this.editedItem.detailId = item.detailId;
       this.editedItem.detailNm = item.detailNm;
       this.editedItem.useYn = item.useYn;
       this.editedItem.regId = item.regId;
      //  this.editedItem.regId = this.getUserId;
       this.editedItem.regDt = item.regDt;
       // alert('edit mode');
      //  alert(item.detailNm);
       this.eDialog = true;
    },
    async readCallCodeList() {
        form.delete("cmmncdId");
        form.delete("page");
        form.delete("size");
        form.set("cmmncdId", "0005");
        form.set("page", this.page);
        form.set("size", this.itemsPerPage);
      await this.$store.dispatch("FETCHCODELIST", form).then((response) => {
        this.returnDetailList = response.detailList;
        this.page = response.CurrentPage;
        this.pageCount = response.totalPages;
        this.loading = false;
        // console.log('api call pageCount : ' + this.pageCount);
      })
        .catch(error => {
          console.log(error);
        });
     },
    async searchCall(){
      this.searchState = true;
      form.delete('detailNm');
      form.set('detailNm', this.searchTxt);
      if(this.$refs.form.validate()){
        await this.readCallCodeList();
       }
    },
    save(){ 
      //로그인한 사용자의 정보를 가져오는 부분을 여기서 구현해볼것.

        // if(this.editedItem.detailId != ''){
        if(this.eDialog){
            this.$store.dispatch("UPDATECODE",{
              "cmmncdId" : this.editedItem.cmmncdId,
              "detailId" : this.editedItem.detailId,
              "detailNm": this.editedItem.detailNm,
              "note": this.editedItem.detailNm,
              "useYn" : this.editedItem.useYn,
              "regDt": this.editedItem.regDt,
              "regId" : this.editedItem.regId,
              "upId" :   this.editedItem.regId,
            }).then((response)=> { 
              console.info(response.res_code);
              this.readCallCodeList();
            }).catch(error => {
              console.log(error)
            });
            //저장이후에 아래와 같이 처리를 해줘야한다. 
            this.editedItem = this.defaultItem;
            if(this.eDialog) {
              this.eDialog = false;
            }
        } else {
          if( this.newDetailNm != ''){ 
            this.$store.dispatch("SAVEDETAILCODE", {
              "detailNm": this.newDetailNm,
              "regId": "system"
            }).then((response) => {
                console.info(response.res_code);
                this.readCallCodeList();
            })
            .catch(error => {
              console.log(error);
            });
            if(this.dialog) this.dialog = false;
            this.newDetailNm = '';
          } else {
            alert('필수값을 입력해주세요');
          } 
        } 
    }
  },

}
</script>

<style scoped>

</style>