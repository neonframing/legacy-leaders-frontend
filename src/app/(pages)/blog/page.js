import BlogIndex, { blogIndexMetadata } from "@/components/routes/BlogIndex";


export const metadata = blogIndexMetadata;

export default function BlogRoot() {
  return <BlogIndex />;
}
