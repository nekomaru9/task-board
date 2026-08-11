# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

task-board is a task board application. The technology stack has not been decided yet — update this section once the stack (frontend/backend framework, language, database, etc.) is chosen.

## Git Workflow Rules

- **Every time code is changed, push the change to GitHub.** Do not leave changes committed only locally — after editing code, always run through the following sequence:
  1. `git add <changed files>` (avoid `git add -A`/`git add .` unless you have checked `git status` first)
  2. `git commit -m "..."` with a concise message describing the change
  3. `git push` to the `origin` remote (`https://github.com/nekomaru9/task-board.git`) immediately after committing
- Prefer small, frequent commits over large batched ones — each logical change should be committed and pushed on its own.
- Never use `git push --force` on shared branches (e.g. `main`) without explicit user approval.
- Never use `git commit --amend` on commits that have already been pushed.
- Do not skip git hooks (`--no-verify`) unless explicitly instructed by the user.
- Run `git status` before staging to confirm exactly what is being committed, and double-check for secrets (`.env`, credentials, keys) before pushing.

## Development Notes

This section will be filled in as the project's tooling, build steps, and conventions are established (package manager, test runner, lint/format commands, etc.).
