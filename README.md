# flaky-demo-vitest

Demo repository for exercising a flaky-test detector against GitHub Actions logs (Vitest).

- `src/cart.test.js` contains stable tests plus three intentionally flaky tests
  (`flaky: ...`) that fail with ~40% probability per run.
- `.github/workflows/tests.yml` (`Tests` → `unit-tests`) runs `vitest run` on every
  push so the detector can observe pass-on-retry and same-SHA mixed outcomes in the
  standard Vitest output (`FAIL  path > suite > test`).
