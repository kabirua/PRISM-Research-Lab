# PRISM Lab Website

Website for **PRISM Lab — Predictive Research in Intelligent Systems & Modeling** at West Virginia State University.

**Live website:** https://kabirua.github.io/PRISM-Research-Lab/

## Upload to GitHub

1. Open your website repository on GitHub.
2. Upload the website files, keeping the `images` folder and its subfolders.
3. Place `index.html` at the repository root, not inside an extra `prism-lab` folder.
4. Include all HTML, CSS, and JavaScript files listed below.
5. Commit your changes. Your existing GitHub Pages configuration can remain in place.

For later updates, upload or edit only the files you changed.

## Files

| File | Purpose |
|---|---|
| `index.html` | Homepage, navigation, introduction, contact information, and footer |
| `news.html` | All news, ordered newest first |
| `people.html` | PI, current students, researchers/collaborators, and alumni |
| `resources.html` | All open research resources |
| `research.html` | All Selected Research entries and publications |
| `projects.html` | All featured projects |
| `gallery.html` | Full photo gallery with captions and download links |
| `data.js` | Research areas, projects, resources, people, news, funding, and homepage limits |
| `research-data.js` | Publication and research entries |
| `gallery-data.js` | Gallery photo paths, captions, and dates |
| `styles.css` | Shared website design |
| `site.js` | Shared content display logic |
| `gallery.css` | Gallery styling |
| `gallery.js` | Gallery display, date sorting, and horizontal scrolling |
| `images/` | Research images, project images, portraits, and funding logos |
| `images/gallery/` | Gallery photos |

## Which File Should I Update?

| Content to change | File to edit |
|---|---|
| Research Areas | `data.js` |
| Featured Projects | `data.js` |
| Open Research Resources | `data.js` |
| Our People and Alumni | `data.js` |
| Selected Research / Publications | `research-data.js` |
| Latest News | `data.js` |
| Gallery photos and captions | `gallery-data.js, and upload photo inside images\galary` |
| Research Support / Funding | `data.js` |
| Homepage introduction, Contact, or Join Us text | `index.html` |
| Main layout, colors, spacing, and image sizes | `styles.css` |
| Gallery layout and image sizes | `gallery.css` |

Routine content updates do not require changing the layout files.

## Homepage Display Limits

The homepage displays:

- 3 news items
- 6 people, excluding alumni
- 3 resources
- 3 Selected Research entries
- 3 featured projects
- 6 gallery photos

Change the main collection limits in `limits` near the top of `data.js`.

To change the gallery preview limit, edit this line in `gallery.js`:

```javascript
const items = preview ? photos.slice(0, 6) : photos;
```

If a list has fewer items, it displays the available items.

The full collection pages display all entries. Alumni appear on the full People page.

News and gallery photos sort by date, newest first. Other collections follow their order in the data files, so place the entries you want featured first.

## Update Research Areas

Edit the research-area entries in `data.js`.

Copy an existing entry and update its title, description, icon, and image.

```javascript
{
  "title": "AI & Computer Vision",
  "description": "Developing AI methods for image and spectral analysis across applications.",
  "icon": "◈",
  "image": "images/ai-computer-vision.png"
}
```

Upload your image to `images/` and enter its exact path.

Research-area images display within the predefined size. The existing icon can remain as a fallback.

## Update Featured Projects

Edit the `projects` list in `data.js`.

Copy an existing project entry and update:

- Title
- Description
- Image path
- URL
- Link text

Upload project images to `images/`.

The homepage displays the first three projects. All projects appear on `projects.html`.

## Update Open Research Resources

Edit the `resources` list in `data.js`.

Copy an existing entry and replace its title, description, image, URL, and link text.

Resources can include datasets, software, tutorials, and research tools.

The homepage displays the first three resources. All resources appear on `resources.html`.

## Add a Person

Edit the `people` list in `data.js`.

