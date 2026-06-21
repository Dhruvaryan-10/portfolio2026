# Spline Keyboard Material Guide
## Export Screenshots + Replace 6 Keycap Logos

---

## Part 1 — Complete Material-to-Key Asset Map

From the binary analysis of `skills-keyboard.spline`, these are the **exact PNG texture filenames** baked into each keycap object:

| Keycap Object Name | Baked PNG Texture Filename | Current Logo | New Target |
|:---|:---|:---|:---|
| `js` | `8770407083b4a259b1f1911bf574423BpejnnZ4OGcZLJLv-1.png` | JavaScript | JavaScript ✅ |
| `ts` | `8770407083b4a259b1f1911bf574423BpejnnZ4OGcZLJLv-0.png` | TypeScript | Python 🔄 |
| `html` | `html5 (1)-modified.png` | HTML5 | HTML ✅ |
| `css` | `css3-modified.png` | CSS3 | CSS ✅ |
| `react` | `react (1)-modified.png` | React | React ✅ |
| **`vue`** | **`vuedotjs-modified.png`** | Vue.js | **Unity 🔄** |
| `nextjs` | `nextdotjs-modified.png` | Next.js | Next.js ✅ |
| `tailwind` | `tailwindcss-modified.png` | Tailwind CSS | Tailwind ✅ |
| `nodejs` | `nodedotjs-modified.png` | Node.js | Node.js ✅ |
| `express` | `express-modified.png` | Express.js | Express ✅ |
| `postgres` | `postgresql-modified.png` | PostgreSQL | PostgreSQL ✅ |
| `mongodb` | `mongodb-modified.png` | MongoDB | Flask 🔄 |
| `git` | `git (1)-modified.png` | Git | Git ✅ |
| `github` | `github-modified.png` | GitHub | GitHub ✅ |
| **`prettier`** | **`prettier-modified.png`** | Prettier | **Machine Learning 🔄** |
| **`npm`** | **`npm-modified.png`** | NPM | **Artificial Intelligence 🔄** |
| **`firebase`** | **`firebase-modified.png`** | Firebase | **SQL 🔄** |
| `wordpress` | `wordpress-modified.png` | WordPress | Pandas 🔄 |
| `linux` | `linux-modified.png` | Linux | NumPy 🔄 |
| `docker` | `docker (1)-modified.png` | Docker | Docker ✅ |
| **`nginx`** | **`nginx-modified.png`** | Nginx | **Arduino 🔄** |
| **`aws`** | **`amazonwebservices-modified.png`** | AWS | **Power BI 🔄** |
| `vim` | `vim-modified.png` | Vim | SQLite 🔄 |
| `vercel` | `vercel-modified.png` | Vercel | Data Analytics 🔄 |

**Legend:** ✅ Keep as-is | 🔄 Logo replacement needed

**Priority changes (6 keycaps):**
- `vue` → Unity
- `aws` → Power BI
- `nginx` → Arduino
- `npm` → AI
- `prettier` → Machine Learning
- `firebase` → SQL

---

## Part 2 — Generated Replacement Icons

