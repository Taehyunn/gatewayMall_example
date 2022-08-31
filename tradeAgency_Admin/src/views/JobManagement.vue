<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Job management화면 입니다.</v-card-title>
        </v-card>
        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col md="3">
                    <v-select
                            item-text="job_Name"
                            item-value="job_Id"
                            label="선택"
                            :items="job_items"
                            required
                            v-model="job_li"
                            return-object

                            class="pl-3"
                    ></v-select>
                </v-col>

                <v-col>
                    <v-text-field
                            prepend-inner-icon="mdi-magnify"
                            label="검색"
                    ></v-text-field>
                </v-col>

                <v-col class="pt-6">
                    <v-btn block color="primary" @click.prevent="getJobSearch">검색 </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card >

            <v-data-table
                    dense
                    :headers="job_headers"
                    hide-default-footer
                    disable-pagination
            >
                <!-- <template v-slot:item="{ item }" >
                <tr @click="rowClick(item)">
                  <td >{{item.deliveryDt}}</td>
                  <td style="text-align:center">{{item.orderDt}}</td>
                  <td style="text-align:center">{{commaField(item.totalPrice)}}</td>
                  <td style="text-align:center">{{item.regId}}</td>
                  <td style="text-align:center">{{item.useYn}}</td>

                </tr>
              </template> -->
            </v-data-table>
        </v-card>
        <div  class="text-center pt-2">
        <v-pagination
                v-model="job_page"
                :length="job_pageCount"
                @input="JobHandlepage"
        ></v-pagination>
        </div>
        <template >
            <v-row class="d-flex justify-end mr-3 pt-3 mb-3">
                <v-btn
                        color="primary"
                        dark
                        class="text-right mr2"
                        @click="JobAddStart">
                    JOB 등록
                </v-btn>
            </v-row>
        </template>
        <v-dialog v-model="dialog" width="450">
            <v-card>
                <v-card-title class="text-h5 primary white--text">
                    JOB 등록
                </v-card-title>
                <v-text-field
                        label="JOB ID"
                        hide-details="auto"
                        class="pt-5 pl-4 pr-4"
                ></v-text-field>
                <v-text-field
                        label="설명"
                        hide-details="auto"
                        class="pt-5 pl-4 pr-4"
                >
                </v-text-field>
                <v-text-field
                        label="실행주기"
                        class="pt-5 pl-4 pr-4"
                        hide-details="auto"
                >
                </v-text-field>
                <small class=" pl-4">*기본값: 매 5분 0초마다(0 0/5 *** ?)</small>

<!--                <v-select-->
<!--                        v-model="Cm_editedItem.CommonUseStatus"-->
<!--                        class="pl-4 pr-4"-->
<!--                        label="사용유무"-->
<!--                        :items="useYnItems1"-->
<!--                        item-text="E_stName"-->
<!--                        item-value="E_stValue"-->
<!--                        style="width: 200px"-->
<!--                        required-->
<!--                ></v-select>-->

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click="JobCancel"> 취소 </v-btn>
                    <v-btn color="primary" dark @click="JobSave"> 확인 </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--Job 수정 팝업-->
        <v-dialog v-model="eDialog" width="450">
            <v-card>
                <v-card-title class="text-h5 primary white--text">
                    JOB 수정
                </v-card-title>
                <v-text-field
                        label="JOB ID"
                        hide-details="auto"
                        class="pl-4 pr-4"
                ></v-text-field>
                <v-text-field
                        label="설명"
                        hide-details="auto"
                        class="pl-4 pr-4"
                >
                </v-text-field>
                <v-text-field
                        label="실행주기"
                        class="pl-4 pr-4"
                        hide-details="auto"
                >
                </v-text-field>
                <v-col class="pt-3 pl-4">*기본값: 매 5분 0초마다(0 0/5 *** ?)
                </v-col>
                <v-select
                        v-model="job_editedItem.jobUseStatus"
                        class="pl-4 pr-4"
                        label="사용유무"
                        :items="useYnItems"
                        item-text="useYnName"
                        item-value="useYnValue"
                        style="width: 200px"
                        required
                ></v-select>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="JobCancel"> Cancel </v-btn>
                    <v-btn color="primary" text @click="JobSave"> Enter </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "JobManagement",
        data: ()=> ({
            useYnItems: [
                { id: "useYn", useYnName: "사용", useYnValue: "Y" },
                { id: "useYn", useYnName: "미사용", useYnValue: "N" },
            ],
            dialog:false,
            eDialog:false,
            job_page:1,
            job_pageCount:0,
            job_items: [
                {
                    job_Id: 1,
                    job_Name: "JOB ID",
                },
                {
                    job_Id: 2,
                    job_Name: "JOB DESC",
                },
            ],
            job_editedItem: {
                jobId: "",
                jobName: "",
                jobRegister: "",
                jobRemark: "",
                jobBatch: "",
                jobUseStatus: "",
            },
            job_li:{job_Id:1, job_Name: "JOB ID"},
            job_headers:[
                {
                    text: "JOB ID",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "JOB DESC",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "JOB CYCLE",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "등록자",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "등록일",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "사용여부",
                    align: "center",
                    sortable: false,
                    value: "",
                },
            ]
        }),
        methods: {
            getJobSearch() {
                
            },
            JobHandlepage() {},
            JobAddStart() {
                this.dialog =true;
            },
            JobCancel() {
                if(this.dialog) {
                    this.dialog = false;
                }
            },
            JobSave(){

            },
            

        }


    };
</script>
