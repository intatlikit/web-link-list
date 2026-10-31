---
name: git-conventional-commits
description: Analyzes changes to generate and apply git commit messages following the Conventional Commits specification (feat, fix, etc.). Use when the user wants to commit changes with structured, meaningful messages.
---

# Git Conventional Commits

This skill guides the process of analyzing staged and unstaged changes to generate high-quality commit messages following the Conventional Commits specification.

## Conventional Commits Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Repository-Specific Scopes
- **ui**: Vue components and views (`src/components/`, `src/views/`, `src/App.vue`).
- **style**: Layout, color, animation, typography CSS (`src/assets/*.css`, `<style>` blocks).
- **data**: Data access and link content (`src/services/`, `src/composables/useLinks.ts`, `src/data/links.ts`).
- **db**: Supabase schema, RLS, and functions (`supabase/migrations/`).
- **router**: Routes and navigation (`src/router/`).
- **ci**: Workflow configuration (`.github/workflows/deploy.yml`).
- **skill**: Claude config and skills (`.claude/`).
- **docs**: README and documentation.
- **deps**: Package dependencies, lockfiles (`package.json`, `package-lock.json`).

## Workflow

1. **Analyze Changes**:
   - `git status` to see which files are changed/staged.
   - `git diff --staged` to see what is about to be committed.
   - `git diff` to see unstaged changes (if relevant to the commit).

2. **Atomic Commits**: If there are multiple unrelated changes, propose committing them one by one.

3. **Generate Message**:
   - Determine the **type** based on the nature of the change.
   - Select an optional **scope** if it provides useful context (e.g., `feat(ui): ...`).
   - Write a concise **description** in the imperative, present tense (e.g., "add", not "added").
   - Add an optional **body** explaining the "why" when needed.
   - Add a **footer** for breaking changes or issue references (`BREAKING CHANGE:`, `Closes #123`).

4. **Propose and Apply**: Present the proposed commit message(s) to the user (in Thai, per CLAUDE.md — the message itself stays in English). Upon approval:
   ```bash
   git add <files>
   git commit -m "<message>"
   ```

## Best Practices
- Keep the description short (under 50-72 characters).
- Do not capitalize the first letter of the description.
- Do not end the description with a period.
- Run `npm run check` before committing.

## Commit Message Examples

| Nature of Change | ❌ Bad | ✅ Good |
| --- | --- | --- |
| Added a floating button to create links | `Added FAB.` | `feat(ui): add floating button to create links` |
| Fixed drag handle not working on iOS | `fix drag` | `fix(ui): enable touch dragging on card handle` |
| Added a URL check constraint | `update sql` | `feat(db): only allow http(s) urls in links` |
| Passed Supabase secrets to the build | `Fixed deploy.yml` | `ci: pass Supabase secrets to build step` |
