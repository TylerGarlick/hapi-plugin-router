# Hapi Plugin Router

[![Build Status](https://travis-ci.org/TylerGarlick/hapi-plugin-router.svg)](https://travis-ci.org/TylerGarlick/hapi-plugin-router) [![npm version](https://badge.fury.io/js/hapi-plugin-router.svg)](https://badge.fury.io/js/hapi-plugin-router) [![Code Climate](https://codeclimate.com/github/TylerGarlick/hapi-plugin-router/badges/gpa.svg)](https://codeclimate.com/github/TylerGarlick/hapi-plugin-router)

Similar to the [hapi-router](https://github.com/bsiddiqui/hapi-router), this plugin's focus is to provide routing within the scope of a plugin.  The [hapi-router](https://github.com/bsiddiqui/hapi-router) was nice when you wanted to globally include from the project's root, or custom folder the routes.

The goal of this plugin is to amplify the features of glob based routing and provide a mechanism to use a plugin scoped routing registration.  Allowing routes to be contained in custom places, and more importantly registering the routes when the plugin is being initialized.



## Installation and Setup

```js
npm install hapi-plugin-router --save
```

Withing a plugin, you can register routes by utilizing a glob.  The glob will be scoped to the plugin's current directory.  Meaning, the routes should be files/folders within the plugin' folder

```js
// Your plugin's register function, this assumes there is a folder named routes which contains one or many files.  Each file
export.register = (server, options, next) => {
    const router = server.plugins['hapi-plugin-router'];
    /**
        This will assume the base directory of the plugin that is calling the setup function.  In other words, it knows the current directory this call is in and will by default set it to that directory.
    **/
    router.setup('routes/**/*.js');
    return next();
}
```

## API

The setup function registers the routes based upon the discovery of files indicated by the glob

### .setup(globPattern, [options])

* globPattern - String - the glob pattern.  See [Glob Primer](https://github.com/isaacs/node-glob#glob-primer) if you're unfamiliar with what a glob pattern is.
* options - Object


**Options**

* cwd - An override to any directory that should be the base directory of your glob's discovery.  By default it will be the calling function's directory.  
