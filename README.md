# PRISM Lab website — complete updated code

## Upload to GitHub

1. Extract this ZIP on your computer.
2. Open your website repository on GitHub.
3. Upload all files INSIDE `prism-lab`, keeping the `images` folder. Place `index.html` at the repository root, not inside an extra `prism-lab` folder.
4. Replace the old `index.html`. Include `styles.css`, `data.js`, `site.js`, and all five collection HTML pages.
5. Commit your changes. Your existing GitHub Pages configuration can remain in place.

## Files

- `index.html`: original homepage design, with limited previews.
- `news.html`: all news, ordered newest first.
- `people.html`: PI, current students, researchers/collaborators, and Alumni.
- `resources.html`: all open resources.
- `research.html`: all Selected Research entries (publications).
- `projects.html`: all featured projects.
- `data.js`: edit content once for the homepage AND collection pages.
- `styles.css`: shared design.
- `site.js`: shared display logic.

Homepage defaults: 3 news, 6 current people, 3 resources, 3 research entries, and 3 featured projects. Change the numbers in `limits` at the top of `data.js`. If a list has fewer items, it displays the available items. All “View all” links remain visible. Alumni appear on the full People page, not in the homepage preview. Existing undated news are kept; add real dates in YYYY-MM-DD format so future items sort correctly.

## Add a news item

In `data.js`, copy an object in `news` and replace its fields:

```javascript
{
  "date": "2026-10-01",
  "title": "Your announcement title",
  "description": "Your announcement details.",
  "url": "https://example.com",
  "linkText": "Read more →"
},
```

Keep commas between objects. Use `url: ""` for an announcement without a link. Dates are optional, but dated entries appear above undated ones.

## Add images and icons

Upload your own images into `images/`. Names are case-sensitive; use simple lowercase filenames without spaces.

In `data.js`, replace `"image": ""` with the file path, for example:

```javascript
"image": "images/ai-vision.png"
```

- Artificial Intelligence: `images/ai.png`
- Computer Vision: `images/computer-vision.png`
- Intelligent Sensing: `images/intelligent-sensing.png`
- Digital Agriculture: `images/digital-agriculture.png`
- Featured project: `images/drought-project.jpg`
- Person photograph: `images/kabir-hossain.jpg`

These filenames are examples: upload the corresponding files yourself. Research icons use square PNG/SVG images with `object-fit: contain`. Projects use landscape images and `object-fit: cover`, which may crop the edges. People use square portraits cropped into circles. If no image is specified or an image fails to load, the existing icon/initials remain visible.

## Add a person or move someone to Alumni

Copy an entry in `people`. Set `group` to one of:

- `Principal Investigator`
- `Current Students`
- `Researchers & Collaborators`
- `Alumni`

To move a student to Alumni, change their existing entry's `group` to `Alumni`. Optionally set `year` and `position`. Do not duplicate the entry.

```javascript
{
  "name": "Former Student Name",
  "role": "Former MS Student",
  "group": "Alumni",
  "description": "Research focus while in the lab.",
  "image": "",
  "initials": "FS",
  "year": "2027",
  "position": "Current role and organization",
  "url": ""
}
```

The example is not an actual lab member and is not included in the website. The Alumni section is ready, with no invented profiles. Existing member names and roles were preserved from your uploaded code; Kiruthika's initials were corrected to K.

## Add resources, research, or projects

Copy an entry in the corresponding `resources`, `research`, or `projects` list. Replace the title, description, image, URL, and link text. The full page includes every entry; the homepage uses the first few entries, so place the ones you want featured first. News is the exception: it sorts by date.

## Funding footer

USDA–NIFA is enabled with its official color identifier downloaded from:
https://www.nifa.usda.gov/nifa-19-001-official-nifa-identifier
Logo ZIP: https://www.nifa.usda.gov/sites/default/files/resource/NIFA-Identifier-Logo-Suite.zip

The unmodified SVG is included in `images/usda-nifa.svg`. It displays on a white panel inside the dark footer.

NSF is configured but `enabled` is `false`, because funding was not confirmed. To include NSF as a funder, upload its official logo as `images/nsf.png` and change its entry to `"enabled": true`. Add other confirmed funders by copying the USDA entry. Avoid listing pending proposals as awarded support.

## Preview

Open `index.html` in a browser. This site uses local JavaScript files and works without a build step. A local server is optional: `python -m http.server 8000` from this folder. JavaScript must be enabled to display the editable collections.
