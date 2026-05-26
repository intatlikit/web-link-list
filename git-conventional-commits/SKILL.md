---
name: git-conventional-commits
description: Analyzes changes to generate and apply git commit messages following the Conventional Commits specification (feat, fix, etc.). Use when the user wants to commit changes with structured, meaningful messages.
---

# Git Conventional Commits

This skill guides the process of analyzing staged and unstaged changes to generate high-quality commit messages following the Conventional Commits specification.

## Conventional Commits Format

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Workflow

1. **Analyze Changes**: Gather information about the changes using:
   - `git status` to see which files are changed/staged.
   - `git diff --staged` to see what is about to be committed.
   - `git diff` to see unstaged changes (if relevant to the commit).

2. **Atomic Commits**: If there are multiple unrelated changes, propose committing them one by one. Analyze each change individually.

3. **Generate Message**:
   - Determine the **type** based on the nature of the change.
   - Select an optional **scope** if it provides useful context (e.g., `feat(parser): ...`).
   - Write a concise **description** in the imperative, present tense (e.g., "add", not "added").
   - Add an optional **body** for more detailed explanations of the "why" and "how" if necessary.
   - Add a **footer** for breaking changes or referencing issues (e.g., `BREAKING CHANGE:`, `Closes #123`).

4. **Propose and Apply**: Present the proposed commit message(s) to the user. Upon approval, execute the commit:
   ```bash
   git add <files>
   git commit -m "<message>"
   ```

## Best Practices
- Keep the description short (under 50-72 characters).
- Do not capitalize the first letter of the description.
- Do not end the description with a period.
- Use the body to explain the motivation for the change and contrast this with previous behavior.
