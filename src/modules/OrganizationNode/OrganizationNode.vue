<template>
    <div v-loading="loading" class="inputFrameHeight">
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
                                <el-row size="medium" :gutter="5">
                                    <el-select v-model="dimension" :placeholder="getRes('org.OrgDimension')" style="width: 250px;">
                                        <el-option
                                            v-for="item in dimensionList"
                                            :key="item.code"
                                            :label="item.desc"
                                            :value="item.code">
                                        </el-option>
                                    </el-select>
                                    <el-date-picker v-model="effectiveDate" type="date" style="width: 250px;" :placeholder="getRes('common.EffectiveDate')" :disabled="readonly"></el-date-picker>
                                    <el-button type="primary" icon="el-icon-upload2" @click="handleShow">{{getRes('common.Import')}}</el-button>
                                    <el-button type="primary" icon="el-icon-download" @click="exportNode">{{getRes('common.Export')}}</el-button>
                                </el-row>
                        </el-container>
                    </div>
				</el-card>
                <!--<el-dialog :visible.sync="showDialog" title="Import Organization Node & Employee Organization Location">-->
                <el-dialog :visible.sync="showDialog" :title="getRes('org.ImportOrgNode')">
                    <div class="dialog-body" v-loading="loading">
                        <el-row :gutter="5">
                            <el-col :span="10">
                                <el-input style="margin-top: 2.5px" type="text" :readonly="true" :disabled="true" :value="fileList.length > 0 ? fileList[0].name : ''" :placeholder="getRes('common.ImportFile')"></el-input>
                            </el-col>
                            <el-col :span="5">				
                                <el-upload
                                    :action="fileaction"
                                    :file-list="fileList" 
                                    :show-file-list="false" 
                                    :on-change="handleFileChange"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :before-upload="beforeUpload">
                                    <el-button type="primary" class="select-file-btn">{{getRes('common.SelectFile')}}</el-button>
                                </el-upload>
                            </el-col>
                        </el-row>
                    </div>
                    <el-footer>
                        <el-col :span="12">
                            <el-button type="info" @click="handleClose">{{getRes('common.Cancel')}}</el-button>
                            <el-button type="primary" @click="importNode">{{getRes('common.Import')}}</el-button>
                        </el-col>
                    </el-footer>
                </el-dialog>
			</el-container>
		</div>
</template>

