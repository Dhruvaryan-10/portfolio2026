# Spline Keycap Material Analysis & Replacement Plan

Deep binary inspection of `public/assets/skills-keyboard.spline` (359,681 bytes, MessagePack format).

---

## Key Finding: All logos are embedded 128×128 PNG raster image textures

Every keycap in the Spline scene follows an **identical internal structure**. There are no vector shapes, no SVG paths, and no mesh-based logos. The visible brand icon on each keycap is a **flat PNG image texture** baked into the object's material layer stack inside the binary.

---

## Per-Keycap Material Hierarchy

### `ts` — Currently TypeScript → Replace with **Python**

```
Object: "ts"                          @ offset 49,368
├── Parent: "keycap-mobile"           @ offset 49,312
├── Type: "Empty"                     @ offset 49,371
├── State Machine:
│   ├── "State"                       @ offset 49,430
│   ├── "Start"                       @ offset 49,523
│   ├── "KeyDown" → event handler     @ offset 49,583
│   ├── "Transition" → "Toggle"       @ offset 49,645
│   └── "KeyUp"                       @ offset 49,944
├── Material:
│   ├── Shared material ID: "44353ec7-126c-4121-87ba-248514abb62e"
│   ├── Text layer: "TextGeometry" with font "Inter_700"
│   └── Image layer:
│       ├── Texture: "html5 (1)-modified.png"  ⚠️ (misnamed in binary, but displayed as TS logo)
│       ├── PNG offset: 59,737
│       ├── PNG size: 3,761 bytes
│       └── Dimensions: 128 × 128 px
└── Logo Type: ✅ EMBEDDED RASTER IMAGE TEXTURE (PNG)
```

> [!NOTE]
> The `ts` keycap uses a hash-named PNG in the file header area. The texture filename shown post-IEND is actually the *next* keycap's texture bleeding into the search window. The actual TypeScript logo is stored as one of the two hash-named PNGs at offsets 6,363 and 20,421 (both ~13KB, larger than most keycap textures). The `ts` keycap's material references one of these.

---

### `vue` — Currently Vue.js → Replace with **Unity**

```
Object: "vue"                         @ offset 96,691
├── Parent group: keycap cluster
├── Type: "Empty"                     @ offset 96,695
├── Text layer: "TextGeometry" ("JS", font "Inter_700")
├── State Machine:
│   ├── "State"                       @ offset 96,754
│   ├── "Start"                       @ offset 96,847
│   ├── "KeyDown" → event handler     @ offset 96,907
│   │   └── event UUID: a4262fd5-60fa-4cc1-ad1f-3fc350d97faa (shared)
│   ├── "Transition" → "Toggle"       @ offset 96,969
│   └── "KeyUp"                       @ offset 97,268
├── Material:
│   ├── Shared material ID: "44353ec7-126c-4121-87ba-248514abb62e"
│   └── Image layer:
│       ├── Texture: "vuedotjs-modified.png"
│       ├── PNG offset: 99,440
│       ├── PNG size: 3,475 bytes
│       └── Dimensions: 128 × 128 px
└── Logo Type: ✅ EMBEDDED RASTER IMAGE TEXTURE (PNG)
```

---

### `npm` — Currently NPM → Replace with **Artificial Intelligence**

```
Object: "npm"                         @ offset 224,226
├── Type: "Empty"                     @ offset 224,230
├── Text layer: "TextGeometry" ("JS", font "Inter_700")
├── State Machine:
│   ├── "State"                       @ offset 224,289
│   ├── "Start"                       @ offset 224,355
│   ├── "KeyDown" → event handler     @ offset 224,415
│   ├── "Transition" → "Toggle"       @ offset 224,477
│   └── "KeyUp"                       (follows after)
├── Material:
│   ├── Shared material ID: "392865a3-ff03-4629-829a-9eebd2203fab"
│   └── Image layer:
│       ├── Texture: "npm-modified.png"
│       ├── PNG offset: 226,897
│       ├── PNG size: 2,981 bytes
│       └── Dimensions: 128 × 128 px
└── Logo Type: ✅ EMBEDDED RASTER IMAGE TEXTURE (PNG)
```

