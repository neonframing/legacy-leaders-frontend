import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-06-11', // Use today's date for the latest API version
  useCdn: false, // Set to false if statically generating pages or using Next.js cache
})

// Initialize the image builder
const builder = createImageUrlBuilder(client)

// Helper function to process image URLs
export const urlFor = (source) => {
  return builder.image(source)
}