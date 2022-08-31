<template>
  <!-- :items="returnDetailList"
      :items-per-page="itemsPerPage"
      :page="page"
      class="elevation-1"
      hide-default-footer
      disable-pagination -->

  <v-container>

    <v-card class="mb-6">
      <v-card-title>메인화면 입니다.</v-card-title>
      <v-card-subtitle>
        현재 동시 접속자 수, 신규 가입 유저 수 등을 확인할 수 있습니다. <br />
      </v-card-subtitle>
    </v-card>


    <v-row class="mb-6" v-for="(item,index) in returnMainHeader" :key="index">
   <v-col  >
     <v-card style="height: 100px; ">
       <v-row>
         <v-col class="pt-4">
           <v-card  class="ml-4 text-center" style="width: 80px; height:70px; border-radius: 10%;  " color="primary" dark>
             <v-icon  class="pt-1" style=" font-size: 65px;color: white" >person</v-icon>
           </v-card>
         </v-col>

         <v-col class="pt-5 pr-8 text-right" style="font-size: 15px;">
           Now User
           <div style=" font-size: 30px; font-weight: bold; color: dimgray" >{{item.nowUser}}</div>
         </v-col>
       </v-row>
     </v-card>
   </v-col>
      <v-col  >
        <v-card style=" height: 100px">
          <v-row>
            <v-col class="pt-4">
              <v-card  class="ml-4 text-center" style="width: 80px;height:70px;border-radius: 10%;  " color="primary" dark>
                <v-icon  class="pt-1" style=" font-size: 65px;color: white" >mdi-account-multiple-plus</v-icon>
              </v-card>
            </v-col>

            <v-col class="pt-5 pr-8 text-right" style="font-size: 15px;">
              New User
              <div style=" font-size: 30px; font-weight: bold; color: dimgray" >{{item.newUser}}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col >
        <v-card style=" height: 100px;  ">
          <v-row>
            <v-col class="pt-4">
              <v-card  class="ml-4 text-center" style="width: 80px;height:70px;border-radius: 10%;  " color="primary" dark>
                <v-icon  class="pt-2" style=" font-size: 55px;color: white" >mdi-bell</v-icon>
              </v-card>
            </v-col>

            <v-col class="pt-5 pr-8 text-right" style="font-size: 15px;">
              Ticket
              <div style=" font-size: 30px; font-weight: bold; color: dimgray" >{{item.inTicket}}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mb-6">
      <v-data-table
        dense
        :headers="TopHeaders"
        :items="returnMainUserList"
        hide-default-footer
        hide-default-header

        disable-pagination
      >
        <template v-slot:header="{ props: { headers } }">
          <thead>
          <tr>
            <th  v-for="(header) in headers" :key="header.text"
                 :style="{ textAlign: header.align }"
                 class="tb-border-header"
            >{{ header.text }}
            </th>
          </tr>
          </thead>
        </template>

        <template v-slot:body="{ items }">
        <tbody v-for="(item, index) in items" :key="index">
          <tr class="table-board-set"  >
            <td style=" text-align: center"
                :class="[item.mt_type == 'Sum' ?'blueLightTheme' : 'lastRowTheme'  ]"
            >{{item.mt_type}}</td>
            <td>{{item.totalSignCnt}}</td>
            <td>{{item.todaySignCnt }}</td>
            <td>{{item.yesterdayAccessUserCnt }}</td>
          </tr>
        </tbody>
        </template>

      </v-data-table>
    </v-card>

    <v-card class="mb-6">
      <v-data-table
        dense
        :headers="LowHeaders"
        :items="returnContestList"
        hide-default-footer
        hide-default-header
        disable-pagination
      >
        <template v-slot:header="{ props: { headers } }">
          <thead>
          <tr>
            <th rowspan="1" v-for="(header) in headers" :key="header.text"
                :style="{ textAlign: header.align, borderRight:header.borderRight }"  class="tb-border-header">{{ header.text }}
            </th>
          </tr>
          </thead>
        </template>
<!--        <template v-slot:body="{ items }">-->
<!--          <tbody v-for="(item, index) in items" :key="index">-->
<!--          <tr   >-->
<!--            <td :rowspan="item.contents.length + 1"-->
<!--                style="text-align: center; background: rosybrown"-->

