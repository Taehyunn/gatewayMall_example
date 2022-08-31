<template>
 <v-container>
   <v-card class="mb-6">
     <v-card-title>Month화면 입니다.</v-card-title>
    
    </v-card>
    <v-card class="mb-6" >
    <v-row class="pl-1 pr-4">
      <v-col>
         <v-select
            ref="menu"
            item-text="selectName"
            item-value="selectId"
            label="일/주/월"
            :items = "selectItems"
            required
            v-model="selectCon"
            return-object

            class="pl-3"
            v-on:change="fn_MoveRoutes(`${selectCon.selectId}`)"

          >
          
          </v-select>
      </v-col>
      <v-col>
       
         <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              :value="currentMonth"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                            
                            label="검색날짜"
                            prepend-icon="event"
                            v-model="currentMonth"
                            readonly
                            v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
             v-model="currentMonth"

               scrollable
               type="month"
             :max="max"
               >
              <v-spacer></v-spacer>
              <v-btn    color="primary"  @click="menu = false">Cancel</v-btn>
              <v-btn   color="primary"  @click="$refs.menu.save(currentMonth)">OK</v-btn>
            </v-date-picker>
          </v-menu>
      </v-col>
      <v-col class="pt-6 pl-xl-4 pr-8">
        <v-btn block color="primary" @click.prevent="fn_getSearch">검색</v-btn>
      </v-col>
 
      </v-row>
    </v-card>
   <v-card class="mb-6">
     <v-data-table
         dense
         :headers="MonthlyJoinUserHeaders"
         :items="returnMonthList"
         hide-default-footer
         hide-default-header
         disable-pagination
     >
       <template v-slot:header="{ props: { headers } }">
         <thead>
         <tr>
           <th rowspan="1" v-for="(header) in headers" :key="header.text"
               :style="{ textAlign: header.align }"
               class="tb-border-right"
           >{{ header.text }}
           </th>
         </tr>
         </thead>
       </template>
<!--       :class="[index==items.length-1 ?'blueLightTheme' : 'lastRowTheme']"-->
       <template v-slot:body="{ items }">
         <tbody v-for="(item, index) in items" :key="index">
         <tr   >
           <td :rowspan="item.contents.length + 1"
               style="text-align: center; border-right: thin solid rgba(0,0,0,0.12); "
                  :class="[index==items.length-1 ?'blueLightTheme' : 'lastRowTheme']"
           >{{item.Type }}</td>
         </tr>
         <tr v-for="(content, idx) in item.contents"
             :key="idx"
             class="table-board-set">
           <td >

             {{content.getMonthTotal}}
           </td>
           <td>{{ content.getMonthNew }}</td>
           <td>{{ content.getMonthLV }}</td>
           <td>{{ content.getMonthACU }}</td>
           <td>{{ content.getMonthMAU }}</td>
           <td>{{ content.getJoinPercent }}</td>
           <td >{{ content.getMonthDrop }}</td>
         </tr>
         </tbody>
       </template>


     </v-data-table>
   </v-card>

   <v-card class="mb-6">
     <v-data-table
         dense
         :headers="MonthlyGameContestHeaders"
         :items="returnMonthlyGameConetstList"
         hide-default-footer
         hide-default-header
         disable-pagination
     >

       <template v-slot:header="{ props: { headers } }">
         <thead>
         <tr>
           <th rowspan="1" v-for="(header) in headers" :key="header.text"
               :style="{ textAlign: header.align, borderRight:header.borderRight }">{{ header.text }}
           </th>
         </tr>
         </thead>
       </template>
<!--       <template v-slot:body="{ items }">-->
<!--         <tbody v-for="(item, index) in items" :key="index">-->
<!--         <tr   >-->
<!--           <td :rowspan="item.contents.length + 1"-->
<!--               style="text-align: center; background: rosybrown"-->

<!--           >{{item.Type }}</td>-->
<!--         </tr>-->
<!--         <tr v-for="(content, idx) in item.contents" :key="idx" class="table-board-set">-->
<!--           <td >-->
<!--             {{content.Contest}}-->
<!--           </td>-->
<!--           <td>{{ content.Rate }}</td>-->
<!--           <td>{{ content.PcMobile }}</td>-->


