import BlogIndex, { blogIndexMetadata } from "@/components/routes/BlogIndex";

export const runtime = 'edge';

export const metadata = blogIndexMetadata;

export default function BlogRoot() {
  return <BlogIndex />;
}
