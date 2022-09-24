"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testsController_1 = __importDefault(require("../controllers/testsController"));
const router = express_1.default.Router();
router.post('/', testsController_1.default.verifyInput, testsController_1.default.createHeaderText, testsController_1.default.createMiddleText, testsController_1.default.compileTestCode, (req, res) => {
    return res.status(200).json(res.locals.compiledTestCode);
});
exports.default = router;
