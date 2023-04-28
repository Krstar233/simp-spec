const files = require.context("../spec", true, /.spec.js$/);
const keys = files.keys();

export async function config() {
  const specList = [];
  for (const key of keys) {
    const specModule = await files(key);
    specList.push(specModule);
  }
  return specList;
}