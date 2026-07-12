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
// width/height are the true display dimensions (all 2:3 portrait), so the
// browser reserves the right space before each image loads.
const manifest: PhotoEntry[] = [
  {
    file: 'IMG_4579.jpg',
    caption: 'Crossing — Marunouchi, Tokyo',
    alt: 'A lone figure with an umbrella crosses a rain-slicked street at night; headlights and a green signal smear across the wet asphalt.',
    width: 5152,
    height: 7728,
  },
  {
    file: 'IMG_4601.jpg',
    caption: 'Night Bloom — Marunouchi, Tokyo',
    alt: "A florist's window glowing after dark, banked with hydrangeas and cut flowers in pink, green, and white.",
    width: 5152,
    height: 7728,
  },
  {
    file: 'IMG_4605.jpg',
    caption: 'Harbour Light — Tsim Sha Tsui, Hong Kong',
    alt: 'Victoria Harbour at night: the Hong Kong Island skyline glows across dark water, a single street lamp lit in the foreground.',
    width: 5152,
    height: 7728,
  },
  {
    file: 'IMG_3706.jpg',
    caption: 'Doubled — São Lourenço, Macau',
    alt: 'A person under an umbrella waits at a Macau bus stop as a bus passes, the whole scene mirrored in a still rain puddle below.',
    width: 5152,
    height: 7728,
  },
  {
    file: 'IMG_4589.jpg',
    caption: 'Swallowtail — Datong, Taipei',
    alt: 'The upswept eave of a temple roof against a pale sky, crowned with a ceramic dragon and cochin figures.',
    width: 3648,
    height: 5472,
  },
  {
    file: 'IMG_4606.jpg',
    caption: 'Vigil — Largo de São Domingos, Macau',
    alt: 'A visitor stands in silhouette before a softly lit glass shrine of the Virgin Mary, set in a carved wooden case banked with roses.',
    width: 5152,
    height: 7728,
  },
  {
    file: 'IMG_4607.jpg',
    caption: 'Headlight — Xinyi, Taipei',
    alt: "A taxi's headlights rake a narrow Taipei street from above; parked scooters line one side and an illuminated classical facade closes the far end.",
    width: 5152,
    height: 7728,
  },
  {
    file: 'IMG_4582.jpg',
    caption: 'Under the Tracks — Yurakucho, Tokyo',
    alt: 'A rain-slick alley beneath Tokyo\'s railway arches, diners gathered under the warm glow of izakaya lanterns and a steakhouse sign.',
    width: 2268,
    height: 3402,
  },
  {
    file: 'IMG_4602.jpg',
    caption: 'Colonnade — Zhongzheng, Taipei',
    alt: 'A long stone colonnade of fluted columns recedes into grey rain light; two figures with umbrellas stand far down the inlaid terrazzo walkway.',
    width: 5152,
    height: 7728,
  },
  {
    file: 'IMG_4603.jpg',
    caption: 'Cornice — West Kowloon, Hong Kong',
    alt: 'Looking up at the scalloped white cornice of a modern building against a clear blue sky, meeting a ribbed tan facade.',
    width: 5152,
    height: 7728,
  },
  {
    file: 'IMG_4560.jpg',
    caption: 'Kept — Yurakucho, Tokyo',
    alt: 'A single bicycle rests against a pale wall in a dark, rain-quiet Tokyo backstreet, beside a shuttered metal door and a one-way sign.',
    width: 2801,
    height: 4202,
  },
  {
    file: 'IMG_4604.jpg',
    caption: 'Waiting — Zhongzheng, Taipei',
    alt: 'Framed through a tall Gothic-arched stone aperture, a figure with a pale umbrella waits across a rain-wet Taipei street backed by green foliage.',
    width: 4648,
    height: 6972,
  },
  {
    file: 'IMG_3149.jpg',
    caption: 'The Butcher — Datong, Taipei',
    alt: 'Under a bare warm bulb, a butcher works a traditional market stall hung with cuts of pork, a customer waiting at the counter.',
    width: 1600,
    height: 2400,
  },
  {
    file: 'DSCF1507.jpg',
    caption: 'Single File — Ginza, Tokyo',
    alt: 'Three orange traffic cones stand in single file down a narrow Tokyo alley as a figure in a patterned jacket walks away, past an Ippudo sign and a red banner.',
    width: 1600,
    height: 2400,
  },
  {
    file: 'IMG_4592.jpg',
    caption: 'Convex — São Lourenço, Macau',
    alt: 'A convex traffic mirror bends a Macau street into a curved reflection — crosswalk and tiled road — against a wall of balconied apartments, a bus reading 28B Barra below.',
    width: 1600,
    height: 2400,
  },
  {
    file: 'IMG_4563.jpg',
    caption: 'Fledgling — Ginza, Tokyo',
    alt: 'A small sparrow fledgling sits on grey asphalt, feathers fluffed, looking up at the camera.',
    width: 1600,
    height: 2400,
  },
  {
    file: 'IMG_4587.jpg',
    caption: 'Back Lane — São Lourenço, Macau',
    alt: 'A delivery scooter with a green crate leans against a weathered wall in a narrow, dim Macau back lane, wet ground receding into the dark between old buildings.',
    width: 1600,
    height: 2400,
  },
  {
    file: 'IMG_3662.jpg',
    caption: 'Siu Mei — São Lourenço, Macau',
    alt: 'A Cantonese roast-meat shop window at night — glossy roast ducks, soy chickens, and char siu hanging behind glass under warm bulbs.',
    width: 1600,
    height: 2400,
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