<!--         </tr>-->
<!--         </tbody>-->
<!--       </template>-->
       <template v-slot:body="{ items }">
         <tbody>
         <tr v-for="(item, index) in items" :key="index" class="table-board-set">
           <td style="background: rosybrown">
             {{item.gc_name}}
           </td>
           <td>{{ item.contestUser }}</td>
           <td>{{ item.rateUser }}</td>
           <td>{{ item.PCMOBILE }}</td>

         </tr>
         </tbody>
       </template>



     </v-data-table>
   </v-card>

   <v-card class="mb-6">
     <v-data-table
         dense
         :headers="MonthlyJoinGameHeaders"
         :items="returnMonthlyJoinGameList"
         hide-default-footer
         disable-pagination
     >

       <template v-slot:item="{ item }">
         <tr>
           <th :rowspan="item.contents.length + 1" style="background: rosybrown">{{ item.game }}</th>
         </tr>
         <tr v-for="(content, idx) in item.contents" :key="item.game + idx">
           <td style="text-align: center;border-right: thin solid rgba(0, 0, 0, 0.12);background: lightblue">{{ content.batType }}</td>
           <td style="text-align: center;">{{ content.count }}</td>
           <td style="text-align: center;">{{ content.AllTotalCnt }}</td>
           <td style="text-align: center;">{{ content.fee }}</td>
           <td style="text-align: center;">{{ content.prize }}</td>
         </tr>
       </template>

     </v-data-table>
   </v-card>

   <v-card class="mb-6">
     <v-data-table
         dense
         :headers="PaymentMonthlyStatHeaders"

         hide-default-header
         hide-default-footer
         disable-pagination
     >

       <template v-slot:header="{ props: { headers } }">
         <thead>
         <tr>
           <th rowspan="2" style="border-bottom: thin solid rgba(0, 0, 0, 0.12);border-right: thin solid rgba(0, 0, 0, 0.12);text-align: center;">PaymentType</th>
           <th rowspan="2" style="border-bottom: thin solid rgba(0, 0, 0, 0.12);border-right: thin solid rgba(0, 0, 0, 0.12);text-align: center;">Server Hold</th>
           <th rowspan="1" :colspan="headers.length" style="border-bottom: thin solid rgba(0, 0, 0, 0.12);text-align: center;">Sale</th>
         </tr>
         <tr>
           <th rowspan="1" v-for="(header) in headers" :key="header.text" :style="{ textAlign: header.align }">{{ header.text }}</th>
         </tr>
         </thead>
       </template>

       <template v-slot:body="{ items }">
         <tbody>
         <tr v-for="item in items" :key="item.type">
           <td style="text-align: center;background: rosybrown">{{ item.type }}</td>
           <td style="text-align: center;">{{ item.serverHold }}</td>
           <td style="text-align: center;">{{ item.sum }}</td>
           <td style="text-align: center;">{{ item.danal }}</td>
           <td style="text-align: center;">{{ item.paypal }}</td>
           <td style="text-align: center;">{{ item.etc1 }}</td>
           <td style="text-align: center;">{{ item.etc2 }}</td>
           <td style="text-align: center;">{{ item.etc3 }}</td>
         </tr>
         </tbody>
       </template>

     </v-data-table>
   </v-card>

   <v-card class="mb-6" style="max-width: 50vw;">
     <v-data-table
             :items="returnMonthlyArpList"
         dense
         hide-default-footer
         disable-pagination
     >
<!--       <template v-slot:body>-->
<!--         <tbody>-->
<!--           <tr>-->
<!--             <th style="text-align: center;background: rosybrown;width: 30%">ARPPU/PU</th>-->
<!--             <td style="text-align: center;">{{ ArppuMonthlyData.arppu }}</td>-->
<!--           </tr>-->
<!--         </tbody>-->
<!--       </template>-->

       <template v-slot:item="{ item }">
         <tr class="table-board-set">
           <td style="background: rosybrown">
             ARPPU/PU
           </td>
           <td >
             {{item.ARPPUPU}}
           </td>
         </tr>

       </template>

     </v-data-table>
   </v-card>

   <v-card class="mb-6" style="max-width: 50vw;">
     <v-data-table
         dense
         :headers="MonthlyTicketCntHeaders"
         :items="returnMonthlyTicketCountList"
         hide-default-footer
         disable-pagination
     >
       <template v-slot:item="{ item }">

           <tr class="table-board-set">
             <th style="text-align: center;background: rosybrown;width: 30%;">Ticket</th>
             <td style="text-align: center;">{{ item.inTicket }}</td>
             <td style="text-align: center;">{{ item.outTicket }}</td>
           </tr>

       </template>

     </v-data-table>
   </v-card>

 </v-container>
</template>

<script>
  import store from "@/store/index.js";
  let form = new FormData();
