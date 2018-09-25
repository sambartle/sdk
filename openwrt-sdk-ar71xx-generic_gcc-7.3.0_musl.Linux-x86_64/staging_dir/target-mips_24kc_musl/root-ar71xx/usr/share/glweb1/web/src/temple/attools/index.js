"use strict";

define(["text!temple/attools/index.html", "css!temple/attools/index.css", "vue", "component/gl-btn/index", "component/gl-input/index", "component/gl-select/index"], function (stpl, css, Vue, gl_btn, gl_input, gl_select) {
    var vueComponent = Vue.extend({
        template: stpl,
        data: function data() {
            return {
                atmsg: "",
                listItem: "",
                list: [],
                atItem: "",
                atlist: [{ 'msg': 'Manual command', 'item': '' }, { 'msg': 'Request IMEI', 'item': 'AT+GSN' }, { 'msg': 'Request QCCID', 'item': 'AT+QCCID' }, { 'msg': 'Request IMSI', 'item': 'AT+CIMI' }, { 'msg': 'Check Signal Quality', 'item': 'AT+CSQ' }, { 'msg': 'Reset modem', 'item': 'AT&F0' }, { 'msg': 'Operator Names', 'item': 'AT+COPS?' }],
                isSend: false
            };
        },
        components: {
            "gl-btn": gl_btn,
            "gl-input": gl_input,
            "gl-select": gl_select
        },
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
            next(function (vm) {
                $("#router-visual").slideDown();
                $(".bar.active").removeClass("active");
                setTimeout(function () {
                    if ($(".clsLink2" + vm.$route.path.split("/")[1]).hasClass("bar")) {
                        $(".bar.active").removeClass("active");
                        $(".clsLink2" + vm.$route.path.split("/")[1]).addClass("active");
                        $("#vpn").collapse("hide");
                        $("#moresetting").collapse("hide");
                        // $("#applications").collapse("show");
                        $("#system").collapse("show");
                    }
                }, 50);
            });
        },
        computed: {
            moInfo: function moInfo() {
                return this.$store.getters.apiData['moInfo'];
            }
        },
        mounted: function mounted() {
            var that = this;
            this.$store.dispatch("call", { api: "moInfo" }).then(function (result) {
                if (result.success) {
                    if (result.modems) {
                        var list = result.modems[0].ports;
                        var len = list.length;
                        for (var i = 0; i < len; i++) {
                            if (list[i] == "/dev/cdc-wdm0") {
                                list.splice(i, 1);
                            }
                        }
                        that.list = list;
                        that.listItem = result.modems[0].control_port;
                    }
                }
            });
        },
        methods: {
            getMsg: function getMsg(data) {
                this.atmsg = data.item;
            },
            sendtools: function sendtools() {
                if (!this.atmsg) {
                    this.$message({
                        type: "error",
                        msg: -4000
                    });
                    return;
                }
                var that = this;
                that.isSend = true;
                this.$store.dispatch("call", {
                    api: "atsend", data: {
                        'at-command': this.atmsg,
                        'at-port': this.listItem,
                        "at-fd": this.moInfo.modems[0]['at-fd']
                    }
                }).then(function (result) {
                    that.isSend = false;
                    if (result.success) {
                        that.$message({
                            type: "success",
                            msg: result.code
                        });
                        that.atItem = result.message;
                        that.atmsg = "";
                    } else {
                        that.atItem = "";
                        that.$message({
                            type: "error",
                            msg: result.code
                        });
                    }
                });
            }
        }
    });
    return vueComponent;
});