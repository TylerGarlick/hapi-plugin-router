# Hapi Plugin Router



Similar to the [hapi-router](https://github.com/bsiddiqui/hapi-router), this plugin's focus is to provide routing within the scope of a plugin.

----

### Installation and Setup

```js
npm install hapi-plugin-router --save
```


### API

Withing a plugin, you can register routes by utilizing a glob.  The glob will be scoped to the plugin's current directory.  Meaning, the routes should be files/folders within the plugin' folder

```js
export.register = (server, options, next) => {
    const router = server.plugins['hapi-plugin-router'];
    
    
    return next();
}
```
