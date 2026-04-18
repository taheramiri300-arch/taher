# QA Automation – n8n Pipeline
x
Playwright + Newman tests wired to n8n for orchestration, Slack alerts, and Jira ticket creation.

## Project structure

```
qa-project/
├── .github/
│   └── workflows/
│       ├── notify-n8n.yml      ← fires on every push to main → calls n8n webhook
│       ├── playwright.yml      ← n8n triggers this to run browser tests
│       └── api-tests.yml       ← n8n triggers this to run API tests
├── tests/
│   ├── homepage.spec.ts        ← Playwright browser tests
│   └── api-collection.json    ← Newman/Postman API tests
├── playwright.config.ts
└── package.json
```

## How the pipeline works

1. You push code to `main`
2. `notify-n8n.yml` fires and sends a POST to your n8n webhook
3. n8n checks deployment health
4. n8n triggers `playwright.yml` and `api-tests.yml` via GitHub API
5. Tests run and upload results as GitHub Artifacts
6. n8n fetches the results, parses them, and:
   - Sends Slack pass/fail notification
   - Creates Jira tickets for failures
   - Runs AI analysis on failures

## Setup checklist

### GitHub secrets you must set
Go to: your repo → Settings → Secrets and variables → Actions → New repository secret

| Secret name       | Value                                      |
|-------------------|--------------------------------------------|
| `N8N_WEBHOOK_URL` | The webhook URL from your n8n Webhook node |
| `GITHUB_TOKEN`    | Already built-in, no setup needed          |

### n8n credentials you must set
Go to: n8n → Settings → Credentials

| Credential name    | Type             | Value source                          |
|--------------------|------------------|---------------------------------------|
| GitHub Token       | HTTP Header Auth | github.com → Settings → PAT (workflow scope) |
| Slack API          | Slack OAuth      | api.slack.com/apps                    |
| Jira Basic Auth    | HTTP Basic Auth  | email + atlassian.com API token       |
| OpenAI API         | OpenAI           | platform.openai.com/api-keys          |

## Running tests locally

```bash
npm install
npx playwright install chromium
npx playwright test                    # browser tests
npx newman run tests/api-collection.json  # API tests
```
