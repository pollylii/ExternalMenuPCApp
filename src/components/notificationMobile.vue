<template>
    <div>
        <h1>This is notificationMobile</h1>
        <el-row>
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </el-row>

        <mt-popup
            v-model="popupVisible"
        >
            sth here
        </mt-popup>

    </div>
</template>
<script>
export default {
    name: "notificationMobile",
    data: function(){
        return {
            popupVisible: false,

        }
    },
    mounted: function(){
        this.popupVisible = true;
    },
    methods:{

    } 
}
</script>