"use strict";

define(["text!temple/applications/index.html", "css!temple/applications/index.css", "component/gl-toggle-btn/index", "vue"], function (stpl, css, gl_toggle, Vue) {
    var vueComponent = Vue.extend({
        template: stpl,
        data: function data() {
            return {
                timer: "",
                btnstatus: false
            };
        },
        components: {
            "gl-tg-btn": gl_toggle
        },
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
            next(function (vm) {
                $("#router-visual").slideUp();
                vm.$store.dispatch("call", {
                    api: "getclients"
                });
                if ($(".clsLink2" + vm.$route.path.split("/")[1]).hasClass("bar")) {
                    $(".bar.active").removeClass("active");
                    $(".clsLink2" + vm.$route.path.split("/")[1]).addClass("active");
                    $("#moreapps").collapse("hide");
                    $("#moresetting").collapse("hide");
                    $("#tool").collapse("hide");
                }
            });
        },
        computed: {
            applist: function applist() {
                return this.$store.getters.sorftlist;
            }
        }
    });
    return vueComponent;
});