The following keycap icons have been generated. They are styled with dark backgrounds (#1a1a2e) and brand-accurate colors, matching the visual weight of the existing keyboard icons.

### Python (for `ts` keycap)
![Python keycap icon](file:///C:/Users/Asus/.gemini/antigravity-ide/brain/424f46b2-1d70-4036-9c41-876fd19ef4a2/python_keycap_1781987578600.png)
- Brand colors: `#3776AB` (blue) + `#FFD43B` (yellow)
- Used when the `ts` Spline object is hovered

### Artificial Intelligence (for `npm` keycap)
![AI keycap icon](file:///C:/Users/Asus/.gemini/antigravity-ide/brain/424f46b2-1d70-4036-9c41-876fd19ef4a2/ai_keycap_1781987594849.png)
- Brand colors: `#4285F4` (blue) → `#A855F7` (purple) gradient
- Used when the `npm` Spline object is hovered

### Machine Learning (for `prettier` keycap)
![ML keycap icon](file:///C:/Users/Asus/.gemini/antigravity-ide/brain/424f46b2-1d70-4036-9c41-876fd19ef4a2/ml_keycap_1781987606748.png)
- Brand colors: `#FF6F00` (orange, TensorFlow)
- Used when the `prettier` Spline object is hovered

### Power BI (for `aws` keycap)
![Power BI keycap icon](file:///C:/Users/Asus/.gemini/antigravity-ide/brain/424f46b2-1d70-4036-9c41-876fd19ef4a2/powerbi_keycap_1781987621813.png)
- Brand colors: `#F2C811` (yellow/gold)
- Used when the `aws` Spline object is hovered

### Unity (for `vue` keycap)
![Unity keycap icon](file:///C:/Users/Asus/.gemini/antigravity-ide/brain/424f46b2-1d70-4036-9c41-876fd19ef4a2/unity_keycap_1781987639320.png)
- Brand colors: `#FFFFFF` (white), gray glow
- Used when the `vue` Spline object is hovered

### Arduino (for `nginx` keycap)
![Arduino keycap icon](file:///C:/Users/Asus/.gemini/antigravity-ide/brain/424f46b2-1d70-4036-9c41-876fd19ef4a2/arduino_keycap_1781987651699.png)
- Brand colors: `#00979D` (teal/cyan)
- Used when the `nginx` Spline object is hovered

---

## Part 3 — How to Export Current Material Screenshots from Spline

Use these steps to capture what each keycap looks like today before making replacements.

### Step 1: Open the Scene
1. Go to [spline.design](https://spline.design) and sign in.
2. Click **Open File** → select `public/assets/skills-keyboard.spline`.
3. Wait for the scene to fully load in the 3D viewport.

### Step 2: Navigate the Object Hierarchy
1. In the **left panel**, locate the **Layers / Objects** panel.
2. Look for a top-level group named `keyboard` (or `scene`).
3. Expand it — you will see all 24 keycap sub-groups listed by their object name (e.g., `vue`, `aws`, `nginx`, `npm`, `prettier`, `firebase`).

### Step 3: Select a Keycap & Inspect Its Material
1. Click on a keycap group (e.g., click `vue`) in the hierarchy.
2. In the **right panel**, scroll to the **Material** section.
3. You will see a layer stack. One of the layers will be of type **Image** — this is the texture holding the logo PNG.
4. Click on the image thumbnail. A popup will show:
   - The embedded PNG filename (matching the table in Part 1 above)
   - Scale, Offset, Tiling settings

### Step 4: Export / Screenshot the Texture
**Option A — Export the embedded image directly:**
1. In the image popup, right-click on the thumbnail → **Save Image As** (browser-based).
2. This extracts the embedded PNG exactly as it is stored inside the `.spline` file.

**Option B — Screenshot the viewport:**
1. Select the target keycap object.
2. Use the **Frame** button (or press `F`) to zoom the camera to that object.
3. In the toolbar, choose **Export** → **Image** → **Current View** → PNG.
4. This captures a perspective screenshot with materials rendered.

### Step 5: Repeat for All 6 Priority Keys
Export screenshots for: `vue`, `aws`, `nginx`, `npm`, `prettier`, `firebase`.

---

## Part 4 — How to Upload the New Icons

### Prepare the PNG files
From the generated icons above, save each one at **512×512 px** with a **transparent or dark background** as PNG.

Suggested filenames:
```
unity-keycap.png
powerbi-keycap.png
arduino-keycap.png
ai-keycap.png
ml-keycap.png
sql-keycap.png
```

### Upload into the Spline Material
For each of the 6 keycaps:

1. Select the keycap object (e.g., `vue`).
2. Right panel → **Material** → find the **Image** layer.
3. Click the image thumbnail → **Replace Image** → upload your new PNG.
4. Set **Fit** to `Contain` or `Fill` and enable **Alpha blend** if the logo has transparency.
5. Adjust **Scale** to center and size the logo appropriately (typically `0.5–0.7` scale works well).

### Save & Re-Export the .spline File
1. Once all 6 replacements are done, press **Ctrl+S** (or Cmd+S) to save in Spline.
2. Then: **File** → **Export** → **Spline file (.spline)** → **Download**.
3. Overwrite `public/assets/skills-keyboard.spline` in your project.
4. The dev server will hot-reload and you will immediately see the new logos on the 3D keyboard.

> [!TIP]
> After replacing the PNG textures in Spline, **no code changes are needed** — the keycap object names (`vue`, `aws`, `nginx`, etc.) remain the same, so the React event handlers in `animated-background.tsx` will continue to work as expected.

> [!NOTE]
> The `ts` (TypeScript) keycap is assigned to Python in `constants.ts`. Because its original PNG texture is a random hash filename (not a recognizable TypeScript logo), its visual appearance on the keycap is already non-standard. You may want to replace it with the generated Python icon for full visual accuracy.
