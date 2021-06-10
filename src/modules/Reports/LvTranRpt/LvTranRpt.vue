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
					<div v-bind:class=" [readonly?  'wf-layout' :'wf-leftshift wf-layout']" >		
						<el-container v-loading="loading">
							<el-main v-show="!intoPDF">
						<!--<el-tabs>
							<el-tab-pane name="0" v-loading="loading">			-->
								<el-row :gutter="5">
								<el-col :xs="8" :sm="6" :md="4" :lg="5"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;">{{getRes("LvAppRpt.LeavePeriod")}}</div></el-col>
								<!--
								<el-col :xs="8" :sm="6" :md="4" :lg="2"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;">From</div></el-col>
								<el-col :xs="8" :sm="1" :md="1" :lg="6"><el-date-picker v-model="LPDateFrom" type="date" :disabled="readonly" width="150"></el-date-picker></el-col>
								<el-col :xs="8" :sm="6" :md="4" :lg="1"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;">To</div></el-col>
								<el-col :xs="8" :sm="1" :md="1" :lg="6"><el-date-picker v-model="LPDateTo" type="date" :disabled="readonly" width="150"></el-date-picker></el-col>
								<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;">{{this.getPMRes('Date')}}</div></el-col>
								-->
								<el-col :xs="24" :sm="18" :md="20" :lg="19">
									<!--<span style="margin: 15px 0px 15px 10px; font-size: 12px;">From</span>
									<el-date-picker v-model="LPDateFrom" type="date" :disabled="readonly" style="width: 200px;"></el-date-picker>-->
									<span style="margin: 15px 0px 15px 10px; font-size: 12px;">{{getRes("common.From")}}</span>					
									<el-date-picker v-model="LPDateFrom" type="date" :disabled="readonly" style="width: 30%;"></el-date-picker>
								<!--
								</el-col>
								<el-col :xs="24" :sm="9" :md="10" :lg="10">
									<span style="margin: 15px 10px 15px 0px; font-size: 12px;">To</span>
									<el-date-picker v-model="LPDateTo" type="date" :disabled="readonly" style="width: 200px;"></el-date-picker>
									-->
									<span style="margin: 15px 0px 15px 10px; font-size: 12px;">{{getRes("common.To")}}</span>
									<el-date-picker v-model="LPDateTo" type="date" :disabled="readonly" style="width: 30%;"></el-date-picker>					
								</el-col>
								</el-row>
								<el-row :gutter="5">
								<el-col :xs="8" :sm="6" :md="4" :lg="5"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;">{{getRes('LvAppRpt.LeaveStatus')}}</div></el-col>
								<el-col :xs="8" :sm="6" :md="6" :lg="5"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;"><el-checkbox v-model="LvApproved" :readonly="readonly" :disabled="readonly"></el-checkbox>  {{getRes('Process.Approved')}}</div></el-col>
								<el-col :xs="8" :sm="6" :md="6" :lg="6"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;"><el-checkbox v-model="LvPedding" :readonly="readonly" :disabled="readonly"></el-checkbox>  {{getRes('Process.Pending')}}</div></el-col>
								<el-col :xs="8" :sm="6" :md="6" :lg="6"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;"><el-checkbox v-model="LvRejected" :readonly="readonly" :disabled="readonly"></el-checkbox>  {{getRes('Process.Rejected')}}</div></el-col>
								<el-col :xs="8" :sm="6" :md="1" :lg="1"></el-col>
								</el-row>
								<el-row :gutter="5">
								<el-col :xs="8" :sm="6" :md="4" :lg="5"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;">{{getRes('common.Application')}} /<br> {{getRes('common.Cancellation')}}</div></el-col>
								<el-col :xs="8" :sm="6" :md="6" :lg="5"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;"><el-checkbox v-model="LvN" :readonly="readonly" :disabled="readonly"></el-checkbox>  {{getRes('LeaveTran.Apply')}}</div></el-col>
								<el-col :xs="8" :sm="6" :md="6" :lg="6"><div style=" margin: 15px 0px 15px 10px;font-size: 12px;"><el-checkbox v-model="LvC" :readonly="readonly" :disabled="readonly"></el-checkbox>  {{getRes('LeaveTran.Cancel')}}</div></el-col>
								<el-col :xs="8" :sm="6" :md="6" :lg="0"></el-col>
								<el-col :xs="8" :sm="6" :md="1" :lg="0"></el-col>
								</el-row>
								<el-row :gutter="5">
									<el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
										<div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
										<el-button type="primary" icon="search" @click.native="GenReport()">{{getRes("common.Search")}}</el-button>  
									</el-col>    
								</el-row>		
							<!--</el-tab-pane>
							</el-tabs>-->
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
			StartDate: null,EndDate: null,
			
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
					"Date": "Date",
					"To": "To",
					"btnConfirm": "Confirm",
					"btnCancel": "Cancel",
					"btnClose": "Close",
					"staffId": "Staff Id",
					"inputStaffId": "Please select staff",
					"staffName": "Staff Name",
					"Search": "Search",
					"Remove": "Remove",
					"btnAddtolist": "Add To List",
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
			LeaveGroupList: [],
			LeaveGroupData: [],
			LeaveReasonList: [],
			LeaveReasonData: [],
			LPDateFrom: null,
			LPDateTo : null,
			LTDateFrom : null,
			LTDateTo : null,
			LTCDateFrom : null,
			LTCDateTo : null,
			ShowDetail: false,
			LvApproved: false,
			LvPedding: true,
			LvRejected: false,
			LvN: true,
			LvC: true,
			userLevel3: '',
			loading: false,
			EmpSelection:true,
			tableData: [
						  {EmployeeNo: '00001', EmpName: 'Tom', address: 'No. 189, Grove St, Los Angeles'}, 
						  {EmployeeNo: '00002', EmpName: 'Tom', address: 'No. 190, Grove St, Los Angeles'}, 
						  {EmployeeNo: '00003', EmpName: 'Tom', address: 'No. 200, Grove St, Los Angeles'}, 
					   ],
					   
			SelectOne: false, //control single/multiple selection
			showTip: false,
			showDialog: false,
			filter: "",
			loading: false,
			datalist: [],
			sortField: "",
			order: "",
			pageIndex: 1,
			pageSize: 15,
			recordtotalcalced: "",
			dataType: "emp",
			storeCode: "",
			PositionID: "",
			serviceParam: {},
			currentRow: null,				
			selectedList: [],
			selectInfo: [],
			
			staffId: '',
			staffName: '',

			// PDF Viewer
			intoPDF: false,
			pdfPath: '',
			filename: "LeaveApplicationReport"
					   
        }
    },
    watch: {
		SelectOne: function(val){
			this.showTip = !val;
		},
		selectedList: function(val){
			if(!this.SelectOne){
				console.log("selectedList here");
				console.log(val);
				this.staffId = '';
				this.staffName = '';
				for(var i=0; i<val.length; i++){
					if(i>0) {
						this.staffId += ", ";
						this.staffName += ", ";
					}
					this.staffId += val[i].usercode;
					this.staffName += val[i].name;
				}
			}
		},
		EmpSelection: function(val){
			if(val){
				this.handleClose();
			}
			else this.handleShow();
		}
    },
	mounted: function()
	{
		
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
								me.alert(me.getRes('Error.NoLevel3'));
								console.log("*** msg", msg);
							}
						});
				}
				else 
				{
					me.alert(me.getRes('Error.GetUserInfoByUserId'));
					console.log("User ID: ", userid);
				}
			});
			var language = localStorage.getItem("Language");
			
			this.invokeService("Workflow", "GetDataByDataSource", ["GetUserStoreCode", [me.LocalUser.UserId]], 
			function(msg){
				console.log("Get User StoreCode");
				me.storeCode = msg.ReturnData.$.ReturnData.storecode;
				console.log("store code = " + me.storeCode);
			},
			function(msg){
				console.log("Get User StoreCode Error");
			});
			this.invokeService("Workflow", "GetDataByDataSource", ["GetPositionIDByUserid", [me.LocalUser.UserId]], 
			function(msg){
				console.log("Get User Position ID");
				console.log(msg.ReturnData.$.ReturnData);
				me.PositionId = msg.ReturnData.$.ReturnData.positionid;
				console.log("Position ID = ", me.PositionId);
			},
			function(msg){
				console.log("Get User Position Id Error");
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
				}
				else 
				{
					me.alert("No each Employee");
				}
			});
			var language = localStorage.getItem("Language");
			
			this.invokeService("Workflow", "GetDataByDataSource", ["GetUserStoreCode", [me.LocalUser.UserId]], 
			function(msg){
				console.log("Get User StoreCode");
				me.storeCode = msg.ReturnData.$.ReturnData.storecode;
				console.log("store code = " + me.storeCode);
			},
			function(msg){
				console.log("Get User StoreCode Error");
			});
			this.invokeService("Workflow", "GetDataByDataSource", ["GetPositionIDByUserid", [me.LocalUser.UserId]], 
			function(msg){
				console.log("Get User Position ID");
				console.log(msg.ReturnData.$.ReturnData);
				me.PositionId = msg.ReturnData.$.ReturnData;
				console.log("Position ID = " + me.PositionId);
			},
			function(msg){
				console.log("Get User Position Id Error");
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
		showSelection()
        {
            this.EmpSelection = !this.EmpSelection;
        },
		handleSelectionChange(val) 
		{
            this.multipleSelection = val;
			//console.log(val[0].EmployeeNo);
        },
		GenReport()
        {
		    var me = this; 
            var localUser = me.LocalUser;
            var userid = localUser.UserId;
			
			var empNo = localStorage.getItem("EmpNo");
			var dateFormat = "";//"yyyy-MM-dd";
			var companyName = "";//"Computer and Technologies Holdings Ltd";
			var level1 = "";//"Company";
			var level2 = "";//"Business Unit";
			var level3 = "";//"Department";
			var encryPwd = "";
			var language = "en-us";
			var companyNo = "";
			var LeaveGroups = "";
			var LeaveReasons = "";
			var LeaveStatus = "";
			var ApprStatus = "";
			
            var CurrentLanguage = localStorage.getItem('Language');
			
			if (CurrentLanguage == 'TraditionalChinese')
				language = 'zh-tw'
			else if (CurrentLanguage == 'Chinese')
				language = 'zh-cn'
                
			if(me.LPDateFrom && me.LPDateTo && me.LPDateFrom > me.LPDateTo)
			{
				me.alert(me.getRes('Error.StartEndPeriod'));
				return false;
			}

			for(var i = 0; i < me.LeaveGroupList.length; i++)
			{
			  LeaveGroups += me.LeaveGroupList[i];
			  if(me.LeaveGroupList.length > 1 && i != me.LeaveGroupList.length - 1) LeaveGroups += "','";
			}
			
			if(me.LeaveGroupList.length > 0)
			{
			   LeaveGroups = "'" + LeaveGroups + "'";
			}
			
			for(var i = 0; i < me.LeaveReasonList.length; i++)
			{
			  LeaveReasons += me.LeaveReasonList[i];
			  if(me.LeaveReasonList.length > 1 && i != me.LeaveReasonList.length - 1) LeaveReasons += "','";
			}
			
			if(me.LeaveReasonList.length > 0)
			{
			   LeaveReasons = "'" + LeaveReasons + "'";
			}
			
			//LeaveGroups = "'AL','BL','BT','CL','COMP','JDL','MA','MARL','NPL','PA','PPSL','SL'";
			
			console.log(LeaveGroups);
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

									switch (localStorage.getItem("Language")) {
										case "English":
											language = "en-us";
											break;
										case "Chinese":
											language = "zh-cn";
											break;                
										default:
											language = "zh-tw";
											break;
									}
									
									console.log("empNo ", empNo);
									console.log("UserId ", this.LocalUser.UserId);
									console.log(dateFormat);
									console.log(companyName);
									console.log(level1);
									console.log(level2);
									console.log(level3);
									console.log(encryPwd);
									console.log(language);
									console.log(companyNo);
									
									me.serviceParams.Level3 = "";//me.userLevel3;
									
									if(me.Asofdate != null)
									{
										me.serviceParams.AsAtDate = me.Asofdate;
									}
									if(me.LHDateFrom != null &&  me.LHDateTo != null)
									{
										me.serviceParams.LHireStartDate = me.LHDateFrom;
										me.serviceParams.LHireEndDate = me.LHDateTo;
									}
									if(me.ProbStartDate != null &&  me.ProbEndDate != null)
									{
										me.serviceParams.ProbStartDate = me.PEDateFrom;
										me.serviceParams.ProbEndDate = me.PEDateTo;
									}
									if(me.TermStartDate != null &&  me.TermEndDate != null)
									{
										me.serviceParams.TermStartDate = me.TDateFrom;
										me.serviceParams.TermEndDate = me.TDateTo;
									}
									
									me.serviceParams.IncludeActive = me.chkActive;
									me.serviceParams.IncludeProbation = me.chkProbation;
									me.serviceParams.IncludeTerminated = me.chkTerminated;
												
									me.serviceParams.LvGroup = LeaveGroups;
									me.serviceParams.LeaveReason = LeaveReasons;						
									me.serviceParams.LvStartDate = me.LPDateFrom;
									me.serviceParams.LvEndDate = me.LPDateTo;			
									me.serviceParams.TranDateFr = me.LTDateFrom;
									me.serviceParams.TranDateTo = me.LTDateTo;			
									me.serviceParams.TranCDateFr = me.LTCDateFrom;
									me.serviceParams.TranCDateTo = me.LTCDateTo;
									me.serviceParams.ShowTranItem = me.ShowDetail;
									
									me.serviceParams.SelectEmployee = me.selectedList.map(x => {
										var empCodes = {};
										empCodes["empCode"] = x.usercode;
										return empCodes;
									});
									
									if(me.LvApproved || me.LvPedding || me.LvRejected)
									{
									if(me.LvApproved)
									{
										ApprStatus += "'A',";
									}
									if(me.LvPedding)
									{
										ApprStatus += "'P',";
									}
									if(me.LvRejected)
									{
										ApprStatus += "'R',";
									}
									}
									me.serviceParams.ApprStatus = ApprStatus.substring(0,ApprStatus.length - 1);
									
									if(me.LvN || me.LvC)
									{
									if(me.LvN)
									{
										LeaveStatus += "'N',";
									}
									if(me.LvC)
									{
										LeaveStatus += "'Y',";
									}
									}
									me.serviceParams.LeaveStatus = LeaveStatus.substring(0,LeaveStatus.length - 1);
									
									console.log(me.serviceParams);

									me.loading = true;	//	"IPLReports", "GenLeaveTransactionReport"
									me.invokeService("IPLReports", "GenLeaveTransactionReport", [empNo,dateFormat,companyName,level1,level2,level3,encryPwd,language,companyNo,me.serviceParams],
										function(msg)            
										{
											console.log("GenLeaveTransactionReport");
											var calcResult = msg.ReturnData.$;
											console.log(calcResult);
											var PDF  = this.base64ToArrayBuffer(calcResult);
											this.saveByteArray("LeaveApplicationReport", PDF);
										},
										function(msg)
										{
											console.log("GenLeaveTransactionReport - fail");
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
		handleShow(){
			console.log("=====================handleShow=====================");
			this.showDialog = true;
			this.loadData("handleShow");
		},
		handleClose(){
			this.showDialog = false;
			//this.showSelection();
		},
		searchAction(){
			console.log("search action");
			this.loadData();
		},
		sortChange(sortInfo){
			console.log('------------------sort change --------------------');
			console.log(sortInfo);
			if(sortInfo.prop != null && sortInfo.order != null){
				this.sortField = sortInfo.prop;
				this.order = sortInfo.order;
			}
			else{
				this.sortField = '';
				this.order = '';
			}		
			this.loadData();
		},
		loadData(loadFrom) {
			console.log("-------------------- load data ------------------")
			var me = this;
			me.loading = true;	  	  			  
			var offset = (me.pageIndex - 1) * me.pageSize;	  
			console.log(me.storeCode);
			me.serviceParam.PositionId = me.PositionID;
			me.serviceParam.storeCode = me.storeCode;
			me.serviceParam.searchItem = me.filter;			
			me.serviceParam.sortField = me.sortField;
			me.serviceParam.order = me.order;
			console.log(me.serviceParam);
			
			me.invokeService("IPL.HRMS.SelectUserField", "GetUserFieldInfo", [me.serviceParam], 
			function(msg){
				console.log("load form sql succeed");
				var calcResult = msg.ReturnData.$.data;
				console.log(calcResult);		
				function changeEmpStatus(status, language){
					var left, current;
					switch(language){
						case "English": 
							left = "Terminated";
							current = "In-service";
							break;
						case "Chinese":
							left = "离职";
							current = "现职";
							break;
						default:
							left = "離職";
							current = "現職";
							break;
					}				
					return (status)? current : left;
				}
			
			if (calcResult.data.length > 0) {
				me.datalist = [];
				var recordNo = ((calcResult.data.length - offset) > 15 )? me.pageSize : calcResult.data.length - offset;			
				var dataRecord = 0;
				for (var i = offset; i < recordNo + offset; i++) {
					me.datalist[dataRecord] = new Array();
					me.datalist[dataRecord].userid = calcResult.data[i][0];
					me.datalist[dataRecord].usercode = calcResult.data[i][1];
					me.datalist[dataRecord].empStoreCode = calcResult.data[i][2];
					me.datalist[dataRecord].empstatus = calcResult.data[i][3];
					me.datalist[dataRecord].empPosCode = calcResult.data[i][7];
					
					switch (localStorage.getItem("Language")) {
						case "English":
						  me.datalist[dataRecord].name = calcResult.data[i][4];
						  me.datalist[dataRecord].empstatus = changeEmpStatus(me.datalist[dataRecord].empstatus, "English");
						  break;
						case "Chinese":
						  me.datalist[dataRecord].name = calcResult.data[i][5];
						  me.datalist[dataRecord].empstatus = changeEmpStatus(me.datalist[dataRecord].empstatus, "English");
						  break;                
						default:
						  me.datalist[dataRecord].name = calcResult.data[i][6];
						  me.datalist[dataRecord].empstatus = changeEmpStatus(me.datalist[dataRecord].empstatus, "English");
						  break;
					}
					dataRecord++;
				}
				me.recordtotalcalced = calcResult.data.length;
				this.$set(me, 'recordtotalcalced', calcResult.data.length);
				
			   } else {
				this.$set(me, 'recordtotalcalced', 0);
			  }
			  me.loading = false;
			},
			function(msg){
				console.log("dll fail");
				me.loading = false;			
			});
						
		},
		handleSelectChange(val){
			if(this.SelectOne)
				this.currentRow = val;
		},
		handleSelectionChangeEmp(val) {
		  if (!this.SelectOne) {
			this.selectInfo = [];
			for (var i = 0; i < val.length; i++) {
				this.selectInfo.push({
				  userid: val[i].userid,
				  name: val[i].name,
				  code: val[i].usercode
				});
			}
		  }
		},
		handleCurrentChange(val) {
			console.log('SelectUserField handleCurrentChange');
			this.pageIndex = val;
			this.loadData();
		},
		handleConfirm(){
			this.userid = this.currentRow.userid;
			this.staffId = this.currentRow.usercode;
			this.staffName = this.currentRow.name;
			this.handleClose();
		},
		handleCancel(){
			//clear selected info
			if(this.SelectOne){
				this.currentRow = null;
			}
			else{
				this.selectedList = [];
			}
			//this.handleClose();
			this.showSelection();
		},
		handleOk() {
		  for (var i = 0; i < this.selectInfo.length; i++) {
			var checkExisting = this.selectedList.filter(u => u.userid == this.selectInfo[i].userid);
			if(checkExisting.length == 0){
				var item = this.datalist.filter(u => u.userid == this.selectInfo[i].userid)[0];
				this.selectedList.push(item);
			}	
		  }
		  if (this.SelectOne == true) {
			if (typeof this.$parent.onConfirmForwardBtnEvent != 'undefined') {
			  this.$parent.onConfirmForwardBtnEvent();
			}
		  }	  
		  this.selectedList.sort((a, b) => parseInt(a.userid)-parseInt(b.userid));
		  this.selectInfo = [];
		  this.$refs.datatable.clearSelection();
		},
		rowClass({row, index}) {
			if(!this.SelectOne){
				if(this.selectedList.filter(u => u.userid == row.userid).length > 0)
				return { 
					"background-color": "#409eff",
					"color" : "white"
				}
			}				
		},
		deleteRow(index, selectedList){
			this.selectedList.splice(index, 1);
		},
    }
};
</script>