<template>
  <alert-dialog
      v-if="alertDialogToggle"
      :timeout="alertDialogInfo.timeout"
      :emoji="alertDialogInfo.emoji"
      :title="alertDialogInfo.title"
      :firstLineText="alertDialogInfo.firstLineText"
      :secondLineText="alertDialogInfo.secondLineText"
      :thirdLineText="alertDialogInfo.thirdLineText"
  ></alert-dialog>
</template>


<script>
import { mapState } from "vuex";
import AlertDialog from "@/views/Components/AlertDialog";

export default {
  components: {
    AlertDialog,
  },
  name: "AlertNav",
  computed: {
    ...mapState(
        [
            "alertDialogToggle",
            "alertDialogInfo"
        ]
    )
  },

}
</script>

<style scoped>

</style>