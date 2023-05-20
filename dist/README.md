# SimpSpec

A lightweight testing tool for JavaScript code, no complex configuration required, simply import the npm package to quickly build your test cases.

## Quick Start

1. Installation

    ```bash
    npm install simp-spec
    ```

2. Define your test cases, we recommend using the assertion library [chai](https://github.com/chaijs/chai) for writing test cases.

    my-test.spec.js
    ```js
    import { it, spec, beforeAll, afterAll } from "simp-spec";
    import { expect } from "chai";

    export default spec("my-test", function() {
        
        beforeAll(done => {
            // Operate before all test cases
            done();
        });


        it("test 1", done => {
            expect("Hello World".length).eq(11);
            done();
        });

        afterAll(done => {
            // Operate after all test cases
            done();
        });

    });

    ```

3. Import and run your test cases directly!

    main.js
    ```js
    import { runTests } from "simp-spec";
    import MySpec from "./my-test.spec";

    async function main() {
        const result = await runTests([
            MySpec
        ]);

        console.log(result);
        // {"success":true,"passCount":1,"message":"ALL TESTS PASS!"}
    }

    main();
    ```

- For more API documentation, visit: https://krstar233.github.io/simp-spec/

## webpack Best Practices

- If you find it tedious to import each test case individually, like this:

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

- You can use webpack's batch import feature to build your test cases:

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