Copy an existing entry and update the person's name, role, group, description, photograph, initials, and links.

Set `group` to one of:

- `Principal Investigator`
- `Current Students`
- `Researchers & Collaborators`
- `Alumni`

Upload portraits to `images/` and use the matching path:

```javascript
"image": "images/student-name.jpg"
```

### Add CV and Personal Website Links

To display multiple links, use a `links` array:

```javascript
"links": [
  {
    "url": "https://example.com/cv",
    "linkText": "CV →"
  },
  {
    "url": "https://example.com",
    "linkText": "Personal Website →"
  }
]
```

Replace the example URLs with the person's actual links.

## Move Someone to Alumni

Change the person's existing `group` to `Alumni`. Do not duplicate the entry.

Optionally add `year` and `position`:

```javascript
{
  "name": "Former Student Name",
  "role": "Former MS Student",
  "group": "Alumni",
  "description": "Research focus while in the lab.",
  "image": "images/former-student.jpg",
  "initials": "FS",
  "year": "2027",
  "position": "Current role and organization",
  "url": ""
}
```

This is an example profile. Replace it with actual information.

Alumni appear on `people.html`, outside the homepage preview.

## Update Selected Research / Publications

Add and edit papers in **`research-data.js`**.

Keep entries inside:

```javascript
window.LAB_RESEARCH = [
  // Add research entries here.
];
```

Copy an existing paper entry and replace its title, description, and links.

### Paper with Multiple Links

```javascript
{
  "title": "Your Paper Title",
  "description": "Authors. Journal or conference, year.",
  "links": [
    {
      "url": "https://example.com/paper",
      "linkText": "View paper →"
    },
    {
      "url": "https://github.com/your-organization/your-repository",
      "linkText": "GitHub code →"
    },
    {
      "url": "https://example.com/dataset",
      "linkText": "Dataset →"
    }
  ]
}
```

Include only links that are available.

The homepage displays the first three entries. All entries appear on `research.html`.

You do not need to edit `data.js` whenever you add a paper. Keep this connection in `data.js`:

```javascript
"research": window.LAB_RESEARCH,
```

### Required Script Order

Pages using research data must load these scripts in this order, near the bottom before `</body>`:

```html
<script src="research-data.js"></script>
<script src="data.js"></script>
<script src="site.js"></script>
```

## Add a News Item

In `data.js`, copy an object in `news` and replace its fields:

```javascript
{
  "date": "2026-10-01",
  "title": "Your announcement title",
  "description": "Your announcement details.",
  "url": "https://example.com",
  "linkText": "Read more →"
}
```

Keep commas between objects.

Use `"url": ""` for an announcement without a link.

Dates use **YYYY-MM-DD** format. Dated entries appear newest first, above undated entries.

News can include:

- Paper submissions or acceptances
- Grant awards
- Student achievements
- Conference presentations
- New research resources
- Lab activities

Describe the status accurately. A submitted paper should be described as submitted.

The homepage displays up to three news items. All items appear on `news.html`.

## Add Gallery Photos

### 1. Upload the Image

Upload gallery images to:

```text
images/gallery/
```

### 2. Edit `gallery-data.js`

Add a photo entry inside `window.LAB_GALLERY`:

```javascript
window.LAB_GALLERY = [
  {
    image: "images/gallery/greenhouse-summer-2026.jpg",
    caption: "Greenhouse Data Collection — Summer 2026",
    date: "2026-08-15"
  },
  {
    image: "images/gallery/lab-meeting.jpg",
    caption: "PRISM Lab Research Meeting",
    date: "2026-10-01"
  }
];
```

Separate entries with commas. A trailing comma after the last entry is also valid.

Use the photo or activity's actual date in **YYYY-MM-DD** format.

### Gallery Display

- Photos appear newest date first.
- Photos with the same date retain their order in `gallery-data.js`.
- The homepage displays up to six photos in a horizontal strip.
- Clicking a homepage photo opens the full gallery.
- `gallery.html` displays all photos with captions and dates.
- Visitors can view or download the original images.

