<template>
  <v-dialog v-model="dialogToggle" width="900"
            @close="fn_cancel"
  >
    <v-card style="overflow-x: hidden; overflow-y:hidden">
      <v-card-title class="text-h5 primary white--text">
        게임소개 저장
      </v-card-title>
      <!--제목 입력-->
      <v-row class=" pt-5 pl-4 pr-4" width="700">
        <v-text-field
            v-model="gameItrdObject.tabName"
            label="종목"
            hide-details="auto"
            class="pl-4 pr-4"
            :rules="tabNameRules"
            required
        />
        <v-text-field
            v-model="gameItrdObject.sortOrder"
            oninput="javascript: this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
            label="정렬순서"
            hide-details="auto"
            class="pl-4 pr-4"
            :rules="sortOrderRules"
            required
        />
        <v-select
            v-model=gameItrdObject.useYn
            class="pl-8"
            label="사용유무"
            :items="useYnItems"
            required
        ></v-select>
      </v-row>
      <!--vue Editor-->
      <vue-editor
          v-model="gameItrdObject.gameUsage"
          class="mb-2 pl-4 pr-4 mt-10"
          useCustomImageHandler
          @image-added="handleImageAdded"
      ></vue-editor>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" dark @click="fn_delete"> 삭제</v-btn>
        <v-btn color="primary" dark @click="fn_cancel"> 취소</v-btn>
        <v-btn color="primary" dark @click="fn_save"> 등록</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "GameItrdRegDialog",
  props: {
    regFormDialogToggle: Boolean,
    selGameItrdObject: Object,
    saveType: String
  },
  data: () => {
    return {
      useYnItems: [
        'Y', 'N'
      ],
      gameItrdObject: {
        //사용여부는 기본값을 Y로
        useYn: 'Y',
        sortOrder: 0,
        tabName: '',
        gameUsage: ''
      },
      dialogToggle: false,
      tabNameRules: [
        v => !!v || '종목은 필수 입력사항입니다.'
      ],
      sortOrderRules: [
        v => /^[0-9]*$/.test(v) || '숫자만 입력 가능합니다.'
      ]
    }
  },
  watch: {
    'selGameItrdObject': function () {
      this.gameItrdObject = this.selGameItrdObject;
    },
    'regFormDialogToggle': function () {
      this.dialogToggle = this.regFormDialogToggle;
    },
    //자식컴포넌트와 부모컴포넌트의 값 일치화
    'dialogToggle': function () {
      this.$emit('syncDialogToggle', this.dialogToggle);
    }
  },
  methods: {
    fn_delete() {
      let gameItrdForm = new FormData();

      gameItrdForm.append('gameIdx', this.gameItrdObject.gameIdx);
      gameItrdForm.append('upId', this.getUserId);
      gameItrdForm.append('useYn', 'N');

      this.fetchSave(gameItrdForm, 'D');
    },
    fn_cancel() {
      this.dialogToggle = false;
      this.$emit('closeDialog');
    },
    fn_save() {
      let formData = new FormData();

      formData.append('tabName', this.gameItrdObject.tabName);
      formData.append('sortOrder', this.gameItrdObject.sortOrder);
      formData.append('useYn', this.gameItrdObject.useYn);
      formData.append('gameUsage', this.gameItrdObject.gameUsage);

      this.fetchSave(formData, this.saveType);
    },
    fetchSave(gameItrdForm, saveType) {
      let url = '';
      if (saveType === 'U') {                //업데이트
        gameItrdForm.append('gameIdx', this.gameItrdObject.gameIdx);
        gameItrdForm.append('upId', this.getUserId);
        url = '/api/v1/USet_GameItrd';
      } else if (saveType === 'I') {         // 등록
        gameItrdForm.append('regId', this.getUserId);
        url = '/api/v1/ISet_GameItrd';
      } else if (saveType === 'D') {
        url = '/api/v1/DSet_GameItrd';
      }

      axios.post(url, gameItrdForm)
          .then(resp => {
            console.log(resp);

            if (resp.status === 200) {
              this.openAlert({
                emoji: "✅",
                title: "성공적으로 저장 되었습니다.",
                secondLineText: "IamPick",
              });
            } else {
              this.openAlert({
                emoji: "❌",
                title: "요청에 실패하였습니다.",
                secondLineText: "IamPick",
              });
            }
          }).catch(error => {
        this.openAlert({
          emoji: "❌",
          title: "예기치 못한 오류가 발생하였습니다.",
          firstLineText: "관리자에게 문의해주세요.",
          secondLineText: "IamPick",
        });
        console.error(error);
      }).finally(() => {
        this.$emit('itrdSaveComplete');
        this.dialogToggle = false;
      });



    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append('atchFile', file);
      formData.append('register', this.getUserId);

      axios.create()
          .post('https://image.impick.co.kr/2winplus/ISET_EditorImage.do', formData)
          .then(resp => {
            console.log(resp);
            const url = resp.data.imgUrl;
            Editor.insertEmbed(cursorLocation, 'image', url);
            resetUploader();
          }).catch(error => {
        console.error(error);
      });
    },
    openAlert(dialogInfo) {
      let alertDialogInfo = dialogInfo
      this.$store.dispatch("openAlertDialog", alertDialogInfo)
    },
  },
  mounted() {
    console.log(this.gameItrdObject);
  },
  computed: {
    ...mapGetters(["getUserId"])
  }

}
</script>

<style scoped>

</style>