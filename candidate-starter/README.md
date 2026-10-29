# Frame Cinema Automation Exercise

## Before the timed session

Use Node.js 22+, Git, a GitHub account and Chromium. The assessor supplies the cinema URL and an Excel workbook. Use fictional names and `example.com` email addresses; reports will be public.

Copy this folder's **contents**, including `.github`, into your own public repository on the `main` branch. Do not fork the cinema source. Run:

```sh
npm ci
npx playwright install chromium
```

Set the target URL, including the final `/`:

```powershell
$env:BASE_URL = 'https://HOST.github.io/CINEMA_REPOSITORY/'
npm test
```

On macOS/Linux: `BASE_URL='https://HOST.github.io/CINEMA_REPOSITORY/' npm test`.

For GitHub reporting, select **Settings > Pages > Source > GitHub Actions**. Under **Settings > Secrets and variables > Actions > Variables**, create a repository variable named `BASE_URL` with the cinema URL. It is not a secret. Run the supplied smoke test successfully before the clock starts. The assessor should confirm these preparations work.

## Your 30-minute task

Execute the supplied test plan using automation, prioritising the cases you think matter most. Extend the working smoke test. Use assertions against the requirements below, not against whatever the site currently does. A genuine defect should produce a failed assertion; do not mark it as an expected failure just to make the run green.

Record executed, failed and not-run cases in the Excel workbook. Raise reproducible defects with expected/actual results, severity and defect type. Commit and push your tests, then submit:

- Your GitHub repository URL.
- Your GitHub Pages HTML report URL and corresponding Actions run URL.
- Your completed Excel workbook, returned privately to the assessor, not committed to the repository.

You are not expected to complete every case. Explain your choices and any remaining risks in your repository README. Work black-box from the website and these rules; do not inspect the cinema source. Using the DOM and browser developer tools is allowed.

## Business rules

- Three films, each with three screenings per day, are offered for the next three days.
- Adult tickets cost **£12** and child tickets **£7**. All films accept both ticket types. There is one **£1.50 booking fee per booking**.
- A booking requires **1–6 tickets in total**, with whole, non-negative counts. Each ticket requires one distinct available seat.
- Seats shown as unavailable cannot be selected or booked. B3 and C4 are unavailable for every screening in this exercise.
- Changing the film, date or time clears seat selections. Ticket counts and entered contact details are retained.
- Code **FRAME10** gives **10% off ticket prices only**, not the booking fee. Codes are case-insensitive, ignore surrounding spaces and cannot be stacked. Round the discount to the nearest penny.
- A non-blank name and valid email are required. For this exercise, a valid email has non-empty text before `@`, a domain containing a dot with non-empty parts, and no whitespace, e.g. `alex@example.com`.
- Confirmation must match the chosen film, date, time, seats, ticket quantities and total. No real payment, email or shared inventory update occurs.
- **Start again** clears the booking and returns to the first film, first date, first screening and one adult ticket. Reloading also starts fresh; persistence is not required.

## Running and reporting

```sh
npm test
npm run report
```

Each test gets a fresh browser context. Prefer accessible roles/labels or the provided `data-testid` values. Include the cinema repository's subdirectory in `BASE_URL`; the starter's `page.goto('./')` preserves it.

Push to `main` to run **Cinema automation report**, or use **Actions > Run workflow**. The report URL is shown in the deployment step and **Settings > Pages**. Failed tests still publish an HTML report, but the workflow remains failed. The latest run replaces the previous Pages report, so also supply the Actions run link and commit SHA. GitHub Pages hosts the report, not a live test runner; GitHub Actions executes the tests.

Do not include credentials, real customer data or the completed defect workbook in a public report or repository. Screenshots and traces may expose typed values. If GitHub is unavailable, submit the source, local report and workbook directly and note the hosting limitation.