"use strict";

define(["vue", "text!temple/internet/repeater.html", "component/gl-dropdown/index", "component/gl-btn/index", "component/gl-comfirm-btn/index", "component/gl-input/index", "component/gl-label/index", "component/gl-select/index", "component/gl-loading/index"], function (Vue, stpl, gl_dropdown, gl_btn, gl_cf_btn, gl_input, gl_label, gl_select, gl_loading) {
    var vueComponent = Vue.extend({
        template: stpl,
        components: {
            "gl-dropdown": gl_dropdown,
            "gl-cf-btn": gl_cf_btn,
            "gl-btn": gl_btn,
            "gl-input": gl_input,
            "gl-label": gl_label,
            "gl-select": gl_select,
            "gl-loading": gl_loading
        },
        data: function data() {
            return {
                timer: "",
                know_network: false,
                disconnectstatus: false
            };
        },
        beforeDestroy: function beforeDestroy() {
            clearInterval(this.timer);
            // console.log("beforeDestroy repeater");
        },
        computed: {
            stainfo: function stainfo() {
                return this.$store.getters.apiData["stainfo"];
            },
            router: function router() {
                return this.$store.getters.apiData['router'];
            },
            circleClass: function circleClass() {
                var circle = "";
                if (this.know_network) {
                    // 存在已知网络
                    circle = "waiting";
                    // 联网成功
                    if (this.stainfo.ip && this.stainfo.connected && this.stainfo.enabled) {
                        circle = "active";
                    }
                } else {
                    if (this.stainfo.ip && this.stainfo.connected && this.stainfo.enabled) {
                        circle = "active";
                    } else {
                        circle = "";
                    }
                }
                return circle;
            }
        },
        mounted: function mounted() {
            var that = this;
            // 判断是否有已知网络
            this.$store.dispatch("call", { api: "savedwifi" }).then(function (result) {
                if (result.wifis.length) {
                    that.know_network = true;
                }
            });
            // this.timerData()
        },
        methods: {
            disconnectwifi: function disconnectwifi() {
                var that = this;
                this.$store.commit("showModal", {
                    show: true,
                    title: 'Caution',
                    message: that.$lang.modal.disconWifiMsg,
                    cb: function cb() {
                        that.disconnect();
                    }
                });
            },
            disconnect: function disconnect() {
                var that = this;
                that.disconnectstatus = true;
                that.$store.commit('clearallTimer');
                that.$store.dispatch("call", {
                    api: "disconnectwifi", data: {
                        ssid: this.stainfo.ssid,
                        enable: false
                    }
                }).then(function (result) {
                    setTimeout(function () {
                        that.disconnectstatus = false;
                    }, 5000);
                    that.$store.dispatch('setALLtimer');
                    if (result.success) {
                        that.$message({
                            "type": "success",
                            "api": "removewifi",
                            "msg": result.code
                        });
                    } else {
                        that.$message({
                            "type": "error",
                            "api": "removewifi",
                            "msg": result.code
                        });
                        return;
                    }
                });
            }
        }
    });
    return vueComponent;
});