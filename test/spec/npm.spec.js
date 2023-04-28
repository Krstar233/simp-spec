import SimpSpec from "simp-spec";
import { expect, it, spec } from "../common";

export default spec("npm-test", function() {

  it("export test", done => {
    const expectKeys = ["it", "spec", "runTests", "beforeAll", "afterAll", "beforeEach", "afterEach"];
    expect(Object.keys(SimpSpec).length).eq(expectKeys.length);
    for (const k of Object.keys(SimpSpec)) {
      expect(expectKeys.includes(k)).true;
    }
    done();
  });

});
