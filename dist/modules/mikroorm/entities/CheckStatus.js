"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckStatus = exports.CheckState = void 0;
const core_1 = require("@mikro-orm/core");
const Translation_1 = require("./Translation");
var CheckState;
(function (CheckState) {
    CheckState["MODERATED"] = "moderated";
    CheckState["REJECTED"] = "rejected";
    CheckState["APPROVED"] = "approved";
})(CheckState = exports.CheckState || (exports.CheckState = {}));
let CheckStatus = class CheckStatus {
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], CheckStatus.prototype, "id", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => CheckState, default: CheckState.MODERATED }),
    __metadata("design:type", String)
], CheckStatus.prototype, "name", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Translation_1.Translation, { nullable: true }),
    __metadata("design:type", Translation_1.Translation)
], CheckStatus.prototype, "comment", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Translation_1.Translation),
    __metadata("design:type", Translation_1.Translation)
], CheckStatus.prototype, "translation", void 0);
CheckStatus = __decorate([
    (0, core_1.Entity)()
], CheckStatus);
exports.CheckStatus = CheckStatus;
//# sourceMappingURL=CheckStatus.js.map