For normal photo updates, upload the image and edit only `gallery-data.js`.

### Gallery Scripts and Styling

Pages displaying the gallery need:

```html
<link rel="stylesheet" href="gallery.css">
```

They must load the gallery scripts in this order:

```html
<script src="gallery-data.js"></script>
<script src="gallery.js"></script>
```

The homepage's complete script order is:

```html
<script src="research-data.js"></script>
<script src="data.js"></script>
<script src="site.js"></script>
<script src="gallery-data.js"></script>
<script src="gallery.js"></script>
```

## Add Images and Icons

Upload images to `images/`, or to `images/gallery/` for gallery photos.

Image paths and filenames are case-sensitive. Match capitalization and extensions exactly.

These are different filenames:

```text
photo.jpg
photo.JPG
photo.jpeg
```

Use simple filenames without spaces.

In `data.js`, replace an empty image field with the uploaded file's path:

```javascript
"image": "images/ai-vision.png"
```

Example paths:

- Research area: `images/ai-vision.png`
- Intelligent sensing: `images/intelligent-sensing.png`
- Digital agriculture: `images/digital-agriculture.png`
- Featured project: `images/drought-project.jpg`
- Person photograph: `images/kabir-hossain.jpg`
- Gallery photo: `images/gallery/lab-meeting.jpg`

These filenames are examples. Upload the corresponding files yourself.

### Image Display

- Research-area images fit within the predefined square size using `object-fit: contain`.
- Project images fill the existing landscape area using `object-fit: cover`, which may crop edges.
- People photographs are cropped into circles.
- Funding logos fit within their predefined panels.
- Gallery thumbnails fill their image areas; full-image links open the originals.

For research areas, projects, resources, and people, the existing icon or initials provide a fallback when the image is unavailable.

## Update Research Support / Funding

Edit the `funders` list in `data.js`.

Copy an existing entry and update its name, description, logo path, URL, and enabled status.

```javascript
{
  "name": "USDA–NIFA",
  "description": "Evans–Allen research support",
  "image": "images/USDA_NIFA.jpeg",
  "url": "https://www.nifa.usda.gov/",
  "enabled": true
}
```

The image path above is an example. It must match your uploaded filename exactly.

Set `"enabled": true` to display the funder or `"enabled": false` to hide it.

Add confirmed funding organizations. Pending proposals should not be listed as awarded support.

Research Support appears above the lab details and copyright in the homepage footer. Footer order is controlled in `index.html`.

## Update Contact and Homepage Text

Edit `index.html` to change:

- Homepage introduction
- Join Us text
- Email address
- Office address
- GitHub link
- Navigation links
- Footer structure

If you change information repeated on collection pages, update those HTML files too.

## Save and Check Updates

1. Upload any new images.
2. Edit the relevant data or HTML file.
3. Click **Commit changes** in GitHub.
4. Wait for the GitHub Pages deployment to finish.
5. Open the website.
6. Press **Ctrl + Shift + R** to refresh cached files.

### If an Image Does Not Appear

Check:

- The image was uploaded.
- The folder path is correct.
- Capitalization matches.
- The extension matches, including `.jpg`, `.JPG`, `.jpeg`, or `.png`.

### If a Section Stops Displaying

Check the edited JavaScript file for missing:

- Commas between entries
- Quotation marks
- Closing braces `}`
- Closing brackets `]`

Keep the required script loading order.

## Local Preview

Open `index.html` in a browser. The site uses local JavaScript files and does not require a build step.

A local server is optional. Run this command from the website folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

JavaScript must be enabled to display the editable collections. 

## Copyright

© 2026 PRISM Lab. All rights reserved.

Reuse of original website text, design, and photographs requires permission.
Third-party materials remain subject to their respective licenses.

For permission, contact kabircnu@gmail.com / kabir.hossain@wvstateu.edu
