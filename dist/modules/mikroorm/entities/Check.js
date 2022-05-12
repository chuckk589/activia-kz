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
exports.Check = void 0;
const core_1 = require("@mikro-orm/core");
const CheckStatus_1 = require("./CheckStatus");
const CustomBaseEntity_1 = require("./CustomBaseEntity");
const User_1 = require("./User");
const Winner_1 = require("./Winner");
let Check = class Check extends CustomBaseEntity_1.CustomBaseEntity {
    constructor(check) {
        super();
        this.fancyId = Math.random().toString(36).substr(2, 11).toUpperCase();
        this.winners = new core_1.Collection(this);
        Object.assign(this, check);
    }
    async beforeCreate(args) {
        if (!this.status) {
            this.status = await args.em.findOne(CheckStatus_1.CheckStatus, { name: CheckStatus_1.CheckState.MODERATED });
        }
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Check.prototype, "id", void 0);
__decorate([
    (0, core_1.Unique)(),
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], Check.prototype, "fancyId", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], Check.prototype, "path", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Check.prototype, "user", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => CheckStatus_1.CheckStatus),
    __metadata("design:type", CheckStatus_1.CheckStatus)
], Check.prototype, "status", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Winner_1.Winner, (winner) => winner.check),
    __metadata("design:type", Object)
], Check.prototype, "winners", void 0);
__decorate([
    (0, core_1.BeforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Check.prototype, "beforeCreate", null);
Check = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Check);
exports.Check = Check;
//# sourceMappingURL=Check.js.map