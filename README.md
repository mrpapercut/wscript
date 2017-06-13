# WScript Emulator

[![Build Status](https://travis-ci.org/mrpapercut/wscript.svg?branch=master)](https://travis-ci.org/mrpapercut/wscript)
[![Coverage Status](https://coveralls.io/repos/github/mrpapercut/wscript/badge.svg?branch=master)](https://coveralls.io/github/mrpapercut/wscript?branch=master)

WScript Emulator is an emulator/tracer of the Windows Script Host functionality. It provides a full Javascript equivalent of WScript, so most valid scripts running against it will work as if they were running in the regular WScript environment.
Most components have been ported, though some are lacking because of scope (f.e. Microsoft.XMLDOM, ApplicationObject). But nearly all common functionality is present in the object. For a full list of supported functionality, check the `/lib` and `/lib/objects` folders.

Because WScript Emulator is pure Javascript, it will run in any [recent](#user-content-requirements) browser on any platform. And because we actually run the original script against the emulator, javascript-obfuscation of the original file is irrelevant.

## Warnings
If you were to use the WScript Emulator to analyse WScript-based malware downloaders, take all necessary precautions as you would for any other analysis. The emulator does not execute any HTTP-requests, registry changes or filesystem modifications, but you are still running a malicious file. Use only if you are confident (or confidently suspect) that the file is a WScript file, and always __at your own risk__.

## Tracer
The WScript Emulator contains a full code tracer, listing every class-construct, function call, getters & setters that occur while running a script. Even when the original script is 100% triple-obfuscated with JSFuck, it will trace all functions as if it weren't obfuscated at all.

## VFS
In order to track creating/modifying/deleting files that would normally occur on the filesystem, the emulator contains a mock filesystem. This helps to easily see what the script would do to your filesystem if it was running in the normal WScript environment.

## Limitations
It currently only supports JScript variants of WScript, not the VBScript variant. WScript originally supports both the VB and JS syntax, but emulating VB syntax in pure Javascript is out of scope for this project.

__The emulator does not download any files__ when the original script calls for it. This is done for security reasons. It does show which URL is being requested and where the file would've been saved to in the VFS (but without the file's contents).

In addition to this, the emulator page removes `XMLHTTPRequest` and `fetch` from the global `window`-object. It is easily replacable with other JS functionality though

## WScript/JScript quirks
JScript is Microsoft's flavour of the ECMAscript standard. This means that most ECMAscript rules still apply, but JScript's implementation in WScript is a bit different:
### JScript in WScript is case-insensitive.
Regular JScript, like all ECMAscript variants, is case-sensitive (there is a difference between `getValue` and `getvalue`). But VBScript is not case-sensitive. Because WScript supports both VB and JS, Microsoft opted to make JScript in WScript case-insensitive as well. For more information on how the emulator handles case-insensitive functions in Javascript, see [this blogpost](https://mrpapercut.com/blog/2016-11-30-case-insensitive-functions-in-javascript-with-proxy).

### true === -1
In WScript, false === 0, but true === ~false (-1). Because we cannot redefine `true` in javascript, this cannot be circumvented. If you find scripts relying on `true === -1`, please let me know.

## Requirements
- For use: any recent browser that supports the ES6 syntax and [Proxy](https://kangax.github.io/compat-table/es6/#test-Proxy) & [Reflect](https://kangax.github.io/compat-table/es6/#test-Reflect) objects. (Chrome >= 49.0, Firefox >= 42, Edge >= 14, Safari >= 10)
- For development: NodeJS >= 6.4