<!--            >{{item.Type }}</td>-->
<!--          </tr>-->
<!--          <tr v-for="(content, idx) in item.contents" :key="idx" class="table-board-set">-->
<!--            <td >-->
<!--              {{content.Contest}}-->
<!--            </td>-->
<!--            <td>{{ content.Rate }}</td>-->
<!--            <td>{{ content.PcMobile }}</td>-->


<!--          </tr>-->
<!--          </tbody>-->
<!--        </template>   -->
        <template v-slot:body="{ items }">
          <tbody >
          <tr v-for="(item, index) in items" :key="index"  class="table-board-set">
            <td style="background: rosybrown">{{item.gc_name }}</td>
            <td >{{item.contestUser }}</td>
            <td >{{item.rateUser }}</td>
            <td >{{item.PCMOBILE }}</td>
          </tr>
          </tbody>
        </template>
<!--        <template v-slot:body="{ items }">-->
<!--          <tbody>-->
<!--          <tr-->
<!--              v-for="(lheader, index) in LowLeftHeaders"-->
<!--              :key="index"-->
<!--          >-->
<!--            <td style="text-align: center;background: rosybrown">{{ lheader.text }}</td>-->

<!--            <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==0" :class="{'grayTheme' : idx==items.length-2}">{{ item.contest }}</td>-->
<!--            <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==1" :class="{'grayTheme' : idx==items.length-2}">{{ item.rate }}</td>-->
<!--            <td v-for="(item, idx) in items" :key="idx" style="text-align: center" v-if="index==2" :class="{'grayTheme' : idx==items.length-2}">{{ item.deviceRate }}</td>-->

