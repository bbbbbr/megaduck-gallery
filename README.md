# MegaDuck Homebrew and ROM Hack Showcase

https://bbbbbr.github.io/megaduck-gallery

A lightweight Javascript / JSON gallery for showcasing MegaDuck Homebrew and ROM Hacks.


# Adding Entries
To submit a game or program, either :
- **Recommended:** Open an [Issue](https://github.com/gbdk-2020/gbdk-2020-gallery/issues)
- Or edit the JSON data and open a Pull Request

### Required information for Pull Reuests which modify the JSON data directly:
- authorName: Quoted, Name(s) of Author(s)
- itemTitle: Quoted, Game Title
- shortDescription: Quoted, A short 4-10 word description. Try to avoid saying: "for the MegaDuck"/etc.
- imagePreviewURL: Quoted, A 320 x 288 PNG format screenshot. Relative path and image should be in a suitable "pix/" sub-folder. 
- linksArray: JSON array of link entries, with each entry having one of the following: 
  - type: Quoted, Examples: "primary", "store", "source", "info"
  - url: Quoted, Example: "https://url_to_main_website"
  - displayText: Quoted, Examples: "Info" (for primary), "Cart" (for store), "Source" (for source), "Info v2" (for secondary links)
- softwareTags: Quoted, Comma-space separated list of tags: Rom hack, Homebrew, OEM
- categoryTags: Quoted, Comma-space separated list of tags: Camera, Demoscene, Engine, Game, Music, Simulation, Techdemo, Tool
- gametypeTags: Quoted, Comma-space separated list of tags: Action, Adventure, Art, Card Game, Demoscene, Engine, Fighting, GameBoy Camera, GameBoy Printer, Idle, Microgames, Music, Platformer, Programming, Puzzle, Racing, Rhythm, Role Playing, Shooter, Simulation, Sports, Strategy, Survival, Testing, Tool, VirtualPet, Visual Novel
- platformTags: Quoted, Comma-space separated list of tags: Handheld, Laptop
- featuredPriority: 0
- isOpenSource: true/false,
- licenseType: Quoted, License type, examples are: "MIT", "GPL", "Unlicense", "" (blank) etc. 
- isFreeDownload: true/false,
- hasPhysicalRelease: true/false,
- supportsLinkPlay: true/false,
- yearFirstReleased: Quoted, Example: "2021"
- "dateAdded": Quoted, Example: "2024-08-01"


