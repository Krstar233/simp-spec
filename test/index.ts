import { runTests, config } from "./common";

window.onload = async () => {
  const result = await runTests(await config());
  console.warn(JSON.stringify(result));
  document.getElementById("result-panel")!.innerHTML = `<span style="color: ${
    result.success ? "green" : "red"
  };">${JSON.stringify(result)}</span>`;
};
