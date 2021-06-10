/*import customization resources*/
import Chinese from '@/resource/Chinese'
import English from '@/resource/English'
import TraditionalChinese from '@/resource/TraditionalChinese'

/*import customization components*/
import CustomComponent1 from '@/components/CustomComponent1'
import notificationMobile from '@/components/notificationMobile'
import PDFViewer from '@/components/PDFViewer'
import cs1 from '@/modules/Module1'
import lvBalRpt from '@/modules/Reports/LvBalRpt'
import lvTranRpt from '@/modules/Reports/LvTranRpt'
import approvalDefinition from '@/modules/ApprovalDefinition'
import organizationNode from '@/modules/OrganizationNode'
import payslip from '@/modules/Reports/Payslip'
import Taxation from '@/modules/Reports/Taxation'
import empProfile from '@/modules/Reports/EmpProfile'
import EmpProfileChange from '@/components/EmpProfileChange'
import { homedir } from 'os';

//import router from './router'

/*import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/Home/cs1',
        name: '/Home/cs1',
        component: CS1
    },
  ]

})*/

var listenAppVue = window.setInterval(function() {
    if (window.appVue && window.appVue.appVueReady) {
        window.clearTimeout(listenAppVue);
        
        /* append css from  */
        // var Homepage_Logo_css = ' .Homepage_CompanyLogo { height: 40px !important; padding-left: 20px; } ';
        // var Login_Logo_css = ' .login-wrapper .content .title .logo { height: 100px !important;} ';
        // var Login_Logo_img_css = ' .login-wrapper .content .title .logo img { height: 100px !important;} ';
        // var description_css = '.login-wrapper .background-img .description{display: none !important;} ';
        // var css = Homepage_Logo_css + Login_Logo_css + Login_Logo_img_css + description_css; // + other css string
        // var loHead = document.head || document.getElementsByTagName('head')[0];
        // var loStyle = document.createElement('style');
        
        // loHead.appendChild(loStyle);

        // loStyle.type = 'text/css';
        // if (loStyle.styleSheet) {
        //     // This is required for IE8 and below.
        //     loStyle.styleSheet.cssText = css;
        // } else {
        //     loStyle.appendChild(document.createTextNode(css));
        // }
        

        console.log("window.appVue");
        console.log(window.appVue);

        /*register  component*/
        window.appVue.registerCmp('CustomComponent1', CustomComponent1);
        window.appVue.registerCmp('notificationMobile', notificationMobile);
        window.appVue.registerCmp('PDFViewer', PDFViewer);
        window.appVue.registerCmp('lvTranRpt', lvTranRpt);
        //window.appVue.registerCmp('ApprovalDefinition', ApprovalDefinition);

        /*register  new router*/
        //window.appVue.registerMenu('/Home/cs1','cs1[customization]',cs1);

        //var newMenu = {};
        //window.appVue.$router.addRoutes([newMenu]);

        /*window.appVue.$router.options.routes[2].children.push(
            {path: '/Home/cs1', 
            name: '/Home/cs1', 
            component: cs1});
            */
        
        // Reset when open the app
        localStorage.setItem('CalledVia', '');
        localStorage.setItem('ShiftStartTime', '');
        localStorage.setItem('ShiftEndTime', '');
        localStorage.setItem('ShiftBreakStartTime', '');
        localStorage.setItem('ShiftBreakEndTime', '');
        localStorage.setItem('EmpCode', '');
        localStorage.setItem('attActionDate', '');
        localStorage.setItem('CoreLeaveID', '');
        localStorage.setItem('UserId', '');
        
        window.appVue.$router.addRoutes([{
            path: '/Home',
            name: 'Home',
            component: window.appVue.$router.options.routes[3].component, // [3]
            children: [{
                path: '/Home/cs1',
                name: '/Home/cs1',
                component: cs1
            }, {
                path: '/Home/lvBalRpt',
                name: '/Home/lvBalRpt',
                component: lvBalRpt
            }, {
                path: '/Home/lvTranRpt',
                name: '/Home/lvTranRpt',
                component: lvTranRpt
            }, {
                path: '/Home/ApprovalDefinition',
                path: '/Home/ApprovalDefinition',
                component: approvalDefinition
            }, {
                path: '/Home/OrganizationNode',
                path: '/Home/OrganizationNode',
                component: organizationNode
            }, {
                path: '/Home/payslip',
                name: '/Home/payslip',
                component: payslip
            }, {
                path: '/Home/IR56BRt',
                name: '/Home/IR56BRt',
                component: Taxation
            }, {
                path: '/Home/empProfile',
                name: '/Home/empProfile',
                component: empProfile
            }, {
                path: '/Home/EmpProfileChange',
                name: '/Home/EmpProfileChange',
                component: EmpProfileChange
            }]
        }]);

        console.log("window.appVue");
        console.log(window.appVue);
        console.log(window.appVue.$router);
        console.log(window.appVue.$router.options.routes[2]);

        /*register resources */
        window.appVue.importRes({
            'Chinese': Chinese,
            'English': English,
            'TraditionalChinese': TraditionalChinese
        });

        window.appVue.English.config["AttendanceCheck.ExtraWork"] = "My Employee Profile Change";
        window.appVue.Chinese.config["AttendanceCheck.ExtraWork"] = "员工资料变更";
        window.appVue.TraditionalChinese.config["AttendanceCheck.ExtraWork"] = "員工資料變更";

        window.appVue.English.config["menu.EmpProfileChange"] = "My Employee Profile Change";
        window.appVue.Chinese.config["menu.EmpProfileChange"] = "员工资料变更";
        window.appVue.TraditionalChinese.config["menu.EmpProfileChange"] = "員工資料變更";

        window.appVue.English.config["menu.LvBalRpt"] = "Leave Balance Report";
        window.appVue.Chinese.config["menu.LvBalRpt"] = "假期结余报表";
        window.appVue.TraditionalChinese.config["menu.LvBalRpt"] = "假期結餘報表";

        window.appVue.English.config["menu.LvTranRpt"] = "Leave Transaction Report";
        window.appVue.Chinese.config["menu.LvTranRpt"] = "假期记录";
        window.appVue.TraditionalChinese.config["menu.LvTranRpt"] = "假期記錄";

        window.appVue.English.config["menu.ApprovalDefinition"] = "Approval Definition";
        window.appVue.Chinese.config["menu.ApprovalDefinition"] = "审核定义";
        window.appVue.TraditionalChinese.config["menu.ApprovalDefinition"] = "審核定義";

        window.appVue.English.config["menu.OrganizationNode"] = "Organization Node";
        window.appVue.Chinese.config["menu.OrganizationNode"] = "组织单元";
        window.appVue.TraditionalChinese.config["menu.OrganizationNode"] = "組織單元";

        window.appVue.English.config["menu.IR56B"] = "Taxation Report";
        window.appVue.Chinese.config["menu.IR56B"] = "报税表";
        window.appVue.TraditionalChinese.config["menu.IR56B"] = "報稅表";

        window.appVue.English.config["menu.Payslip"] = "Payslip";
        window.appVue.Chinese.config["menu.Payslip"] = "工资单";
        window.appVue.TraditionalChinese.config["menu.Payslip"] = "工資單";

        window.appVue.English.config["menu.IR56BRt"] = "I.R.56B";
        window.appVue.Chinese.config["menu.IR56BRt"] = "I.R.56B";
        window.appVue.TraditionalChinese.config["menu.IR56BRt"] = "I.R.56B";

        window.appVue.English.config["menu.EmpProfile"] = "Employee Profile";
        window.appVue.Chinese.config["menu.EmpProfile"] = "Employee Profile";
        window.appVue.TraditionalChinese.config["menu.EmpProfile"] = "Employee Profile";
        
        window.appVue.English.config["Report.FiscalYear"]  =  "Fiscal Year";
        window.appVue.Chinese.config["Report.FiscalYear"] = "财政年度";
        window.appVue.TraditionalChinese.config["Report.FiscalYear"] = "財政年度";

        window.appVue.English.config["common.Search"]  =  "Search";        
        window.appVue.Chinese.config["common.Search"]  =  "搜寻";        
        window.appVue.TraditionalChinese.config["common.Search"]  =  "搜尋";

        window.appVue.English.config["PaySlip.PayrollMonth"] = "Payroll Month";
        window.appVue.Chinese.config["PaySlip.PayrollMonth"] = "工资月";
        window.appVue.TraditionalChinese.config["PaySlip.PayrollMonth"] = "工資月";

        window.appVue.English.config["LvAppRpt.LeavePeriod"] = "Leave Period";
        window.appVue.Chinese.config["LvAppRpt.LeavePeriod"] = "假期日";
        window.appVue.TraditionalChinese.config["LvAppRpt.LeavePeriod"] = "假期日";

        window.appVue.English.config["LvAppRpt.LeaveStatus"] = "Leave Status";
        window.appVue.Chinese.config["LvAppRpt.LeaveStatus"] = "假期批核状况";
        window.appVue.TraditionalChinese.config["LvAppRpt.LeaveStatus"] = "假期批核狀況";
        
        window.appVue.English.config["common.From"] = "From";
        window.appVue.Chinese.config["common.From"] = "从";
        window.appVue.TraditionalChinese.config["common.From"] = "從";

        window.appVue.English.config["common.To"] = "To";
        window.appVue.Chinese.config["common.To"] = "至";
        window.appVue.TraditionalChinese.config["common.To"] = "至";

        window.appVue.English.config["PDFViewer.Previous"] = "Previous";
        window.appVue.Chinese.config["PDFViewer.Previous"] = "上一页";
        window.appVue.TraditionalChinese.config["PDFViewer.Previous"] = "上一頁";
        
        window.appVue.English.config["PDFViewer.Next"] = "Next";
        window.appVue.Chinese.config["PDFViewer.Next"] = "下一页";
        window.appVue.TraditionalChinese.config["PDFViewer.Next"] = "下一頁";

        window.appVue.English.config["PDFViewer.ZoomIN"] = "Zoom +";
        window.appVue.Chinese.config["PDFViewer.ZoomIN"] = "放大";
        window.appVue.TraditionalChinese.config["PDFViewer.ZoomIN"] = "放大";

        window.appVue.English.config["PDFViewer.ZoomOUT"] = "Zoom -";
        window.appVue.Chinese.config["PDFViewer.ZoomOUT"] = "缩小";
        window.appVue.TraditionalChinese.config["PDFViewer.ZoomOUT"] = "縮小";
        
        window.appVue.English.config["common.Export"]  =  "Export";        
        window.appVue.Chinese.config["common.Export"]  =  "下载";        
        window.appVue.TraditionalChinese.config["common.Export"]  =  "下載";

        window.appVue.English.config["common.Application"] = "Application";
        window.appVue.Chinese.config["common.Application"] = "申请";
        window.appVue.TraditionalChinese.config["common.Application"] = "申請";

        window.appVue.English.config["common.Cancellation"] = "Cancellation";
        window.appVue.Chinese.config["common.Cancellation"] = "取消";
        window.appVue.TraditionalChinese.config["common.Cancellation"] = "取消";

        window.appVue.English.config["common.Available"] = "Available";
        window.appVue.Chinese.config["common.Available"] = "可选择";
        window.appVue.TraditionalChinese.config["common.Available"] = "可選擇";

        window.appVue.English.config["common.Selected"] = "Selected";
        window.appVue.Chinese.config["common.Selected"] = "已选择";
        window.appVue.TraditionalChinese.config["common.Selected"] = "已選擇";

        window.appVue.English.config["common.keyword"]  =  "Please enter keyword";
        window.appVue.Chinese.config["common.keyword"] = "請輸入關鍵字";
        window.appVue.TraditionalChinese.config["common.keyword"] = "請輸入關鍵字";

        window.appVue.English.config["Process.Approved"] = "Approved";
        window.appVue.Chinese.config["Process.Approved"] = "已批核";
        window.appVue.TraditionalChinese.config["Process.Approved"] = "已批核";
        
        window.appVue.English.config["Process.Pending"] = "Pending";
        window.appVue.Chinese.config["Process.Pending"] = "等待批核";
        window.appVue.TraditionalChinese.config["Process.Pending"] = "等待批核";

        window.appVue.English.config["Process.Rejected"] = "Rejected";
        window.appVue.Chinese.config["Process.Rejected"] = "已拒绝";
        window.appVue.TraditionalChinese.config["Process.Rejected"] = "已拒絕";

        window.appVue.English.config["LeaveTran.Apply"] = "Leave Application";
        window.appVue.Chinese.config["LeaveTran.Apply"] = "假期申请";
        window.appVue.TraditionalChinese.config["LeaveTran.Apply"] = "假期申請";

        window.appVue.English.config["LeaveTran.Cancel"] = "Leave Cancellation";
        window.appVue.Chinese.config["LeaveTran.Cancel"] = "取消假期";
        window.appVue.TraditionalChinese.config["LeaveTran.Cancel"] = "取消假期";

        window.appVue.English.config["Report.BalanceAsOf"]  =  "Balance As Of";
        window.appVue.Chinese.config["Report.BalanceAsOf"] = "假期余额截至";
        window.appVue.TraditionalChinese.config["Report.BalanceAsOf"] = "假期餘額截至";

        window.appVue.English.config["common.LeaveType"]  =  "Leave Type";
        window.appVue.Chinese.config["common.LeaveType"] = "假期类别";
        window.appVue.TraditionalChinese.config["common.LeaveType"] = "假期類別";

        window.appVue.English.config["common.Notes"]  =  "Notes: ";
        window.appVue.Chinese.config["common.Notes"] = "註: ";
        window.appVue.TraditionalChinese.config["common.Notes"] = "註: ";

        window.appVue.Chinese.config["Notes.String1"] = "所下载的档案设有密码保护，预设密码为";
        window.appVue.English.config["Notes.String1"] = "Downloaded file will have password protected. Default password will be “";
        window.appVue.TraditionalChinese.config["Notes.String1"] = "所下載的檔案設有密碼保護，預設密碼為";

        window.appVue.Chinese.config["Notes.String2"] = "（NNNN是身分证或护照号码头4个字，YYYYMMDD是出生日期）。";
        window.appVue.English.config["Notes.String2"] = "” where “NNNN” is the first 4 characters of HKID and “YYYYMMDD” is Date of Birth.";
        window.appVue.TraditionalChinese.config["Notes.String2"] = "（NNNN是身分證或護照號碼頭4個字，YYYYMMDD是出生日期）。";

        window.appVue.Chinese.config["common.Example"] = "例子";
        window.appVue.English.config["common.Example"] = "Example";
        window.appVue.TraditionalChinese.config["common.Example"] = "例子";

        window.appVue.Chinese.config["common.BirthYear"] = "出生日期";
        window.appVue.English.config["common.BirthYear"] = "Date of Birth";
        window.appVue.TraditionalChinese.config["common.BirthYear"] = "出生日期";

        window.appVue.Chinese.config["common.HKID"] = "身分证号码";
        window.appVue.English.config["common.HKID"] = "HKID";
        window.appVue.TraditionalChinese.config["common.HKID"] = "身分證號碼";

        window.appVue.Chinese.config["common.PasswordExample"] = "密码是";
        window.appVue.English.config["common.PasswordExample"] = "Password will be";
        window.appVue.TraditionalChinese.config["common.PasswordExample"] = "密碼是";

        window.appVue.Chinese.config["PunchDataManagement.batchFailureSuccess"] = "使记录无效成功";
        window.appVue.English.config["PunchDataManagement.batchFailureSuccess"] = "Invalidate the record successfully";
        window.appVue.TraditionalChinese.config["PunchDataManagement.batchFailureSuccess"] = "使記錄無效成功";

        window.appVue.Chinese.config["common.Password"] = "密码";
        window.appVue.English.config["common.Password"] = "Password";
        window.appVue.TraditionalChinese.config["common.Password"] = "密碼";

        window.appVue.Chinese.config["common.EnterPassword"] = "请输入密码";
        window.appVue.English.config["common.EnterPassword"] = "Please enter the password";
        window.appVue.TraditionalChinese.config["common.EnterPassword"] = "請輸入密碼";

        window.appVue.Chinese.config["common.Confirm"]  = "确定";
        window.appVue.English.config["common.Confirm"]  = "Confirm";
        window.appVue.TraditionalChinese.config["common.Confirm"]  = "確定";

        window.appVue.Chinese.config["common.Cancel"]  = "取消";
        window.appVue.English.config["common.Cancel"]  = "Cancel";
        window.appVue.TraditionalChinese.config["common.Cancel"]  = "取消";
        
        window.appVue.Chinese.config["common.InCorrectPassword"] = "密碼不正确";
        window.appVue.English.config["common.InCorrectPassword"] = "Incorrect Password";
        window.appVue.TraditionalChinese.config["common.InCorrectPassword"] = "密碼不正確";

        window.appVue.Chinese.config["common.InputCancelled"] = "已取消输入密码";
        window.appVue.English.config["common.InputCancelled"] = "Input password is cancelled";
        window.appVue.TraditionalChinese.config["common.InputCancelled"] = "已取消輸入密碼";

        window.appVue.Chinese.config["common.ReEnterPassword"] = "请重新输入密码";
        window.appVue.English.config["common.ReEnterPassword"] = "Please re-enter the password";
        window.appVue.TraditionalChinese.config["common.ReEnterPassword"] = "請重新輸入密碼";
        
        window.appVue.Chinese.config["common.ErrorOccur"] = "发生错误";
        window.appVue.English.config["common.ErrorOccur"] = "Error";
        window.appVue.TraditionalChinese.config["common.ErrorOccur"] = "發生錯誤";
        
        window.appVue.English.config["common.Import"]  =  "Import";
        window.appVue.Chinese.config["common.Import"] = "上载";
        window.appVue.TraditionalChinese.config["common.Import"] = "上載";
         
        window.appVue.English.config["org.OrgDimension"]  =  "Organization Dimension";        
        window.appVue.Chinese.config["org.OrgDimension"]  =  "组织架构维度";        
        window.appVue.TraditionalChinese.config["org.OrgDimension"]  =  "組織架構維度";
        
        window.appVue.English.config["common.EffectiveDate"]  =  "Effective Date";
        window.appVue.Chinese.config["common.EffectiveDate"] = "生效日期";
        window.appVue.TraditionalChinese.config["common.EffectiveDate"] = "生效日期";
        
        window.appVue.English.config["org.ImportOrgNode"]  =  "Import Organization Node";        
        window.appVue.Chinese.config["org.ImportOrgNode"]  =  "上载组织单元";        
        window.appVue.TraditionalChinese.config["org.ImportOrgNode"]  =  "上載組織單元";

        window.appVue.English.config["common.SelectFile"]  =  "Select File";
        window.appVue.Chinese.config["common.SelectFile"] = "选择档案";
        window.appVue.TraditionalChinese.config["common.SelectFile"] = "選擇檔案";
        
        window.appVue.English.config["common.ImportSuccess"]  =  "Import success";
        window.appVue.Chinese.config["common.ImportSuccess"] = "上载成功";
        window.appVue.TraditionalChinese.config["common.ImportSuccess"] = "上載成功";
        
        window.appVue.English.config["common.ImportExcelEntiresFail"]  =  "Fail to import {#No} entries. See Excel file for more details.";
        window.appVue.Chinese.config["common.ImportExcelEntiresFail"] = "{#No}项纪录上载失败，详情请参阅Excel档案";
        window.appVue.TraditionalChinese.config["common.ImportExcelEntiresFail"] = "{#No}項紀錄上載失敗，詳情請參閱Excel檔案";
        
        window.appVue.English.config["org.ImportExcelEntiresFail"]  =  "Fail to import some of the entries. See Excel file for more details.";
        window.appVue.Chinese.config["org.ImportExcelEntiresFail"] = "部分纪录上载失败，详情请参阅Excel档案";
        window.appVue.TraditionalChinese.config["org.ImportExcelEntiresFail"] = "部分紀錄上載失敗，詳情請參閱Excel檔案";
        
        window.appVue.English.config["common.ImportServiceError"]  =  "Import service Error";
        window.appVue.Chinese.config["common.ImportServiceError"] = "上载服务异常";
        window.appVue.TraditionalChinese.config["common.ImportServiceError"] = "上載服務異常";
        
        window.appVue.English.config["common.ExportServiceError"]  =  "Import service Error";
        window.appVue.Chinese.config["common.ExportServiceError"] = "下载服务异常";
        window.appVue.TraditionalChinese.config["common.ExportServiceError"] = "下載服務異常";
        
        window.appVue.English.config["common.IncorrectFileFormat"]  =  "Incorrect file format";
        window.appVue.Chinese.config["common.IncorrectFileFormat"] = "档案格式不合适";
        window.appVue.TraditionalChinese.config["common.IncorrectFileFormat"] = "檔案格式不合適";        
        
        window.appVue.English.config["org.GetDimensionsFail"]  =  "Get Dimensions Failed";
        window.appVue.Chinese.config["org.GetDimensionsFail"] = "获取组织单元失败";
        window.appVue.TraditionalChinese.config["org.GetDimensionsFail"] = "獲取組織單元失敗";
        
        window.appVue.English.config["org.GetDimensionsLost"]  =  "Get Dimensions Failed";
        window.appVue.Chinese.config["org.GetDimensionsLost"] = "获取组织单元异常";
        window.appVue.TraditionalChinese.config["org.GetDimensionsLost"] = "獲取組織單元異常";
        
        window.appVue.English.config["common.ImportFile"]  =  "Import";
        window.appVue.Chinese.config["common.ImportFile"] = "上载档案";
        window.appVue.TraditionalChinese.config["common.ImportFile"] = "上載檔案";
        
        window.appVue.English.config["common.NoFileSelected"]  =  "No File Selected";
        window.appVue.Chinese.config["common.NoFileSelected"] = "未选取档案";
        window.appVue.TraditionalChinese.config["common.NoFileSelected"] = "未選取檔案";        
        
        window.appVue.English.config["common.NoFileUploaded"]  =  "No File Uploaded";
        window.appVue.Chinese.config["common.NoFileUploaded"] = "档案尚未上载";
        window.appVue.TraditionalChinese.config["common.NoFileUploaded"] = "檔案尚未上載";                
        
        window.appVue.English.config["Error.NoLevel3"]  =  "Get Level 3 Fail";
        window.appVue.Chinese.config["Error.NoLevel3"] = "获取等级3失败";
        window.appVue.TraditionalChinese.config["Error.NoLevel3"] = "獲取等級3失敗";        
        
        window.appVue.English.config["Error.GetLeaveCodes"]  =  "Get Leave Codes Lost";
        window.appVue.Chinese.config["Error.GetLeaveCodes"] = "获取假期编码异常";
        window.appVue.TraditionalChinese.config["Error.GetLeaveCodes"] = "獲取假期編碼異常";     
        
        window.appVue.English.config["Error.GetUserInfoByUserId"]  =  "Current user id cannot be found";
        window.appVue.Chinese.config["Error.GetUserInfoByUserId"] = "找不到员工编号";
        window.appVue.TraditionalChinese.config["Error.GetUserInfoByUserId"] = "找不到員工編號";     

        window.appVue.English.config["Error.EmptyBalanceAsOfDate"]  =  "Please select balance as of date!";
        window.appVue.Chinese.config["Error.EmptyBalanceAsOfDate"] = "找不到员工编号";
        window.appVue.TraditionalChinese.config["Error.EmptyBalanceAsOfDate"] = "找不到員工編號";           
        
        window.appVue.English.config["Error.AsofDate"]  =  "As of Date cannot be empty";
        window.appVue.Chinese.config["Error.AsofDate"] = "截至日期不能为空白";
        window.appVue.TraditionalChinese.config["Error.AsofDate"] = "截至日期不能為空白";

        window.appVue.English.config["Error.StartEndPeriod"]  =  "From Date cannot be greater than To Date!";
        window.appVue.Chinese.config["Error.StartEndPeriod"] = "开始日期不能大于结束日期";
        window.appVue.TraditionalChinese.config["Error.StartEndPeriod"] = "開始日期不能大於結束日期";
        
        window.appVue.English.config["Error.GetPayslipPeriods"]  =  "Get Payroll Month fail";
        window.appVue.Chinese.config["Error.GetPayslipPeriods"] = "获取工资月失败";
        window.appVue.TraditionalChinese.config["Error.GetPayslipPeriods"] = "獲取工資月失敗";     
        
        window.appVue.English.config["Error.GETIR56BYear"]  =  "Get fiscal year fail";
        window.appVue.Chinese.config["Error.GETIR56BYear"] = "获取财政年度失败";
        window.appVue.TraditionalChinese.config["Error.GETIR56BYear"] = "獲取財政年度失敗";     

        window.appVue.English.config["common.EnterEmpNameOrNo"]  =  "Please enter the employee's name / no.";
        window.appVue.Chinese.config["common.EnterEmpNameOrNo"] = "请输入员工姓名或编号";
        window.appVue.TraditionalChinese.config["common.EnterEmpNameOrNo"] = "請輸入員工姓名或編號";  
        
        window.appVue.English.config["common.ImportApprDef"]  =  "Import Approval Definition";
        window.appVue.Chinese.config["common.ImportApprDef"] = "上载审核定义";
        window.appVue.TraditionalChinese.config["common.ImportApprDef"] = "上載審核定義";

        window.appVue.English.config["common.Submit"]  =  "Submit";
        window.appVue.Chinese.config["common.Submit"] = "确定";
        window.appVue.TraditionalChinese.config["common.Submit"] = "確定";

        window.appVue.English.config["common.OK"]  =  "OK";
        window.appVue.Chinese.config["common.OK"] = "确定";
        window.appVue.TraditionalChinese.config["common.OK"] = "確定";

        window.appVue.English.config["common.EmpNo"] = "Employee No.";
        window.appVue.Chinese.config["common.EmpNo"] = "员工编号";
        window.appVue.TraditionalChinese.config["common.EmpNo"] = "員工編號";

        window.appVue.English.config["common.EmpName"] = "Staff Name";
        window.appVue.Chinese.config["common.EmpName"] = "员工姓名";
        window.appVue.TraditionalChinese.config["common.EmpName"] = "員工姓名";

        window.appVue.English.config["common.Attachment"]  =  "Attachment";
        window.appVue.Chinese.config["common.Attachment"] = "附件";
        window.appVue.TraditionalChinese.config["common.Attachment"] = "附件";

        //My Employee Profile Change
        window.appVue.English.config["EmpProfile.BasicInfo"]  =  "Basic Information";
        window.appVue.Chinese.config["EmpProfile.BasicInfo"] = "基本资料";
        window.appVue.TraditionalChinese.config["EmpProfile.BasicInfo"] = "基本資料";

        window.appVue.English.config["EmpProfile.Address"]  =  "Address";
        window.appVue.Chinese.config["EmpProfile.Address"] = "地址";
        window.appVue.TraditionalChinese.config["EmpProfile.Address"] = "地址";

        window.appVue.English.config["EmpProfile.ContactInfo"]  =  "Contact Information";
        window.appVue.Chinese.config["EmpProfile.ContactInfo"] = "联络资料";
        window.appVue.TraditionalChinese.config["EmpProfile.ContactInfo"] = "聯絡資料";

        window.appVue.English.config["EmpProfile.EmergencyContact"]  =  "Emergency Contact";
        window.appVue.Chinese.config["EmpProfile.EmergencyContact"] = "紧急联络资料";
        window.appVue.TraditionalChinese.config["EmpProfile.EmergencyContact"] = "緊急聯絡資料";

        window.appVue.English.config["EmpProfile.Surname"]  =  "Surname";
        window.appVue.Chinese.config["EmpProfile.Surname"] = "姓氏";
        window.appVue.TraditionalChinese.config["EmpProfile.Surname"] = "姓氏";

        window.appVue.English.config["EmpProfile.GivenName"]  =  "GivenName";
        window.appVue.Chinese.config["EmpProfile.GivenName"] = "名";
        window.appVue.TraditionalChinese.config["EmpProfile.GivenName"] = "名";

        window.appVue.English.config["EmpProfile.Alias"]  =  "Alias";
        window.appVue.Chinese.config["EmpProfile.Alias"] = "別名";
        window.appVue.TraditionalChinese.config["EmpProfile.Alias"] = "別名";

        window.appVue.English.config["EmpProfile.SurnameC"]  =  "Chinese Name (Surname)";
        window.appVue.Chinese.config["EmpProfile.SurnameC"] = "中文姓名 (姓)";
        window.appVue.TraditionalChinese.config["EmpProfile.SurnameC"] = "中文姓名 (姓)";

        window.appVue.English.config["EmpProfile.GivenNameC"]  =  "Chinese Name (GivenName)";
        window.appVue.Chinese.config["EmpProfile.GivenNameC"] = "中文姓名 (名)";
        window.appVue.TraditionalChinese.config["EmpProfile.GivenNameC"] = "中文姓名 (名)";

        window.appVue.English.config["EmpProfile.MaritalStatus"]  =  "Marital Status";
        window.appVue.Chinese.config["EmpProfile.MaritalStatus"] = "婚姻状况";
        window.appVue.TraditionalChinese.config["EmpProfile.MaritalStatus"] = "婚姻狀況";

        window.appVue.English.config["EmpProfile.MarriageDate"]  =  "Marriage Date";
        window.appVue.Chinese.config["EmpProfile.MarriageDate"] = "結婚日期";
        window.appVue.TraditionalChinese.config["EmpProfile.MarriageDate"] = "結婚日期";

        window.appVue.English.config["EmpProfile.LastHireDate"]  =  "Last Hire Date";
        window.appVue.Chinese.config["EmpProfile.LastHireDate"] = "最新入职日期";
        window.appVue.TraditionalChinese.config["EmpProfile.LastHireDate"] = "最新入職日期";

        window.appVue.English.config["EmpProfile.YearofServices"]  =  "Year of Services (As of today)";
        window.appVue.Chinese.config["EmpProfile.YearofServices"] = "服务年资";
        window.appVue.TraditionalChinese.config["EmpProfile.YearofServices"] = "服務年限";

        window.appVue.English.config["EmpProfile.WorkVisa"]  =  "Work Visa";
        window.appVue.Chinese.config["EmpProfile.WorkVisa"] = "工作签证";
        window.appVue.TraditionalChinese.config["EmpProfile.WorkVisa"] = "工作簽證";

        window.appVue.English.config["EmpProfile.ExpiryDate"]  =  "Expiry Date";
        window.appVue.Chinese.config["EmpProfile.ExpiryDate"] = "失效日期";
        window.appVue.TraditionalChinese.config["EmpProfile.ExpiryDate"] = "失效日期";

        window.appVue.English.config["EmpProfile.RAddress"]  =  "Residential Address";
        window.appVue.Chinese.config["EmpProfile.RAddress"] = "居住地址";
        window.appVue.TraditionalChinese.config["EmpProfile.RAddress"] = "居住地址";

        window.appVue.English.config["EmpProfile.CAddress"]  =  "Correspondence Address";
        window.appVue.Chinese.config["EmpProfile.CAddress"] = "通讯地址";
        window.appVue.TraditionalChinese.config["EmpProfile.CAddress"] = "通訊地址";

        window.appVue.English.config["EmpProfile.EffectiveDate"]  =  "Effective Date";
        window.appVue.Chinese.config["EmpProfile.EffectiveDate"] = "生效日期";
        window.appVue.TraditionalChinese.config["EmpProfile.EffectiveDate"] = "生效日期";

        window.appVue.English.config["EmpProfile.District"]  =  "District";
        window.appVue.Chinese.config["EmpProfile.District"] = "地区";
        window.appVue.TraditionalChinese.config["EmpProfile.District"] = "地區";

        window.appVue.English.config["EmpProfile.Area"]  =  "Area";
        window.appVue.Chinese.config["EmpProfile.Area"] = "区域";
        window.appVue.TraditionalChinese.config["EmpProfile.Area"] = "區域";

        window.appVue.English.config["EmpProfile.Email"]  =  "Personal Email";
        window.appVue.Chinese.config["EmpProfile.Email"] = "电子邮件";
        window.appVue.TraditionalChinese.config["EmpProfile.Email"] = "電子郵件";

        window.appVue.English.config["EmpProfile.ContactPhone"]  =  "Contact Phone No.";
        window.appVue.Chinese.config["EmpProfile.ContactPhone"] = "家庭电话号码";
        window.appVue.TraditionalChinese.config["EmpProfile.ContactPhone"] = "聯絡電話號碼";

        window.appVue.English.config["EmpProfile.MobilePhone"]  =  "Mobile Phone No.";
        window.appVue.Chinese.config["EmpProfile.MobilePhone"] = "移动电话号码";
        window.appVue.TraditionalChinese.config["EmpProfile.MobilePhone"] = "手提電話號碼";

        window.appVue.English.config["EmpProfile.Relationship"]  =  "Relationship";
        window.appVue.Chinese.config["EmpProfile.Relationship"] = "关系";
        window.appVue.TraditionalChinese.config["EmpProfile.Relationship"] = "關係";

        window.appVue.English.config["EmpProfile.ContactPhone1"]  =  "1st Contact Phone No.";
        window.appVue.Chinese.config["EmpProfile.ContactPhone1"] = "首联络电话号码";
        window.appVue.TraditionalChinese.config["EmpProfile.ContactPhone1"] = "首聯絡電話號碼";

        window.appVue.English.config["EmpProfile.ContactPhone2"]  =  "2nd Contact Phone No.";
        window.appVue.Chinese.config["EmpProfile.ContactPhone2"] = "次联络电话号码";
        window.appVue.TraditionalChinese.config["EmpProfile.ContactPhone2"] = "次聯絡電話號碼";

        window.appVue.English.config["EmpProfile.AddressType"]  =  "Address Type";
        window.appVue.Chinese.config["EmpProfile.AddressType"] = "地址类型";
        window.appVue.TraditionalChinese.config["EmpProfile.AddressType"] = "地址類型";

        window.appVue.English.config["EmpProfile.ChangeSth"]  =  "Please edit something to make changes";
        window.appVue.Chinese.config["EmpProfile.ChangeSth"] = "请修改内容以进行更改";
        window.appVue.TraditionalChinese.config["EmpProfile.ChangeSth"] = "請修改內容以進行更改";

        window.appVue.English.config["EmpProfile.Sucess"]  =  "You have successfully submitted the changes";
        window.appVue.Chinese.config["EmpProfile.Sucess"] = "你已成功提交更改";
        window.appVue.TraditionalChinese.config["EmpProfile.Sucess"] = "你已成功提交更改";

        window.appVue.English.config["EmpProfile.Approve"]  =  "You have successfully approved the changes";
        window.appVue.Chinese.config["EmpProfile.Approve"] = "你已成功批核申请";
        window.appVue.TraditionalChinese.config["EmpProfile.Approve"] = "你已成功批核申請";

        window.appVue.English.config["EmpProfile.Reject"]  =  "You have successfully rejected the changes";
        window.appVue.Chinese.config["EmpProfile.Reject"] = "你已成功拒绝申请";
        window.appVue.TraditionalChinese.config["EmpProfile.Reject"] = "你已成功拒绝申請";

        window.appVue.English.config["EmpProfile.Empcode"]  =  "Employee No.";
        window.appVue.Chinese.config["EmpProfile.Empcode"] = "员工编号";
        window.appVue.TraditionalChinese.config["EmpProfile.Empcode"] = "員工編號";
        
        window.appVue.English.config["EmpProfile.EmptyEffectiveDate"]  =  "Please input Effective Date if you want to make changes";
        window.appVue.Chinese.config["EmpProfile.EmptyEffectiveDate"] = "请输入生效日期";
        window.appVue.TraditionalChinese.config["EmpProfile.EmptyEffectiveDate"] = "請輸入生效日期";

        window.appVue.English.config["EmpProfile.EmptyAddress"]  =  "Please input Address if you want to make changes";
        window.appVue.Chinese.config["EmpProfile.EmptyAddress"] = "请输入地址";
        window.appVue.TraditionalChinese.config["EmpProfile.EmptyAddress"] = "請輸入地址";
        
        window.appVue.English.config["EmpProfile.ApplicationExisted"] = "There is a pending application";
        window.appVue.Chinese.config["EmpProfile.ApplicationExisted"] = "你有未批核的申请";
        window.appVue.TraditionalChinese.config["EmpProfile.ApplicationExisted"] = "你有未批核的申請";

        window.appVue.English.config["EmpProfile.IncorrectEffectiveDate"]  =  "The new Effective Date should be later than previous record";
        window.appVue.Chinese.config["EmpProfile.IncorrectEffectiveDate"] = "新的生效日期应晚于以前的记录";
        window.appVue.TraditionalChinese.config["EmpProfile.IncorrectEffectiveDate"] = "新的生效日期應晚於以前的記錄";

        window.appVue.English.config["EmpProfile.AddressExceedLimit"]  =  "The Address exceeds a limit of 50 characters";
        window.appVue.Chinese.config["EmpProfile.AddressExceedLimit"] = "地址超过50个字符的限制";
        window.appVue.TraditionalChinese.config["EmpProfile.AddressExceedLimit"] = "地址超過50個字符的限制";
        
        window.appVue.English.config["EmpProfile.ContactExceedLimit"]  =  "The Contact Info exceeds a limit of 40 characters";
        window.appVue.Chinese.config["EmpProfile.ContactExceedLimit"] = "联络资料超过40个字符的限制";
        window.appVue.TraditionalChinese.config["EmpProfile.ContactExceedLimit"] = "聯絡資料超過40個字符的限制";

        window.appVue.English.config["EmpProfile.EmergencyContactExceedsLimit"]  =  "The Emergency Contact exceeds a limit of 110 characters";
        window.appVue.Chinese.config["EmpProfile.EmergencyContactExceedsLimit"] = "紧急联络资料超过110个字符的限制";
        window.appVue.TraditionalChinese.config["EmpProfile.EmergencyContactExceedsLimit"] = "緊急聯絡資料超過110個字符的限制";

        window.appVue.English.config["EmpProfile.AttachmentMissing"]  =  "Please upload an attachment";
        window.appVue.Chinese.config["EmpProfile.AttachmentMissing"] = "请上传附件";
        window.appVue.TraditionalChinese.config["EmpProfile.AttachmentMissing"] = "請上傳附件";

        //Bank tab
        window.appVue.English.config["EmpProfile.Bank"]  =  "Bank Account";
        window.appVue.Chinese.config["EmpProfile.Bank"] = "银行账户";
        window.appVue.TraditionalChinese.config["EmpProfile.Bank"] = "銀行賬戶";

        window.appVue.English.config["EmpProfile.PayeeName"]  =  "Payee Name";
        window.appVue.Chinese.config["EmpProfile.PayeeName"] = "收款人姓名";
        window.appVue.TraditionalChinese.config["EmpProfile.PayeeName"] = "收款人姓名";
        
        window.appVue.English.config["EmpProfile.Currency"]  =  "Currency";
        window.appVue.Chinese.config["EmpProfile.Currency"] = "货币";
        window.appVue.TraditionalChinese.config["EmpProfile.Currency"] = "貨幣";

        window.appVue.English.config["EmpProfile.BankCode"]  =  "Bank Account (Bank Code)";
        window.appVue.Chinese.config["EmpProfile.BankCode"] = "银行名称";
        window.appVue.TraditionalChinese.config["EmpProfile.BankCode"] = "銀行名稱";

        window.appVue.English.config["EmpProfile.BankAccount"]  =  "Bank Account No.";
        window.appVue.Chinese.config["EmpProfile.BankAccount"] = "银行账户";
        window.appVue.TraditionalChinese.config["EmpProfile.BankAccount"] = "銀行賬戶";

        //For Mobile
        window.appVue.English.config["menu.More"] = "More";
        window.appVue.Chinese.config["menu.More"] = "More";
        window.appVue.TraditionalChinese.config["menu.More"] = "More";

        window.appVue.English.config["menu.BasicInfoChange"] = "Basic Information";
        window.appVue.Chinese.config["menu.BasicInfoChange"] = "基本资料";
        window.appVue.TraditionalChinese.config["menu.BasicInfoChange"] = "基本資料";

        window.appVue.English.config["menu.AddressChange"] = "Address";
        window.appVue.Chinese.config["menu.AddressChange"] = "地址";
        window.appVue.TraditionalChinese.config["menu.AddressChange"] = "地址";

        window.appVue.English.config["menu.ContactChange"] = "Contact Information";
        window.appVue.Chinese.config["menu.ContactChange"] = "联络资料";
        window.appVue.TraditionalChinese.config["menu.ContactChange"] = "聯絡資料";

        window.appVue.English.config["menu.EmerChange"] = "Emergency Contact";
        window.appVue.Chinese.config["menu.EmerChange"] = "紧急联络资料";
        window.appVue.TraditionalChinese.config["menu.EmerChange"] = "緊急聯絡資料";

        window.appVue.English.config["menu.BankChange"] = "Bank";
        window.appVue.Chinese.config["menu.BankChange"] = "银行账户";
        window.appVue.TraditionalChinese.config["menu.BankChange"] = "銀行賬戶";

        /*replace login page*/
        //window.appVue.$router.push("/cs1");
        window.appVue.$router.push("/");

    }
}, 5);