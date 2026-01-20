# Seam API Types

[![npm](https://img.shields.io/npm/v/@seamapi/types.svg)](https://www.npmjs.com/package/@seamapi/types)
[![GitHub Actions](https://github.com/seamapi/types/actions/workflows/check.yml/badge.svg)](https://github.com/seamapi/types/actions/workflows/check.yml)

TypeScript types for the Seam API.

## Description

This repository aggregates the latest route schemas and type definitions for the Seam API.
Upstream Seam repositories automatically contribute updates on every deployment
via a Pull Request opened by Seam Bot.
This ensures downstream consumers, e.g., the SDK, fakes, documentation generators, etc.,
have a single source of truth that stays up to date with the API.

### Structure

There is dedicated entrypoint for each Seam API namespace.
The main entrypoint for this module is re-exports the connect namespace.

Each directory under `src/lib/seam/*` is owned by an upstream Seam repository.
These files should not be edited manually as they will be overridden by automation.

Each entrypoint may export one or more of the following:

- Zod schemas: collectively exported as a single object named `schemas`.
- Types: derived directly from the [Zod Schemas][zod] and exported at the top level.
- A separate collection of Zod schmeas named `routes`.
- A type named `Routes` that implements the
  [Route Definition interface from typed-axios][typed-axios Route Definition].
- The OpenAPI schema as a plain object named `openapi`.

[nextlove]: https://github.com/seamapi/nextlove
[typed-axios Route Definition]: https://github.com/seamapi/typed-axios#route-definition
[OpenAPI]: https://www.openapis.org/
[zod]: https://zod.dev/

## Installation

_This is a low-level package meant for applications and libraries with particular dependency requirements.
These types and schemas are entirely contained in the [seam package]. Seam recommends using that package instead
for simpler dependency management._

### Types Only

Add this as a development dependency to your project using [npm] with

```
$ npm install --save-dev @seamapi/types
```

### Types and Zod Schemas

Add this as a dependency to your project using [npm] with

```
$ npm install @seamapi/types
```

[npm]: https://www.npmjs.com/
[seam package]: https://www.npmjs.com/package/seam

## Development and Testing

### Quickstart

```
$ git clone https://github.com/seamapi/types.git
$ cd types
$ nvm install
$ npm install
```

Primary development tasks are defined under `scripts` in `package.json`
and available via `npm run`.
View them with

```
$ npm run
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:seamapi/types.git
```

[source code]: https://github.com/seamapi/types

### Requirements

You will need [Node.js] with [npm] and a [Node.js debugging] client.

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

Set the active version for each shell session with

```
$ nvm use
```

Install the development dependencies with

```
$ npm install
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm

### Publishing

#### Automatic

New versions are released automatically with [semantic-release]
as long as commits follow the [Angular Commit Message Conventions].

[Angular Commit Message Conventions]: https://semantic-release.gitbook.io/semantic-release/#commit-message-format
[semantic-release]: https://semantic-release.gitbook.io/

#### Manual

Publish a new version by triggering a [version workflow_dispatch on GitHub Actions].
The `version` input will be passed as the first argument to [npm-version].

This may be done on the web or using the [GitHub CLI] with

```
$ gh workflow run version.yml --raw-field version=<version>
```

[GitHub CLI]: https://cli.github.com/
[npm-version]: https://docs.npmjs.com/cli/version
[version workflow_dispatch on GitHub Actions]: https://github.com/seamapi/types/actions?query=workflow%3Aversion

## GitHub Actions

_GitHub Actions should already be configured: this section is for reference only._

The following repository secrets must be set on [GitHub Actions]:

- `GH_TOKEN`: A personal access token for the bot user with
  `packages:write` and `contents:write` permission.
- `GIT_USER_NAME`: The GitHub bot user's real name.
- `GIT_USER_EMAIL`: The GitHub bot user's email.
- `GPG_PRIVATE_KEY`: The GitHub bot user's [GPG private key].
- `GPG_PASSPHRASE`: The GitHub bot user's GPG passphrase.

[GitHub Actions]: https://github.com/features/actions
[GPG private key]: https://github.com/marketplace/actions/import-gpg#prerequisites

## Contributing

> If using squash merge, edit and ensure the commit message follows the [Angular Commit Message Conventions] specification.
> Otherwise, each individual commit must follow the [Angular Commit Message Conventions] specification.

1. Create your feature branch (`git checkout -b my-new-feature`).
2. Make changes.
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin my-new-feature`).
5. Create a new draft pull request.
6. Ensure all checks pass.
7. Mark your pull request ready for review.
8. Wait for the required approval from the code owners.
9. Merge when ready.

[Angular Commit Message Conventions]: https://semantic-release.gitbook.io/semantic-release/#commit-message-format

## License

This npm package is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
