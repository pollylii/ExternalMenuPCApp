<template>
	<div v-loading="loading">
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
                <el-tabs v-model="TabName" @tab-click="handleClick">
                    <el-tab-pane :label="getRes('EmpProfile.BasicInfo')" name="BasicInfo">
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.Surname')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="Surname" disabled="true"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.GivenName')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="GivenName" disabled="true"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.Alias')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="Alias" disabled="true"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.SurnameC')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="SurnameC" disabled="true"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.GivenNameC')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="GivenNameC" disabled="true"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.MaritalStatus')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                                <el-select :placeholder="getRes('EmpProfile.MaritalStatus')" v-model="MaritalStatus" :disabled="!editBasicInfo">
                                    <el-option
                                        v-for="item in MaritalStatusList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                                <el-button style="margin-left: 10%" type="primary" @click="EditField('BasicInfo')" icon="el-icon-edit"></el-button>
                                <!--<i style="margin: 8px;cursor: pointer;font-size: 25px;" @click="EditField('BasicInfo')" class="el-icon-edit"></i>-->
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <div style=" margin: 15px 0px 15px 50px;font-size: 12px;">
                                    {{getRes('EmpProfile.MarriageDate')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-date-picker
                                    v-model="MarriageDate"
                                    type="date"
                                    :placeholder="getRes('EmpProfile.MarriageDate')"
                                    :disabled="!editBasicInfo">
                                </el-date-picker>
                            </el-col>
                        </el-row>

                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.WorkVisa')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-input v-model="WorkVisa" disabled="true"></el-input>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <div style=" margin: 15px 0px 15px 50px;font-size: 12px;">
                                    {{getRes('EmpProfile.ExpiryDate')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-input v-model="ExpiryDate" disabled="true"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <AttachmentField style="margin-left: 5%" ref="BIAttachmentField" v-model="BIAttachment" :readonly="!editBasicInfo"></AttachmentField>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="getRes('EmpProfile.Address')" name="Address">
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.RAddress')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                                <el-button type="primary" @click="EditField('RAddress')" icon="el-icon-edit"></el-button>
                                <!--<i style="margin: 8px;cursor: pointer;font-size: 25px;" @click="EditField('RAddress')" class="el-icon-edit"></i>-->
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.EffectiveDate')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-date-picker
                                    v-model="REffectiveDate"
                                    type="date"
                                    :placeholder="getRes('EmpProfile.EffectiveDate')"
                                    :disabled="!editRAddress">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="RAddress1" :disabled="!editRAddress"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="RAddress2" :disabled="!editRAddress"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="RAddress3" :disabled="!editRAddress"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="RAddress4" :disabled="!editRAddress"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.District')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-select v-model="RDistrict" :disabled="!editRAddress">
                                    <el-option
                                        v-for="item in DistrictList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.Area')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-select v-model="RArea" :disabled="!editRAddress">
                                    <el-option
                                        v-for="item in AreaList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <AttachmentField style="margin-left: 5%" ref="RAttachmentField" v-model="RAttachment" :readonly="!editRAddress"></AttachmentField>
                        </el-row>
                        <br/>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.CAddress')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                                <el-button type="primary" @click="EditField('CAddress')" icon="el-icon-edit"></el-button>
                                <!--<i style="margin: 8px;cursor: pointer;font-size: 25px;" @click="EditField('RAddress')" class="el-icon-edit"></i>-->
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.EffectiveDate')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-date-picker
                                    v-model="CEffectiveDate"
                                    type="date"
                                    :placeholder="getRes('EmpProfile.EffectiveDate')"
                                    :disabled="!editCAddress">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="CAddress1" :disabled="!editCAddress"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="CAddress2" :disabled="!editCAddress"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="CAddress3" :disabled="!editCAddress"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="CAddress4" :disabled="!editCAddress"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.District')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-select v-model="CDistrict" :disabled="!editCAddress">
                                    <el-option
                                        v-for="item in DistrictList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.Area')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-select v-model="CArea" :disabled="!editCAddress">
                                    <el-option
                                        v-for="item in AreaList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <AttachmentField style="margin-left: 5%" ref="CAttachmentField" v-model="CAttachment" :readonly="!editCAddress"></AttachmentField>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="getRes('EmpProfile.ContactInfo')" name="ContactInfo">
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.Email')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="5" :lg="5" :xl="5">
                                <el-date-picker
                                    v-model="EmailEffectiveDate"
                                    type="date"
                                    :placeholder="getRes('EmpProfile.EffectiveDate')"
                                    :disabled="!editEmail">
                                </el-date-picker>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="Email" :disabled="!editEmail"></el-input>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                                <el-button style="margin-left: 10%" type="primary" @click="EditField('Email')" icon="el-icon-edit"></el-button>
                                <!--<i style="margin: 8px;cursor: pointer;font-size: 25px;" @click="EditField('BasicInfo')" class="el-icon-edit"></i>-->
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.ContactPhone')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="5" :lg="5" :xl="5">
                                <el-date-picker
                                    v-model="ContactPhoneEffectiveDate"
                                    type="date"
                                    :placeholder="getRes('EmpProfile.EffectiveDate')"
                                    :disabled="!editContactPhone">
                                </el-date-picker>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="ContactPhone" :disabled="!editContactPhone"></el-input>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                                <el-button style="margin-left: 10%" type="primary" @click="EditField('ContactPhone')" icon="el-icon-edit"></el-button>
                                <!--<i style="margin: 8px;cursor: pointer;font-size: 25px;" @click="EditField('BasicInfo')" class="el-icon-edit"></i>-->
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.MobilePhone')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="5" :lg="5" :xl="5">
                                <el-date-picker
                                    v-model="MobilePhoneEffectiveDate"
                                    type="date"
                                    :placeholder="getRes('EmpProfile.EffectiveDate')"
                                    :disabled="!editMobilePhone">
                                </el-date-picker>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="MobilePhone" :disabled="!editMobilePhone"></el-input>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                                <el-button style="margin-left: 10%" type="primary" @click="EditField('MobilePhone')" icon="el-icon-edit"></el-button>
                                <!--<i style="margin: 8px;cursor: pointer;font-size: 25px;" @click="EditField('BasicInfo')" class="el-icon-edit"></i>-->
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="getRes('EmpProfile.Bank')" name="Bank">
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.EffectiveDate')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7">
                                <el-date-picker
                                    v-model="BankEffectiveDate"
                                    type="date"
                                    :placeholder="getRes('EmpProfile.EffectiveDate')"
                                    :disabled="!editBank">
                                </el-date-picker>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                                <el-button style="margin-left: 10%" type="primary" @click="EditField('Bank')" icon="el-icon-edit"></el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.PayeeName')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="PayeeName" :disabled="!editBank"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.Currency')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-select v-model="Currency" :disabled="!editBank">
                                    <el-option
                                        v-for="item in CurrencyList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.BankCode')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-select v-model="BankCode" :disabled="!editBank">
                                    <el-option
                                        v-for="item in BankCodeList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.BankAccount')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="BankAccount" :disabled="!editBank"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="FullAccount" :disabled=true></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <AttachmentField style="margin-left: 5%" ref="BAttachmentField" v-model="BAttachment" :readonly="!editBank"></AttachmentField>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="getRes('EmpProfile.EmergencyContact')" name="EmergencyContact">
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.EmergencyContact')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-input v-model="EmergencyContact" :disabled="!editEmergencyContact"></el-input>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1">
                                <el-button style="margin-left: 10%" type="primary" @click="EditField('EmergencyContact')" icon="el-icon-edit"></el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.Relationship')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-select v-model="Relationship" :disabled="!editEmergencyContact">
                                    <el-option
                                        v-for="item in RelationshipList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.Address')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-select v-model="ECAddressType" :disabled="!editEmergencyContact">
                                    <el-option
                                        v-for="item in ECAddressTypeList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="ECAddress1" :disabled="!editEmergencyContact"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="ECAddress2" :disabled="!editEmergencyContact"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="ECAddress3" :disabled="!editEmergencyContact"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"></el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                <el-input v-model="ECAddress4" :disabled="!editEmergencyContact"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.ContactPhone1')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-input v-model="ContactPhone1" :disabled="!editEmergencyContact"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5">
                            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                                <div style=" margin: 15px 0px 15px 10px;font-size: 12px;">
                                    {{getRes('EmpProfile.ContactPhone2')}}
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                <el-input v-model="ContactPhone2" :disabled="!editEmergencyContact"></el-input>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
                <br/>
                <el-row :gutter="5">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-button style="float: right" type="primary" @click.native="SubmitChange()">{{getRes('common.Submit')}}</el-button>
                    </el-col>
                </el-row>
                
            </el-card>
        </el-container>
    </div>
</template>

<script>
//import { valid } from 'semver';
export default  { //window.vue.extend({  use this in js instead of export default
    //template: formtemplate,  //need in js
    data:function () {
        return {
		   
            resource:{
                English:
                {
                    'BasicInfo': 'Basic Information',
                    'Address': 'Address',
                    'ContactInfo': 'Contact Information',
                    'EmergencyContact': 'Emergency Contact',
                    'RAddress': 'Residential Address',
                    'CAddress': 'Corresponding Address',
                    'Email': 'Email',
                    'ContactPhone': 'Contact Phone',
                    'MobilePhone': 'Mobile Phone',
                    'Bank': 'Bank'
                },
                Chinese:
                {
				    'BasicInfo': '基本资料',
                    'Address': '地址',
                    'ContactInfo': '联络资料',
                    'EmergencyContact': '紧急联络资料',
                    'RAddress': '居住地址',
                    'CAddress': '通讯地址',
                    'Email': '电子邮件',
                    'ContactPhone': '家庭电话号码',
                    'MobilePhone': '移动电话号码',
                    'Bank': '银行账户'
                },
                TraditionalChinese:
                {
				   'BasicInfo': '基本資料',
                    'Address': '地址',
                    'ContactInfo': '聯絡資料',
                    'EmergencyContact': '緊急聯絡資料',
                    'RAddress': '居住地址',
                    'CAddress': '通讯地址',
                    'Email': '電子郵件',
                    'ContactPhone': '聯絡電話號碼',
                    'MobilePhone': '手提電話號碼',
                    'Bank': '銀行賬戶'
                },
            },
			loading: false,
            TabName: 'BasicInfo',
            fileaction: '',
            fileList: [],
            uploadedFile: '',
            editBasicInfo: false,
            Surname: '',
            GivenName: '',
            Alias: '',
            SurnameC: '',
            GivenNameC: '',
            MaritalStatus: '',
            MaritalStatusList: [],
            MarriageDate: '',
            LastHireDate: '',
            YearofServices: '',
            WorkVisa: '',
            ExpiryDate: '',
            BIAttachment: {fileId:'',fileName:'',fileUrl: ''},
            editRAddress: false,
            REffectiveDate: '',
            RAddress1: '',
            RAddress2: '',
            RAddress3: '',
            RAddress4: '',
            RDistrict: '',
            DistrictList: [],
            RArea: '',
            AreaList: [],
            RAttachment: {fileId:'',fileName:'',fileUrl: ''},
            editCAddress: false,
            CEffectiveDate: '',
            CAddress1: '',
            CAddress2: '',
            CAddress3: '',
            CAddress4: '',
            CDistrict: '',
            CArea: '',
            CAttachment: {fileId:'',fileName:'',fileUrl: ''},
            EmailEffectiveDate: '',
            Email: '',
            ContactPhoneEffectiveDate: '',
            ContactPhone: '',
            MobilePhoneEffectiveDate: '',
            MobilePhone: '',
            editEmail: false,
            editContactPhone: false,
            editMobilePhone: false,
            editEmergencyContact: false,
            EmergencyContact: '',
            Relationship: '',
            RelationshipList: [],
            ECAddressType: '',
            ECAddressTypeList: [ {text: 'R.ADDRESS', value: 'R.ADDRESS'}, {text: 'C.ADDRESS', value: 'C.ADDRESS'}],
            ECAddress1: '',
            ECAddress2: '',
            ECAddress3: '',
            ECAddress4: '',
            ContactPhone1: '',
            ContactPhone2: '',
            OriREffectiveDate: '',
            OriCEffectiveDate: '',
            OriEmailEffectiveDate: '',
            OriContactPhoneEffectiveDate: '',
            OriMobilePhoneEffectiveDate: '',
            //Bank
            BankEffectiveDate: '',
            editBank: false,
            PayeeName: '',
            Currency: 'HKD',
            CurrencyList: [{value: 'HKD', text: 'Hong Kong Dollar'}],
            BankCode: '',
            BankCodeList: [],
            BankAccount: '',
            OriBankEffectiveDate: '',
            BAttachment: {fileId:'',fileName:'',fileUrl: ''},
            BankCodeDict: {},
            BankName: '',
            FullAccount: ''
        }
    },
    watch: {
		BankCode(val) {
            if (val != '' && this.BankAccount != '') 
                this.FullAccount = val + ' - ' + this.BankAccount
        },
        BankAccount(val) {
            if (val != '' && this.BankCode != '') 
                this.FullAccount = this.BankCode + ' - ' + val
        }
	},
	mounted: function(){
			var me = this; 
            var localUser = me.LocalUser;
			var userid = localUser.UserId;
			var empcode = localUser.EmpCode;
            // console.log(empcode);
            me.PrepareDataSource();
            me.loadInfo();
	},
    methods: {
        getTranslatedRes(key, lang) {
            var res = this.resource.English
            if (lang == 'C')
                res = this.resource.Chinese
            else if (lang == 'T')
                res = this.resource.TraditionalChinese
            
            return res[key]
        },
        EditField(field) {
            var me = this;
            switch(field) {
                case 'BasicInfo':
                    me.editBasicInfo = !me.editBasicInfo;
                    break;
                case 'RAddress':
                    me.editRAddress = !me.editRAddress;
                    break;
                case 'CAddress':
                    me.editCAddress = !me.editCAddress;
                    break;
                case 'Email':
                    me.editEmail = !me.editEmail;
                    break;
                case 'ContactPhone':
                    me.editContactPhone = !me.editContactPhone;
                    break;
                case 'MobilePhone':
                    me.editMobilePhone = !me.editMobilePhone;
                    break;
                case 'EmergencyContact':
                    me.editEmergencyContact = !me.editEmergencyContact;
                    break;
                case 'Bank':
                    me.editBank = !me.editBank;
                    break;
            }
        },
        PrepareDataSource() {
            var me = this;
            var language = localStorage.getItem('Language')
            console.log('language = ' + language)
            me.invokeService("Workflow", "GetDataByDataSource", ['GetMaritalStatus', []],
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
                        if (language == 'English' || (language != 'English' && (!item.Desc2 || item.Desc2 == '')))
                            item["text"] = item.Desc;
                        else
						    item["text"] = item.Desc2;
						list.push(item);
					}
                    me.MaritalStatusList = list;
				}
				else{
					me.alert(me.getRes('Error.GetMaritalStatus'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetMaritalStatus fail');
            });
            
            me.invokeService("Workflow", "GetDataByDataSource", ['GetDistrict', []],
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
                        if (language == 'English' || (language != 'English' && (!item.Desc2 || item.Desc2 == '')))
                            item["text"] = item.Desc;
                        else
						    item["text"] = item.Desc2;
						list.push(item);
					}
					me.DistrictList = list;
				}
				else{
					me.alert(me.getRes('Error.GetDistrict'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetDistrict fail');
            });

            me.invokeService("Workflow", "GetDataByDataSource", ['GetAreaCode', []],
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
                        if (language == 'English' || (language != 'English' && (!item.Desc2 || item.Desc2 == '')))
                            item["text"] = item.Desc;
                        else
						    item["text"] = item.Desc2;
						list.push(item);
					}
					me.AreaList = list;
				}
				else{
					me.alert(me.getRes('Error.GetAreaCode'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetDistrict fail');
            });
            
            me.invokeService("Workflow", "GetDataByDataSource", ['GetRelationship', []],
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
                        if (language == 'English' || (language != 'English' && (!item.Desc2 || item.Desc2 == '')))
                            item["text"] = item.Desc;
                        else
						    item["text"] = item.Desc2;
						list.push(item);
					}
                    me.RelationshipList = list;
                    console.log(me.RelationshipList)
				}
				else{
					me.alert(me.getRes('Error.GetRelationship'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetRelationship fail');
            });
            
            me.invokeService("Workflow", "GetDataByDataSource", ['GetCurrency', []],
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
                        if (language == 'English' || (language != 'English' && (!item.Desc2 || item.Desc2 == '')))
                            item["text"] = item.Desc;
                        else
						    item["text"] = item.Desc2;
						list.push(item);
					}
					//me.CurrencyList = list;
				}
				else{
					me.alert(me.getRes('Error.GetCurrency'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetCurrency fail');
            });
            
            me.invokeService("Workflow", "GetDataByDataSource", ['GetBankCode', []],
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
						me.BankCodeDict[item.Code] = item.Desc                                                                       
                        if (language == 'English' || (language != 'English' && (!item.Desc2 || item.Desc2 == '')))
                            item["text"] = item.Code + ' - ' + item.Desc;
                        else
						    item["text"] = item.Code + ' - ' + item.Desc2;
						list.push(item);
					}
					me.BankCodeList = list;
				}
				else{
					me.alert(me.getRes('Error.GetBankCode'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetBankCode fail');
			});
        },
        loadInfo() {
            var me = this;
            me.invokeService("Workflow", "GetDataByDataSource", ['GetBasicInfo', [me.LocalUser.EmpCode]],
			function (msg) 
			{
                console.log(' -- GetBasicInfo -- ')
                console.log(msg)
				if (msg.ReturnData.$.Success) 
				{
                    me.Surname = msg.ReturnData.$.ReturnData.ESName
                    me.GivenName = msg.ReturnData.$.ReturnData.EGName
                    me.SurnameC = localStorage.getItem('Language') == 'Chinese' ? msg.ReturnData.$.ReturnData.CSName : msg.ReturnData.$.ReturnData.TSName
                    me.GivenNameC = localStorage.getItem('Language') == 'Chinese' ? msg.ReturnData.$.ReturnData.CGName : msg.ReturnData.$.ReturnData.TGName
                    me.Alias = msg.ReturnData.$.ReturnData.Alias
                    me.MaritalStatus = msg.ReturnData.$.ReturnData.MaritalStat
                    me.MarriageDate = msg.ReturnData.$.ReturnData.MarriageDt
                    me.WorkVisa = msg.ReturnData.$.ReturnData.WorkVisa
                    me.ExpiryDate = msg.ReturnData.$.ReturnData.Expiry
				}
				else{
					me.alert(me.getRes('Error.GetBasicInfo'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetBasicInfo fail');
            });
            
            me.invokeService("Workflow", "GetDataByDataSource", ['GetAddress', [me.LocalUser.EmpCode]],
			function (msg) 
			{
                console.log(' -- GetAddress -- ')
                //console.log(msg)
				if (msg.ReturnData.$.Success) 
				{
                    var result = msg.ReturnData.$.ReturnData.data
                    console.log(result)
                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            var AddrType = result[i][0]
                            if (result[i][0] == 'R.ADDRESS') {
                                me.REffectiveDate = result[i][1]
                                me.OriREffectiveDate = new Date(me.REffectiveDate)
                                me.RAddress1 = result[i][2]
                                me.RAddress2 = result[i][3]
                                me.RAddress3 = result[i][4]
                                me.RAddress4 = result[i][5]
                                me.RDistrict = result[i][6]
                                me.RArea = result[i][7]
                            }
                            else if (result[i][0] == 'C.ADDRESS') {
                                me.CEffectiveDate = result[i][1]
                                me.OriCEffectiveDate = new Date(me.CEffectiveDate)
                                me.CAddress1 = result[i][2]
                                me.CAddress2 = result[i][3]
                                me.CAddress3 = result[i][4]
                                me.CAddress4 = result[i][5]
                                me.CDistrict = result[i][6]
                                me.CArea = result[i][7]
                            }
                        }
                    }
                    
				}
				else{
					me.alert(me.getRes('Error.GetAddress'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetAddress fail');
            });

            me.invokeService("Workflow", "GetDataByDataSource", ['GetContactInfo', [me.LocalUser.EmpCode]],
			function (msg) 
			{
                console.log(' -- GetContactInfo -- ')
                //console.log(msg)
				if (msg.ReturnData.$.Success) 
				{
                    var result = msg.ReturnData.$.ReturnData.data
                    console.log(result)

                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i][0] == 'EMAIL') {
                                me.EmailEffectiveDate = result[i][2]
                                me.OriEmailEffectiveDate = new Date(me.EmailEffectiveDate)
                                me.Email = result[i][1]
                            }
                            else if (result[i][0] == 'HOME') {
                                me.ContactPhoneEffectiveDate = result[i][2]
                                me.OriContactPhoneEffectiveDate = new Date(me.ContactPhoneEffectiveDate)
                                me.ContactPhone = result[i][1]
                            }
                            else if (result[i][0] == 'MOBILE') {
                                me.MobilePhoneEffectiveDate = result[i][2]
                                me.OriMobilePhoneEffectiveDate = new Date(me.MobilePhoneEffectiveDate)
                                me.MobilePhone = result[i][1]
                            }
                        }
                    }
				}
				else{
					me.alert(me.getRes('Error.GetContactInfo'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetContactInfo fail');
            });
    
            me.invokeService("Workflow", "GetDataByDataSource", ['GetEmergencyContact', [me.LocalUser.EmpCode]],
			function (msg) 
			{
                console.log(' -- GetEmergencyContact -- ')
                //console.log(msg)
				if (msg.ReturnData.$.Success) 
				{
                    var result = msg.ReturnData.$.ReturnData.data
                    console.log(result)

                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            me.EmergencyContact = result[i][0]
                            me.Relationship = result[i][1]
                            me.ECAddressType = result[i][2]
                            me.ECAddress1 = result[i][3]
                            me.ECAddress2 = result[i][4]
                            me.ECAddress3 = result[i][5]
                            me.ECAddress4 = result[i][6]
                            me.ContactPhone1 = result[i][7]
                            me.ContactPhone2 = result[i][8]
                        }
                    }
				}
				else{
					me.alert(me.getRes('Error.GetEmergencyContact'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetEmergencyContact fail');
            });

            me.invokeService("Workflow", "GetDataByDataSource", ['GetBankInfo', [me.LocalUser.EmpCode]],
			function (msg) 
			{
                console.log(' -- GetEmergencyContact -- ')
                //console.log(msg)
				if (msg.ReturnData.$.Success) 
				{
                    var result = msg.ReturnData.$.ReturnData.data
                    console.log(result)

                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            me.BankEffectiveDate = result[i][0]
                            me.Currency = result[i][1]
                            me.PayeeName = result[i][2]
                            me.BankCode = result[i][3]
                            me.BankAccount = result[i][4]
                            me.OriBankEffectiveDate = new Date(me.BankEffectiveDate)
                        }
                    }
				}
				else{
					me.alert(me.getRes('Error.GetEmergencyContact'),'', null, me.getRes('common.OK'));
				}
			},
			function(msg){
				console.log('GetEmergencyContact fail');
            });

        },
        onPrepareProcessParameters() {
            var me = this;
            console.log('============================== onPrepareProcessParameters ==============================')
            var typename = me.getTranslatedRes(me.TabName, 'E')
            var typenameC = me.getTranslatedRes(me.TabName, 'C')
            var typenameT = me.getTranslatedRes(me.TabName, 'T')

            if (me.TabName == 'Address') {
                typename += ' (' 
                typenameC += ' (' 
                typenameT += ' (' 
                typename += me.editRAddress ? me.getTranslatedRes('RAddress', 'E') : ''
                typename += me.editRAddress && me.editCAddress ? ', ' : ''
                typename += me.editCAddress ? me.getTranslatedRes('CAddress', 'E') : ''
                typenameC += me.editRAddress ? me.getTranslatedRes('RAddress', 'C') : ''
                typenameC += me.editRAddress && me.editCAddress ? ', ' : ''
                typenameC += me.editCAddress ? me.getTranslatedRes('CAddress', 'C') : ''
                typenameT += me.editRAddress ? me.getTranslatedRes('RAddress', 'T') : ''
                typenameT += me.editRAddress && me.editCAddress ? ', ' : ''
                typenameT += me.editCAddress ? me.getTranslatedRes('CAddress', 'T') : ''
                typename += ')'
                typenameC += ')'
                typenameT += ')'
            }
            else if (me.TabName == 'ContactInfo') {
                typename += '('
                typenameC += '('
                typenameT += '('
                typename += me.editEmail ? me.getTranslatedRes('Email', 'E') : ''
                typename += me.editEmail && me.editContactPhone ? ', ' : ''
                typename += me.editContactPhone ? me.getTranslatedRes('ContactPhone', 'E') : ''
                typename += (me.editEmail || me.editContactPhone) && me.editMobilePhone ? ', ' : ''
                typename += me.editMobilePhone ? me.getTranslatedRes('MobilePhone', 'E') : ''
                typenameC += me.editEmail ? me.getTranslatedRes('Email', 'C') : ''
                typenameC += me.editEmail && me.editContactPhone ? ', ' : ''
                typenameC += me.editContactPhone ? me.getTranslatedRes('ContactPhone', 'C') : ''
                typenameC += (me.editEmail || me.editContactPhone) && me.editMobilePhone ? ', ' : ''
                typenameC += me.editMobilePhone ? me.getTranslatedRes('MobilePhone', 'C') : ''
                typenameT += me.editEmail ? me.getTranslatedRes('Email', 'T') : ''
                typenameT += me.editEmail && me.editContactPhone ? ', ' : ''
                typenameT += me.editContactPhone ? me.getTranslatedRes('ContactPhone', 'T') : ''
                typenameT += (me.editEmail || me.editContactPhone) && me.editMobilePhone ? ', ' : ''
                typenameT += me.editMobilePhone ? me.getTranslatedRes('MobilePhone', 'T') : ''
                typename += ')'
                typenameC += ')'
                typenameT += ')'
            }

            var param = {
                flowType: me.TabName,
                flowTypeName: typename,
                flowTypeCName: typenameC,
                flowTypeTName: typenameT,
                Userid: me.LocalUser.UserId,
                MaritalStatus: me.TabName == 'BasicInfo' && me.editBasicInfo ? me.MaritalStatus: '',
                MarriageDate: me.TabName == 'BasicInfo' && me.editBasicInfo ? me.MarriageDate: '',
                BIAttachmentID: me.TabName == 'BasicInfo' && me.editBasicInfo && me.BIAttachment.fileId != '' ? me.BIAttachment.fileId : null,
                BIAttachment: me.TabName == 'BasicInfo' && me.editBasicInfo && me.BIAttachment.fileId != '' ? me.BIAttachment.fileId + ';' + me.BIAttachment.fileName : null,
                RAddress1: me.TabName == 'Address' && me.editRAddress ? me.RAddress1 : '',
                RAddress2: me.TabName == 'Address' && me.editRAddress ? me.RAddress2 : '',
                RAddress3: me.TabName == 'Address' && me.editRAddress ? me.RAddress3 : '',
                RAddress4: me.TabName == 'Address' && me.editRAddress ? me.RAddress4 : '',
                RDistrict: me.TabName == 'Address' && me.editRAddress ? me.RDistrict : '',
                RAreaCode: me.TabName == 'Address' && me.editRAddress ? me.RArea : '',
                RAttachmentID: me.TabName == 'Address' && me.editRAddress && me.RAttachment.fileId ? me.RAttachment.fileId : null,
                RAttachment: me.TabName == 'Address' && me.editRAddress && me.RAttachment.fileId ? me.RAttachment.fileId + ';' + me.RAttachment.fileName : null,
                CAddress1: me.TabName == 'Address' && me.editCAddress ? me.CAddress1 : '',
                CAddress2: me.TabName == 'Address' && me.editCAddress ? me.CAddress2 : '',
                CAddress3: me.TabName == 'Address' && me.editCAddress ? me.CAddress3 : '',
                CAddress4: me.TabName == 'Address' && me.editCAddress ? me.CAddress4 : '',
                CDistrict: me.TabName == 'Address' && me.editCAddress ? me.CDistrict : '',
                CAreaCode: me.TabName == 'Address' && me.editCAddress ? me.CArea : '',
                CAttachmentID: me.TabName == 'Address' && me.editCAddress && me.CAttachment.fileId != '' ? me.CAttachment.fileId : null,
                CAttachment: me.TabName == 'Address' && me.editCAddress && me.CAttachment.fileId != '' ? me.CAttachment.fileId + ';' + me.CAttachment.fileName : null,
                Email: me.TabName == 'ContactInfo' &&  me.editEmail ? me.Email : '',
                ContactPhone: me.TabName == 'ContactInfo' &&  me.editContactPhone ? me.ContactPhone : '',
                MobilePhone: me.TabName == 'ContactInfo' &&  me.editMobilePhone ? me.MobilePhone : '',
                EmergencyContact: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.EmergencyContact : '',
                Relationship: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.Relationship : '',
                ContactPhone1: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.ContactPhone1 : '',
                ContactPhone2: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.ContactPhone2 : '',
                ECAddressType: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.ECAddressType : '',
                ECAddress1: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.ECAddress1 : '',
                ECAddress2: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.ECAddress2 : '',
                ECAddress3: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.ECAddress3 : '',
                ECAddress4: me.TabName == 'EmergencyContact' && me.editEmergencyContact ? me.ECAddress4 : '',
                Empcode: me.LocalUser.EmpCode,
                StaffName: me.LocalUser.EName,
                StaffCName: me.LocalUser.CName,
                StaffTName: me.LocalUser.CName,
                REffectiveDate: me.TabName == 'Address' && me.editRAddress ?  me.REffectiveDate : '',
                CEffectiveDate: me.TabName == 'Address' && me.editCAddress ? me.CEffectiveDate : '',
                EmailEffectiveDate: me.TabName == 'ContactInfo' && me.editEmail ? me.EmailEffectiveDate : '',
                ContactPhoneEffectiveDate: me.TabName == 'ContactInfo' && me.editContactPhone ? me.ContactPhoneEffectiveDate : '',
                MobilePhoneEffectiveDate: me.TabName == 'ContactInfo' && me.editMobilePhone ? me.MobilePhoneEffectiveDate : '',
                BankEffectiveDate: me.TabName == 'Bank' && me.editBank ? me.BankEffectiveDate : '',
                PayeeName: me.TabName == 'Bank' && me.editBank ? me.PayeeName : '',
                Currency: me.TabName == 'Bank' && me.editBank ? me.Currency && me.Currency != '' ? me.Currency : 'HKD' : '',
                BankCode: me.TabName == 'Bank' && me.editBank ? me.BankCode : '',
                BankAccount: me.TabName == 'Bank' && me.editBank ? me.BankAccount : '',
                BAttachmentID: me.TabName == 'Bank' && me.editBank && me.BAttachment.fileId != '' ? me.BAttachment.fileId : null,
                BAttachment: me.TabName == 'Bank' && me.editBank && me.BAttachment.fileId != '' ? me.BAttachment.fileId + ';' + me.BAttachment.fileName : null,
                BankName: me.TabName == 'Bank' && me.editBank && me.BankName ? me.BankName : ''
            }

            console.log(param)
            return param
        },
        onPrepareProcessVariants() {

        },
        Validation(tab) {
            var me = this;
            console.log('--------------- Validation ---------------')
            var now = new Date()
            var AddrLimit = 50
            var ContactLimit = 40

            if (tab == 'BasicInfo' && !me.editBasicInfo)
                return 'NoChange'
            if (tab == 'Address' && !me.editRAddress && !me.editCAddress)
                return 'NoChange'
            if (tab == 'ContactInfo' && !me.editEmail && !me.editContactPhone && !me.editMobilePhone)
                return 'NoChange'
            if (tab == 'EmergencyContact' && !me.editEmergencyContact)
                return 'NoChange'

            if (tab == 'BasicInfo' && me.editBasicInfo && me.MaritalStatus == '')
                return 'EmptyMaritalStatus'
            if (tab == 'BasicInfo' && me.editBasicInfo && me.MarriageDate == '')
                return 'EmptyMarriageDate'

            if (tab == 'Address') {
                if ((me.editRAddress && me.REffectiveDate == '') || (me.editCAddress && me.CEffectiveDate == ''))
                    return 'EmptyEffectiveDate'
                if ((me.editRAddress && me.RAddress1 == '') || (me.editCAddress && me.CAddress1 == ''))
                    return 'EmptyAddress'
                
                console.log('OriR =>' + me.OriREffectiveDate)
                console.log('R => ' + me.REffectiveDate)
                var tmpREffectiveDate = new Date(me.REffectiveDate)
                var tmpCEffectiveDate = new Date(me.CEffectiveDate)

                if ((me.editRAddress && tmpREffectiveDate <= me.OriREffectiveDate) || (me.editCAddress && tmpCEffectiveDate <= me.OriCEffectiveDate))
                    return 'IncorrectEffectiveDate'

                if ((me.editRAddress && (me.RAddress1.length > AddrLimit || me.RAddress2.length > AddrLimit || me.RAddress3.length > AddrLimit || me.RAddress4.length > AddrLimit)) || 
                    (me.editCAddress && (me.CAddress1.length > AddrLimit || me.CAddress2.length > AddrLimit || me.CAddress3.length > AddrLimit || me.CAddress4.length > AddrLimit)) )
                    return 'AddressExceedLimit'
            }

            if (tab == 'ContactInfo') {
                if ((me.editEmail && me.EmailEffectiveDate == '') || (me.editContactPhone && me.ContactPhoneEffectiveDate == '') || (me.editMobilePhone && me.MobilePhoneEffectiveDate == ''))
                   return 'EmptyEffectiveDate' 
                console.log('EmailEffectiveDate ' + me.EmailEffectiveDate)
                console.log('OriEmailEffectiveDate ' + me.OriEmailEffectiveDate)
                var tmpEmailEffectiveDate = new Date(me.EmailEffectiveDate)
                var tmpContactPhoneEffectiveDate = new Date(me.ContactPhoneEffectiveDate)
                var tmpMobilePhoneEffectiveDate = new Date(me.MobilePhoneEffectiveDate)

                if ((me.editEmail && tmpEmailEffectiveDate <= me.OriEmailEffectiveDate) || 
                    (me.editContactPhone && tmpContactPhoneEffectiveDate <= me.OriContactPhoneEffectiveDate) || 
                    (me.editMobilePhone && tmpMobilePhoneEffectiveDate <= me.OriMobilePhoneEffectiveDate))
                    return 'IncorrectEffectiveDate'
                
                if ((me.editEmail && me.Email.length > ContactLimit) || (me.editContactPhone && me.ContactPhone.length > ContactLimit) || (me.editMobilePhone && me.MobilePhone.length > ContactLimit) )
                    return 'ContactExceedLimit'
            }

            if (tab == 'EmergencyContact') {
                if (me.editEmergencyContact && me.EmergencyContact.length > 110)
                    return 'EmergencyContactExceedsLimit'
                if (me.editEmergencyContact && (me.ECAddress1.length > AddrLimit || me.ECAddress2.length > AddrLimit || me.ECAddress3.length > AddrLimit || me.ECAddress4.length > AddrLimit))
                    return 'AddressExceedLimit'
            }

            if (tab == 'Bank') {
                var tmpBankEffectiveDate = new Date(me.BankEffectiveDate)
                if (me.editBank && tmpBankEffectiveDate <= me.OriBankEffectiveDate)
                    return 'IncorrectEffectiveDate'
            }
            return ''
        },
        SubmitChange() {
            var me = this;
            me.loading = true;
            console.log('--------------- Submit ---------------')
			
            //console.log('Validation = ', me.Validation())
            console.log('tabname = ' + me.TabName)
            var validationValue = me.Validation(me.TabName);

            me.BankName = me.BankCodeDict[me.BankCode];
            console.log(me.BankName)

            console.log('Validation Result = ', validationValue)
            if (validationValue == '') {
                if (me.TabName == 'Bank' && me.editBank) {
                    var dllParam = {}
                    var empcode = me.LocalUser.EmpCode

                    dllParam.EffectiveDate = me.BankEffectiveDate
                    dllParam.PayeeName = me.PayeeName
                    dllParam.Currency = me.Currency
                    dllParam.BankCode = me.BankCode
                    dllParam.BankAccount = me.BankAccount
                    dllParam.BankName = me.BankName
                    console.log("--------------- b4 BankChangeValidation ----------------");

                    me.invokeService("IPL.HRMS.Profile", "BankChangeValidation", [empcode, dllParam],
                        function (msg) {
                            console.log("--------------- BankChangeValidation ----------------");
                            console.log(msg);
                            if (msg.ReturnData.$.Success) {
                                
                                var ApplicationExisted = false;
                                var typeName = ''
                                if (me.TabName == 'BasicInfo' || me.TabName == 'EmergencyContact' || me.TabName == 'Bank')
                                    typeName += me.getTranslatedRes(me.TabName, 'E')
                                if (me.TabName == 'Address') {
                                    typeName += me.editRAddress ? me.getTranslatedRes('RAddress', 'E') : ''
                                    typeName += me.editRAddress && me.editCAddress ? ', ' : ''
                                    typeName += me.editCAddress ? me.getTranslatedRes('CAddress', 'E') : ''
                                }
                                if (me.TabName == 'ContactInfo') {
                                    typeName += me.editEmail ? me.getTranslatedRes('Email', 'E') : ''
                                    typeName += me.editEmail && me.editContactPhone ? ', ' : ''
                                    typeName += me.editContactPhone ? me.getTranslatedRes('ContactPhone', 'E') : ''
                                    typeName += (me.editEmail || me.editContactPhone) && me.editMobilePhone ? ', ' : ''
                                    typeName += me.editMobilePhone ? me.getTranslatedRes('MobilePhone', 'E') : ''
                                }
                                
                                console.log('typeName = ', typeName)
                                var typenames = typeName.split(',')
                                console.log(typenames)
                                
                                var pcode = 'wfmProfileChange'
                                me.invokeService("Workflow", "GetDataByDataSource", ['GetProfileChangeProcess', [me.LocalUser.UserId, pcode]],
                                function (msg)
                                {
                                    console.log(' GetProfileChangeProcess ')
                                    console.log(msg)
                                    if (msg.ReturnData.$.Success) 
                                    {
                                        var result = msg.ReturnData.$.ReturnData.data;
                                        //var resultarray = []
                                        for (var i=0; i < result.length; i++) {
                                            //resultarray.push(result[i][1]);
                                            for (var j=0; j < typenames.length; j++) {
                                                if (result[i][1].includes(typenames[j])) {
                                                    if (result[i][2] == 'Pending') 
                                                        ApplicationExisted = true;
                                                }
                                            }
                                        }
                                        if (!ApplicationExisted) {
                                            console.log('TabName => ' + me.TabName)
                                            if (me.TabName == 'BasicInfo')
                                                me.$refs.BIAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                            else if (me.TabName == 'Address' && me.editRAddress && !me.editCAddress)
                                                me.$refs.RAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                            else if (me.TabName == 'Address' && me.editCAddress && !me.editRAddress)
                                                me.$refs.CAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                            else if (me.TabName == 'Address' && me.editCAddress && me.editRAddress) {
                                                me.$refs.RAttachmentField.makesureAttachmentUploaded(function() {
                                                    me.$refs.CAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                                })
                                            }
                                            else if (me.TabName == 'Bank')
                                                me.$refs.BAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                            else 
                                                me.ChangeProfile();
                                        }
                                        else {
                                            me.loading = false;
                                            me.alert(me.getRes('EmpProfile.ApplicationExisted'), '', null, me.getRes('common.OK'));
                                        }
                                    }
                                    else{
                                        me.alert(me.getRes('Error.GetProfileChangeProcess'),'', null, me.getRes('common.OK'));
                                    }
                                },
                                function(msg){
                                    console.log('GetProfileChangeProcess fail');
                                });

                            }
                            else {
                                me.loading = false;
                                var errmsg = msg.ReturnData.$.ErrorMsg.replace('BA_BankNum','Bank Account No.').replace('Ba_Payee','Payee');
                                me.alert(errmsg,'', null, me.getRes('common.OK'))
                            }
                        },
                        function (msg) {
                            me.alert(this.getRes("WorkflowOperation.OperationFail"), this.getRes("WorkflowOperation.Msg_failure1"), null, me.getRes('common.OK'));
                        }
                    );
                }
                else {
                    var ApplicationExisted = false;
                                var typeName = ''
                                if (me.TabName == 'BasicInfo' || me.TabName == 'EmergencyContact' || me.TabName == 'Bank')
                                    typeName += me.getTranslatedRes(me.TabName, 'E')
                                if (me.TabName == 'Address') {
                                    typeName += me.editRAddress ? me.getTranslatedRes('RAddress', 'E') : ''
                                    typeName += me.editRAddress && me.editCAddress ? ', ' : ''
                                    typeName += me.editCAddress ? me.getTranslatedRes('CAddress', 'E') : ''
                                }
                                if (me.TabName == 'ContactInfo') {
                                    typeName += me.editEmail ? me.getTranslatedRes('Email', 'E') : ''
                                    typeName += me.editEmail && me.editContactPhone ? ', ' : ''
                                    typeName += me.editContactPhone ? me.getTranslatedRes('ContactPhone', 'E') : ''
                                    typeName += (me.editEmail || me.editContactPhone) && me.editMobilePhone ? ', ' : ''
                                    typeName += me.editMobilePhone ? me.getTranslatedRes('MobilePhone', 'E') : ''
                                }
                                
                                console.log('typeName = ', typeName)
                                var typenames = typeName.split(',')
                                console.log(typenames)
                                
                                var pcode = 'wfmProfileChange'
                                me.invokeService("Workflow", "GetDataByDataSource", ['GetProfileChangeProcess', [me.LocalUser.UserId, pcode]],
                                function (msg)
                                {
                                    console.log(' GetProfileChangeProcess ')
                                    console.log(msg)
                                    if (msg.ReturnData.$.Success) 
                                    {
                                        var result = msg.ReturnData.$.ReturnData.data;
                                        //var resultarray = []
                                        for (var i=0; i < result.length; i++) {
                                            //resultarray.push(result[i][1]);
                                            for (var j=0; j < typenames.length; j++) {
                                                if (result[i][1].includes(typenames[j])) {
                                                    if (result[i][2] == 'Pending') 
                                                        ApplicationExisted = true;
                                                }
                                            }
                                        }
                                        if (!ApplicationExisted) {
                                            console.log('TabName => ' + me.TabName)
                                            if (me.TabName == 'BasicInfo')
                                                me.$refs.BIAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                            else if (me.TabName == 'Address' && me.editRAddress && !me.editCAddress)
                                                me.$refs.RAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                            else if (me.TabName == 'Address' && me.editCAddress && !me.editRAddress)
                                                me.$refs.CAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                            else if (me.TabName == 'Address' && me.editCAddress && me.editRAddress) {
                                                me.$refs.RAttachmentField.makesureAttachmentUploaded(function() {
                                                    me.$refs.CAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                                })
                                            }
                                            else if (me.TabName == 'Bank')
                                                me.$refs.BAttachmentField.makesureAttachmentUploaded(me.ChangeProfile)
                                            else 
                                                me.ChangeProfile();
                                        }
                                        else {
                                            me.loading = false;
                                            me.alert(me.getRes('EmpProfile.ApplicationExisted'), '', null, me.getRes('common.OK'));
                                        }
                                    }
                                    else{
                                        me.alert(me.getRes('Error.GetProfileChangeProcess'),'', null, me.getRes('common.OK'));
                                    }
                                },
                                function(msg){
                                    console.log('GetProfileChangeProcess fail');
                                });
                }
                
            }
            else if (validationValue == 'NoChange') {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.ChangeSth'),'', null, me.getRes('common.OK'))
            }
            else if (validationValue == 'EmptyEffectiveDate') {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.EmptyEffectiveDate'),'', null, me.getRes('common.OK'))
            }
            else if (validationValue == 'EmptyAddress') {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.EmptyAddress'),'', null, me.getRes('common.OK'))
            }
            else if (validationValue == 'IncorrectEffectiveDate') {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.IncorrectEffectiveDate'),'', null, me.getRes('common.OK'))
            }
            else if (validationValue == 'AddressExceedLimit') {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.AddressExceedLimit'),'', null, me.getRes('common.OK'))
            }
            else if (validationValue == 'ContactExceedLimit') {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.ContactExceedLimit'),'', null, me.getRes('common.OK'))
            }
            else if (validationValue == 'EmergencyContactExceedsLimit') {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.EmergencyContactExceedsLimit'),'', null, me.getRes('common.OK'))
            }
            else if (validationValue == 'AttachmentMissing') {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.AttachmentMissing'),'', null, me.getRes('common.OK'))
            }
            else {
                me.loading = false;
                me.alert(validationValue,'', null, me.getRes('common.OK'))
            }
            
        },
        ValidateAttachment(tab) {
            var me = this
            //BSH - Attachment is mandatory
            //console.log('ValidateAttachment')
            if ((tab == 'BasicInfo' && me.editBasicInfo && !me.BIAttachment.fileId) || (tab == 'Address' && me.editRAddress && !me.RAttachment.fileId) || (tab == 'Address' && me.editCAddress && !me.CAttachment.fileId) || (tab == 'Bank' && me.editBank && !me.BAttachment.fileId)) {
                return false
            }
            return true
        },
        ChangeProfile() {
            var me = this;
            var processcode = 'wfmProfileChange'

            if (!me.ValidateAttachment(me.TabName)) {
                me.loading = false;
                me.alert(me.getRes('EmpProfile.AttachmentMissing'),'', null, me.getRes('common.OK'))
            }
            else {
                me.invokeService("Workflow", "GetDataByDataSource", ['GetProcessModelID', [ processcode ]],
                function (msg) 
                {
                    console.log(msg)
                    if (msg.ReturnData.$.Success) 
                    {
                        var processModelId = msg.ReturnData.$.ReturnData
                        me.invokeService("Workflow", "CreateProcess", [processModelId, me.LocalUser.UserId, me.LocalUser.UserId, this.onPrepareProcessParameters(), this.onPrepareProcessVariants(), true, '', ''],
                            function (msg) {
                                if (msg.ReturnData.$) {
                                    me.loading = false;
                                    console.log("process success");
                                    me.alert(me.getRes('EmpProfile.Sucess'),'', null, me.getRes('common.OK'))
                                }
                                else
                                {
                                    console.log("process fail")
                                    me.alert(
                                        me.getRes('Msg_failure1'),'', null, me.getRes('common.OK')
                                    );
                                }
                            },
                            function (msg) {
                                console.log('create process  error!');
                            }
                        );

                    }
                    else{
                        me.alert(me.getRes('Error.GetProcessModelID'),'', null, me.getRes('common.OK'));
                    }
                },
                function(msg){
                    console.log('GetBasicInfo fail');
                });
            }            
        }
    },
};
</script>
