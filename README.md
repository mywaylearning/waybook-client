# Waybook Client

The Waybook client application is built on top of the [Ionic Framework](http://www.ionicframework.com/), which itself is built on [AngularJS](http://www.angularjs.org/) and [Cordova](http://cordova.apache.org/).

By using these underlying libraries, we're able to build a hybrid application which works in the desktop browser, the mobile browser, and can be built for native deployment on iOS and Android platforms.

## Requirements

In order to develop and build this project, you will need:

* Node >= 4
* NPM >= 2
* Ionic CLI - `$ npm install -g ionic`
* Bower - `$ npm install -g bower`

## Installing

Clone this repo and inside the root dir, run:

`$ npm install & bower install`

This will install all dependencies and dev dependencies.

## Running

To start a local server, run:

`$ npm start`

This command will trigger a gulp task which is responsible to start local server, build and watch (with livereload) files.

## Building hybrid app

First, restore all ionic platforms and plugins running:

`$ ionic state restore`

For Android builds run:

```
$ npm run android:staging
$ npm run android:production
```

## Deploying

To deploy, we currently use two branches:

* #master - Staging: http://uidev.way.me
* #wayme - Production: http://way.me

Since we are using CircleCI to automatically build and deploy, everything committed to this branches will be deployed, so be carefull!

## Pull requests

We are using Github flow for PRs. Every new feature must be on a descriptive named branch. When a feature is ready to be merged to master (in our case the staging branch), a PR must be opened on Github. CircleCI will run all tests and verify if it can be merged. If everything is ok, it can be merged.
