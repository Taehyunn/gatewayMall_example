<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Job Log화면 입니다.</v-card-title>
        </v-card>
        <v-card class="mb-6">
            <v-row class="pl-1 pr-4">
                <v-col md="3">
                    <v-select
                            item-text="job_logName"
                            item-value="job_logId"
                            label="선택"
                            :items="job_logItems"
                            required
                            v-model="job_logItem"
                            return-object

                            class="pl-3"
                    ></v-select>
                </v-col>

                <v-col>
                    <v-text-field
                            prepend-inner-icon="mdi-magnify"
                            label=" 검색"
                    ></v-text-field>
                </v-col>

                <v-col class="pt-6">
                    <v-btn block color="primary" @click.prevent="getJobLogSearch">검색 </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card >

            <v-data-table
                    dense
                    :headers="job_logHeaders"
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
                    v-model="logPage"
                    :length="logPageCount"
                    @input="JobLogHandlepage"
            ></v-pagination>
        </div>


    </v-container>
</template>

<script>

    export default {
        name: "JobLog",
        data: ()=> ({


            logPage:1,
            logPageCount:0,

            job_logItem:{job_logId:1, job_logName: "JOB ID"},
            job_logItems: [
                {
                    job_logId: 1,
                    job_logName: "JOB ID",
                },
                {
                    job_logId: 2,
                    job_logName: "RESULT",
                },
            ],
            job_logHeaders:[
                {
                    text: "JOB ID",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "JOB RESULT",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "JOB METHOD",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "EXEC_TIME",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "START_TIME",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "ERROR_REASON",
                    align: "center",
                    sortable: false,
                    value: "",
                },
            ]
        }),
        methods: {
            getJobLogSearch() {

            },
            JobLogHandlepage() {},



        }


    };
</script>