<script>
export default {
    name: "Import Organization Node & Employee Organization Location",
    data: function() {
        return {
            resource: {
                English: {
                    "EmployeeNotFound": "Employee not found",
                    "DimensionError":"Please select Demension. ",
                    "AllDimensions":"All Dimensions"
                },
                Chinese: {
                    "EmployeeNotFound": "没有此员工",
                    "DimensionError":"请选择组织架构 ",
                    "AllDimensions":"所有组织单元"
                },
                TraditionalChinese: {
                    "EmployeeNotFound": "沒有此員工",
                    "DimensionError":"請選擇組織架構 ",
                    "AllDimensions":"所有組織單元"
                }
            },
            fileaction: '',
            empInfo: '',
            fileList: [],
            showDialog: false,
            canImport: false,
            uploadedFile: null,
            loading: false,
            effectiveDate: null,
            dimension: "",
            dimensionList: []
        }
    },
    mounted: function() {
        var me = this;
        // var url = window.location.href;
		// var partialPath = url.substr(0, url.toLowerCase().indexOf('-web'));
		
		// if(url.includes("localhost")) {
		// 	me.fileaction = 'http://localhost/workforce//Handlers/UploadFileHandler.ashx?CommonResource=0';	
		// } else {
		// 	this.fileaction = partialPath + '/Handlers/UploadFileHandler.ashx?CommonResource=0';
        // }
        
        this.loadDimensions();
        var hostURL = Lark.ServiceAjax.getHost();
        this.fileaction = hostURL + '/Handlers/UploadFileHandler.ashx?CommonResource=0'
    },
    methods: {
        getPMRes(key) {
            var language = localStorage.getItem("Language");
            var dict = null;
            if (language == "English")
                dict = this.resource.English;
            else if (language == "Chinese")
                dict = this.resource.Chinese;
            else if (language == "TraditionalChinese")
                dict = this.resource.TraditionalChinese;
            else
                return key;
            
            return (dict.hasOwnProperty(key)) ? dict[key] : key;
        },
        handleShow() {
            this.showDialog = true;
            this.fileList = [];
        },
        handleClose() {
            this.showDialog = false;
        },
        importNode() {
            console.log("in ed" , this.canImport);
            var me = this;
            //if (!me.canImport) return;

			if(!me.dimension)
            {
                me.alert(me.getPMRes('DimensionError'));
                me.loading = false;
                return;
            }

            if (me.fileList.length == 0) {
                // me.alert(
                //     this.getPMRes("NoFileSelected"),                    
                // );
                me.alert(this.getRes('common.NoFileSelected'));
                return;
            }

            me.canImport = false; // Prevent multiple request
            console.log("Importing...");
            me.invokeService("IPLUpload", "ImportOrganizationHierarchy", [me.dimension,me.uploadedFile],
                function (msg) {
                    console.log(msg);
                    if (msg.ReturnData.$.Success) {
                        console.log("Import success");
                        if (!msg.ReturnData.$.FailedImport) {
                            me.alert(this.getRes('common.ImportSuccess'));
                        } else {
                            console.log("FailedImport");
                            var xls = this.base64ToArrayBuffer(msg.ReturnData.$.FailedImport);
                            this.saveByteArray("Error_Organization Node", xls);
                            me.alert(this.getRes('org.ImportExcelEntiresFail'));
                        }
                    } else {
                        console.log("== Import Organization Node - Failed ==");
                        var errmsg = msg.ReturnData.$.ErrorMsg;                        

                        if(errmsg == 'NoFileUploaded'){
                            errmsg = me.getRes('common.NoFileUploaded');
                    }
                        
                        me.alert(errmsg);
                    }
                    me.canImport = true;
                },
                function (msg) {
                    console.log("== Import Organization Node - Lost ==");
                    me.alert(this.getRes('common.ImportServiceError'));
                    me.canImport = true;
                }
            )
        },
        handleFileChange(file, fileList) {
            this.fileList = fileList;
        },
        handleSuccess(response, file, fileList) {
			if (response && response.Success) {
                this.uploadedFile = response.FileName;
                console.log("Upload success: ", response.FileName);
			} else {
                this.uploadedFile = null;
                console.log("Upload failed");
            }
            this.canImport = true;
        },
        handleError(err, file, fileList) {
            this.alert(err);
        },
        beforeUpload(file) {
            this.canImport = false;
            var isValid = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (!isValid) {
                this.alert(this.getRes('common.IncorrectFileFormat'));
                this.loading = false;
            }
            console.log("Uploading...");
            return isValid;
        },
        exportNode() {
            var me = this;
            me.loading = true;

            if (!me.effectiveDate) me.effectiveDate = "";
            
			if(!me.dimension)
            {
                me.alert(me.getPMRes('DimensionError'));
                me.loading = false;
                return;
            }
            me.invokeService("IPLUpload", "ExportOrganizationHierarchy", [me.dimension, me.effectiveDate.toString()],
                function (msg) {
                    console.log(msg);
                    if (msg.ReturnData.$.Success) {
                        console.log("== Export Organization Node - Success ==");
                        //console.log(msg.ReturnData.$.Data);
                        var xls = this.base64ToArrayBuffer(msg.ReturnData.$.ExcelFile);
                        this.saveByteArray("Organization Node", xls);
                    } else {
                        console.log("== Export Organization Node - Failed ==");
                        me.alert(msg.ReturnData.$.ErrorMsg);
                    }
                    me.loading = false;
                },
                function (msg) {
                    console.log("== Export Organization Node - Lost ==");
                    me.alert(this.getRes('common.ExportServiceError'));
                    me.loading = false;
                }
            )
        },
        saveByteArray(fileName, byte) 
		{
			var blob = new Blob([byte], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"});
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
            //console.log("----- Download Link -----");
			//console.log(link.href);
			link.download = fileName;
			link.click();
			this.fileList = [];
			this.uploadedFile = null;
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
        loadDimensions() {
            var me = this;
            me.invokeService('Workflow', 'GetDataByDataSource', ['GetDimensions', []],
                function (msg) {
                    if (msg.ReturnData.$.Success) {
                        console.log("== Get Dimensions - Success ==");
                        me.dimensionList = [{code: "", desc: me.getPMRes('AllDimensions')}];
                        var data = msg.ReturnData.$.ReturnData.toJson();
                        for (let dimension of data) {             
                            me.dimensionList.push(
                                {   
                                    code: dimension.code, 
                                    desc: me.ChangeContentByLanguage(dimension.e_name, dimension.t_name, dimension.c_name) 
                        }
                            );
                        }
                    } else {
                        console.log("== Get Dimensions - Failed ==");
                        me.alert(this.getRes('org.GetDimensionsFail'));
                    }
                },
                function (msg) {
                    console.log("== Get Dimensions - Lost ==");
                    me.alert(this.getRes('org.GetDimensionsLost'));
                })
        },
        ChangeContentByLanguage(ename, tname, cname){
            var language = localStorage.getItem("Language");
            var rtnData;
            if (language ==  "Chinese")
            {
                rtnData = cname;
        }
            else if (language ==  "English")
            {            
                rtnData = ename;
    }
            else if (language ==  "TraditionalChinese")
            {
                rtnData = tname;
}

            //default english
            if(ename && !rtnData)
            {
                rtnData = ename;
            }
            return rtnData
        }
    }
}
</script>