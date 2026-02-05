# Contributing to LibravelUI

Thank you for your interest in contributing to LibravelUI!

## Versioning Policy

We follow [Semantic Versioning (SemVer)](https://semver.org/) strictly.

- **Major (x.0.0)**: Breaking changes. This includes removing props, changing default behaviors that affect existing implementations, or upgrading dependencies that require user intervention.
- **Minor (0.x.0)**: New features that are backward compatible. This includes adding new components, new props to existing components, or new hooks.
- **Patch (0.0.x)**: Bug fixes and internal improvements that do not affect the public API.

## Release Process

We use [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

### Creating a Changeset

When you make a change that requires a release (feature, fix, or breaking change), you must add a changeset.

1. Run the following command:
   ```bash
   bun x changeset
   ```
2. Select the package(s) you modified.
3. Choose the type of change (major, minor, or patch).
4. Write a summary of the change. This will be added to the CHANGELOG.

### Releasing

Releases are handled automatically via CI/CD (GitHub Actions) when a PR with a changeset is merged.

1. The "Version Packages" action will create a PR that updates versions and changelogs.
2. Merging that PR will trigger the "Release" action which publishes to npm.
