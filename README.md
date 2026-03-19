## How to use @claude in GitHub Issues & PRs

### 1. In Issues (ask Claude to write code)

Go to your repo's **Issues** tab and create a new issue. Mention `@claude` in the **title or body**:

**Example:**
> **Title:** @claude Add rate limiting to the API
> 
> **Body:** Please add rate limiting to the `/api/fingerprint` endpoint. Limit each IP to 10 requests per minute.

✅ Claude will:
- Read your codebase
- Create a new branch
- Write the code
- Open a **Pull Request** with the changes

---

### 2. In Pull Request Comments (ask Claude to modify code)

On any open PR, leave a comment with `@claude`:

**Example comment:**
> @claude Please add error handling for the database connection in this PR

✅ Claude will push new commits to the PR branch.

---

### 3. In PR Review Comments (ask Claude on specific lines)

When reviewing a PR, click on a specific line of code and leave a review comment:

**Example:**
> @claude This function is too long, can you refactor it into smaller functions?

✅ Claude will fix that specific code and push a commit.

---

### 4. In PR Reviews (overall review request)

Submit a PR review with `@claude` in the review body:

> @claude Please review this PR for security issues

✅ Claude will analyze the entire PR and respond.

---

### Quick Summary

| Where | How | What Claude Does |
|---|---|---|
| **New Issue** | `@claude` in title/body | Creates a PR with code changes |
| **Issue Comment** | `@claude` in comment | Responds or creates a PR |
| **PR Comment** | `@claude` in comment | Pushes commits to the PR |
| **PR Line Comment** | `@claude` on a code line | Fixes that specific code |
| **PR Review** | `@claude` in review body | Reviews or modifies the PR |

---

### ⚠️ Important Reminder
Make sure you've added the `ANTHROPIC_API_KEY` secret first at:
https://github.com/carloschen2021/fingerprints/settings/secrets/actions

Without it, the workflow will fail with an authentication error.
