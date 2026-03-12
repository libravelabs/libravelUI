# Contributing to LibravelUI

Thank you for your interest in contributing to LibravelUI!

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating.

## Ways to Contribute

- **Bug reports** — Open an issue with a clear description and reproduction steps.
- **Feature requests** — Open an issue describing the use case and expected behavior.
- **Bug fixes** — Submit a pull request referencing the related issue.
- **New components** — Discuss in an issue first before submitting a PR.
- **Docs improvements** — PRs for docs fixes are always welcome.

## Development Setup

This is a monorepo managed with npm workspaces.

```bash
# Install dependencies
npm install

# Start the docs dev server
npm run dev --workspace=apps/docs
```

## Pull Request Guidelines

1. **Fork** the repository and create your branch from `main`.
2. **Keep PRs focused** — one change per PR.
3. **Add a changeset** before opening the PR (see below).
4. **Write clear commit messages** following conventional commits where possible.
5. **Ensure the build passes** before submitting.

## Versioning Policy

We follow [Semantic Versioning (SemVer)](https://semver.org/) strictly.

| Type              | When                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **Major** `x.0.0` | Breaking changes — removed props, changed defaults, dependency upgrades requiring user action |
| **Minor** `0.x.0` | New features — new components, new props, new hooks                                           |
| **Patch** `0.0.x` | Bug fixes and internal improvements with no public API change                                 |

## Adding a Changeset

When your change requires a release, add a changeset:

```bash
bun x changeset
```

1. Select the package(s) you modified.
2. Choose the change type (major / minor / patch).
3. Write a brief summary — this becomes the CHANGELOG entry.

## Release Process

Releases are automated via GitHub Actions:

1. A "Version Packages" PR is created automatically when changesets are merged.
2. Merging that PR triggers the release action which publishes to npm.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
