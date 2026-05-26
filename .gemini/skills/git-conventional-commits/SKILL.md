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

### Repository-Specific Scopes
- **data**: Updates to static links or content datasets (e.g. [links.ts](file:///Users/i.likitpolchaloon/web-link-list/src/data/links.ts)).
- **ui**: Modifications to React UI components (e.g. [LinkCard.tsx](file:///Users/i.likitpolchaloon/web-link-list/src/components/LinkCard.tsx), [App.tsx](file:///Users/i.likitpolchaloon/web-link-list/src/App.tsx)).
- **style**: Layout, color, animation, typography CSS changes (e.g. [App.css](file:///Users/i.likitpolchaloon/web-link-list/src/App.css)).
- **ci**: Changes to workflow configurations (e.g. [.github/workflows/deploy.yml](file:///Users/i.likitpolchaloon/web-link-list/.github/workflows/deploy.yml)).
- **hook**: Updates to Git hooks (e.g. `.git/hooks/pre-push`).
- **skill**: Custom assistant developer skills (e.g. [SKILL.md](file:///Users/i.likitpolchaloon/web-link-list/git-conventional-commits/SKILL.md)).
- **docs**: Log, readmes, and documentation updates (e.g. [ANTIGRAVITY.md](file:///Users/i.likitpolchaloon/web-link-list/ANTIGRAVITY.md), [README.md](file:///Users/i.likitpolchaloon/web-link-list/README.md), [GEMINI.md](file:///Users/i.likitpolchaloon/web-link-list/GEMINI.md)).
- **deps**: Changing or adding package dependencies, lockfiles, or configurations (e.g. [package.json](file:///Users/i.likitpolchaloon/web-link-list/package.json)).

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

## Commit Message Examples

| Nature of Change | ❌ Bad Commit Message |  Good Commit Message |
| --- | --- | --- |
| Added a new external tool to the link dataset | `Updated links.ts with Android Chucker View.` | `feat(data): add Android Chucker View tool` |
| Fixed spacing issue on the mobile link grid | `Fixed CSS alignment of the card grid` | `fix(style): resolve mobile grid alignment spacing` |
| Modified Github Action deployment to run checks | `Fixed deploy.yml to run build` | `ci: run build check before deployment in workflow` |
| Documented new repository details in ANTIGRAVITY.md | `docs: Updated ANTIGRAVITY.md.` | `docs(docs): update developer logs with new architecture map` |

## Skill Maintenance & Synchronization

Whenever you modify this skill, you must ensure it is synchronized and packaged.
1. Make your changes to the template file `git-conventional-commits/SKILL.md`.
2. Run `npm run skill:build` from the root workspace directory. This will copy the updated file to `.gemini/skills/git-conventional-commits/SKILL.md` and rebuild the compressed `git-conventional-commits.skill` package file.
3. Commit both files (`SKILL.md` and `git-conventional-commits.skill`) as part of the commit.
