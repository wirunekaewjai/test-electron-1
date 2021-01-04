"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var preact_1 = require("htm/preact");
var home_1 = require("./pages/home");
var contact_1 = require("./pages/contact");
var about_1 = require("./pages/about");
var routes = [
    {
        path: '/',
        component: home_1["default"]
    },
    {
        path: '/contact',
        component: contact_1["default"]
    },
    {
        path: '/about',
        component: about_1["default"]
    },
];
window.addEventListener('DOMContentLoaded', function () {
    preact_1.render(preact_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<", " />"], ["<", " />"])), routes[0].component), document.getElementById('root'));
    document.body.addEventListener('click', function (ev) {
        var target = ev.target;
        if ((target === null || target === void 0 ? void 0 : target.tagName.toUpperCase()) === 'A') {
            var el = target;
            var href_1 = el.getAttribute('href').split('?')[0];
            var route = routes.find(function (r) { return r.path === href_1; });
            if (route) {
                ev.preventDefault();
                preact_1.render(preact_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<", " />"], ["<", " />"])), route.component), document.getElementById('root'));
            }
        }
    });
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=preload.js.map