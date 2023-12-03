# NeutrinoParticles Cocos

This extension package allows you to use [NeutrinoParticles](https://neutrinoparticles.com/) effects in the [Cocos Creator](https://www.cocos.com/) engine.

![Demo01](img/demo01.gif)

## Version of Cocos
This package works well with Cocos Creator 2.4.x.

> There is a bug in the Cocos Creator in version 2.4.4 and less. It tries to pass `Float64Array` value to the `WebGLRenderingContext.uniformMatrix4fv()`. On the most versions of browsers it acts just fine, but some old versions expect `Float32Array` only, as written in the [specification](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniformMatrix). To make sure that the application works fine with all browsers, please merge [this pull request](https://github.com/cocos-creator/engine/pull/8400) to your Cocos engine. Here is the [Engine Customization Workflow](https://docs.cocos.com/creator/manual/en/advanced-topics/engine-customization.html) manual. We hope to see this fix in 2.4.5 version of the Cocos Creator.

## Supported platforms
All platforms are supported.

## If you have an issue or request ##

Please, add it to the [Issues](https://gitlab.com/neutrinoparticles/neutrinoparticles-cocos/-/issues) page.

## Installation
Put this repository into your project directory in `packages/neutrinoparticles` subfolder. You can make it in any suitable way, like:
* Clone with git _(run from project's root)_:
    ```
    git clone git@gitlab.com:neutrinoparticles/neutrinoparticles-cocos.git packages/neutrinoparticles
    ```
* Submodule with git _(run from project's root)_:
    ```
    git submodule add git@gitlab.com:neutrinoparticles/neutrinoparticles-cocos.git packages/neutrinoparticles
    ```
* Download .zip archive of the repository and put it in the folder above.

After package is there, you need to restart the Cocos Creator and open the project again. 

> 2.4.x version of the Cocos Creator works with many issues related to automatic scripts updating. If you don't see a script or a texture which should be there, please restart the Cocos.

You will see new assets package called `neutrinoparticles-runtime`:

![Loaded package](img/loaded_package.png)

This package contains all necessary scripts and materials to start using NeutrinoParticles.

## Quick Usage

[![Quick Usage video](img/quick_usage_video.png)](https://youtu.be/ARloj01n9-I)

You can also check the [text version](tutorials/quick_usage/quick_usage.md).

## Tutorials

Consider to go through the tutorials in appearance order, so you will learn most important things first. 

* [Fundamentals.](tutorials/fundamentals/fundamentals.md) Which covers following:
    * World Parent
    * Scale
    * Sprite Atlases
    * Textures Trimming
    * Texture Prefix Path
* [Working with effects from scripts](tutorials/working_from_scripts/working_from_scripts.md)
    * Create effect
    * Destroy when emtpy
    * Create effect component by it's name
    * Syntax highlighting and members suggestions
* [Working with pause](tutorials/working_with_pause/working_with_pause.md)
* [Change effect properties from scripts](tutorials/effect_properties/effect_properties.md)

Additionally, you can check video tutorials for NeutrinoParticles Editor:
* [Cocos Creator + NeutrinoParticles](https://www.youtube.com/playlist?list=PLfUh_hY5m9kmE8n8MsNOlxhubNT2e6PAV) playlist
* [All video tutorials](https://www.youtube.com/playlist?list=PLfUh_hY5m9kn_8zF4rkXmZGigWU1750Os) playlist for NeutrinoParticles Editor

## 🔥 Tips & Tricks 🔥

### Disable trimming for textures (sprites) used in effects

NeutrinoParticles doesn't support trimming for textures. And in `assets/neutrinoparticles/textures` folder trimming is disabled automatically. So, disable it as well if you use custom sprite atlases or in any other case when textures are placed in other folders.

### Don't use identical names for effects.

Cocos Creator can't handle scripts with identical names well. So, even if effects are in different folder, please, give them different names.

### Use sprite atlases for effects.

It is done by default. Don't delete auto-atlas in `assets/neutrinoparticles/textures`, or use custom sprite atlases. It will optimize rendering. It's better to use the same sprite atlas for all effects in the scene. And group effects to be rendered in row, without interleaving by other sprites.

## Contribution

Any kind of help in developing this extension package is highly appreciated.