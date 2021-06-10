<template>
<div>
  <!-- <el-button @click="dialog=true">Press for alert</el-button> -->
  <el-dialog :visible.sync="dialog" :title="this.getPMRes('title')" width='80%' height='50%' :before-close='handleClose' append-to-body >
    <el-container style="display:flex; paddingTop: 10px;">
      <el-main style="display:flex;width: 100%">
        <el-container>
          <el-table :data="workflowData" stripe>
            <el-table-column property="workflow" :label="this.getPMRes('workflow')" width="150"></el-table-column>
            <el-table-column property="date" :label="this.getPMRes('date')" width="100"></el-table-column>
            <el-table-column property="subject" :label="this.getPMRes('subject')" width="200"></el-table-column>
            <el-table-column property="message" :label="this.getPMRes('message')"></el-table-column>
          </el-table>
        </el-container>
      </el-main>
    </el-container>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'CustomComponent1',
   data: function () {
    return {
      dialog: false,
      loading: false,
      workflowData: [ {
        workflow: 'Request OT',
        date: '05-07-2019',
        subject: 'OT on 30-06-2019',
        message: 'OT Request on 30-06-2019 for 4.5 hours has been approved.'
      }, {
        workflow: 'Leave Application',
        date: '03-07-2019',
        subject: 'Leave Application',
        message: 'No Pay Leave on 27-06-2019 has been cancelled.'
      },{
        workflow: 'Request OT',
        date: '02-07-2019',
        subject: 'OT on 30-06-2019',
        message: 'OT Request on 30-06-2019 for 4.5 hours has been submitted.'
      }, {
        workflow: 'Leave Application',
        date: '27-06-2019',
        subject: 'Leave Application',
        message: 'Annual Leave on 01-08-2019 to 03-08-2019 has been approved by Leave Approver XXXX.'
      }, {
        workflow: 'Staff Message',
        date: '23-06-2019',
        subject: '申請渡假屋',
        message: '請於7月23日前作出申請。'
      }],
      resource:{
        English:{
          "title": "You have below notifications",
          "workflow": "Workflow",
          "date": "Date",
          "subject": "Subject",
          "message": "Message",
          "confirmBtnTxt": "Confirm",
          "cancelBtnTxt": "Cancel"
        },
        Chinese:{
        },
        TraditionalChinese:{

        }
      },
      serviceParams: {}
    }
  },
  mounted: function(){
    this.dialog = true;
  },
  methods: {
    handleClose(done) {
      const h = this.$createElement;
      this.$msgbox({
        message: h('div', null, [
            h('p', null, [
              h('span', null, 'I did read ALL the messages')
            ]),
            h('p', null, [
              h('span', null, '我已閱讀所有訊息')
            ])
          ]),
        confirmButtonText: 'Confirm',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      })
        .then(_ => {
          this.loading = true;
          //this.funcCalling();
          this.loading = false;
          done();
        })
        .catch(_ => {});
    },
    funcCalling(){
      var me = this;
      me.serviceParams.sth = "sth";
      console.log("================ calliing service ================")
      me.invokeService("IPL.HRMS.Notification", "NotificationAction", [me.serviceParams],
      function(msg){
        console.log("-------------service succeed ---------------");
        var calcResult = msg.ReturnData.$.data;
        console.log((msg.ReturnData.$.Success)? calcResult : "Message return data fail");
      },
      function(msg){
        console.log("-------------service failed ----------------");
      })
    },
    getPMRes(key){
            var language = localStorage.getItem("Language");
            var reLanguage = null;

            if (language ==  "Chinese")
            {
                reLanguage = this.resource.Chinese;
            }
            else if (language ==  "English")
            {
                reLanguage = this.resource.English;
            }
            else if (language ==  "TraditionalChinese")
            {
                reLanguage = this.resource.TraditionalChinese;
            }
            else 
            {
                return key;
            }
            if(reLanguage.hasOwnProperty(key))
            {
                return reLanguage[key];
            }
            else
            {
                return key;
            }

        },
  }
}
</script>