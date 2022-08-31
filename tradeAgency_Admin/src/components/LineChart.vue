<template>
    <div >
        <v-row justify="end" class=" pr-4 pt-2">
<!--            <v-btn color="primary" >-->
<!--                     <span class="material-icons" style="color:white">-->
<!--                    download_for_offline-->
<!--                     </span>-->
<!--            </v-btn>-->

        </v-row>
        <canvas
                ref="lineChart"

        />

    </div>
</template>

<script>
    import {Chart, registerables} from 'chart.js'

    //registerables
    Chart.register(...registerables)
    let chart;
    export default {
        data: () => ({
           excelList:[],

        }),
        mounted() {
            this.createChart()
        },
        methods: {


            createChart() {
                this.$store.dispatch("GETCHARTDATA").then((response) => {
                    if (response.res_code == 200) {
                        let listName = response.list.pkName;
                        // console.log(listName);
                        let chartLists = response.list;
                        let listElements = [];
                        //객체를 반복하여 배열에 추가.
                        for (let i in chartLists) {
                            listElements.push(chartLists[i]);
                        }
                        let listFilter = listElements.slice(3, 27);
                        chart = new Chart(this.$refs.lineChart, {
                            data: {
                                labels: [
                                    "01",
                                    '02',
                                    '03',
                                    '04',
                                    '05',
                                    '06',
                                    '07',
                                    '08',
                                    '09',
                                    '10',
                                    '11',
                                    '12',
                                    '13',
                                    '14',
                                    '15',
                                    '16',
                                    '17',
                                    '18',
                                    '19',
                                    '20',
                                    '21',
                                    '22',
                                    '23',
                                    '24',

                                ],
                                datasets: [{
                                    label: listName,
                                    type: 'line',
                                    data: listFilter,
                                    options: this.options,
                                    order: 1,
                                    borderWidth: 2,
                                    pointBackgroundColor: "primary",
                                    pointBorderColor: "primary",
                                    borderColor: "primary",
                                    backgroundColor: "primary",
                                },
                                    {
                                        label: "barChart",
                                        type: 'bar',
                                        data: listFilter,
                                        order: 2,
                                        backgroundColor: 'rgba(201, 203, 207, 0.5)',
                                        maxBarThickness: 15,


                                    }

                                ],


                            },

                            options: {
                                //차트 타이틀 제목 설정
                                // plugins: {
                                //     title: {
                                //
                                //         display: true,
                                //         text: 'Report_Daily',
                                //         font: {
                                //             size: 24
                                //
                                //         },
                                //     }
                                // },

                                scales: {
                                    y: {
                                        // min:0,
                                        // step:10,
                                        // max:200,
                                        beginAtZero: true
                                    }
                                }
                            },


                        })

                        // chart.data.datasets.push({
                        //     label: listName,
                        //     data: listFilter,
                        //     borderWidth: 1,
                        //     backgroundColor: "black",
                        //     pointBackgroundColor: "black",
                        //     pointBorderColor: "black",
                        //     borderColor: "black",
                        //
                        // });
                        // chart.data.datasets[0].label = listName;
                        // chart.data.labels = [
                        //
                        //     "01",
                        //     '02',
                        //     '03',
                        //     '04',
                        //     '05',
                        //     '06',
                        //     '07',
                        //     '08',
                        //     '09',
                        //     '10',
                        //     '11',
                        //     '12',
                        //     '13',
                        //     '14',
                        //     '15',
                        //     '16',
                        //     '17',
                        //     '18',
                        //     '19',
                        //     '20',
                        //     '21',
                        //     '22',
                        //     '23',
                        //     '24',
                        //
                        // ]
                        chart.update()

                        // console.log(this.data);
                    }
                })


            }
        }
    }
</script>