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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotteryController = void 0;
const common_1 = require("@nestjs/common");
const lottery_service_1 = require("./lottery.service");
const create_lottery_dto_1 = require("./dto/create-lottery.dto");
const update_lottery_dto_1 = require("./dto/update-lottery.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let LotteryController = class LotteryController {
    constructor(lotteryService) {
        this.lotteryService = lotteryService;
    }
    async create(createLotteryDto) {
        return await this.lotteryService.create(createLotteryDto);
    }
    findAll() {
        return this.lotteryService.findAll();
    }
    update(id, updateLotteryDto) {
        return this.lotteryService.update(+id, updateLotteryDto);
    }
    remove(id) {
        return this.lotteryService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lottery_dto_1.CreateLotteryDto]),
    __metadata("design:returntype", Promise)
], LotteryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LotteryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lottery_dto_1.UpdateLotteryDto]),
    __metadata("design:returntype", void 0)
], LotteryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LotteryController.prototype, "remove", null);
LotteryController = __decorate([
    (0, common_1.Controller)({
        path: 'lottery',
        version: '1',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [lottery_service_1.LotteryService])
], LotteryController);
exports.LotteryController = LotteryController;
//# sourceMappingURL=lottery.controller.js.map