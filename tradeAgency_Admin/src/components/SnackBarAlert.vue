<template>

    <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
    >
        {{ text }} : {{ticketCount}}

        <template v-slot:action="{ attrs }">
            <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>

</template>

<script>
    export default  {
        name:"SnackBarAlert",

        data: () => ({
            snackbar: false,
            text: '새로운 티켓이 도착했습니다.',
            timeout: 1500,
            ticketCount: 1,
        }),
        mounted() {
            setInterval(() =>this.fn_CallSnakBar(), 600000 );
        },
        methods: {
            async fn_CallSnakBar() {
                    // alert("성공");
                    await this.$store.dispatch("GETTICKETCNT10M").then((response)=> {
                      if(response.RES_CODE == 200){

                        // alert(response.COUNT);
                        // console.log("ticket 10분마다 호출 : " + response);
                        this.ticketCount = response.COUNT;
                        if( 0 < this.ticketCount ) {
                            this.snackbar = true;
                        }
                      }
                    }).catch(error => {
                      console.log(error);
                    });

                }
            }
        }


</script>