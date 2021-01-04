"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var preact_1 = require("htm/preact");
function Page() {
    return preact_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  <h1>\n    # About\n  </h1>\n  <ul>\n    <li>\n      <a href=\"/\" >\n        Index\n      </a>\n    </li>\n    <li>\n      <a href=\"/contact\" >\n        Contact\n      </a>\n    </li>\n  </ul>\n  "], ["\n  <h1>\n    # About\n  </h1>\n  <ul>\n    <li>\n      <a href=\"/\" >\n        Index\n      </a>\n    </li>\n    <li>\n      <a href=\"/contact\" >\n        Contact\n      </a>\n    </li>\n  </ul>\n  "])));
}
exports["default"] = Page;
var templateObject_1;
//# sourceMappingURL=about.js.map