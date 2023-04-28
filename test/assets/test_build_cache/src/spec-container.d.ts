export interface SpecResult {
    success: boolean;
    passCount: number;
    message: string;
}
export declare function it(title: string, fn: (done: () => void) => void): void;
export declare function beforeAll(fn: (done: () => void) => void): void;
export declare function afterAll(fn: (done: () => void) => void): void;
export declare function beforeEach(fn: (done: () => void) => void): void;
export declare function afterEach(fn: (done: () => void) => void): void;
export declare function spec(title: string, builder: Function): Function;
export declare function runTests(specs: any[]): Promise<SpecResult>;
