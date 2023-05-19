/**
 * 测试结果
 */
export interface TestResult {
    /**
     * 测试是否成功通过
     */
    success: boolean;
    /**
     * 测试用例通过的个数
     */
    passCount: number;
    /**
     * 详细描述信息
     */
    message: string;
}
/**
 * 声明测试用例的 Hook
 * @param title 测试用例标题
 * @param fn 声明的测试用例回调内容, done() 被执行代表该测试用例通过, 必须被执行后才会继续运行下一个用例.
 */
export declare function it(title: string, fn: (done: () => void) => void): void;
/**
 * 所有测试用例开始前 Hook, 在该测试集的所有测试用例开始前都会调用声明的回调.
 * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
 */
export declare function beforeAll(fn: (done: () => void) => void): void;
/**
 * 所有测试用例结束 Hook, 在该测试集的所有测试用例结束后都会调用声明的回调.
 * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
 */
export declare function afterAll(fn: (done: () => void) => void): void;
/**
 * 每个测试用例开始前 Hook, 在该测试集的每个测试用例开始前都会调用声明的回调.
 * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
 */
export declare function beforeEach(fn: (done: () => void) => void): void;
/**
 * 每个测试用例结束 Hook, 在该测试集的每个测试用例结束后都会调用声明的回调.
 * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
 */
export declare function afterEach(fn: (done: () => void) => void): void;
/**
 * 构建测试用例集的 Hook 函数
 * @param title 测试集标题
 * @param fn 描述函数, 函数内包含若干测试用例
 * @returns Function
 */
export declare function spec(title: string, fn: () => void): () => any;
/**
 * 运行测试用例集
 * @param specs Array 所有要运行的构建测试集的 Hook 列表
 * @returns Promise<TestResult> 异步返回测试结果
 */
export declare function runTests(specs: any[]): Promise<TestResult>;
