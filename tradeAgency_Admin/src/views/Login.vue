<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <v-img src="@/assets/login_main_640.jpg" height="200"></v-img>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-select
                      :items="gameList"
                      item-text="name"
                      item-value="value"
                      v-model="selectedGame"
                      @change="setSelectGame"
                  >
                  </v-select>
                  <v-text-field
                    label="아이디를 입력해주세요"
                    name="memberId"
                    v-model="memberId"
                    :rules="[() => !!memberId || '아이디는 필수입니다.']"
                    prepend-inner-icon="mdi-account"
                    type="text"
                    class="rounded-0"
                    required
                  >
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-text-field
                    label="비밀번호를 입력해주세요"
                    name="memberPwd"
                    v-model="memberPwd"
                    :rules="[() => !!memberPwd || '비밀번호는 필수입니다.']"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="rounded-0"
                    required
                    @keyup.enter="login()"
                  >
                  </v-text-field>
                  <v-spacer></v-spacer>

                  <v-btn
                    class="rounded-0"
                    color="#000000"
                    x-large
                    block
                    dark
                    @click.prevent="login()"
                    >Login</v-btn
                  >
                  <!-- <v-card-actions class="text--secondary">
                  <v-checkbox color="#000000" label ="Remember me"></v-checkbox>
                </v-card-actions> -->
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mapGetters } from "vuex";
  import axios from "axios";

  export default {
    name: "Login",
    data() {
      return {
        selectedGame:
        this.$store.state.selectedGame
        ,
        gameList: [
          {
            name: '투윈챈스',
            value: '2WinChance'
          },
          {
            name: '투윈플러스',
            value: '2WinPlus'
          }
        ],

        count:0,
        memberId: "",
        memberPwd: "",
        // error: false
        canLeaveSite: true,
      };
    },
    methods: {
      // TODO: SelectBox 에서 게임을 뭘 선택했느냐에 따라 axios default base url을 변경해주자
      // TODO: axios 인터셉트에 적용시킬 예정 ====> main.js
      setSelectGame() {
        // this.$store.state.selectedGame = this.selectedGame;
        this.$store.state.selectedGame = this.selectedGame;
        window.localStorage.setItem("selectedGame", this.selectedGame);

        console.log(window.localStorage.getItem("selectedGame"));
      },

      async logout() {
          await this.$store.dispatch("LOGOUT").then(() => {
            this.$router.push({ name: "Login" });
          });
      },
      login() {
        //validate 추가
        if (this.$refs.form.validate()) {
          this.setSelectGame();
          this.$store
            .dispatch("LOGIN", {
              memberId: this.memberId,
              memberPwd: this.memberPwd,
            })
            .then((data) => {
              if (data.res_code == 401) {
                alert("일치하는 정보가 존재하지 않습니다.");
              } else {
                // console.log(data);
                //Promise로 받아오고 있지만 왜인지 시점의 문제가 발생중 따라서 임시방편으로 아래와 해결
                /*window.localStorage.removeItem("AT");
                window.localStorage.setItem("AT", data.at);*/

                // console.log( new Date(data.expDt).toLocaleTimeString().substr(3));
                //  console.log(data);
                if(data.res_code == 200) {
                  //인터셉트를 적용하긴 했으나, baseURL 지정
                  if(this.selectedGame === '2WinChance') {
                    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL_TWOWINCHANCE;
                  } else if(this.selectedGame === '2WinPlus') {
                    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL_TWOWINPLUS;
                  }

                  //로그인 성공 시 localstorge에 menu를 받아와서 넣어준다.
                  //stringify로 넣고 parse해서 출력해서 사용.
                  this.$store.dispatch("UPDATEMENUS").then((response) => {
                    // window.localStorage.setItem(
                    //   "MenuList",
                    //   JSON.stringify(response.menuList)
                    // );
                    // let MenuListsItems = JSON.parse(
                    //         window.localStorage.getItem("MenuList")
                    // );
                    let MenuListsItems = response.menuList;
                    console.log(response);
                    MenuListsItems.forEach(el => {
                      // console.log("1", el);
                      el.icon = 'mdi-account'
                      // console.log("2", el)
                    })
                    window.localStorage.setItem(
                        "MenuList",
                        JSON.stringify(MenuListsItems)
                    );


                  });
                  //  console.log(response.menuList);
                  //  console.log("UpdateMenu : " + this.UpdateMenu);
                  //  window.localStorage.setItem("MenuList", JSON.stringify(response.menuList));

                  //  const menuOutput = window.localStorage.getItem("MenuList");
                  //  console.log(JSON.parse(menuOutput));
                  //  })
                  //  this.$router.addRoute({
                  //     name: "boardList",
                  //     path: "/boardList",
                  //     component: () => import("@/views/Notice/BoardList.vue")
                  //   });

                  // this.addRouter().then((response)=>{
                  //   console.log(response);
                  // });

                  //성공했을때는 페이지 이동을 해준다.
                  //menu 생성후에 이동
                  //Landing_Main로 이동.
                  this.$router.push({ name: "Landing_Main" });
                }
              }
            });
          // .catch(error => {
          //   this.error = true;
          // })
        }
      },
      // loginCheck() {
      //   if (
      //     this.$store.getters.currentCheckUser !== null ||
      //     this.$store.getters.currentCheckUser != ""
      //   ) {
      //     this.$router.push({ name: "OrderList" });
      //   } else {
      //     this.$router.push({ name: "Login" });
      //   }
      // },
      // unLoadEvent(e) {
      //   if (this.canLeaveSite) {
      //     this.$store.dispatch("LOGOUT");
      //     const confirmMessage = "떠나시겠습니까?";
      //     e.returnValue = confirmMessage;
      //     console.log("unLoadEvent confirmmessage:" + confirmMessage);
      //     return confirmMessage;
      //   }
      // },
    },
    created() {
     if(this.currentCheckUser != null) {
       history.back();
     }else {
       this.$router.push({name:"Login"})

     }
    },
    mounted() {
      // this.loginCheck();
      // console.log("MenuList(getters가져온것) : " + this.UpdateMenu);

    console.log("mounted")

    },


    computed: {
      //상태에 값을 넣어야 변경 적용이 된다.
      ...mapGetters(["UpdateMenu","currentCheckUser"]),
    },
  };
</script>

<style scoped></style>
