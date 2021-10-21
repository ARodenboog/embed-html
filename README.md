## Embed HTML

Last update: 2021-10-21

At the time of writing this, iframes in [Obsidian](https://obsidian.md/) can only display local .html files when supplying the full path to the file.
This is a problem when using a vault on multiple machines with a different file structure. Here you would need to change the path, even if the file is properly synced.

This plugin allows the creation of a code block called embedhtml, in which you specify the relative path of your .html file (relative to the vault), along with
height and width of the iframe.
The plugin will get the local path during rendering.

Example:

```
path: folder/file.html
width: 1200
height: 800
```

## Roadmap

The use of a code block for this purpose seems not the most fitting, as it is 