---

### `prettier` — Currently Prettier → Replace with **Machine Learning**

```
Object: "prettier"                    @ offset 212,207
├── Type: "Empty"
├── Text layer: "TextGeometry" ("JS", font "Inter_700")
├── State Machine:
│   ├── "State" → "Start" → "KeyDown" → "Transition" → "Toggle" → "KeyUp"
│   └── KeyDown event UUID: a4262fd5-60fa-4cc1-ad1f-3fc350d97faa (shared)
├── Material:
│   └── Image layer:
│       ├── Texture: "prettier-modified.png"
│       ├── PNG offset: 214,895
│       ├── PNG size: 3,352 bytes
│       └── Dimensions: 128 × 128 px
└── Logo Type: ✅ EMBEDDED RASTER IMAGE TEXTURE (PNG)
```

---

### `firebase` — Currently Firebase → Replace with **SQL**

```
Object: "firebase"                    @ offset 235,898
├── Type: "Empty"                     @ offset 235,907
├── Text layer: "TextGeometry" ("JS", font "Inter_700")
│   └── Text material ID: "094d6707-3d3d-4a08-8874-8d2be0c08153"
├── State Machine:
│   ├── "State"                       @ offset 235,966
│   ├── "Start"                       @ offset 236,032
│   ├── "KeyDown" → event handler     @ offset 236,092
│   ├── "Transition" → "Toggle"       @ offset 236,154
│   └── "KeyUp"                       @ offset 236,453
├── Material:
│   ├── Layer 1: "color" (base color layer)
│   ├── Layer 2: "Text" (label overlay)
│   └── Image layer:
│       ├── Texture: "firebase-modified.png"
│       ├── PNG offset: 238,630
│       ├── PNG size: 4,797 bytes
│       └── Dimensions: 128 × 128 px
└── Logo Type: ✅ EMBEDDED RASTER IMAGE TEXTURE (PNG)
```

---

### `aws` — Currently AWS → Replace with **Power BI**

```
Object: "aws"                         @ offset 302,919
├── Type: "Empty"                     @ offset 302,923
├── Text layer: "TextGeometry" ("JS", font "Inter_700")
│   └── Text material ID: "ea13167c-1bae-4b35-97b6-bc22a5e9d0c4"
├── State Machine:
│   ├── "State"                       @ offset 302,982
│   ├── "Start"                       @ offset 303,048
│   ├── "KeyDown" → event handler     @ offset 303,108
│   ├── "Transition" → "Toggle"       @ offset 303,170
│   └── "KeyUp"                       @ offset 303,469
├── Material:
│   └── Image layer:
│       ├── Texture: "amazonwebservices-modified.png"
│       ├── PNG offset: 305,601
│       ├── PNG size: 4,662 bytes
│       └── Dimensions: 128 × 128 px
└── Logo Type: ✅ EMBEDDED RASTER IMAGE TEXTURE (PNG)
```

---

### `nginx` — Currently Nginx → Replace with **Arduino**

```
Object: "nginx"                       @ offset 290,599
├── Type: "Empty"                     @ offset 290,605
├── Text layer: "TextGeometry" ("JS", font "Inter_700")
│   └── Text material ID: "f7205ef2-12bd-4766-878e-5ff0f424a9ec"
├── State Machine:
│   ├── "State"                       @ offset 290,664
│   ├── "Start"                       @ offset 290,728
│   ├── "KeyDown" → event handler     @ offset 290,788
│   ├── "Transition" → "Toggle"       @ offset 290,850
│   └── "KeyUp"                       @ offset 291,149
├── Material:
│   └── Image layer:
│       ├── Texture: "nginx-modified.png"
│       ├── PNG offset: 293,276
│       ├── PNG size: 3,684 bytes
│       └── Dimensions: 128 × 128 px
└── Logo Type: ✅ EMBEDDED RASTER IMAGE TEXTURE (PNG)
```

