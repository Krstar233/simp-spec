(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SimpSpec = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var specsMap = {};
    var buildingTitle = "__SimpSpec_Test";
    var runTaskID = 0;
    var labelPrefix = "__SimpSpec_Test__";
    var beforeAllLabel = labelPrefix + "beforeAll";
    var afterAllLabel = labelPrefix + "afterAll";
    var beforeEachLabel = labelPrefix + "beforeEach";
    var afterEachLabel = labelPrefix + "afterEach";
    var labelMap = {
        beforeAllLabel: beforeAllLabel,
        afterAllLabel: afterAllLabel,
        beforeEachLabel: beforeEachLabel,
        afterEachLabel: afterEachLabel
    };
    var getRunTask = function () {
        if (!specsMap[runTaskID]) {
            specsMap[runTaskID] = {};
        }
        if (!specsMap[runTaskID][buildingTitle]) {
            specsMap[runTaskID][buildingTitle] = {};
        }
        return specsMap[runTaskID];
    };
    /**
     * 声明测试用例的 Hook
     * @param title 测试用例标题
     * @param fn 声明的测试用例回调内容, done() 被执行代表该测试用例通过, 必须被执行后才会继续运行下一个用例.
     */
    function it(title, fn) {
        var runTask = getRunTask();
        if (runTask[buildingTitle][title]) {
            throw new Error("case: ".concat(title, " has existed!"));
        }
        runTask[buildingTitle][title] = function () {
            return new Promise(function (res) {
                fn(res);
            });
        };
    }
    /**
     * 所有测试用例开始前 Hook, 在该测试集的所有测试用例开始前都会调用声明的回调.
     * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
     */
    function beforeAll(fn) {
        var runTask = getRunTask();
        runTask[buildingTitle][beforeAllLabel] = function () {
            return new Promise(function (res) {
                fn(res);
            });
        };
    }
    /**
     * 所有测试用例结束 Hook, 在该测试集的所有测试用例结束后都会调用声明的回调.
     * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
     */
    function afterAll(fn) {
        var runTask = getRunTask();
        runTask[buildingTitle][afterAllLabel] = function () {
            return new Promise(function (res) {
                fn(res);
            });
        };
    }
    /**
     * 每个测试用例开始前 Hook, 在该测试集的每个测试用例开始前都会调用声明的回调.
     * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
     */
    function beforeEach(fn) {
        var runTask = getRunTask();
        runTask[buildingTitle][beforeEachLabel] = function () {
            return new Promise(function (res) {
                fn(res);
            });
        };
    }
    /**
     * 每个测试用例结束 Hook, 在该测试集的每个测试用例结束后都会调用声明的回调.
     * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
     */
    function afterEach(fn) {
        var runTask = getRunTask();
        runTask[buildingTitle][afterEachLabel] = function () {
            return new Promise(function (res) {
                fn(res);
            });
        };
    }
    /**
     * 构建测试用例集的 Hook 函数
     * @param title 测试集标题
     * @param fn 描述函数, 函数内包含若干测试用例
     * @returns Function
     */
    function spec(title, fn) {
        return function () {
            buildingTitle = title;
            fn();
        };
    }
    /**
     * 运行测试用例集
     * @param specs Array 所有要运行的构建测试集的 Hook 列表
     * @returns Promise<TestResult> 异步返回测试结果
     */
    function runTests(specs) {
        var _this = this;
        var thisRunTaskID = ++runTaskID;
        var runTask = getRunTask();
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var passCount, specKey, itKey, successResult, failResult, printPassMsg, RunSpecInRunTask, _i, specs_1, specBuilder, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        passCount = 0;
                        successResult = function () {
                            return {
                                success: true,
                                passCount: passCount,
                                message: "ALL TESTS PASS!"
                            };
                        };
                        failResult = function (err) {
                            var failItKey = itKey;
                            if (Object.values(labelMap).includes(itKey)) {
                                failItKey = itKey.substring(labelPrefix.length);
                            }
                            return {
                                success: false,
                                passCount: passCount,
                                message: "[".concat(specKey, "|").concat(failItKey, "] failed. reason: ").concat(err.message)
                            };
                        };
                        printPassMsg = function () {
                            console.warn("[".concat(specKey, "|").concat(itKey, "] passed."));
                        };
                        window.addEventListener("error", function (ev) {
                            res(failResult(ev.error));
                        });
                        window.addEventListener("unhandledrejection", function (ev) {
                            res(failResult(ev.reason));
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        RunSpecInRunTask = function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _i, specItem, _d, _e, _f, _g, tmpItKey, tmpItKey;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        _a = runTask;
                                        _b = [];
                                        for (_c in _a)
                                            _b.push(_c);
                                        _i = 0;
                                        _h.label = 1;
                                    case 1:
                                        if (!(_i < _b.length)) return [3 /*break*/, 15];
                                        _c = _b[_i];
                                        if (!(_c in _a)) return [3 /*break*/, 14];
                                        specKey = _c;
                                        specItem = runTask[specKey];
                                        if (!specItem[beforeAllLabel]) return [3 /*break*/, 3];
                                        return [4 /*yield*/, specItem[beforeAllLabel]()];
                                    case 2:
                                        _h.sent();
                                        delete specItem[beforeAllLabel];
                                        _h.label = 3;
                                    case 3:
                                        _d = specItem;
                                        _e = [];
                                        for (_f in _d)
                                            _e.push(_f);
                                        _g = 0;
                                        _h.label = 4;
                                    case 4:
                                        if (!(_g < _e.length)) return [3 /*break*/, 11];
                                        _f = _e[_g];
                                        if (!(_f in _d)) return [3 /*break*/, 10];
                                        itKey = _f;
                                        // Skip Not It()
                                        if (Object.values(labelMap).includes(itKey)) {
                                            return [3 /*break*/, 10];
                                        }
                                        if (!specItem[beforeEachLabel]) return [3 /*break*/, 6];
                                        tmpItKey = itKey;
                                        itKey = beforeEachLabel;
                                        return [4 /*yield*/, specItem[itKey]()];
                                    case 5:
                                        _h.sent();
                                        itKey = tmpItKey;
                                        _h.label = 6;
                                    case 6: 
                                    // It()
                                    return [4 /*yield*/, specItem[itKey]()];
                                    case 7:
                                        // It()
                                        _h.sent();
                                        if (!specItem[afterEachLabel]) return [3 /*break*/, 9];
                                        tmpItKey = itKey;
                                        itKey = afterEachLabel;
                                        return [4 /*yield*/, specItem[itKey]()];
                                    case 8:
                                        _h.sent();
                                        itKey = tmpItKey;
                                        _h.label = 9;
                                    case 9:
                                        passCount++;
                                        printPassMsg();
                                        delete specItem[itKey];
                                        _h.label = 10;
                                    case 10:
                                        _g++;
                                        return [3 /*break*/, 4];
                                    case 11:
                                        if (!specItem[afterAllLabel]) return [3 /*break*/, 13];
                                        return [4 /*yield*/, specItem[afterAllLabel]()];
                                    case 12:
                                        _h.sent();
                                        delete specItem[afterAllLabel];
                                        _h.label = 13;
                                    case 13:
                                        delete runTask[specKey];
                                        _h.label = 14;
                                    case 14:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 15: return [2 /*return*/];
                                }
                            });
                        }); };
                        _i = 0, specs_1 = specs;
                        _a.label = 2;
                    case 2:
                        if (!(_i < specs_1.length)) return [3 /*break*/, 5];
                        specBuilder = specs_1[_i];
                        specBuilder();
                        return [4 /*yield*/, RunSpecInRunTask()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        delete specsMap[thisRunTaskID];
                        res(failResult(err_1));
                        return [3 /*break*/, 7];
                    case 7:
                        delete specsMap[thisRunTaskID];
                        res(successResult());
                        return [2 /*return*/];
                }
            });
        }); });
    }

    exports.afterAll = afterAll;
    exports.afterEach = afterEach;
    exports.beforeAll = beforeAll;
    exports.beforeEach = beforeEach;
    exports.it = it;
    exports.runTests = runTests;
    exports.spec = spec;

}));
