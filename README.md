# Neru: simple website

A one-page site in plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it

Open `index.html` in any browser. Or serve it locally:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and content |
| `styles.css` | Design tokens plus all styling |
| `script.js` | Theme toggle, counter demo, form validation |

## Customising

- Colours, corner radius and page width live in the `:root` block at the top of `styles.css`. Light is the base theme; dark overrides sit under `[data-theme="dark"]`.
- Text content is all in `index.html`.
- The contact form currently logs the submission and shows a confirmation. Replace the marked line in `script.js` with a `fetch()` call to your own endpoint.