<!--          </tr>-->
<!--          </tbody>-->
<!--        </template>-->

      </v-data-table>
    </v-card>

    <v-row no-gutters>
      <v-col sm="4" >
        <v-card >
          <v-data-table
            dense
            :headers="TicketSubHeaders"
            :items="returnMainTicketList"
            hide-default-footer
            hide-default-header
            disable-pagination

          >
            <template v-slot:header="{ props: { headers } }">
              <thead>
              <tr>
                <th rowspan="1" v-for="(header) in headers" :key="header.text"
                    :style="{ textAlign: header.align, borderRight:header.borderRight }"  class="tb-border-header">{{ header.text }}
                </th>
              </tr>
              </thead>
            </template>
            <template v-slot:body="{ items }">
            <tbody v-for="(item,index) in items" :key="index">
              <tr   style="text-align: center" class="table-board-set" >
                <td style="text-align: center; background: rosybrown">Ticket</td>
                <td >
                  {{item.inTicket }}
                </td>
                <td >
                  {{item.outTicket }}
                </td>
              </tr>
            </tbody>
            </template>

          </v-data-table>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col sm="6" lg="6" offset-lg="2">
        <v-card >
          <v-data-table
            dense
            :headers="Tableitems3"
            hide-default-footer
            disable-pagination

          >

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import store from "@/store/index.js";

  let form = new FormData();
  export default {
    name: "Landing_Main",

    created() {
      // console.dir(new Date());
      // console.log(this.currentDate.curHour);
      // console.log(new Date().toTimeString().slice(9));
      //브라우저로 종료 후 재접속 시 토큰 없으면 강제 로그아웃.
      console.log("created 탓음")
      if (window.sessionStorage.getItem("AT") == null) {
        store.commit('PURGEAUTH')
        this.$router.push({ name: "Login" });
      }
    },


    beforeMount() {
      store.commit('onProgress');
    },

    mounted() {


        this.getMainTicket();
        this.getMainUser();
        this.getMainContest();
        this.getMainHeader();
        this.TopItemPusher();
      store.commit('offProgress');
      setInterval(this.getCurrentDate, 1000);

    },


    // beforeUnmount() {
    //   window.removeEventListener("beforeunload", this.unloadEvents);
    // },
    // beforeRouteLeave(to, from, next) {
    //   const answer = window.confirm(
    //     "저장되지 않은 작업이 있습니다! 정말 나갈까요?"
    //   );
    //   if (answer) {
    //     window.localStorage.removeItem("MenuList");
    //     next();
    //   } else {
    //     next(false);
    //   }
    // },
    data: () => ({

      returnMainUserList:[],
      canLeaveSite: true,
      returnContestList:[],
      returnMainTicketList:[],

      TopLeftHeaders: [
        {
          text: "Total",
          align: "center",
          sortable: false,
          value: "",
        },
        {
          text: "New",
          align: "center",
          sortable: false,
          value: "",
        },
        {
          text: "DAU (D-1)",
          align: "center",
          sortable: false,
          value: "",
        },
      ],



      TopHeaders: [
        { text: "", align: "center", sortable: false, value: "" },
        { text: "Total", align: "center", sortable: false, value: "" },
        {
          text: "New",
          align: "center",
          sortable: false,
          value: "",
        },
        {
          text: "DAU(D-1)",
          align: "center",
          sortable: false,
          value: "",
        },

      ],
      LowLeftHeaders: [
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
      LowItems: [
        {
          contest: '280/280 (280)',
          rate: '98.71% / 100%',
          deviceRate: '271/9',
        },
        {
          contest: '480/580 (580)',
          rate: '94.71% / 100%',
          deviceRate: '418/62',
        },
        {
          contest: '280/280 (280)',
          rate: '98.71% / 100%',
          deviceRate: '271/9',
        },
        {
          contest: '280/280 (280)',
          rate: '98.71% / 100%',
          deviceRate: '271/9',
        },
      ],


      LowHeaders: [
        { text: "", align: "center", sortable: false, value: "" },
        { text: "Contest", align: "center", sortable: false, value: "" },
        {
          text: "Rate",
          align: "center",
          sortable: false,
          value: "",
        },
        {
          text: "PC/Mobile",
          align: "center",
          sortable: false,
          value: "",
        },

      ],
      //Tableitems3
      TicketSubHeaders: [
        { text: "", align: "center", sortable: false, value: "" },
        { text: "Waiting", align: "center", sortable: false, value: "" },
        {
          text: "Answer",
          align: "center",
          sortable: false,
          value: "",
        },
      ],
      //Tableitems4
      Tableitems3: [
        { text: "현재", align: "center", sortable: false, value: "" },
        { text: "Waiting", align: "center", sortable: false, value: "" },
        {
          text: "Server",
          align: "center",
          sortable: false,
          value: "",
        },
        {
          text: "Sell",
          align: "center",
          sortable: false,
          value: "",
        },
        {
          text: "Sale",
          align: "center",
          sortable: false,
          value: "",
        },
      ],
      returnMainHeader:[],
    }),
    methods: {
      //Get_MainContest
      async getMainContest() {
        // form.delete("dt");
        // form.delete("page");
        // form.delete("size");
        // form.set("dt", "2022-01-13");
        // form.set("page", this.page);
        // form.set("size", this.itemsPerPage);

        await this.$store
                .dispatch("GETMAINCONTEST", form)
                .then((response) => {
                  this.returnContestList = response.List;

                })
                .catch((error) => {
                  console.log(error);
                });
      },
      async getMainHeader() {
        await this.$store
                .dispatch("GETMAINHEADER")
                .then((response) => {
                  this.returnMainHeader = response.List;

                })
                .catch((error) => {
                  console.log(error);
                });
      },
      async getMainTicket() {
        await this.$store
                .dispatch("GETMAINTICKET")
                .then((response) => {
                  this.returnMainTicketList = response.List;

                })
                .catch((error) => {
                  console.log(error);
                });
      },
      async getMainUser() {
        await this.$store
                .dispatch("GETMAINUSER")
                .then((response) => {
                  this.returnMainUserList = response.List;

                  this.TopItemPusher();

                })
                .catch((error) => {
                  console.log(error);
                });
      },
      TopItemPusher() {
        let sumTotal = 0;
        let sumNew = 0;
        let sumDau = 0;


        this.returnMainUserList.forEach((it) => {
          sumTotal += Number(it.totalSignCnt);
          sumNew += Number(it.todaySignCnt);
          sumDau += Number(it.yesterdayAccessUserCnt);

        });

        this.returnMainUserList.push({
          mt_type:"Sum",
          totalSignCnt: sumTotal,
          todaySignCnt: sumNew,
          yesterdayAccessUserCnt: sumDau,

        });
      },

      // unloadEvents(event) {
      //   if (this.canLeaveSite) {
      //     event.preventDefault();
      //     event.returnValue = "떠나시겠습니까?";
      //     // console.log(event);
      //     return this.$store.dispatch("LOGOUT");
      //   }
      // },
    },
  };
</script>

<style lang="scss">
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
  .tb-border-header {
    border-right: thin solid rgba(0, 0, 0, 0.12);
  }


</style>
