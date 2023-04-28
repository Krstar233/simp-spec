# SimpSpec

一个 JavaScript 代码的轻量测试工具, 无需复杂的配置, 直接引入 npm 包快速构建您的测试用例.

## 快速开始

1. 安装

    ```bash
    npm install simp-spec
    ```

2. 声明测试用例, 这里推荐使用断言库 [chai](https://github.com/chaijs/chai) 配合测试用例使用.

    my-test.spec.js
    ```js
    import { it, spec } from "simp-spec";
    import { expect } from "chai";

    export default spec("my-test", function() {

        it("export test", done => {
            expect("Hello World".length).eq(11);
            done();
        });

    });

    ```

3. 直接导入并运行您的测试用例 !

    main.js
    ```js
    import { runTests } from "simp-spec";
    import MySpec from "./my-test.spec";

    async main() {
        const result = await runTests([
            MySpec
        ]);

        console.log(result);
        // {"success":true,"passCount":1,"message":"ALL TESTS PASS!"}
    }
    ```

- 更多 API 说明访问: https://krstar233.github.io/simp-spec/

## webpack 最佳实践

- 如果您觉得类似以下这样一条条导入测试用例很繁琐:

    ```js
    import { runTests } from "simp-spec";
    import MySpec1 from "./my-test1.spec";
    import MySpec2 from "./my-test2.spec";
    import MySpec3 from "./my-test3.spec";
    ...
    await runTests([
        MySpec1, MySpec2, MySpec3...
    ]);
    ```

- 您可以使用 webpack 支持的批量导入的方式构建测试用例:

    ```js
    import { runTests } from "simp-spec";

    const files = require.context("./spec", true, /.spec.js$/);
    const keys = files.keys();

    async function batchImport() {
        const specList = [];
        for (const key of keys) {
            const specModule = await files(key);
            specList.push(specModule.default);
        }
        return specList;
    }
    const specs = await batchImport();
    await runTests(specs);
    ```