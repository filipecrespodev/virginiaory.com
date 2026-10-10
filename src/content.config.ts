import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const leafBlocks = (image: SchemaContext['image']) => [
  // Single full-width image (`width` is a % of the content column).
  z.object({ type: z.literal('image'), src: image(), width: z.number().optional() }),
  // Justified row(s) of images, like Adobe Portfolio's "photo grid".
  z.object({ type: z.literal('grid'), images: z.array(image()), width: z.number().optional() }),
  // Rich text, as trusted HTML (<p>, <strong>, <em>, <a>, <br>).
  z.object({ type: z.literal('text'), html: z.string() }),
  // Raw embed (iframe) for videos etc.
  z.object({ type: z.literal('embed'), html: z.string() }),
] as const;

const blocks = (image: SchemaContext['image']) =>
  z.array(
    z.discriminatedUnion('type', [
      ...leafBlocks(image),
      // Side-by-side columns (Adobe Portfolio's "tree" module), `flex` is the
      // relative column width. Stacks on phones.
      z.object({
        type: z.literal('columns'),
        columns: z.array(
          z.object({ flex: z.number(), blocks: z.array(z.discriminatedUnion('type', [...leafBlocks(image)])) }),
        ),
      }),
    ]),
  );

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().optional(),
      category: z.string().optional(),
      medium: z.string().optional(),
      /** Position in the home grid (ascending). */
      order: z.number(),
      cover: image(),
      description: z.string().optional(),
      draft: z.boolean().default(false),
      blocks: blocks(image),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      blocks: blocks(image),
    }),
});

export const collections = { projects, pages };
