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
					<div  v-bind:class=" [readonly?  'wf-layout' :'wf-leftshift wf-layout']"  v-loading="loading">
						<el-row >
							<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
								<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
									{{getRes("Report.FiscalYear")}}
								</div>
							</el-col>
							<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
								<el-input v-show=false v-model="SeqNo" :readonly="readonly" style="text-align: right" :disabled="readonly" :placeholder="getRes('Report.FiscalYear')"></el-input>
								<el-select :placeholder="getRes('Report.FiscalYear')" v-model="FiscalYearList" :readonly=readonly :disabled=readonly>
									<el-option
										v-for="item in SeqNoItem"
										:key="item.value"
										:label="item.text"
										:value="item.value">
									</el-option>
								</el-select> 				
							</el-col>    
						</el-row>
						<el-row :gutter="5" height="500px" >
							<iframe id="show-iframe"  v-show=ShowView frameborder=0 name="showHere" scrolling=auto :src="ShowPDF"  style="width: 100%; height: 500px"></iframe>
						</el-row>
						
						<el-row >
							<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
								<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
								</div>
							</el-col>
							<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
								<el-button type="primary" icon="search" @click.native="GenReport()">{{getRes("common.Search")}}</el-button>  
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
					</div>
				</el-card>
			</el-container>
		</div>
		<PDFViewer v-show="intoPDF" :intoPDF="intoPDF" :path="pdfPath" :filename="filename" :promptPassword="true"></PDFViewer>
    </div>
</template>


<script>
export default { //window.vue.extend({  use this in js instead of export default
    //template: formtemplate,  //need in js
		data:function () {
        return {
		    EmpNo: '',
			SeqNo: '',
			FiscalYearList:'',
			readonly: false,
			ShowView: false,
			ShowPDF:'data:application/pdf;base64,',
			SeqNoItem: [],
            resource:{
                English:
                {
                    "FiscalYearError":"Please select fiscal year! ",
                },
                Chinese:
                {
				    "FiscalYearError":"请选择财政年度!",
                },
                TraditionalChinese:
                {
				   "FiscalYearError":"請選擇財政年度!",
                },
            },
			loading: false,

			intoPDF: false,
			pdfPath: '',
			filename: "Taxation"
        }
    },
    watch: {
	},
	mounted: function(){
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
					var PS_EmpNo = localStorage.getItem("EmpNo");
					 me.invokeService("Workflow", "GetDataByDataSource", ['GETIR56BYear', [PS_EmpNo]],
						function (msg) {

							if (msg.ReturnData.$.Success) 
							{
								var items = msg.ReturnData.$.ReturnData.toJson();
								var list = [];
							   
								for(var i=0;i<items.length;i++)
								{
									var item = items[i];
									item["value"] = item.Value;
									item["text"] = item.Text;
									item["sign"] = item.TaxSign;
									list.push(item);
								}
								
								me.SeqNoItem = list;                     
							}
							else{
								me.alert(me.getRes('Error.GETIR56BYear'));
							}
						});
				}
				else 
				{
					me.alert(me.getRes('Error.GetUserInfoByUserId'));
				}
			});

			var Submit = {visible:false, text: ''};
			var Approve = {visible:false, text: ''};
			var style = {Approve:Approve,Submit:Submit};
			this.$emit('ChangButtonStyle',style);
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
					 me.invokeService("Workflow", "GetDataByDataSource", ['GETIR56BYear', [PS_EmpNo]],
						function (msg) {

							if (msg.ReturnData.$.Success) 
							{
								var items = msg.ReturnData.$.ReturnData.toJson();
								var list = [];
							   
								for(var i=0;i<items.length;i++)
								{
									var item = items[i];
									item["value"] = item.Value;
									item["text"] = item.Text;
									list.push(item);
								}
								
								me.SeqNoItem = list;                     
							}
							else{
								me.alert("Get YearList Lost");
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
			var FiscalYear = this.FiscalYearList;
			var Designation = "";
			var dateFormat = "";//"yyyy-MM-dd";
			var companyName = "";//"Computer and Technologies Holdings Ltd";
			var level1 = "";//"Company";
			var level2 = "";//"Business Unit";
			var level3 = "";//"Department";
			var encryPwd = "";
			var language = "en-us";
			var companyNo = "010";
			
			if(FiscalYear == "")
            {
                me.alert(me.getPMRes('FiscalYearError'));
                return;
            }
			Designation = me.SeqNoItem.find(x => x.value == FiscalYear).sign;
			console.log("Designation = " + Designation);
			//return;

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
									dateFormat = localStorage.getItem("dateFormat");
									companyName = localStorage.getItem("companyName");
									level1 = localStorage.getItem("level1");
									level2 = localStorage.getItem("level2");
									level3 = localStorage.getItem("level3");
									companyNo = calcResult_CompNo;
									
									var FiscalArray = FiscalYear.split("|");
									var Year = FiscalArray[0];
									var ERInfo = FiscalArray[1];
									
									console.log(empNo);
									console.log(Year);
									console.log(ERInfo);
									console.log(Designation);
									console.log(dateFormat);
									console.log(companyName);
									console.log(level1);
									console.log(level2);
									console.log(level3);
									console.log(encryPwd);
									console.log(language);
									console.log(companyNo);
								
									me.loading = true;	
									me.invokeService("IPLPaySlip", "GenIR56B", [empNo,Year,ERInfo,Designation,dateFormat,companyName,level1,level2,level3,encryPwd,language,companyNo],
										function(msg)             
										{
											console.log("GenIR568");
											var calcResult = msg.ReturnData.$;
											var PDF  = this.base64ToArrayBuffer(calcResult);
											this.saveByteArray(empNo + "IR56B" + this.FiscalYearList, PDF);
											//this.ShowPDF = "data:application/pdf;base64," + calcResult;
											//this.ShowView = true;
										},
										function(msg)
										{
											console.log("GenIR568 - fail");
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
    }
};
</script>
