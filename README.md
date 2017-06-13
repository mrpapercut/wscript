# WScript Emulator

[![Build Status](https://travis-ci.org/mrpapercut/wscript.svg?branch=master)](https://travis-ci.org/mrpapercut/wscript)
[![Coverage Status](https://coveralls.io/repos/github/mrpapercut/wscript/badge.svg?branch=master)](https://coveralls.io/github/mrpapercut/wscript?branch=master)

WScript Emulator is an emulator/tracer of the Windows Script Host functionality. It provides a full Javascript equivalent of WScript, so most valid scripts running against it will work as if they were running in the regular WScript environment.
Most components have been ported, though some are lacking because of scope (f.e. Microsoft.XMLDOM, ApplicationObject). But nearly all common functionality is present in the object. For a full list of supported functionality, see the [supported objects](#user-content-supported-objects) section.

Because WScript Emulator is pure Javascript, it will run in any [recent](#user-content-requirements) browser on any platform. And because we actually run the original script against the emulator, javascript-obfuscation of the original file is irrelevant. The emulator does not modify the provided script in any way, it runs as-is.

## Warnings
If you were to use the WScript Emulator to analyse WScript-based malware downloaders, take all necessary precautions as you would for any other analysis. The emulator does not execute any HTTP-requests, registry changes or filesystem modifications, but you are still running a malicious file. Use only if you are confident (or confidently suspect) that the file is a WScript file, and always __at your own risk__.

## Tracer
The WScript Emulator contains a full code tracer, listing every class-construct, function call, getters & setters that occur while running a script. Even when the original script is 100% triple-obfuscated with JSFuck, it will trace all functions as if it weren't obfuscated at all.

## VFS
In order to track creating/modifying/deleting files that would normally occur on the filesystem, the emulator contains a mock filesystem. This helps to easily see what the script would do to your filesystem if it was running in the normal WScript environment.

## Supported objects
- [WScript](https://msdn.microsoft.com/en-us/library/at5ydy31(v=vs.84).aspx)
  - [WshArguments](https://msdn.microsoft.com/en-us/library/ss1ysb2a(v=vs.84).aspx)
    - [WshNamed](https://msdn.microsoft.com/en-us/library/d6y04sbb(v=vs.84).aspx)
    - [WshUnnamed](https://msdn.microsoft.com/en-us/library/ah2hawwc(v=vs.84).aspx)
  - [WshController](https://msdn.microsoft.com/en-us/library/xk7bxb0d(v=vs.84).aspx)
    - [WshRemote](https://msdn.microsoft.com/en-us/library/x9t3ze5y(v=vs.84).aspx)
      - [WshRemoteError](https://msdn.microsoft.com/en-us/library/d02b3e15(v=vs.84).aspx)
  - [WshNetwork](https://msdn.microsoft.com/en-us/library/s6wt333f(v=vs.84).aspx)
  - [WshShell](https://msdn.microsoft.com/en-us/library/aew9yb99(v=vs.84).aspx)
    - [WshEnvironment](https://msdn.microsoft.com/en-us/library/6s7w15a0(v=vs.84).aspx)
    - [WshScriptExec](https://msdn.microsoft.com/en-us/library/2f38xsxe(v=vs.84).aspx)
    - [WshShortcut](https://msdn.microsoft.com/en-us/library/xk6kst2k(v=vs.84).aspx)
    - [WshSpecialFolders](https://msdn.microsoft.com/en-us/library/9x9e7edx(v=vs.84).aspx)

Additional objects:
- [ActiveXObject](https://msdn.microsoft.com/en-us/library/6958xykx(v=vs.100).aspx)
- [ADODB.Stream](https://msdn.microsoft.com/en-us/library/ms677486(v=vs.85).aspx)
- [MSXML.XMLHTTP](https://msdn.microsoft.com/en-us/library/ms760305(v=vs.85).aspx)
- [Scripting.Dictionary](https://msdn.microsoft.com/en-us/library/x4k5wbx4(v=vs.84).aspx)
- [Scripting.FileSystemObject](https://msdn.microsoft.com/en-us/library/hww8txat(v=vs.84).aspx)
  - [Drives (collection)](https://msdn.microsoft.com/en-us/library/x0s9y250(v=vs.84).aspx)
  - [Files (collection)](https://msdn.microsoft.com/en-us/library/wz72a8c0(v=vs.84).aspx)
  - [Folders (collection)](https://msdn.microsoft.com/en-us/library/9kcx47hd(v=vs.84).aspx)
  - [Drive (object)](https://msdn.microsoft.com/en-us/library/ts2t8ybh(v=vs.84).aspx)
  - [File (object)](https://msdn.microsoft.com/en-us/library/1ft05taf(v=vs.84).aspx)
  - [Folder (object)](https://msdn.microsoft.com/en-us/library/1c87day3(v=vs.84).aspx)

Helpers:
- [Enumerator](https://msdn.microsoft.com/en-us/library/x32bxwys(v=vs.100).aspx)
- [TextStream](https://msdn.microsoft.com/en-us/library/312a5kbt(v=vs.84).aspx)

Not supported:
- ApplicationObject (Couldn't find documentation)
- [Microsoft.XMLDOM](https://msdn.microsoft.com/en-us/library/ms677486(v=vs.85).aspx)

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
