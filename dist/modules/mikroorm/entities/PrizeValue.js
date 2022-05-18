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
exports.PrizeValue = void 0;
const core_1 = require("@mikro-orm/core");
const Prize_1 = require("./Prize");
const Winner_1 = require("./Winner");
let PrizeValue = class PrizeValue {
    constructor() {
        this.winners = new core_1.Collection(this);
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], PrizeValue.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], PrizeValue.prototype, "qr_payload", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Prize_1.Prize),
    __metadata("design:type", Prize_1.Prize)
], PrizeValue.prototype, "prize", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Winner_1.Winner, (winner) => winner.prize_value),
    __metadata("design:type", Object)
], PrizeValue.prototype, "winners", void 0);
PrizeValue = __decorate([
    (0, core_1.Entity)()
], PrizeValue);
exports.PrizeValue = PrizeValue;
//# sourceMappingURL=PrizeValue.js.map