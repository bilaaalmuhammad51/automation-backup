## Overview

Welcome to the **Market Scale Test Automation Suite**! This project leverages the power of
[Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/docs/) to automate end-to-end
(E2E) and UI testing for your applications. 🚀

## ⭐ Features

- **Automated E2E Testing:** Ensure your flows work flawlessly with robust automated tests.
- **Automated UI Testing:** Validate your UI functionality with comprehensive automated checks.
- **Scalable & Maintainable:** Easily add new tests and maintain existing ones with a modular structure.
- **Modern Tooling:** Uses Playwright, TypeScript, ESLint, Prettier, and Husky for a professional workflow.
- **CI/CD Friendly:** Ready for integration into continuous integration pipelines.

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/market-scale-automation-suite.git
```

Navigate to the project directory:

```bash
cd market-scale-automation-suite
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## 🏃‍♂️ Running Tests

Run all tests in headless mode:

```bash
npm run test
```

Run all tests in headed mode:

```bash
npm run test:headed
```

Run a specific test:

```bash
npx playwright test <path/to/testcase>
```

Run a specific test in headed mode:

```bash
npx playwright test <path/to/testcase> --headed
```

Run multiple tests:

```bash
npx playwright test <path/to/testcase1> <path/to/testcase2>
```

## 🐳 Docker Support

Build and run the project using Docker:

```bash
npm run docker
```

## 📊 Generating Reports

### HTML Report

Generate an HTML report after running tests:

```bash
npm run html
```

Open the HTML report in your browser:

```bash
npm run serve:html
```

### Allure Report

Run all tests with the Allure reporter (generates `allure-results` directory):

```bash
npm run allure
```

Generate and serve the Allure report:

```bash
npm run serve:allure
```

## 🛡️ Code Quality & Pre-commit Hooks

- **Linting & Formatting:** ESLint and Prettier are enforced on every commit using Husky and lint-staged.
- **Pre-commit Hook:** Staged files are automatically linted and formatted before commit.

## 📄 License

This project is licensed under the ISC License.

---

### Happy Testing 🚀
