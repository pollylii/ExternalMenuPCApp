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
						<el-container v-loading="loading">
							<el-main v-show="!intoPDF">
								<!--
								<el-row :gutter="5">
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
											Sequence No
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
										<el-input v-show=false v-model="SeqNo" :readonly="readonly" style="text-align: right" :disabled="readonly" placeholder="Sequence No."></el-input>
										<el-select placeholder="SequenceNo" v-model="SeqNoList" :readonly=readonly :disabled=readonly>
											<el-option
												v-for="item in SeqNoItem"
												:key="item.value"
												:label="item.text"
												:value="item.value">
											</el-option>
										</el-select> 				
									</el-col>    
								</el-row>
								<el-row :gutter="5">
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
											Payroll Month
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
										<el-input v-show=false v-model="SeqNo" :readonly="readonly" style="text-align: right" :disabled="readonly" placeholder="Payroll Month"></el-input>
										<el-select placeholder="PayrollMonth" v-model="PayschList" :readonly=readonly :disabled=readonly>
											<el-option
												v-for="item in PayschItem"
												:key="item.value"
												:label="item.text"
												:value="item.value">
											</el-option>
										</el-select> 				
									</el-col>    
								</el-row>
								-->
								<el-row :gutter="5">
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
											{{getRes('PaySlip.PayrollMonth')}}
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">										
										<el-select :placeholder="getRes('PaySlip.PayrollMonth')" v-model="PayslipPeriod" >
											<el-option
												v-for="item in PPList"
												:key="item.value"
												:label="item.text"
												:value="item.value">
											</el-option>
										</el-select> 				
									</el-col>    
								</el-row>
								<el-row :gutter="5">
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
										<el-button type="primary" icon="search" @click.native="GenReport()">{{getRes('common.Search')}}</el-button>  
									</el-col>    
								</el-row>
				    <el-row>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<div style=" margin: 15px 0px 0px 10px;font-size: 12px;">
								{{this.getRes('common.Notes')}}
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<div style=" margin: 0px 0px 0px 10px;font-size: 12px;">
								{{getRes('Notes.String1')}}<span style="color: red;">NNNNYYYYMMDD</span>{{getRes('Notes.String2')}}
							</div>
						</el-col>
					</el-row>
					<el-row>	
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<div style=" margin: 15px 0px 0px 10px;font-size: 14px; fontWeight: bold; text-decoration: underline;">
								{{getRes('common.Example')}}
							</div>
						</el-col>
					</el-row>
					<el-row>	
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<div style=" margin: 0px 0px 0px 10px;font-size: 12px;">
								{{getRes('common.BirthYear')}} = <span style="color: red; fontWeight: bold;">19800101</span>
							</div>				
						</el-col>
					</el-row>
					<el-row>	
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<div style=" margin: 0px 0px 0px 10px;font-size: 12px;">
								{{getRes('common.HKID')}} = <span style="color: red; fontWeight: bold;">A123</span>456(3)
							</div>
						</el-col>
					</el-row>
					<el-row>	
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<div style=" margin: 0px 0px 0px 10px;font-size: 12px;">
								{{getRes('common.PasswordExample')}}<span style="color: red;text-decoration: underline; fontWeight: bold;">A12319800101</span>
							</div>
						</el-col>
					</el-row>
							</el-main>
						</el-container>
    				</div>
				</el-card>
			</el-container>
		</div>
		<PDFViewer v-show="intoPDF" :intoPDF="intoPDF" :path="pdfPath" :filename="filename" :promptPassword="true"></PDFViewer>
    </div>
</template>

