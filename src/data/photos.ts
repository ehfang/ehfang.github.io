// Photos are resolved from src/assets/photos by filename. Vite bundles
// every image in that folder; the manifest below picks which ones appear,
// in what order, with what caption. A manifest entry whose file isn't in
// the folder yet is simply skipped, and until ANY real photo is present the
// gallery falls back to the placeholder SVGs — so it never renders blank,
// and each real photo replaces a placeholder the moment you drop it in.
const modules = import.meta.glob<string>(
  '../assets/photos/*.{jpg,jpeg,png,webp,avif,svg}',
  { eager: true, import: 'default' },
)

// keyed by lowercased filename so IMG_4579.JPG and img_4579.jpg both match
const byName: Record<string, string> = {}
for (const path in modules) {
  const name = path.split('/').pop()!
  byName[name.toLowerCase()] = modules[path]
}
const resolve = (file: string) => byName[file.toLowerCase()]

export interface Photo {
  src: string
  alt: string
  /** shown beneath the frame */
  caption: string
  width: number
  height: number
}

interface PhotoEntry {
  /** exact filename inside src/assets/photos */
  file: string
  caption: string
  alt: string
  width: number
  height: number
}

// To reorder the gallery, move entries around; to add more, append a line.
// width/height only set the aspect ratio the browser reserves before load
// (2:3 portrait off the X100VI); the real image fits regardless. The alt on
// the last five echoes the title — refine once the frames are in view.
const manifest: PhotoEntry[] = [
  {
    file: 'IMG_4579.jpg',
    caption: 'Crossing — Marunouchi, Tokyo',
    alt: 'A lone figure with an umbrella crosses a rain-slicked street at night; headlights and a green signal smear across the wet asphalt.',
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_4601.jpg',
    caption: 'Night Bloom — Marunouchi, Tokyo',
    alt: "A florist's window glowing after dark, banked with hydrangeas and cut flowers in pink, green, and white.",
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_4605.jpg',
    caption: 'Harbour Light — Tsim Sha Tsui, Hong Kong',
    alt: 'Victoria Harbour at night: the Hong Kong Island skyline glows across dark water, a single street lamp lit in the foreground.',
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_3706.jpg',
    caption: 'Doubled — São Lourenço, Macau',
    alt: 'A person under an umbrella waits at a Macau bus stop as a bus passes, the whole scene mirrored in a still rain puddle below.',
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_4589.jpg',
    caption: 'Swallowtail — Datong, Taipei',
    alt: 'The upswept eave of a temple roof against a pale sky, crowned with a ceramic dragon and cochin figures.',
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_4606.jpg',
    caption: 'Vigil — Largo de São Domingos, Macau',
    alt: 'Vigil — Largo de São Domingos, Macau.',
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_4607.jpg',
    caption: 'Headlight — Xinyi, Taipei',
    alt: 'Headlight — Xinyi, Taipei.',
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_4582.jpg',
    caption: 'Under the Tracks — Yurakucho, Tokyo',
    alt: 'Under the Tracks — Yurakucho, Tokyo.',
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_4602.jpg',
    caption: 'Colonnade — Zhongzheng, Taipei',
    alt: 'Colonnade — Zhongzheng, Taipei.',
    width: 800,
    height: 1200,
  },
  {
    file: 'IMG_4603.jpg',
    caption: 'Cornice — West Kowloon, Hong Kong',
    alt: 'Cornice — West Kowloon, Hong Kong.',
    width: 800,
    height: 1200,
  },
]

const realPhotos: Photo[] = manifest
  .filter((entry) => resolve(entry.file))
  .map((entry) => ({
    src: resolve(entry.file)!,
    alt: entry.alt,
    caption: entry.caption,
    width: entry.width,
    height: entry.height,
  }))

// Fallback shown only while no real photo is present. Once your images are
// in src/assets/photos you can delete this and the ph-*.svg files.
const placeholders: Photo[] = Object.keys(byName)
  .filter((name) => name.startsWith('ph-') && name.endsWith('.svg'))
  .sort()
  .map((name, i) => ({
    src: byName[name],
    alt: `Placeholder ${i + 1}`,
    caption: `Untitled № ${String(i + 1).padStart(2, '0')}`,
    width: 800,
    height: 1200,
  }))

export const photos: Photo[] = realPhotos.length ? realPhotos : placeholders
