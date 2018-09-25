"use strict";

define(["vue", "text!temple/internet/modem.html", "component/gl-dropdown/index", "component/gl-btn/index", "component/gl-comfirm-btn/index", "component/gl-input/index", "component/gl-label/index", "component/gl-select/index", "component/gl-loading/index", "component/gl-tooltip/index"], function (Vue, stpl, gl_dropdown, gl_btn, gl_cf_btn, gl_input, gl_label, gl_select, gl_loading, gl_tooltip) {
    var vueComponent = Vue.extend({
        template: stpl,
        components: {
            "gl-dropdown": gl_dropdown,
            "gl-cf-btn": gl_cf_btn,
            "gl-btn": gl_btn,
            "gl-input": gl_input,
            "gl-label": gl_label,
            "gl-select": gl_select,
            "gl-loading": gl_loading,
            "gl-tooltip": gl_tooltip
        },
        data: function data() {
            return {
                timermo: "", //modem定时器
                timeOut: "", //按钮timeout
                autosetuptime: '', //按钮timeout
                moServiceList: ["LTE/UMTS/GPRS", "CDMA/EVDO"],
                isconnecting: false,
                mosetting: true,
                modeStatus: false, //modem设置模式
                modevice: "",
                moservice: "",
                moapn: "",
                mopincode: "",
                mopdanum: "",
                mousername: "",
                mopasswd: "",
                moexpect: "init",
                moreset: true,
                btnType: 'purple',
                timeout: false,
                checkModem: true,
                mosuccess: 'init'
            };
        },
        beforeDestroy: function beforeDestroy() {
            clearInterval(this.timermo);
            // console.log("beforeDestroy modem");
        },
        computed: {
            moGetconfig: function moGetconfig() {
                return this.$store.getters.apiData['moGet'];
            },
            configapn: function configapn() {
                if (this.moGetconfig.config && this.moGetconfig.config.apn != '') {
                    return false;
                }
                return true;
            },
            moInfo: function moInfo() {
                return this.$store.getters.apiData["moInfo"];
            },
            moCarrier: function moCarrier() {
                return this.$store.getters.apiData["moCarrier"];
            },
            moStatus: function moStatus() {
                return this.$store.getters.apiData['moStatus'];
            },
            apns: function apns() {
                return this.$store.getters.carinfo;
            },
            circleClass: function circleClass() {
                var circle = "";
                // 读到模块
                if (this.moInfo.success) {
                    // 读到运营商信息
                    circle = "waiting";
                    // 联网成功
                    if (this.moStatus.up == 'on') {
                        circle = "active";
                    }
                } else {
                    circle = "";
                }
                return circle;
            },
            checkBtn: function checkBtn() {
                var btn = '';
                if (this.moStatus.up == 'connecting') {
                    btn = 'Abort';
                    this.btnType = 'danger';
                } else {
                    btn = 'Apply';
                    this.btnType = 'purple';
                }
                return btn;
            },
            noCard: function noCard() {
                return this.moCarrier && this.moCarrier.code != -263 ? false : this.moCarrier.success;
            },
            mobtnStatus: function mobtnStatus() {
                if (this.moexpect != "init") {
                    if (this.moexpect == this.moStatus.up || this.mosuccess == this.moStatus.up) {
                        this.moexpect = "init";
                        this.mosuccess = "init";
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }
        },
        mounted: function mounted() {
            if (this.moStatus.up !== 'on') {
                if (this.moInfo.modems && this.moInfo.modems[0].modem_id == 255) {
                    this.mosetting = false;
                } else {
                    if (!this.moCarrier.success) {
                        this.mosetting = false;
                    }
                }
            }
            if (this.moInfo && this.moInfo.success) {
                this.loading = false;
            }
            clearInterval(this.timermo);
            this.renderData();
            this.clickMoSet('reset');
        },
        methods: {
            //渲染数据
            renderData: function renderData(isconnecting) {
                var that = this;
                that.timerMoData(); //modem info
            },
            timerMoData: function timerMoData() {
                var that = this;
                that.getMoData(true);
                clearInterval(this.timermo);
                this.timermo = setInterval(function () {
                    that.getMoData();
                }, 5000);
            },
            getMoData: function getMoData(enter) {
                var that = this;
                var nocache = true;
                // 检测3G/4G模块
                if (enter) {
                    var timernow = new Date().getTime();
                    if (this.moInfo.success && this.moCarrier.success && timernow - this.moCarrier.lastSync <= 10000) {
                        nocache = false;
                    }
                }
                nocache ? that.$store.dispatch("call", { api: "moInfo" }).then(function (result) {
                    if (result.success) {
                        that.$store.commit("setonlist", { data: "modem" });
                        var modem = result.modems[0];
                        that.$store.dispatch("call", { api: "moStatus", data: { modem_id: modem.modem_id }, cache: true }).then(function () {
                            if (that.moStatus.up !== 'on') {
                                if (modem.modem_id == 255) {
                                    that.mosetting = false;
                                } else {
                                    if (!that.moCarrier.success) {
                                        that.mosetting = false;
                                    }
                                }
                            } else {
                                that.mosetting = true;
                                return;
                            }
                        });
                        setTimeout(function () {
                            that.$store.dispatch("call", { api: "moCarrier", data: { modem_id: modem.modem_id }, cache: true }).then(function (result) {
                                if (result.success) {
                                    if (modem.modem_id !== 255) {
                                        that.mosetting = true;
                                    }
                                    that.$store.commit("getapns", result);
                                }
                                // else {
                                //     that.$store.commit("checkapns");
                                // }
                                that.loading = false;
                            });
                        }, 600);
                    } else if (result.code == "-17" || result.code == "-3") {
                        //不支持
                        that.mosetting = false;
                        clearInterval(that.timermo);
                        that.$store.commit("removeInter", { data: "modem" });
                    } else {
                        that.$store.commit("checkapns");
                        that.timeout = true;
                        that.mosetting = false;
                        that.$store.commit("setofflist", { data: "modem" });
                    }
                }) : null;
            },
            // 手动 apply
            manualSet: function manualSet() {
                var that = this;
                var service = "";
                if (that.moservice.toLowerCase().indexOf("umts") != -1) {
                    // LTE/UMTS/GPRS
                    service = "umts";
                } else {
                    // CDMA/EVDO
                    service = "evdo";
                }
                if (that.moStatus.up == 'on') {
                    that.checkModem = false;
                } else {
                    that.moexpect = 'connecting';
                    that.mosuccess = 'on';
                }
                clearInterval(this.timermo);
                clearTimeout(this.timeOut);
                clearTimeout(this.autosetuptime);
                this.$store.dispatch("call", {
                    api: "moSet",
                    data: {
                        modem_id: that.moInfo.modems[0].modem_id,
                        device: that.modevice,
                        service: service,
                        apn: that.moapn,
                        pincode: that.mopincode,
                        dianum: that.mopdanum,
                        username: that.mousername,
                        password: that.mopasswd
                    },
                    timeOut: 30000
                }).then(function (result) {
                    if (!result.success) {
                        that.$message({
                            type: 'error',
                            msg: result.code
                        });
                        that.moexpect = "init";
                        that.mosuccess = "init";
                    }
                    that.$store.dispatch("call", { api: 'moGet' });
                    that.timerMoData();
                    that.autosetuptime = setTimeout(function () {
                        if (that.moStatus.up == 'on') {
                            that.checkModem = true;
                        }
                    }, 7000);
                    that.timeOut = setTimeout(function () {
                        if (that.moexpect != 'init' || that.mosuccess != 'init') {
                            that.moexpect = "init";
                            that.mosuccess = "init";
                        }
                        that.checkModem = true;
                    }, 15000);
                });
            },
            // 断开连接
            moDisconnect: function moDisconnect() {
                var that = this;
                that.moexpect = 'off';
                clearInterval(that.timermo);
                clearTimeout(that.timeOut);
                this.$store.dispatch("call", {
                    api: "moEnable",
                    data: {
                        modem_id: that.moInfo.modems[0].modem_id,
                        disable: true
                    }
                }).then(function (result) {
                    that.timerMoData();
                    if (result.success) {
                        that.$message({
                            type: 'success',
                            msg: result.code
                        });
                    } else {
                        that.$message({
                            type: 'error',
                            msg: result.code
                        });
                        that.moexpect = "init";
                    }
                    that.timeOut = setTimeout(function () {
                        if (that.moexpect != 'init') {
                            that.moexpect = "init";
                        }
                    }, 15000);
                });
            },
            // 自动连接
            autoSet: function autoSet() {
                var that = this;
                that.moexpect = 'on';
                clearTimeout(that.timeOut);
                clearInterval(that.timermo);
                this.$store.dispatch("call", {
                    api: "moAuto",
                    data: {
                        modem_id: that.moInfo.modems[0].modem_id,
                        isps: JSON.stringify(that.apns)
                    },
                    timeOut: 85000
                }).then(function (result) {
                    if (!result.success) {
                        that.$message({
                            type: 'error',
                            msg: result.code
                        });
                        that.moexpect = 'init';
                    }
                    that.timerMoData();
                    that.timeOut = setTimeout(function () {
                        if (that.moexpect != 'init') {
                            that.$message({
                                type: "error",
                                msg: -1307 // sim卡拨号连接超时。
                            });
                            that.moexpect = 'init';
                            // that.moDisconnect();
                        }
                    }, 30000);
                });
            },
            // 开启关闭切换
            checkStatus: function checkStatus() {
                if (this.checkBtn == 'Apply') {
                    this.manualSet();
                    return;
                }
                this.moDisconnect();
            },
            // 更多设置
            clickMoSet: function clickMoSet(isRet) {
                var that = this;
                if (isRet !== 'reset') {
                    clearInterval(that.timermo);
                }
                that.$store.dispatch("call", {
                    api: "moGet",
                    data: {
                        modem_id: that.moInfo.modems ? that.moInfo.modems[0].modem_id : 255
                    }
                }).then(function (result) {
                    if (result.success) {
                        var config = result.config;
                        if (config.device) {
                            that.modevice = config.device;
                        } else {
                            for (var i = 0; i < result.ports.length; i++) {
                                if (result.ports[i].indexOf("cdc-wdm0")) {
                                    that.modevice = result.ports[i];
                                }
                            }
                        }
                        if (config.service) {
                            if (config.service.toLowerCase() == "evdo") {
                                that.moservice = that.moServiceList[1];
                            } else {
                                that.moservice = that.moServiceList[0];
                            }
                        }
                        that.moapn = config.apn;
                        that.mopincode = config.pincode;
                        that.mopdanum = config.dialnum;
                        that.mousername = config.username;
                        that.mopasswd = config.password;
                        if (isRet !== 'reset') {
                            that.mosetting = false;
                        }
                        // 如果3分钟内没有操作设置，则自动返回
                        setTimeout(function () {
                            if (that.mosetting && isRet !== 'reset') {
                                that.mosetting = true;
                                that.timerMoData();
                            }
                        }, 180000);
                    }
                });
            },
            // 获取inpit输入apn
            getmoapn: function getmoapn(data) {
                this.moapn = data;
            },
            // 点击返回
            clickBack: function clickBack() {
                this.mosetting = true;
                this.timerMoData();
            },
            // 重置
            clickMoReset: function clickMoReset() {
                var that = this;
                that.moreset = false;
                clearInterval(that.timermo);
                that.$store.dispatch("call", {
                    api: "moReset",
                    data: {
                        modem_id: that.moInfo.modems[0].modem_id
                    },
                    timeOut: 35000
                }).then(function (result) {
                    that.timerMoData();
                    setTimeout(function () {
                        that.moreset = true;
                    }, 2000);
                });
            },
            changeModal: function changeModal() {
                this.modeStatus = !this.modeStatus;
            },
            getFlow: function getFlow(flowVlueBytes) {
                var flow = "";
                if (flowVlueBytes / 1024 < 1024) {
                    flow = (Math.round(flowVlueBytes / 1024) > 0 ? Math.round(flowVlueBytes / 1024) : 0) + "KB";
                } else if (flowVlueBytes / 1024 >= 1024 && flowVlueBytes / 1024 / 1024 < 1024) {
                    flow = (Math.round(flowVlueBytes / 1024 / 1024) > 0 ? Math.round(flowVlueBytes / 1024 / 1024) : 0) + "MB";
                } else if (flowVlueBytes / 1024 / 1024 >= 1024) {
                    var gb_Flow = flowVlueBytes / 1024 / 1024 / 1024;
                    flow = gb_Flow.toFixed(1) + "GB";
                } else {
                    flow = "0KB";
                }
                return flow;
            }
        }
    });
    return vueComponent;
});