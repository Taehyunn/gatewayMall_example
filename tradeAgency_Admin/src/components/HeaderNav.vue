<template>
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawMenuCheck"/>
        <!-- drawer start -->
        <v-navigation-drawer
                app
                v-model="drawer"
                absolute
                dark
                temporary
                class="primary"
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
<!--                        2WinChance 관리시스템-->
                      {{ this.$store.state.selectedGame === undefined ? '2WinChance' : this.$store.state.selectedGame }} 관리시스템
                    </v-list-item-title>
                    <v-divider></v-divider>
                    <v-list nav dense v-if="currentCheckUser">
                        <v-list-item
                                v-for="item in currentMenuList"
                                :key="item.menuIdx"
                                link
                                :to="item.menuAddr"
                                @click="moveMenu(item)"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="item.menuIconStr"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ item.menuName }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
        </v-navigation-drawer>

        <v-toolbar-title
                @click="moveHome"
                style="cursor: pointer"
        >
<!--          2WinChance 관리시스템-->
          {{ this.$store.state.selectedGame }} 관리시스템
        </v-toolbar-title>
        <v-col class="ml-6" color="primary" outlined title style="min-width: 150px">
            {{ curDate }} {{ getCurrentDate() }}


        </v-col>
        <v-spacer></v-spacer>
        <!--    <v-row class="my-6" justify="end" style="min-width: 200px">-->
        <!--      <v-card color="primary" outlined title v-model="nowUser">-->
        <!--        Now User<br />-->
        <!--        {{ getNowUser }}-->

        <!--        <v-badge-->
        <!--            color="green"-->
        <!--            overlap-->
        <!--            content="15"-->
        <!--        ><v-icon >person</v-icon>-->
        <!--        </v-badge>-->
        <!--        <v-icon class="mr-3 ml-3">person_add</v-icon>-->
        <!--        <v-icon class="mr-3">notifications</v-icon>-->
        <!--        <v-col class="text-right pt-7 pr-9">-->
        <!--        <v-badge-->
        <!--            color="green"-->
        <!--            overlap-->
        <!--            content="1000"-->
        <!--        >-->

        <!--          <v-img-->
        <!--              src="@/assets/now.png"-->
        <!--              width="40px"-->
        <!--              height="40px"-->
        <!--              class="pr-lg-5"-->
        <!--          >-->
        <!--          </v-img>-->
        <!--        </v-badge>-->


        <!--        <v-badge-->
        <!--            color="green"-->
        <!--            overlap-->
        <!--            content="1000"-->
        <!--        >-->
        <!--          <v-img-->
        <!--              src="@/assets/new.png"-->
        <!--              width="40px"-->
        <!--              height="40px"-->
        <!--              class="pr-lg-5"-->
        <!--          >-->
        <!--          </v-img>-->
        <!--        </v-badge>-->

        <!--        <v-badge-->
        <!--            color="green"-->
        <!--            overlap-->
        <!--            content="1000"-->
        <!--        >-->
        <!--          <v-img-->
        <!--              src="@/assets/ticket.png"-->
        <!--              width="40px"-->
        <!--              height="40px"-->
        <!--              class="pr-lg-5"-->
        <!--          >-->
        <!--          </v-img>-->
        <!--        </v-badge>-->
        <!--        </v-col>-->
        <!--        <v-img-->
        <!--            src="@/assets/ticket.png"-->
        <!--            width="40px"-->
        <!--            height="40px"-->
        <!--            class="pr-lg-5"-->
        <!--        >-->
        <!--        </v-img>-->
        <!--        Now User<br />-->
        <!--        {{ getNowUser }}-->
        <!--      </v-card>-->
        <!--      <v-card color="primary" outlined title v-model="newUser">-->
        <!--        New User-->
        <!--        {{ newUser }}-->
        <!--      </v-card>-->
        <!--      <v-card color="primary" outlined title v-model="ticketNum">-->
        <!--        Ticket-->
        <!--        {{ ticketNum }}-->
        <!--      </v-card>-->
        <!--    </v-row>-->

        <v-btn text v-if="currentCheckUser" @click="logout()">
            <span class="mr-2" v-if="currentCheckUser">{{ getUserId }} </span>
            <span class="mr-2" v-else>Login</span>
            <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn text v-else href="/login">
            <span class="mr-2">Login</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "HeaderNav",
        data() {
            return {

                currentMenuList: "",
                //메뉴관련
                // menuJSON:JSON.parse(window.localStorage.getItem("MenuList")),
                // menuId:"",
                // menuName:"",
                // UpdateMenuList: this.UpdateMenu,
                nowUser: 0,
                newUser: "",
                ticketNum: "",
                drawer: false,
                checkUser: "",
                curHour: "",
                curMinutes: "",
                curSeconds: "",
                curDate: new Date().toISOString().substr(0, 10),
                items: [

                    {
                        title: "Report",
                        path: "/report",
                    },

                    {
                        title: "품목관리",
                        icon: "mdi-view-dashboard",
                        path: "/codeList",
                    },
                    {
                        title: "발주관리",
                        icon: "mdi-message-text",
                        path: "/OrderList",
                    },
                    {
                        title: "Notice",
                        path: "/boardList",
                    },
                    // {
                    //   title:'Default',
                    //   // icon: 'mdi-home',
                    //   path:'/default'
                    // },
                    {
                        title: "Landing_Main",

                        path: "/landingMain",
                    },
                    {
                        title: "Ticket",
                        path: "/ticket",
                    },
                    {
                        title: "Event",
                        path: "/event",
                    },
                    {
                        title: "Product",
                        path: "/product",
                    },

                    {
                        title: "MngMenu",
                        path: "/mngMenu",
                    },
                ],
                UserAuth: '',
            };
        },

        watch: {
            //  UpdateMenu: function(new_val, old_val){
            //    console.info('UpdateMenu', new_val, old_val);
            //  }
        },
        methods: {
            //상단 '2winChance 관리시스템' 클릭 시 홈페이지 이동
            moveHome() {
                this.$router.push({name: "Landing_Main"});
            },
            //메뉴 클릭 시 해당 Item을 가져온다.
            moveMenu(menuItem) {
                //클릭할때마다 menuItem을 넘겨준다.
                //(2022-05-17) 라우터 이동 => module -> menuinfo.js(MENUCHECK)
                // this.$store.dispatch("MENUCHECK", menuItem);

                //로그인 사용자 권한.
                // let UserAuth = window.localStorage.getItem("UG");
                // console.log("메뉴 아이템: " + menuItem.menuName);

                // console.log(this.currentMenuList);
                this.$store
                    .dispatch("MOVEMENU", {
                        menuName: menuItem.menuName,
                    })
                    .then((response) => {
                        // console.log(response);
                        // 성공시 해당 클릭 메뉴의 경로로 이동한다.
                        //클릭 시 메뉴 명 확인 및 유저권한과 메뉴 권한을 비교하여 로직 수행.

                      //2WinChance 의 경우에만
                        if(window.localStorage.getItem("selectedGame") === '2WinChance') {
                          if (response.Result && this.UserAuth >= menuItem.menuAuth) {
                            this.$router.push({path: menuItem.menuAddr});
                          } else {
                            alert("접근권한이 존재하지 않습니다.");
                            history.back();
                          }
                        }

                    });
            },
            async logout() {
                if (confirm("정말로 로그아웃하시겠습니까?")) {
                    await this.$store.dispatch("LOGOUT").then(() => {
                        this.$router.push({name: "Login"});
                    });
                }
            },
            getCurrentDate() {
                let nowDate = new Date();
                this.curHour = String(nowDate.getHours()).padStart(2, "0");
                this.curMinutes = String(nowDate.getMinutes()).padStart(2, "0");
                this.curSeconds = String(nowDate.getSeconds()).padStart(2, "0");

                return this.curHour + ":" + this.curMinutes + ":" + this.curSeconds;
            },
            getNowUserSet() {
                this.$store.dispatch("UPDATENOWUSER", this.nowUser);
            },
            //  getMenu() {
            //  console.log(JSON.parse(this.menuJSON));
            //  let UpdateMenuList = JSON.parse(this.menuJSON);
            //  console.log(UpdateMenuList);
            // const menuArr = this.menuJSON;
            //  menuArr.forEach((element) => {
            //  console.log(element.menuComp);
            //  this.$router.push({
            //     path: element.menuAddr,
            //     component: () => import(`${element.menuComp}`),
            //      });
            //   });

            // }
            // drawerStart() {
            //     this.drawer = !this.drawer;
            //
            //     this.UpdateMenuList = this.UpdateMenu;
            // },

            drawMenuCheck() {
                this.drawer = !this.drawer;
                // console.log('menu call header');
                this.currentMenuList = JSON.parse(
                    window.localStorage.getItem("MenuList")
                );
                this.UserAuth = window.localStorage.getItem("UG");

                // console.log('menu call header' +  this.currentMenuList[0].menuName);
            }
        },
        computed: {


            //상태에 값을 넣어야 변경 적용이 된다.
            ...mapGetters([
                "currentCheckUser",
                "getNowUser",
                "getUserAuthGrade",
                "UpdateMenu",
                "getUserId",
            ]),
        },

        mounted() {
            setInterval(this.getCurrentDate, 1000);
            //시작
            //  console.log("mounted start");
            //  console.log(this.menuJSON);
            //  const menuArr = this.menuJSON;
            //      menuArr.forEach((element) => {
            //        console.log(element.menuComp);
            //        this.$router.addRoute({
            //           path: element.menuAddr,
            //           component: () => import(`${element.menuComp}`),
            //            });
            //         });

            //끝
            // console.log("mounted and");
            this.getNowUserSet;
        },
        created() {
            console.log("created");
            //created, mounted 둘다 값이 undefined 뜬다.
            //  console.log(this.UpdateMenuOk);
        },
    };
</script>

<style scoped></style>
