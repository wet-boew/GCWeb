---
{
	"title": "Developing for GCWeb",
	"language": "en",
	"description": "Instructions on how to develop for the Canada.ca theme.",
	"altLangPage": "developing-fr.html",
	"dateModified": "2022-04-12"
}
---

Install NodeJS

## Building GCweb

* Build a local development version: `grunt` or `grunt debug`
* Run code quality check: `grunt test`
* Build production files: `grunt dist`
* Compile and assemble méli-mélo:
  * Run local: `grunt méli-mélo`
  * Run from compiled dist: `grunt méli-mélo-runLocal`
  * Run from wet-boew sites : `grunt méli-mélo-remote`
* Regenerate site web content: `grunt site-contents`
  * `_data/components.json`
  * `_data/sites.json`
  * `_data/templates.json`
  * `_wetboew-demos/**`

## Run GCWeb website locally

Ensure that you have built GCWeb first

After your are running docking container or the docker composer you will be able to access your local website at: `http://localhost:4000`

Build Dockerfile locally

```shell
docker build -t jekyll-with-env-options .
```

Run your image

```shell
grunt debug

docker run -it --rm -v "$PWD":/usr/src/app -p "4000:4000" --env JEKYLL_OPTIONS='--config _config.yml,_localJekyll.yml' jekyll-with-env-options
```

### Alternative with docker-compose

This version leverage the remote theme wet-boew/gcweb-jekyll. This equivalent if you run with gh-pages through your own GCWeb repository.

```shell
grunt debug
docker-compose up
```

First time run: `docker-compose up --build`

## Run the continuous integration and deployment script locally

Install ACT - [https://github.com/nektos/act](https://github.com/nektos/act)

GitHub fork needed:

* [wet-boew/gcweb](https://github.com/wet-boew/gcweb)
* [wet-boew/gcweb-jekyll](https://github.com/wet-boew/gcweb-jekyll)
* [wet-boew/gcweb-compiled-demos](https://github.com/wet-boew/gcweb-compiled-demos)
* [wet-boew/themes-dist](https://github.com/wet-boew/themes-dist)
* [wet-boew/themes-cdn](https://github.com/wet-boew/themes-cdn)

Run the continuous deployment script

```shell
act -f deploy-gcweb -s my_token=<XXXXXXXXXXXXXX> -s my_username="<GITHUB USERNAME>" - my_email="<GITHUB HANDLE>@users.noreply.github.com" -a <GITHUB HANDLE>
```

Where:

* `<GITHUB USERNAME>`: Your name, like "John Doe"
* `<GITHUB HANDLE>`: Your github id
* `<XXXXXXXXXXXXXX>`: Your personal access token with access to public repository

### Run additional CI test locally

Pre-requites

```shell
grunt debug
docker-compose up

```

HTML link checker

```shell
docker exec -i gcweb_jekyll rake
```

HTML lint

```shell
grunt htmllint:all
```

## Build demo files

Run the following command to generate files for a demo on <https://github.com/ServiceCanada/wet-boew-demos> where `[branchName]` refers to the branch name where your demo is hosted.

`grunt demo --branch=[branchName]`

## Refresh your github pages with the latest theme changes

You can make a commit to your site and it will get regenerated with the latest version of the jekyll theme. Alternatively, the following curl command will told github to regenerate your site.

```shell
curl -u <GITHUB HANDLE>:<XXXXXXXXXXXXXX> -X POST https://api.github.com/repos/<GITHUB HANDLE>/<GITHUB REPOSITORY>/pages/builds
```

Where:

* `<GITHUB HANDLE>`: Your github id
* `<XXXXXXXXXXXXXX>`: Your personal access token with access to public repository
* `<GITHUB REPOSITORY>`: Your web site github repository, like "jekyll-website"

Note: A manual update is required if you have specified a version for your jekyll remote theme in your `config.yml` file.

## Develop using Github Pages

### 1. Setup Github Pages

To be able to view GCWeb through Github, you'll have to setup your repo to use Github pages. Here's how to do so:

1. In your GCWeb fork, go to the Settings tab.
2. In the Settings page, go to the Pages tab.
    * **Source**: deploy from a branch
    * **Branch**: gh-pages | /(root) (if you don't have the `gh-pages` branch already, you'll have to create it)
3. Still in the Settings pages, go to the Environments tab.
4. Select "github-pages" environment.
5. Under "Deployment branches and tags", if it is not already there, add the branch `dev`.

### 2. Develop using the Github Pages workflow

You are now set up to start developing. Here's the process to do so:

1. Make your changes in your `dev` local branch.
2. Run `git add .`
3. Run `git commit "[Your commit message]"`. For ulterior changes, run `git commit --amend --no-edit`.
4. Run `git push -f origin dev`.
5. Repeat step 2 to 4 everytime you are ready to test your changes.

## Contribute to GCWeb

When you work on fixing or improving GCWeb, for example by troubleshooting a bug or creating a new feature, it could be interesting for all if you would contribute back to the project so that every implementation of GCWeb can benefit from your work. To do so, please read our [code of conduct](https://github.com/wet-boew/GCWeb/blob/master/CONTRIBUTING.md).
