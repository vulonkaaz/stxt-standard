# The SuperText file format

SuperText or STXT is an experimental hypertext file format meant to be an extremely lightweight alternative to HTML, the project have some similarities in philosophy with the [Gemini](https://geminiprotocol.net/) protocol

An STXT file is a plain text UTF-8 file displayed with a monospace font with the extension .stxt and the MIME type text/stxt

## Links

any URI with a :// and any filename that start with / or ./ or ../ should be considered hyperlinks, in the reference implementation the regex (JS style) to detect hyperlinks is `/(?:\w+:\/\/|(?<!\w)\.{0,2}\/\w)[^\s)\]}"']+/g`

## The Extensions

lines that start with `++` at the beginning of the file are header lines or extension lines, their goal is to set metadata for a STXT file and activate optional features

it isn't necessary for an STXT file to have any ++ extension, any plain text file is considered valid STXT, however it is ill-advised to start your file with `++` if it is not to add extensions, if for some reason you wanna start with a bunch of + (ascii art or whatever) the trick is to insert a new line before writing

it isn't necessart for any implementation of the format to support any extension, the only mandatory feature is link handling

any implementation should still shows the `++` lines to the user unless he specifically ask to hide them

Any extension should be optional and disablable for the user, a website maker should keep in mind that any visitor might choose to not view the extensions they use and their pages should still be viewable as plain text

`++title=Title`

This extension set the title of the page, it is equivalent to the `<title>` tag in HTML

`++bg=black`

This extension set the colour of the background, it is equivalent to `background-color` in CSS

The colour format is either a CSS colour name like black or pink or a hexadecimal value like #FFFFFF

`++fg=#FFFFFF`

This extension set the text, the foreground colour, it is equivalent to `color` in CSS

It uses the same format as bg for the colour

`++bgm=music.mid`

This extension sets the background music of a page, it takes a filename or a URI of a MIDI file or an audio file

`++md`

This extension adds some basic markdown to the page, such as `#` for titles, `*italic*, **bold**, __underline__, ***italic and bold***, ~~strikethru~~ and [links](http://whatever)`

`++nolinks`

This disables the default link detection behavior, if you only want explicit linking through the md extension per example

`++embed`

This extensions adds embedded images or videos on the page, with the syntax `![image.avif] and !v[video.webm]`

As every extension is optional site makers should keep in mind that not all visitors will see the images

## The implementation

an example of an implementation is available at the userscript.js file of this repository and was tested on librewolf and the Tampermonkey extension. It should work on Chromium and other userscripting extensions but I haven't tried it, this implementation support the title, bg and fg extensions

To host an STXT site you need to add the custom MIME type text/stxt to your HTTP server