---

## Replacement Summary Table

| Object Name | Current Texture | Target Logo | PNG Size | Dimensions | PNG Offset |
|:---|:---|:---|---:|:---:|---:|
| `ts` | TypeScript (hash-named) | **Python** | 3,761 B | 128×128 | 59,737 |
| `vue` | `vuedotjs-modified.png` | **Unity** | 3,475 B | 128×128 | 99,440 |
| `npm` | `npm-modified.png` | **AI** | 2,981 B | 128×128 | 226,897 |
| `prettier` | `prettier-modified.png` | **ML** | 3,352 B | 128×128 | 214,895 |
| `firebase` | `firebase-modified.png` | **SQL** | 4,797 B | 128×128 | 238,630 |
| `aws` | `amazonwebservices-modified.png` | **Power BI** | 4,662 B | 128×128 | 305,601 |
| `nginx` | `nginx-modified.png` | **Arduino** | 3,684 B | 128×128 | 293,276 |

---

## Safe Replacement Plan

> [!IMPORTANT]
> This plan modifies **ONLY the visual texture** on each keycap. No object names, event handlers, state machines, animations, or interaction bindings are affected.

### What you touch
- The **Image layer** inside each keycap's material stack (a single PNG swap)

### What you do NOT touch
- Object names (`vue`, `aws`, `nginx`, etc.) — these drive all event routing
- State machine definitions (`State`, `Start`, `KeyDown`, `Transition`, `Toggle`, `KeyUp`)
- The shared KeyDown event UUID (`a4262fd5-60fa-4cc1-ad1f-3fc350d97faa`)
- GSAP animation targets (`findObjectByName()` references)
- The `SKILLS` mapping in `constants.ts`
- Any parent/child hierarchy in the scene

### Step-by-step procedure in Spline Editor

#### Preparation
1. Prepare 7 replacement PNG icons at **128×128 px** with **transparent backgrounds**
2. Use high-contrast logos on dark/transparent canvas to match existing keycap style

#### For each keycap (repeat 7 times):

```
1. Open skills-keyboard.spline in Spline editor (app.spline.design or desktop)
2. In the left panel (Layers), expand the "keyboard" group
3. Click the target keycap object by its exact name (e.g., "vue")
4. In the right panel, scroll to the MATERIAL section
5. Locate the IMAGE layer — it will show the current logo thumbnail
6. Click the image thumbnail to open the texture picker
7. Click "Replace" or "Upload" → select your new 128×128 PNG
8. The image maps automatically to the keycap face
9. If needed, adjust:
   - Scale: ~1.0 (fill the keycap)
   - Offset X/Y: 0, 0 (centered)
   - Fit: "Cover" or "Contain"
```

#### Finalize

```
10. Review all 7 keycaps in the 3D viewport
11. File → Export → Download as .spline
12. Overwrite: public/assets/skills-keyboard.spline
13. Dev server hot-reloads — verify hover/click interactions work
```

### Safety Guarantees

| System Layer | Affected? | Why |
|:---|:---:|:---|
| `e.target.name` (hover events) | ❌ No | Object names untouched |
| `e.target.name` (keyDown events) | ❌ No | Object names untouched |
| `SKILLS[e.target.name]` lookup | ❌ No | `constants.ts` mapping unchanged |
| `splineApp.setVariable("heading")` | ❌ No | Variables are scene-level, not keycap-level |
| `splineApp.findObjectByName()` | ❌ No | Object names untouched |
| GSAP keycap bounce animations | ❌ No | Animations target objects by name |
| Bongo cat animation | ❌ No | Different object group entirely |
| Keyboard scroll/rotate transforms | ❌ No | Targets the parent "keyboard" group |
| **Keycap visual appearance** | ✅ **Yes** | **Only this changes** |