<script>
export default  { //window.vue.extend({  use this in js instead of export default
    //template: formtemplate,  //need in js
    data:function () {
        return {
		    EmpNo: '',
			// SeqNo: '',
			// SeqNoList:'',
			// PayschList:'',
			readonly: false,
			// SeqNoItem: [],
			// PayschItem: [],
            resource:{
                English:
                {
                    "SequenceNoError":"Please select payroll month!",
                },
                Chinese:
                {
				    "SequenceNoError":"请选择工资月!",
                },
                TraditionalChinese:
                {
				   "SequenceNoError":"請選擇工資月!",
                },
            },
			loading: false,

			intoPDF: false,
			pdfPath: '',
			filename: "PaySlip",
			PayslipPeriod: '',
			PPList: [],
        }
    },
    watch: {
		// SeqNoList:function(val, oldVal)
        // {
		// 	var me = this;
		// 	var PS_EmpNo = localStorage.getItem("EmpNo");
			
		// 	console.log(PS_EmpNo);
		// 	console.log(me.SeqNoList);
			
		// 	if(me.SeqNoList != "")
		// 	{
		// 		me.invokeService("Workflow", "GetDataByDataSource", ['GetPaySchedule', [me.SeqNoList,PS_EmpNo]],
		// 		function (msg) 
		// 		{
		// 			if (msg.ReturnData.$.Success) 
		// 			{
		// 				var items = msg.ReturnData.$.ReturnData.toJson();
		// 				var list = [];
					   
		// 				for(var i=0;i<items.length;i++)
		// 				{
		// 					var item = items[i];
		// 					item["value"] = item.Code;
		// 					item["text"] = item.Text;
		// 					console.log(item.Text);
		// 					list.push(item);
		// 				}
						
		// 				me.PayschItem = list;                     
		// 			}
		// 			else{
		// 				me.alert("GetPaySchedule Lost");
		// 			}
		// 		},
		// 		function(msg){
		// 			console.log('GetPaySchedule fail');
		// 		});
		// 	}
        // },
	},
	mounted: function(){

			var me = this; 
            var localUser = me.LocalUser;
			var userid = localUser.UserId;
			
			// me.invokeService("Workflow", "GetDataByDataSource", ['GetUserInfoByUserId', [userid]],
			// function (msg) 
			// {   
			// 	if (msg.ReturnData.$.Success) 
			// 	{
			// 		var calcResult = msg.ReturnData.$.ReturnData;
			// 		localStorage.setItem("EmpNo", calcResult.empcode);
			// 		var PS_EmpNo = localStorage.getItem("EmpNo");
			// 		console.log("GetUserInfoByUserId", PS_EmpNo);
			// 		 me.invokeService("Workflow", "GetDataByDataSource", ['GetYearList', [PS_EmpNo]],
			// 			function (msg) {
			// 				console.log('GetYearList', msg);
			// 				if (msg.ReturnData.$.Success) 
			// 				{
			// 					var items = msg.ReturnData.$.ReturnData.toJson();
			// 					var list = [];
							   
			// 					for(var i=0;i<items.length;i++)
			// 					{
			// 						var item = items[i];
			// 						item["value"] = item.Year;
			// 						item["text"] = item.Year;
			// 						list.push(item);
			// 					}
								
			// 					me.SeqNoItem = list;                     
			// 				}
			// 				else{
			// 					me.alert("Get YearList Lost");
			// 				}
			// 			},
			// 			function(msg){
			// 				console.log('GetYearList fail');
			// 			});
			// 	}
			// 	else 
			// 	{
			// 		me.alert("No each Employee");
			// 	}
			// },
			// function(msg){
			// 	console.log('GetUserInfoByUserId fail');
			// });
			var empcode = localUser.EmpCode;
			console.log(empcode);
			me.invokeService("Workflow", "GetDataByDataSource", ['GetPayslipPeriods', [empcode]],
			function (msg) 
			{
				if (msg.ReturnData.$.Success) 
				{
					var items = msg.ReturnData.$.ReturnData.toJson();
					var list = [];
					
					for(var i=0;i<items.length;i++)
					{
						var item = items[i];
						item["value"] = item.Code;
						item["text"] = item.Text;
						console.log(item.Text);
						list.push(item);
					}
					
					me.PPList = list;                     
				}
				else{
					me.alert(me.getRes('Error.GetPayslipPeriods'));
				}
			},
			function(msg){
				console.log('GetPayslipPeriods fail');
			});
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
					var PS_EmpNo = localStorage.getItem("EmpNo");
					 me.invokeService("Workflow", "GetDataByDataSource", ['GetYearListT', [PS_EmpNo]],
						function (msg) {

							if (msg.ReturnData.$.Success) 
							{
								var items = msg.ReturnData.$.ReturnData.toJson();
								var list = [];
							   
								for(var i=0;i<items.length;i++)
								{
									var item = items[i];
									item["value"] = item.Year;
									item["text"] = item.Year;
									list.push(item);
								}
								
								me.SeqNoItem = list;                     
							}
							else{
								me.alert("Get YearList Lost");
							}
						},
						function(msg){
							console.log('GetYearList fail');
						});
				}
				else 
				{
					me.alert("No each Employee");
				}
			},
			function(msg){
				console.log('GetUserInfoByUserId fail');
			});
			
			
			var Submit = {visible:false, text: ''};
			var Approve = {visible:false, text: ''};
			var style = {Approve:Approve,Submit:Submit};
			this.$emit('ChangButtonStyle',style);
			return;
		},
		*/
		GenReport()
        {
		    var me = this; 
            var localUser = me.LocalUser;
            var userid = localUser.UserId;
			
			var empNo = localUser.EmpCode;
			//var empNo = '00007';
			var SequenceNoOrMonth = this.PayslipPeriod;
			var dateFormat = "";//"yyyy-MM-dd";
			var companyName = "";//"Computer and Technologies Holdings Ltd";
			var level1 = "";//"Company";
			var level2 = "";//"Business Unit";
			var level3 = "";//"Department";
			var level4 = "";//"Department";
			var encryPwd = "";
			var language = "en-us";
			var companyNo = "010";
			
			var language = localStorage.getItem("Language");
            var reLanguage = null;

            if (language ==  "English")
			{
				language =  "en-us";
			}
			else
			{
				language =  "Chinese";
			}
			
			if(SequenceNoOrMonth == "")
            {
                me.alert(me.getPMRes('SequenceNoError'));
                return;
			}
			
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
										
										console.log(calcResult);					
										dateFormat = calcResult.dateFormat;
										companyName = calcResult.companyName;
										level1 = calcResult.Level1;
										level2 = calcResult.Level2;
										level3 = calcResult.Level3;
										level4 = calcResult.Level4;
										companyNo = calcResult_CompNo;
										
										console.log(empNo);
										console.log(SequenceNoOrMonth);
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
										
										me.invokeService("IPLPaySlip", "GenPaySlip", [empNo,SequenceNoOrMonth,dateFormat,companyName,level1,level2,level3,level4,encryPwd,language,companyNo],
											function(msg)             
											{
												console.log("GenPaySlip");
												var calcResult = msg.ReturnData.$;
												var PDF  = this.base64ToArrayBuffer(calcResult);
												
												console.log(calcResult);
												
												if(this.PayslipPeriod.length > 4)
												{
													this.saveByteArray(empNo + "Payslip" + this.SeqNoList, PDF);
												}
											},
											function(msg)
											{
												console.log("GenPaySlip - fail");
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
			// PDF Viewer
			var blob = new Blob([byte], {type: "application/pdf"});
			this.pdfPath = window.URL.createObjectURL(blob);
			this.filename = reportName;
			console.log(this.pdfPath);
			this.loading = false;
			this.intoPDF = true;
			console.log(this.intoPDF);	
		},
    },
};
</script>
