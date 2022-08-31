<template >
    <div class="ProgressPosition">
        <v-progress-circular
                indeterminate
                color="black"
                :size="60"
                :width="6"
        ></v-progress-circular>
    </div>

</template>
<!--                v-if="alertProgressCircular"-->
<script>
    import {mapState} from "vuex";

    export default {
        name: "ProgressCircular",
        data:()=>({

        }),
        computed: {
            ...mapState(
                [
                    'alertProgressCircular'
                ]
            )
        },

    }
</script>

<style scoped>
.ProgressPosition {
    position: fixed;
    top:50%;
    left:50%;
    z-index: 10;

}
</style>