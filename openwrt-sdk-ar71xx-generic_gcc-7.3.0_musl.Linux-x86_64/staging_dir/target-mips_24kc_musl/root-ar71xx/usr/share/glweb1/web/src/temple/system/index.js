"use strict";

define(["text!temple/system/index.html", "css!temple/system/index.css", "vue", "component/gl-toggle-btn/index", "component/gl-tooltip/index", "component/gl-btn/index"], function (stpl, css, Vue, gl_switch, gl_tooltip, gl_btn) {
    var vueComponent = Vue.extend({
        template: stpl,
        data: function data() {
            return {};
        },
        components: {
            "gl-switch": gl_switch,
            "gl-tooltip": gl_tooltip,
            "gl-btn": gl_btn
        },
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
            next(function (vm) {
                $("#router-visual").slideUp();
                setTimeout(function () {
                    if ($(".clsLink2" + vm.$route.path.split("/")[1]).hasClass("bar")) {
                        $(".bar.active").removeClass("active");
                        $(".clsLink2" + vm.$route.path.split("/")[1]).addClass("active");
                        $("#moreapps").collapse("hide");
                        $("#moresetting").collapse("hide");
                    }
                }, 50);
            });
        }
    });
    return vueComponent;
});