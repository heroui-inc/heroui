# Security Policy

## Supported Versions

Security updates are provided for the latest stable major version of HeroUI.

| Version | Supported            |
| ------- | -------------------- |
| v3.x    | Yes                  |
| v2.x    | Critical issues only |
| < v2    | No                   |

## Reporting a Vulnerability

Please do **not** report security vulnerabilities through public GitHub issues, discussions, or pull requests.

To report a vulnerability, use one of the following private channels:

* GitHub Private Vulnerability Reporting

Please include as much detail as possible:

* A clear description of the vulnerability.
* Affected package or area, for example `@heroui/react`, `@heroui/styles`, documentation site, build tooling, or release workflow.
* A minimal reproduction, proof of concept, or steps to reproduce.
* Affected versions.
* Potential impact.
* Any known workaround or mitigation.

We will acknowledge valid reports as soon as practical and will work with the reporter on coordinated disclosure.

## Scope

Security issues may include, but are not limited to:

* Cross-site scripting or unsafe DOM behavior in components.
* Vulnerabilities in server-side rendering, hydration, or framework integration behavior.
* Supply-chain risks affecting published npm packages.
* Compromise or misuse of release, CI, or package publishing workflows.
* Vulnerable dependencies that create a practical risk for HeroUI users.
* Issues in documentation examples that encourage unsafe usage.

The following are generally out of scope unless they demonstrate a real security impact:

* General bugs without a security impact.
* Accessibility, styling, or layout issues.
* Vulnerabilities only affecting unsupported versions.
* Reports generated only by automated scanners without a working exploit path.
* Issues in third-party applications using HeroUI incorrectly.

## Disclosure Process

Please give the maintainers reasonable time to investigate and release a fix before publicly disclosing the issue.

For confirmed vulnerabilities, we may:

1. Validate the report.
2. Prepare a fix privately.
3. Publish patched package versions.
4. Publish a GitHub Security Advisory or release note when appropriate.
5. Credit the reporter, unless they prefer to remain anonymous.

## Package Security

HeroUI is distributed through npm packages such as `@heroui/react`, `@heroui/styles`, and individual component packages.

Users should:

* Keep HeroUI packages updated.
* Review release notes before upgrading.
* Use lockfiles and dependency auditing in production applications.
* Avoid installing packages from unofficial sources.

Maintainers should prefer secure release practices, including two-factor authentication, least-privilege publishing access, and provenance or trusted publishing where available.

## Security Updates

Security fixes may be released as patch or minor versions depending on the affected package and severity.

When a vulnerability affects users, the project will aim to document:

* Affected versions.
* Fixed versions.
* Severity.
* Recommended upgrade path.
* Workarounds, if available.

## Thank You

We appreciate responsible security research and coordinated disclosure. Thank you for helping keep HeroUI and its users safe.
