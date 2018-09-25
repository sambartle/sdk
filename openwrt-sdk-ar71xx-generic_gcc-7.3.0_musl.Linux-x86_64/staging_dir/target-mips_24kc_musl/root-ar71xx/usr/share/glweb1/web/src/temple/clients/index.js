"use strict";

define(["text!temple/clients/index.html", "css!temple/clients/index.css", "component/gl-toggle-btn/index", "vue"], function (stpl, css, gl_toggle, Vue) {
    var vueComponent = Vue.extend({
        template: stpl,
        data: function data() {
            return {
                timer: "",
                btnstatus: false,
                wifi_list: [],
                lan_list: [],
                unkonw_list: []
            };
        },
        components: {
            "gl-tg-btn": gl_toggle
        },
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
            next(function (vm) {
                $("#router-visual").slideDown();
                if ($(".clsLink2" + vm.$route.path.split("/")[1]).hasClass("bar")) {
                    $(".bar.active").removeClass("active");
                    $(".clsLink2" + vm.$route.path.split("/")[1]).addClass("active");
                    $("#applications").collapse("hide");
                    $("#moresetting").collapse("hide");
                    $("#system").collapse("hide");
                    $("#vpn").collapse("hide");
                }
            });
        },
        beforeRouteLeave: function beforeRouteLeave(to, from, next) {
            clearInterval(this.timer);
            next();
        },

        mounted: function mounted() {
            this.timerData();
            if (this.clientList && this.clientList.length != 0) {
                this.parseClient(this.clientList);
            }
        },
        computed: {
            getclients: function getclients() {
                return this.$store.getters.apiData["getclients"];
            },
            clientList: function clientList() {
                return this.getclients.clients;
            }
        },
        methods: {
            timerData: function timerData() {
                var that = this;
                that.getData();
                that.timer = setInterval(function () {
                    that.getData();
                }, 5000);
            },
            getData: function getData() {
                var that = this;
                that.$store.dispatch("call", { api: "getclients" }).then(function (result) {
                    if (result.success) {
                        if (result.clients) {
                            that.parseClient(result.clients);
                        }
                    }
                });
            },
            parseClient: function parseClient(data) {
                var client = data.length > 0 ? data : [];
                var len = client.length;
                this.wifi_list = [];
                this.unkonw_list = [];
                this.lan_list = [];
                if (len == 0) {
                    this.wifi_list = null;
                    this.lan_list = null;
                    return;
                }
                for (var i = 0; i < len; i++) {
                    if (client[i].type == 'LAN') {
                        this.lan_list.push(client[i]);
                    } else if (client[i].type == 'Unknown') {
                        this.unkonw_list.push(client[i]);
                    } else {
                        this.wifi_list.push(client[i]);
                    }
                }
            },
            // 禁止设备进入web页面
            block: function block(item, index, list) {
                var that = this;
                clearInterval(that.timer);
                // 本机禁用出现弹框
                if (item.remote && item.blocked) {
                    that.$store.commit("showModal", {
                        show: true,
                        type: "warning",
                        title: "Caution",
                        message: this.$lang.modal.disableDevice,
                        cb: function cb() {
                            that.blockclient(item);
                        },
                        cancel: function cancel() {
                            that.timerData();
                            list[index].blocked = false;
                        }
                    });
                } else {
                    that.blockclient(item);
                }
            },
            blockclient: function blockclient(item) {
                var that = this;
                that.$store.dispatch("call", {
                    api: 'clientblock', data: {
                        "mac": item.mac,
                        "disable": item.blocked
                    }
                }).then(function (result) {
                    if (result.failed) {
                        that.$message({
                            "type": "error",
                            "api": "clientblock",
                            "msg": result.code
                        });
                        return;
                    }
                    if (result.success) {
                        that.$message({
                            "type": "success",
                            "api": "clientblock",
                            "msg": result.code
                        });
                    } else {
                        that.$message({
                            "type": "error",
                            "api": "clientblock",
                            "msg": result.code
                        });
                    }
                    that.timerData();
                });
            }
        }
    });
    return vueComponent;
});