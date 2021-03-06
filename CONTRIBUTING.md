## Introduction

> This file is always under construction, if you have a suggestion or find a discrepancy, please [file an issue](https://github.com/OpenUserCSS/openusercss.org/issues/new)!  

Thank you for contributing your time, resources and expertise to the project!  
OpenUserCSS is released under the GNU General Public License v3.0. As such, all contributions must be released under the same license.  

When you send your first Pull Request,
- You'll be asked to sign the OpenUserCSS CLA. If you want to read it first, [please head here](https://gist.github.com/DecentM/bf9d2df39a15da19470301cbefff7a3a).  
- Please run `yarn contrib:add -- {{your GitHub username}} {{type}}` to add yourself to the contributors list in [README.md](https://github.com/OpenUserCSS/openusercss.org#contributing)

> For what to put in place of {{type}}, [look here](https://github.com/jfmengels/all-contributors-cli#addupdate-contributors)

## Quick start

OpenUserCSS is mainly written in Javascript, but you don't necessarily have to
know it to contribute something. Here's an overview of some of the technologies
used and their paths:

| Tech | Path(s) |
| -----| ------- |
| Gulp | `gulpfile.babel.js` <br> `tasks/` |
| css/scss | `client/client/scss/` <br> `<style>` tags in `.vue` files in `client/components/(bits|elements|pages)`
| Express.js | `api.js` <br> `webserver.js` |
| Concourse | `ci/pipelines/` <br> `ci/tasks/` |
| Shell scripting | `ci/scripts/` |
| Backend (databases, schemas) | `client/api/connector/` <br> `client/api/backend/` |
| Testing (AVA, Nightmare.js) | `test/` |

## Submitting issues  
When submitting an issue/bug, take a look at [the issue list](https://github.com/OpenUserCSS/openusercss.org/issues?utf8=%E2%9C%93&q=is%3Aissue) to see if your issue was already posted.  
I also recommend reading [this great writeup](https://www.chiark.greenend.org.uk/~sgtatham/bugs.html) by Simon Tatham, the author of PuTTY and [a bunch of other free software](https://www.chiark.greenend.org.uk/~sgtatham/)!

## Creating Pull Requests
Before submitting, please read the comments placed inside the text editor.  
You're writing the changelog with every PR, so try to only include one feature or
bugfix in one. I'd prefer multiple, smaller PRs that have clearly defined scopes
than a large one that has tons of content.

## Setting up your development environment  
1. Install the git command line client using your package manager, or from ([https://git-scm.com/downloads](https://git-scm.com/downloads))
1. Install NodeJS using your package manager, or from [https://nodejs.org/en/download/](https://nodejs.org/en/download/) (use either the latest, or the latest LTS version)
1. Install yarn ([https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install))
1. Fork the repository into your account
1. Clone the repo with `git clone git@github.com:<your username>/openusercss.org.git .`
1. Type `yarn` to install all the required dependencies into the node_modules directory
1. (optinally) Add `./node_modules/.bin` into your $PATH, as all required binaries are there
1. Type `yarn watch` to start the development server with live reload
1. Hack away!  

With Docker:
> The Docker development environment is currently not fully tested that it
> will work when run on a fresh machine. Please open an issue if you encounter
> errors while running the start script!

1. Install Docker and docker-compose
1. Fork the repository into your account
1. Clone the repo with `git clone git@github.com:<your username>/openusercss.org.git .`
1. Run `./start.sh` and follow the on-screen prompts
1. Once the build is complete and both the API and the client are listening for
changes, open http://dev.openusercss.local in your browser
1. Hack away!

## Running tests
There are three types of tests you can run:
- Unit tests - `yarn test:unit`/`yarn run test:unit`
- API tests - `yarn test:api`/`yarn run test:api`
- End-to-end tests - `yarn test:e2e`/`yarn run test:e2e`

When you submit the Pull Request, an automated system will run these tests and validate the PR. Running the rest of the tests is optional, but I recommend doing it before pushing anyway.

## Committing  
This project follows the `standard` commit message convention. For example:  
`feat(client): Display short revision id + branch in footer`  

If you don't want to type this format manually, you can use `yarn c` or `git-cz` to launch Commitizen that creates the format for you.  

When you make a commit, the pre-commit hook will lint your code, then run unit tests. Please make sure that you stash changes you haven't added to your commit, so that tests only run on code you're about to commit.  
