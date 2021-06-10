<template>
    <div class="PDFcontainer">
        <div class="ToolBar" style="bottom:0px" v-show="showPDF">
                <el-button class="btn" style="float:left" @click="backbtn(CurrPage)">{{getRes('PDFViewer.Previous')}}</el-button>
                <!-- <span class="BetweenBtn">{{CurrPage}} / {{ numPages ? numPages : '∞' }}</span> -->
                <div class="BetweenBtn"> <span class="spanstyle">{{CurrPage}} / {{ numPages ? numPages : '∞' }}</span></div>
                <el-button class="btn" style="float:right" @click="nextbtn(CurrPage)">{{getRes('PDFViewer.Next')}}</el-button>
        </div>
        <div class="ToolBar" style="top:60px" v-show="showPDF">
            <div style="display:inline-block; width:70%; float: left">
                <el-button class="btn" style="float:left" @click="scale -= scale > originalscale - 1 ? 0.1 : 0"> {{getRes('PDFViewer.ZoomOUT')}}</el-button>
                <!-- <span class="BetweenBtn"> {{ formattedscale }} % </span> -->
                <div class="BetweenBtn"> <span class="spanstyle">{{ formattedscale }} % </span></div>
                <el-button class="btn" style="float:right" @click="scale += scale < originalscale + 1 ? 0.1 : 0"> {{getRes('PDFViewer.ZoomIN')}}</el-button>
            </div>
            <div style="display:inline-block; width:20%; float: right">
                <el-button class="btn" style="float:left; width:100%" @click="exportPDF()"> {{getRes('common.Export')}} </el-button>
            </div>
         </div>
        <div class="pdfwrapper">
            <!--<pdf src="./pdf/sample.pdf" :page="1">-->
            <pdf class="pdf" v-show="showPDF" :src="pdfdata" :page="i" :id="i" v-for="i in numPages" :scale.sync="scale" :key="i" >
                <template slot="loading">
                    loading content here...
                </template>
            </pdf>
        </div>
    </div>
</template>

<script>
    import PDFViewerJS from "./PDFViewer.js";
    export default PDFViewerJS;
</script>

<style scoped lang="scss">
    @import "/PDFViewer";
</style>
