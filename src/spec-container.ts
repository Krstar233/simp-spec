const specsMap: any = {};
let buildingTitle = "__SimpSpec_Test";
let runTaskID = 0;
const labelPrefix = "__SimpSpec_Test__";
const beforeAllLabel = labelPrefix + "beforeAll";
const afterAllLabel = labelPrefix + "afterAll";
const beforeEachLabel = labelPrefix + "beforeEach";
const afterEachLabel = labelPrefix + "afterEach";

const labelMap = {
  beforeAllLabel,
  afterAllLabel,
  beforeEachLabel,
  afterEachLabel
};

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

const getRunTask = () => {
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
export function it(title: string, fn: (done: () => void) => void): void {
  const runTask = getRunTask();
  if (runTask[buildingTitle][title]) {
    throw new Error(`case: ${title} has existed!`);
  }
  runTask[buildingTitle][title] = (): Promise<void> => {
    return new Promise<void>(res => {
      fn(res);
    });
  };
}
/**
 * 所有测试用例开始前 Hook, 在该测试集的所有测试用例开始前都会调用声明的回调.
 * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
 */
export function beforeAll(fn: (done: () => void) => void): void {
  const runTask = getRunTask();
  runTask[buildingTitle][beforeAllLabel] = (): Promise<void> => {
    return new Promise<void>(res => {
      fn(res);
    });
  };
}
/**
 * 所有测试用例结束 Hook, 在该测试集的所有测试用例结束后都会调用声明的回调.
 * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
 */
export function afterAll(fn: (done: () => void) => void): void {
  const runTask = getRunTask();
  runTask[buildingTitle][afterAllLabel] = (): Promise<void> => {
    return new Promise<void>(res => {
      fn(res);
    });
  };
}
/**
 * 每个测试用例开始前 Hook, 在该测试集的每个测试用例开始前都会调用声明的回调.
 * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
 */
export function beforeEach(fn: (done: () => void) => void): void {
  const runTask = getRunTask();
  runTask[buildingTitle][beforeEachLabel] = (): Promise<void> => {
    return new Promise<void>(res => {
      fn(res);
    });
  };
}
/**
 * 每个测试用例结束 Hook, 在该测试集的每个测试用例结束后都会调用声明的回调.
 * @param fn 声明的回调, done() 被执行代表该回调运行结束, 必须被执行.
 */
export function afterEach(fn: (done: () => void) => void): void {
  const runTask = getRunTask();
  runTask[buildingTitle][afterEachLabel] = (): Promise<void> => {
    return new Promise<void>(res => {
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
export function spec(title: string, fn: () => void): () => any {
  return () => {
    buildingTitle = title;
    fn();
  };
}
/**
 * 运行测试用例集
 * @param specs Array 所有要运行的构建测试集的 Hook 列表
 * @returns Promise<TestResult> 异步返回测试结果
 */
export function runTests(specs: any[]): Promise<TestResult> {
  const thisRunTaskID = ++runTaskID;

  const runTask = getRunTask();

  return new Promise<TestResult>(async (res, rej) => {
    let passCount = 0;
    let specKey: string, itKey: string;
    const successResult = () => {
      return {
        success: true,
        passCount,
        message: "ALL TESTS PASS!"
      };
    };
    const failResult = (err: Error) => {
      let failItKey = itKey;
      if (Object.values(labelMap).includes(itKey)) {
        failItKey = itKey.substring(labelPrefix.length);
      }
      return {
        success: false,
        passCount,
        message: `[${specKey}|${failItKey}] failed. reason: ${err.message}`
      };
    };
    const printPassMsg = () => {
      console.warn(`[${specKey}|${itKey}] passed.`);
    };
    window.addEventListener("error", ev => {
      res(failResult(ev.error));
    });
    window.addEventListener("unhandledrejection", ev => {
      res(failResult(ev.reason));
    });
    try {
      const RunSpecInRunTask = async () => {
        for (specKey in runTask) {
          const specItem = runTask[specKey];
          // BeforeAll()
          if (specItem[beforeAllLabel]) {
            await specItem[beforeAllLabel]();
            delete specItem[beforeAllLabel];
          }
          for (itKey in specItem) {
            // Skip Not It()
            if (Object.values(labelMap).includes(itKey)) {
              continue;
            }
            // BeforEach()
            if (specItem[beforeEachLabel]) {
              const tmpItKey = itKey;
              itKey = beforeEachLabel;
              await specItem[itKey]();
              itKey = tmpItKey;
            }
            // It()
            await specItem[itKey]();
            // AfterEach()
            if (specItem[afterEachLabel]) {
              const tmpItKey = itKey;
              itKey = afterEachLabel;
              await specItem[itKey]();
              itKey = tmpItKey;
            }
            passCount++;
            printPassMsg();
            delete specItem[itKey];
          }
          // AfterAll()
          if (specItem[afterAllLabel]) {
            await specItem[afterAllLabel]();
            delete specItem[afterAllLabel];
          }
          delete runTask[specKey];
        }
      };
      for (const specBuilder of specs) {
        specBuilder();
        await RunSpecInRunTask();
      }
    } catch (err) {
      delete specsMap[thisRunTaskID];
      res(failResult(err));
    }
    delete specsMap[thisRunTaskID];
    res(successResult());
  });
}
