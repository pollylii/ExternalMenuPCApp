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
                                    <el-input :placeholder="getRes('common.EnterEmpNameOrNo')" v-model="empInfo" style="text-align:left; width: 400px;"> </el-input>
                                    <el-button type="primary" icon="el-icon-upload2" @click="handleShow">{{getRes('common.Import')}}</el-button>
                                    <el-button type="primary" icon="el-icon-download" @click="exportApproval">{{getRes('common.Export')}}</el-button>
                                </el-row>
                        </el-container>
                    </div>
				</el-card>
                <el-dialog :visible.sync="showDialog" :title="getRes('common.ImportApprDef')">
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
                            <el-button type="primary" @click="importApproval">{{getRes('common.Import')}}</el-button>
                        </el-col>
                    </el-footer>
                </el-dialog>
			</el-container>
		</div>
</template>

<script>
export default {
    name: "Approval Definition",
    data: function() {
        return {
            resource: {
                English: {
                    "EmployeeNotFound": "Employee not found"
                },
                Chinese: {
                    "EmployeeNotFound": "没有此员工"
                },
                TraditionalChinese: {
                    "EmployeeNotFound": "沒有此員工"
                }
            },
            fileaction: '',
            empInfo: '',
            fileList: [],
            showDialog: false,
            canImport: false,
            uploadedFile: null,
            loading: false
        }
    },
    mounted: function() {
        var me = this;
        // var url = window.location.href;
		// var partialPath = url.substr(0, url.toLowerCase().indexOf('-web'));
		
		// if(url.includes("localhost")){
		// 	me.fileaction = 'http://localhost/workforce//Handlers/UploadFileHandler.ashx?CommonResource=0';	
		// }
		// else {
		// 	this.fileaction = partialPath + '/Handlers/UploadFileHandler.ashx?CommonResource=0';
		// }
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
        importApproval() {
            this.canImport = false; // Prevent multiple request
            var me = this;

            if (me.fileList.length == 0) {
                // me.alert(
                //     this.getPMRes("NoFileSelected"),
                // );
                me.alert(this.getRes('common.NoFileSelected'));
                return;
            }

            console.log("Importing...");
            me.invokeService("IPLUpload", "ImportApprovalDefinition", [me.uploadedFile],
                function (msg) {
                    console.log(msg);
                    if (msg.ReturnData.$.Success) {
                        console.log("Import success");
                        if (!msg.ReturnData.$.FailedImport) {
                            me.alert(this.getRes('common.ImportSuccess'));
                        } else {
                            console.log("FailedImport");
                            var xls = this.base64ToArrayBuffer(msg.ReturnData.$.FailedImport);
                            this.saveByteArray("Error_Approval Definition", xls);
                            var FailEntiresNo = msg.ReturnData.$.ErrorMsg;
                            var msg = this.getRes('common.ImportExcelEntiresFail').replace('{#No}', FailEntiresNo);
                            me.alert(msg);
                        }
                    } else {
                        console.log("== Import Approval Definition - Failed ==");
                        var errmsg = msg.ReturnData.$.ErrorMsg;                        

                        if(errmsg == 'NoFileUploaded'){
                            errmsg = me.getRes('common.NoFileUploaded');
                    }
                        
                        me.alert(errmsg);
                    }
                    me.canImport = true;
                },
                function (msg) {
                    console.log("== Import Approval Definition - Lost ==");
                    me.alert(this.getRes('common.ImportServiceError'));
                    me.canImport = true;
                }
            )
        },
        handleFileChange(file, fileList) {
            this.fileList = fileList;
            this.canImport = false;
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
            var isValid = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (!isValid) {
                this.alert(this.getRes('common.IncorrectFileFormat'));
                this.loading = false;
            }
            console.log("Uploading...");
            return isValid;
        },
        exportApproval() {
            var me = this;
            me.invokeService("IPLUpload", "ExportApprovalDefinition", [this.empInfo],
                function (msg) {
                    console.log(msg);
                    if (msg.ReturnData.$.Success) {
                        console.log("== Export Approval Definition - Success ==");
                        console.log(msg.ReturnData.$.Data);
                        var xls = this.base64ToArrayBuffer(msg.ReturnData.$.ExcelFile);
                        this.saveByteArray("Approval Definition", xls);
                    } else {
                        console.log("== Export Approval Definition - Failed ==");
                        me.alert(msg.ReturnData.$.ErrorMsg);
                    }
                },
                function (msg) {
                    console.log("== Export Approval Definition - Lost ==");
                    me.alert(this.getRes('common.ExportServiceError'));
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
        }
    }
}
</script>