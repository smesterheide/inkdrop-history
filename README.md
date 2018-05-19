# inkdrop-history

A plugin for [Inkdrop](https://www.inkdrop.info/) that gives you access to your note history.

## Install

The plugin is not published due to its developmental stage. If you still want to try it out, you can install direcly from GitHub:

```sh
ipm install notapianokey/inkdrop-history

ipm uninstall history
```

## Usage

1. Select a note for which you want to access the history
2. Select `Plugins` > `History` from the menu

## Limitations

* The note must not be deleted
* Previous versions (revisions) might not be available on synced devices
  * In this case the entry for that specific revision is disabled in the dropdown and you will see the revision id instead of the date
  * You might still be able to retrieve old revisions from your [database in the cloud](https://doc.inkdrop.info/manual/accessing-data-in-the-cloud#accessing-your-database)
* The plugin connects directly to the local PouchDB database instead of using the official Flux Store API
  * It operates in read-only mode and should be safe to use
* You have to manually copy an old version to the editor if you want to revert back to it
* Tags and status of your notes are not tracked, just the note body
* It comes with very basic design

Feel free to fork or use the code otherwise!

