<template>
	<div>
		<div v-if="!intoPDF" class="inputFrameHeight">
			<el-container style="height:97%">
				<el-header style="height:40px; " class="wfm-first-header">
					<el-row class="title">
						<el-col :span="20" class="wfm-first-header-title">
							<h5 class="wf-common-title">{{this.LocalUser.MenuPath}}</h5>
							<div class="division"></div>
						</el-col>
						<el-col :span="4">
							<closeThePage class="wf-closeThePage"></closeThePage>
						</el-col>
					</el-row>
				</el-header>
				<el-card shadow="never" style="overflow:scroll">
				<div  v-bind:class=" [readonly?  'wf-layout' :'wf-leftshift wf-layout']" >		
					<el-container>
						<el-main v-show="!intoPDF" v-loading="loading">		
							<!--
							<el-row :gutter="5">
								<el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
									<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
										Balance As Of
									</div>
								</el-col>
								<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
									<el-date-picker v-model="BalAsofdate" type="date" :disabled="readonly"></el-date-picker>				
								</el-col>    
							</el-row>
							<el-row :gutter="5">
								<el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
									<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
										Leave Type
									</div>
								</el-col>
								<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
									<el-transfer
										v-model="LeaveTypeList"
										:data="LeaveTypeData"
										:titles="['Available', 'Selected']"
										:button-texts="[' ', ' ']"
										filterable
										>
									</el-transfer>					
								</el-col>    
							</el-row>
							-->
							<el-row :gutter="5">
								<el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
									<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
									</div>
								</el-col>
								<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
									<el-button type="primary" icon="search" @click.native="GenReport()">Download</el-button>  
								</el-col>    
							</el-row>
						</el-main>
						<!-- <PDFViewer v-show="intoPDF" :intoPDF="intoPDF" :path="pdfPath" :filename="filename" :promptPassword="false"></PDFViewer> -->
					</el-container>
				</div>
				</el-card>
			</el-container>
		</div>
		<PDFViewer v-show="intoPDF" :intoPDF="intoPDF" :path="pdfPath" :filename="filename" :promptPassword="false"></PDFViewer>
	</div>
