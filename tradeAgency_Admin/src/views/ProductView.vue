<template>
    <v-container>
        <v-card class="mb-6">
            <v-card-title>Product화면 입니다.</v-card-title>
        </v-card>

        <v-card class="mb-6">
            <v-row class="pl-4 pr-4">
                <v-col md="3">
                    <v-select
                            item-text="selectName"
                            item-value="selectId"
                            label="선택"
                            :items="selectItems"
                            required
                            v-model="selectCon"
                            return-object
                            style="width: 450px"


                    ></v-select>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mb-6">
            <template>
                <v-col class="pt-6">
              <span

              >{{selectCon.selectName}} Product List </span>
                    <v-btn
                            color="primary "
                            dark
                            class="text-Center ml-3"
                            @click.prevent="ProductRegFn"

                    >
                        Product Reg
                    </v-btn>
                </v-col>
            </template>
            <v-dialog v-model="dialog" width="800">

                <v-card style="overflow-x: hidden">
                    <v-card-title
                            class="text-h5 primary white--text"

                    >
                        Product 등록
                    </v-card-title>
                    <v-row class=" pt-5 pl-4 pr-4" width="700">
                        <v-text-field
                                label="Product Name"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                        >
                        </v-text-field>

                    </v-row>

                    <v-row class="pl-4 pr-4" width="700">
                        <v-text-field
                                label="Result FP"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                        >
                        </v-text-field>
                        <v-text-field
                                label="Buy Price"
                                hide-details="auto"
                                class="pt-5 pr-4"
                        >
                        </v-text-field>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                    label="Product"
                                    class="pl-5 pr-1"
                                    hide-details="auto"

                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="pt-7">
                            <v-btn color="primary">Reg</v-btn>
                        </v-col>
                    </v-row>


                    <v-row class="  pl-4 pr-4" width="700">
                        <small class=" pl-4 mb-8">
                            * 등록된 상품 노출 영역
                        </small>
                    </v-row>


                    <v-file-input
                            v-for=" (imgRow, index) in imageUploadList" v-bind:key="index"
                            class="pl-4 pr-4"
                            show-size
                            dense
                            accept="image/png, image/jpeg, image/bmp"
                            v-model="imgfileItem"
                            prepend-icon="mdi-camera"
                            label="Image Upload"

                    ></v-file-input>
                    <v-row dense class=" pl-6 ">
                        <v-btn @click.prevent="fn_addImageFile">이미지 파일 추가</v-btn>
                        <small class="pl-6 pt-3"> * 120 x 120 JPG, PNG Upload</small>
                    </v-row>


                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="fn_Cancel">취소</v-btn>
                        <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>
                    </v-card-actions>
                </v-card>
                <!--        수정 영역-->
            </v-dialog>
            <v-dialog v-model="eDialog" width="800">

                <v-card style="overflow-x: hidden">
                    <v-card-title
                            class="text-h5 primary white--text"

                    >
                        Product 수정
                    </v-card-title>
                    <v-row class=" pt-5 pl-4 pr-4" width="700">
                        <v-text-field
                                label="Product Name"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                        >
                        </v-text-field>
                        <v-text-field
                                label="Admin ID"
                                hide-details="auto"
                                class="pt-5 pr-4"
                                readonly
                        >
                        </v-text-field>
                    </v-row>

                    <v-row class="pl-4 pr-4" width="700">
                        <v-text-field
                                label="Result FP"
                                hide-details="auto"
                                class="pt-5 pl-4 pr-4"
                        >
                        </v-text-field>
                        <v-text-field
                                label="Buy Price"
                                hide-details="auto"
                                class="pt-5 pr-4"
                        >
                        </v-text-field>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                    label="Product"
                                    class="pl-5 pr-1"
                                    hide-details="auto"

                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="pt-7">
                            <v-btn color="primary">Reg</v-btn>
                        </v-col>
                    </v-row>


                    <v-row class="  pl-4 pr-4" width="700">
                        <small class=" pl-4 mb-8">
                            * 등록된 상품 노출 영역
                        </small>
                    </v-row>


                    <v-file-input
                            v-for=" (imgRow, index) in imageUploadList" v-bind:key="index"
                            class="pl-4 pr-4"
                            show-size
                            dense
                            accept="image/png, image/jpeg, image/bmp"
                            v-model="imgfileItem"
                            prepend-icon="mdi-camera"
                            label="Image Upload"

                    ></v-file-input>
                    <v-row dense class=" pl-6 ">
                        <v-btn @click.prevent="fn_addImageFile">이미지 파일 추가</v-btn>
                        <small class="pl-6 pt-3"> * 120 x 120 JPG, PNG Upload</small>
                    </v-row>


                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="fn_Cancel">취소</v-btn>
                        <v-btn color="primary" dark @click="fn_Save"> 확인</v-btn>
                    </v-card-actions>
                </v-card>

            </v-dialog>
        </v-card>
        <!-- 테이블 영역 start -->
        <v-card >
            <v-data-table
                    dense
                    :headers="ProductHeader"
                    :items="ProductItems"
                    hide-default-footer
                    hide-default-header
                    disable-pagination
            >
                <template v-slot:header="{ props: { headers } }">
                    <thead>
                    <tr>
                        <th v-for="(header) in headers" :key="header.text"
                            style="text-align: center; border-right:thin solid rgba(0, 0, 0, 0.12);">
                            {{ header.text }}
                        </th>
                    </tr>
                    </thead>
                </template>
                <template v-slot:body="{ items }">
                    <tbody>
                    <tr
                            v-for="(item, index) in items"
                            :key="index"
                            class="text-center"
                            style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"
                            @click="rowClick(item)"

                    >
                        <td class="td-border-style">{{ item.num }}</td>
                        <td class="td-border-style">{{ item.name }}</td>
                        <td class="td-border-style">{{ item.product}}</td>
                        <td class="td-border-style">{{ item.resultFP }}</td>
                        <td class="td-border-style">{{ item.buyPrice }}</td>
                        <td class="td-border-style">{{ item.adminID }}</td>
                        <td class="td-border-style">{{ item.status }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-data-table>

        </v-card>
        <div class="text-center pt-2">
            <v-pagination
                    v-model="page"
                    :length="pageCount"
                    @input="handlePage"
            ></v-pagination>
        </div>
        <!--  <v-form ref="form"  lazy-validation>-->
        <!--    <table class="v-data-table" style="width: 100%">-->
        <!--      <thead class="v-data-table-header">-->
        <!--      <tr>-->
        <!--        <td style="text-align: left"><Strong>Num</Strong></td>-->
        <!--        <td style="text-align: left"><Strong>Name</Strong></td>-->
        <!--        <td style="text-align: left; width: 20%;"><Strong>Product</Strong></td>-->
        <!--        <td style="text-align: left"><Strong>Result FP</Strong></td>-->
        <!--&lt;!&ndash;        <td style="text-align: left"><Strong>비고</Strong></td>&ndash;&gt;-->
        <!--        <td style="text-align: left"><Strong>Buy Price</Strong></td>-->
        <!--        <td style="text-align: left"><Strong>Status</Strong></td>-->
        <!--      </tr>-->
        <!--      </thead>-->
        <!--      <tbody>-->
        <!--      <tr v-for=" (row, index) in productList" v-bind:key="index">-->
        <!--        <td style="width: 20%;">-->
        <!--           <v-text-field-->
        <!--              disable-->
        <!--            ></v-text-field>-->
        <!--        </td>-->
        <!--        <td style="width: 20%;">-->
        <!--          <v-text-field-->
        <!--              disabled-->
        <!--            ></v-text-field>-->
        <!--        </td>-->
        <!--        <td style="width: 20%;">-->
        <!--          <v-text-field-->
        <!--              label="수량"-->
        <!--          >-->
        <!--          </v-text-field>-->
        <!--        </td>-->
        <!--        <td style="width: 20%;">-->
        <!--          <v-text-field-->
        <!--              label="금액"-->
        <!--              type="number"-->
        <!--              class="text-xg-right"-->
        <!--          >-->
        <!--          </v-text-field>-->
        <!--        </td>-->
        <!--        <td style="width: 20%;">-->
        <!--           <v-text-field-->
        <!--              label="금액"-->
        <!--              type="number"-->

        <!--              class="text-xg-right"-->
        <!--          >-->
        <!--          </v-text-field>-->
        <!--        </td>-->
        <!--        <td>-->
        <!--          <v-btn small @click.prevent="fn_removeRow(row)">delete</v-btn>-->
        <!--            &lt;!&ndash;          <a @click="fn_removeRow(row)">삭제</a>&ndash;&gt;-->
        <!--        </td>-->
        <!--      </tr>-->
        <!--      </tbody>-->
        <!--    </table>-->
        <!--    </v-form>-->
        <!-- 테이블 영역 End -->
    </v-container>
</template>

<script>
    import store from "@/store/index.js";
    export default {
        name: 'ProductView',

        data: () => ({
            page:0,
            pageCount:0,
            eDialog: false,
            imgfileItem: null,
            imageUploadList: [],
            prAddNum: 1,
            prDate: new Date().toISOString().substr(0, 10),
            productList: [],
            dialog: false,
            ProductMenu: false,
            selectCon: {selectId: 1},
            selectItems: [
                {
                    selectId: 1, selectName: "Cash",

                },
                {
                    selectId: 2, selectName: "Decoration",

                },
                {
                    selectId: 3, selectName: "Convenience",

                },
                {
                    selectId: 4, selectName: "Special",

                },

            ],
            ProductHeader: [
                {
                    text: "Num",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Name",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Product",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Result FP",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Buy Price",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Admin ID",
                    align: "center",
                    sortable: false,
                    value: "",
                },
                {
                    text: "Status",
                    align: "center",
                    sortable: false,
                    value: "",
                },

            ],
            ProductItems: [
                {
                    num: 1,
                    name: 'test',
                    product: 1,
                    resultFP: 1,
                    buyPrice: 1,
                    adminID: 1,
                    status: 1
                }
            ]
        }),
        beforeMount() {
            store.commit('onProgress');
        },
        mounted() {
            store.commit('offProgress');
        },

        methods: {
            handlePage(){

            },
            ProductRegFn() {
                this.dialog = true;
            },
            fn_Cancel() {
                if (this.dialog) this.dialog = false;
                 this.eDialog = false;
                this.imageUploadList = [];
                // console.log(this.imgfileItem);

            },
            fn_Save() {
                // this.prAddNum++;
                // this.productList.push(
                //  {
                //    pr_Num:1,
                //    pr_Name: 1,
                //
                //    pr_ResultFP:1,
                //    pr_BuyPrice:1,
                //    pr_AdminID:1,
                //
                //  }
                //  );
                this.dialog = false;
                this.eDialog = false;

            },
            fn_addImageFile() {
                this.imageUploadList.push({});
            },
            // fn_removeRow: function(row){
            //   this.count--;
            //   // console.log('삭제');
            //   // console.log(row);
            //   this.productList.splice(this.productList.indexOf(row), 1);
            // },
            rowClick() {
                this.eDialog = true;
            }
            // addPrRow() {
            //   this.productList.push(
            //     {
            //       pr_Num: 1,
            //       pr_Name: 1,
            //       pr_Product: '',
            //       pr_ResultFP:'',
            //       pr_BuyPrice:".",

            //     }
            //     );
            // }


        },
    };
</script>

<style lang="scss" scoped>
    .td-border-style {
        border-right: thin solid rgba(0, 0, 0, 0.12);
    }
</style>