export default {
  name: 'ReportMonthly',
 created() {
  //  alert(this.currentMonth)
 },
  data: () => ({
    returnMonthlyArpList:[],
    returnMonthlyTicketCountList:[],
    max:new Date().toISOString().substr(0,7),
    selectCon:{selectId:3},
    currentMonth: new Date().toISOString().substr(0, 7),
    menu:false,
      selectItems: [
      {
        selectId:1, selectName:"Daily",
      
      },
      {
        selectId:2, selectName:"Weekly",
      },
      {
        selectId:3, selectName:"Monthly"
      },
      
      ],


    MonthlyJoinUserHeaders : [
      { text: "", align: "center",sortable: false, value: "" },
      { text: "Total", align: "center",sortable: false, value: "" },
      {
        text: "New",
        align: "center",
        sortable: false,
        value: "",
      },
      {
        text: "LV",
        align: "center",
        sortable: false,
        value: "",
      },
      {
        text: "ACU",
        align: "center",
        sortable: false,
        value: "",
      },
      {
        text: "MAU",
        align: "center",
        sortable: false,
        value: "",

      },
      {
        text: "회원가입율",
        align: "center",
        sortable: false,
        value: "",
      },{
        text: "Drop",
        align: "center",
        sortable: false,
        value: "",
      },
    ],


    MonthlyGameContestHeaders: [
      {text: "", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
      // {text: "LOL", align: "center", sortable: false, value: "", borderRight: "thin solid rgba(0,0,0,0.12)"},
      {
        text: "Contest",
        align: "center",
        sortable: false,
        value: "",
        borderRight: "thin solid rgba(0,0,0,0.12)"
      },
      {
        text: "Rate",
        align: "center",
        sortable: false,
        value: "",
        borderRight: "thin solid rgba(0,0,0,0.12)"
      },
      {
        text: "PC/Mobile",
        align: "center",
        sortable: false,
        value: "",
        borderRight: "thin solid rgba(0,0,0,0.12)"
      }
    ],

    MonthlyJoinGameHeaders: [
      { text: "Game", align: "center", sortable: false, value: "" },
      { text: "Batting Type", align: "center", sortable: false, value: "" },
      { text: "Count", align: "center", sortable: false, value: "" },
      { text: "Entry Cnt", align: "center", sortable: false, value: "" },
      { text: "Fee", align: "center", sortable: false, value: "" },
      { text: "Prize", align: "center", sortable: false, value: "" },
    ],

    PaymentMonthlyStatHeaders: [
      { text: "Sum", align: "center", sortable: false, value: "" },
      { text: "Danal", align: "center", sortable: false, value: "" },
      { text: "Paypal", align: "center", sortable: false, value: "" },
      { text: "etc1", align: "center", sortable: false, value: "" },
      { text: "etc2", align: "center", sortable: false, value: "" },
      { text: "etc3", align: "center", sortable: false, value: "" },
    ],
    ArppuMonthlyData: {
      arppu: '0000 원 / 00'
    },

    MonthlyTicketCntHeaders: [
      { text: "", align: "center", sortable: false, value: "" },
      { text: "In", align: "center", sortable: false, value: "" },
      { text: "Out", align: "center", sortable: false, value: "" },
    ],

    TicketMonthlyStatItem: {
      in: '300',
      out: '300',
    },
    returnMonthList:[],
    returnMonthlyGameConetstList:[],
    returnMonthlyJoinGameList:[],

  }) ,
  beforeMount() {
    store.commit('onProgress');
  },



  mounted() {

    this.getMonthlyGameContest();
    this.getMonthlyLists();
    this.getMonthlyJoinGame();
    this.getMonthlyTicket();
    this.getMonthlyARP();
    store.commit('offProgress');
  },

  methods: {
    // Get_MonthlyARP
    async getMonthlyARP() {
      form.delete("monthDt");

      form.set("monthDt",  this.currentMonth);



      await this.$store
              .dispatch("GETMONTHLYARP", form)
              .then((response) => {
                this.returnMonthlyArpList = [];
                this.returnMonthlyArpList.push({
                  ARPPUPU : response.ARPPUPU
                })


              })

              .catch((error) => {
                console.log(error);
              });
    },
    //Get_MonthlyTicket
    async getMonthlyTicket() {
      form.delete("monthlyDt");

      form.set("monthlyDt", this.currentMonth);

      await this.$store
              .dispatch("GETMONTHLYTICKETCNT", form)
              .then((response) => {
                this.returnMonthlyTicketCountList = response.List;

              })
              .catch((error) => {
                console.log(error);
              });
    },
    //Get_MonthlyJoinGame
    async getMonthlyJoinGame() {
      form.delete("monthlyDt");

      form.set("monthlyDt", this.currentMonth);

      await this.$store
              .dispatch("GETMONTHLYJOINGAME", form)
              .then((response) => {
                this.returnMonthlyJoinGameList = response.GameBatItems;

              })
              .catch((error) => {
                console.log(error);
              });
    },
    //Get_MonthlyGameContest
    async getMonthlyGameContest() {
      form.delete("monthDt");
      // form.delete("page");
      // form.delete("size");
      form.set("monthDt", this.currentMonth);
      // form.set("page", this.page);
      // form.set("size", this.itemsPerPage);

      await this.$store
              .dispatch("GETMONTHLYGAMECONTEST", form)
              .then((response) => {
                this.returnMonthlyGameConetstList = response.List;

                // this.page = response.CurrentPage;
                // this.pageCount = response.totalPages;


              })
              .catch((error) => {
                console.log(error);
              });
    },
    //Get_MonthlyJoinUser
    async getMonthlyLists() {
      form.delete("monthDt");
      form.set("monthDt", this.currentMonth);

      await this.$store
              .dispatch("GETMONTHLISTS", form)
              .then((response) => {
                 this.returnMonthList = response.RESULT;


                // this.SumPusher();
              })
              .catch((error) => {
                console.log(error);
              });
    },
    
    // SumPusher() {
    //   let sumMonthTotal = 0;
    //   let sumMonthNew = 0;
    //   let sumMonthDau = 0;
    //   let sumMonthDrop = 0;
    //   let sumMonthLV = 0;
    //   let sumMonthVisitSite = 0;
    //   let sumMonthCreateUser = 0;
    //   let sumMonthACU = 0;
    //   let sumMonthMAU = 0;
    //   // alert("1");
    //   //     console.log(this.returnDailyJoinuserList);
    //   this.returnMonthList.forEach((it) => {
    //     // console.log(it.contents);
    //     it.contents.forEach((el, index) => {
    //       // console.log(el);
    //       sumMonthTotal += el.getMonthTotal;
    //       sumMonthNew += el.getMonthNew;
    //       sumMonthDau += el.getMonthDau;
    //       sumMonthDrop += el.getMonthDrop;
    //       sumMonthVisitSite += el.getMonthVisitSite;
    //       sumMonthCreateUser += el.getMonthCreateUser;
    //       sumMonthACU += el.getMonthACU;
    //       sumMonthMAU += el.getMonthMAU;
    //       sumMonthLV += el.getMonthLV;
    //
    //       if (index === this.returnMonthList.length - 1) {
    //         this.returnMonthList.push({});
    //       }
    //     })
    //     // sumTotal += it.contents.total;
    //     // sumNew += it.contents.newuser;
    //     // sumDau += it.contents.dau;
    //     // sumDrop += it.contents.drop;
    //
    //   });
    //   this.returnMonthList.push({
    //     Type: 'Sum',
    //     contents: [
    //       {
    //         getMonthTotal: sumMonthTotal,
    //         getMonthNew: sumMonthNew,
    //         getMonthDau: sumMonthDau,
    //         getMonthDrop: sumMonthDrop,
    //         getMonthLV: sumMonthLV,
    //         getMonthVisitSite: sumMonthVisitSite,
    //         getMonthCreateUser: sumMonthCreateUser,
    //         getMonthACU: sumMonthACU,
    //         getMonthMAU: sumMonthMAU,
    //
    //       }
    //     ]
    //   });
    // },
    //월(날짜) 검색
    fn_getSearch(){
      // console.log(this.currentMonth);
      this.getMonthlyGameContest();
      this.getMonthlyLists();
      this.getMonthlyJoinGame();
      this.getMonthlyTicket();
      this.getMonthlyARP();
    },


       fn_MoveRoutes(sId) {
      if(sId == "1") {
       return  this.$router.push({name:"ReportDaily"})
      }else if (sId == "2") {
         return  this.$router.push({name:"ReportWeekly"})
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .tb-border-right {
    border-right: thin solid rgba(0,0,0,0.12);
  }
  .table-board-set > td {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    border-right: thin solid rgba(0, 0, 0, 0.12);
    text-align: center;
  }
  .lastRowTheme {
    background: rosybrown;
  }
  .blueLightTheme {
    background: lightblue;

  }

</style>