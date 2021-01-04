"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
require("module-alias/register");
require("source-map-support/register");
var preact_1 = require("htm/preact");
var home_1 = require("src/pages/home");
var contact_1 = require("src/pages/contact");
var about_1 = require("src/pages/about");
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
    var body = document.body;
    preact_1.render(preact_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<", " />"], ["<", " />"])), routes[0].component), body);
    body.addEventListener('click', function (ev) {
        var target = ev.target;
        if ((target === null || target === void 0 ? void 0 : target.tagName.toUpperCase()) === 'A') {
            var el = target;
            var href_1 = el.getAttribute('href').split('?')[0];
            var route = routes.find(function (r) { return r.path === href_1; });
            if (route) {
                ev.preventDefault();
                preact_1.render(preact_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<", " />"], ["<", " />"])), route.component), body);
            }
            else if (href_1.startsWith('/')) {
                preact_1.render(preact_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<", " />"], ["<", " />"])), routes[0].component), body);
            }
        }
    });
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=router.js.map