</template>
<script>
export default { //window.vue.extend({  use this in js instead of export default
    //template: formtemplate,  //need in js
    data:function () {
        return {
		    EmpNo: '',
			readonly: false,
			ShowView: false,
			Asofdate: new Date(),
			LHDateFrom: null,
			LHDateTo: null,
			PEDateFrom: null,
			PEDateTo: null,
			TDateFrom: null,
			TDateTo: null,
			chkActive: true,
			chkProbation: true,
			chkTerminated: true,
            resource:{
                English:
                {
                    "FiscalYearError":"Please select fiscal year . ",
                },
                Chinese:
                {
				    "FiscalYearError":"Please select fiscal year . ",
                },
                TraditionalChinese:
                {
				   "FiscalYearError":"Please select fiscal year . ",
                },
            },
			serviceParams: {},
			serviceParams: {status: ''},
			LeaveTypeList: [],
			LeaveTypeData: [],
			SupervisorData: [],
			BalAsofdate: new Date(),
			userLevel3: '',
			loading: false,
			LeaveTypeAvailable: [ "COMP", "SH", "PH", "SAL", "CAL" ],
			// PDF Viewer
			intoPDF: false,
			pdfPath: '',
			filename: "LeaveBalanceReport"

        }
    },
	mounted: function(){
		var yearEnd = new Date();
		yearEnd.setMonth(11,31);
        this.BalAsofdate = yearEnd;

        var me = this; 
        var localUser = me.LocalUser;
		var userid = localUser.UserId;
    
        me.invokeService("Workflow", "GetDataByDataSource", ['GetUserInfoByUserId', [userid]],
        function (msg) 
        {   
            if (msg.ReturnData.$.Success) 
            {
                var calcResult = msg.ReturnData.$.ReturnData;
                localStorage.setItem("EmpNo", calcResult.empcode);
                var gEmpNo = localStorage.getItem("EmpNo");
                    me.invokeService("Workflow", "GetDataByDataSource", ['GetLevelInfo', [gEmpNo]],
                    function (msg) {

                        if (msg.ReturnData.$.Success) 
                        {
                            var calcResult = msg.ReturnData.$.ReturnData;
                            me.userLevel3 = calcResult.OG_Lvl3;
                        }
                        else 
                        {
                            me.alert("No Level3");
                        }
                    });
            
                        me.invokeService("Workflow", "GetDataByDataSource", ['GetLeaveTypes', []],
                    function (msg) {

                        if (msg.ReturnData.$.Success) 
                        {
                            var items = msg.ReturnData.$.ReturnData.toJson();
                            var list = [];
                            
                            for(var i=0;i<items.length;i++)
                            {
                                var item = items[i];
                                item["key"] = item.label;
                                item["value"] = item.Value;
                                item["label"] = item.Value;
                                
                                //if(me.LeaveTypeAvailable.includes(item["key"]))
                                    list.push(item);
                            }
                            
                            me.LeaveTypeData = list;					
                        }
                        else {
                            me.alert("Get LeaveTypes Lost");
                        }
                    });
            
            }
            else 
            {
				me.alert("No such Employee");
				console.log("User ID: ", userid);
            }
        });
        
        var Submit = {visible:false, text: ''};
        var Approve = {visible:false, text: ''};
        var style = {Approve:Approve,Submit:Submit};
        this.$emit('ChangButtonStyle',style);
	},
    watch: {
    },
    methods: {
        getPMRes(key)
        {
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
        /* move this function to mounted function in vue
        onStatusChange(action)
        {
            var me = this; 
            var localUser = me.LocalUser;
            var userid = localUser.UserId;

            this.action = action; 
			
            if (action == 'ViewCancel' || action == 'ViewStartedProcess') {
                console.log('ViewCancel || ViewStartedProcess');
                this.setReadOnly(true);
        
            }
            else if (action == 'CreateProcess' || action == 'CopyProcess') 
            {
                console.log('CreateProcess || CopyProcess');
                this.setReadOnly(false);
            }
            else if (action == 'DealCancel') {
                console.log('DealCancel');
                this.setReadOnly(true);
            }
            else if (action == 'Completed') {
                console.log('Completed');
                this.setReadOnly(true);
            }
            else {
                console.log('else');
                this.setReadOnly(true);
            }
			
			me.invokeService("Workflow", "GetDataByDataSource", ['GetUserInfoByUserId', [userid]],
			function (msg) 
			{   
				if (msg.ReturnData.$.Success) 
				{
					var calcResult = msg.ReturnData.$.ReturnData;
					localStorage.setItem("EmpNo", calcResult.empcode);
					var gEmpNo = localStorage.getItem("EmpNo");
					 me.invokeService("Workflow", "GetDataByDataSource", ['GetLevelInfo', [gEmpNo]],
						function (msg) {

							if (msg.ReturnData.$.Success) 
							{
								var calcResult = msg.ReturnData.$.ReturnData;
								me.userLevel3 = calcResult.OG_Lvl3;
							}
							else 
							{
								me.alert("No Level3");
							}
						});
				
						 me.invokeService("Workflow", "GetDataByDataSource", ['GetLeaveTypes', []],
						function (msg) {

							if (msg.ReturnData.$.Success) 
							{
								var items = msg.ReturnData.$.ReturnData.toJson();
								var list = [];
							   
								for(var i=0;i<items.length;i++)
								{
									var item = items[i];
									item["key"] = item.label;
									item["value"] = item.Value;
									item["label"] = item.Value;
									
									//if(me.LeaveTypeAvailable.includes(item["key"]))
										list.push(item);
								}
								
								me.LeaveTypeData = list;					
							}
							else{
								me.alert("Get LeaveTypes Lost");
							}
						});
				
				}
				else 
				{
					me.alert("No each Employee");
				}
			});
			
			var Submit = {visible:false, text: ''};
			var Approve = {visible:false, text: ''};
			var style = {Approve:Approve,Submit:Submit};
			this.$emit('ChangButtonStyle',style);
			return;
        },
        */
        setReadOnly(value)
        {
            this.readonly=value;
        },
        onPrepareProcessParameters()
        {
            var me = this;
            var params = {};
            console.log(this.LocalUser);

            return params;
        },
        onPrepareProcessVariants()
        {
            var variants={};
            return variants;
        },
        onSetProcessParameters(param)
        {
            var me = this;
            var localUser = me.LocalUser;
            var userid = localUser.UserId;
            var language = localStorage.getItem("Language");
        },
        onSetProcessVariants(vars)
        {
            
        },
        onCopyProcessParameters(params)
        {
            this.onSetProcessParameters(param);
        },
        onCopyProcessVariants(vars)
        {
        },
		GenReport()
        {
		    var me = this; 
            var localUser = me.LocalUser;
            var userid = localUser.UserId;
			
			var empNo = localStorage.getItem("EmpNo");
			var dateFormat = "";//"yyyy-MM-dd";
			var companyName = "";//"Computer and Technologies Holdings Ltd";
			var level1 = "";//"Com	pany";
			var level2 = "";//"Business Unit";
			var level3 = "";//"Department";
			var level4 = "";//"Department";
			var encryPwd = "";
			var language = "en-us";
			var companyNo = "010";
			var LeaveTypes = "";
						
			for(var i = 0; i < me.LeaveTypeList.length; i++)
			{
			  LeaveTypes += me.LeaveTypeList[i];
			  if(me.LeaveTypeList.length > 1 && i != me.LeaveTypeList.length - 1) LeaveTypes += ",";
			}
			
			console.log(LeaveTypes);
			
						me.invokeService("Workflow", "GetDataByDataSource", ['GetCompNo', []],
			function (msg) 
			{   
				if (msg.ReturnData.$.Success) 
				{
						console.log("Get CompNo");
						var calcResult_CompNo = msg.ReturnData.$.ReturnData.configvalue;
						console.log(calcResult_CompNo);

						me.invokeService("Workflow", "GetDataByDataSource", ['GetCompInfo', [calcResult_CompNo]],
							function (msg) 
							{   
								if (msg.ReturnData.$.Success) 
								{
									console.log("Get CompInfo");
									
									var calcResult = msg.ReturnData.$.ReturnData;
									
									localStorage.setItem("dateFormat", calcResult.dateFormat);
									localStorage.setItem("companyName", calcResult.companyName);
									localStorage.setItem("level1", calcResult.Level1);
									localStorage.setItem("level2", calcResult.Level2);
									localStorage.setItem("level3", calcResult.Level3);
									localStorage.setItem("level3", calcResult.Level4);
									dateFormat = localStorage.getItem("dateFormat");
									companyName = localStorage.getItem("companyName");
									level1 = localStorage.getItem("level1");
									level2 = localStorage.getItem("level2");
									level3 = localStorage.getItem("level3");
									level3 = localStorage.getItem("level4");
									companyNo = calcResult_CompNo;

									console.log(empNo);
									console.log(dateFormat);
									console.log(companyName);
									console.log(level1);
									console.log(level2);
									console.log(level3);
									console.log(level4);
									console.log(encryPwd);
									console.log(language);
									console.log(companyNo);
											
									me.loading = true;				
									me.invokeService("IPLReports", "GenEmpProfile", [empNo,dateFormat,companyName,level1,level2,level3,level4,encryPwd,language,companyNo],
										function(msg)             
										{
											console.log("GenEmpProfile");
											var calcResult = msg.ReturnData.$;
											var Excel  = this.base64ToArrayBuffer(calcResult);
											this.saveByteArray("EmployeeProfile", Excel);
										},
										function(msg)
										{
											console.log("GenEmpProfile - fail");
										}
									);
								}
								else 
								{
									console.log("Get CompInfo Lost");
								}
						});
						}
				else 
				{
					console.log("Get CompNo Lost");
				}
		});		
			
        },
		base64ToArrayBuffer(base64) 
		{
			var binaryString = window.atob(base64);
			var binaryLen = binaryString.length;
			var bytes = new Uint8Array(binaryLen);
			for (var i = 0; i < binaryLen; i++) {
			   var ascii = binaryString.charCodeAt(i);
			   bytes[i] = ascii;
			}
			return bytes;
        },
		saveByteArray(reportName, byte) 
		{
			/*
			var blob = new Blob([byte], {type: "application/pdf"});
			//var blob = new Blob([byte], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"});
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			var fileName = reportName;
			link.download = fileName;
			link.click();
			this.loading = false;
			*/
			var blob = new Blob([byte], {type: "application/pdf"});
			this.pdfPath = window.URL.createObjectURL(blob);
			this.filename = reportName;
			console.log(this.pdfPath);
			this.loading = false;
			this.intoPDF = true;
			console.log(this.intoPDF);
		},
    }
};
</script>