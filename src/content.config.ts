import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const publicationStatus = z.enum(['draft', 'published', 'template']).default('draft');

const reviews = defineCollection({
  loader: glob({ base: './src/content/reviews', pattern: '*.md' }),
  schema: z.object({
    status: publicationStatus,
    title: z.string().min(1),
    gameTitle: z.string().min(1),
    date: z.coerce.date().optional(),
    platforms: z.array(z.string()).default([]),
    rating: z.number().min(0).max(10).nullable().optional(),
    spoilerFreeSummary: z.string().min(1),
    spoilerContent: z.string().default(''),
    frames: z.array(z.object({
      image: z.string().startsWith('/'),
      alt: z.string().min(1),
      caption: z.string().min(1),
    })).max(5).default([]),
  }),
});

const playLogs = defineCollection({
  loader: glob({ base: './src/content/play-log', pattern: '*.md' }),
  schema: z.object({
    status: publicationStatus,
    title: z.string().min(1),
    gameTitle: z.string().min(1),
    date: z.coerce.date().optional(),
    session: z.string().optional(),
    mood: z.string().optional(),
  }),
});

export const collections = { reviews, playLogs };
