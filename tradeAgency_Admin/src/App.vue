<template>
  <v-app>
    <div v-if="currentCheckUser">
      <HeaderNav />
      <!--  알림창 가지고 있기  -->
      <AlertNav />
<!--      <v-snackbar-->
<!--              v-model="snackbar"-->
<!--              :timeout="timeout"-->
<!--      >-->
<!--        {{ text }}-->

<!--        <template v-slot:action="{ attrs }">-->
<!--          <v-btn-->
<!--                  color="blue"-->
<!--                  text-->
<!--                  v-bind="attrs"-->
<!--                  @click="snackbar = false"-->
<!--          >-->
<!--            Close-->
<!--          </v-btn>-->
<!--        </template>-->
<!--      </v-snackbar>-->
      <SnackBarAlert/>
    </div>

    <v-main>
      <router-view />
      <v-container fluid> </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import HeaderNav from "@/components/HeaderNav";
  import AlertNav from "@/components/AlertNav";
  import SnackBarAlert from "@/components/SnackBarAlert"
  // import ProgressCircular from "@/components/ProgressCircular"
  // import commonService from "@/common/common_fn_service"

  import { mapGetters } from "vuex";

  export default {
    name: "App",
    components: { HeaderNav, AlertNav,SnackBarAlert },
    data: () => ({

      //
      // snackbar: false,
      // text: '새로운 티켓이 도착했습니다.',
      // timeout: 1500,
    }),
    computed: {
      //상태에 값을 넣어야 변경 적용이 된다.
      ...mapGetters(["currentCheckUser"]),
    },


    mounted() {
      // if(JSON.parse(window.sessionStorage.getItem("AT")).token === null) {
      //   alert("장시간 활동이 없어 자동으로 로그아웃 되었습니다.");
      //
      // }
     // this.fn_AtCheck();

    },


    // mounted() {
    //   this.fn_CallSnakBar();
    // },
    methods: {
    // fn_AtCheck() {
    //   const ATexpDt = window.localStorage.getItem("ATexpDt");
    //   let endTime = new Date(Number(ATexpDt));
    //   let startTime = new Date();
    //   commonService.getBetweenDiffMinutes(startTime, endTime);
    // },
     // fn_CallSnakBar() {
     //   setInterval(()=> {
     //     // alert("성공");
     //     // this.$store.dispatch("").then((response)=> {
     //     //   if(response.res_code == 200){
     //     //     this.snackbar = true;
     //     //
     //     //   }
     //     // }).catch(error => {
     //     //   console.log(error);
     //     // });
     //  this.snackbar = true;
     //   },600000)
     // }
    }
  };
</script>
