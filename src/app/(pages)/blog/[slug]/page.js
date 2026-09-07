import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CommentSection from "@/components/blog/CommentSection";
import SocialLinks from "@/components/blog/SocialLinks";
import { supabasePublic } from "@/lib/supabaseClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: post } = await supabasePublic
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .single();

  return {
    title: post ? `${post.title} | Legacy Leaders Blog` : "Legacy Leaders Blog",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const { data: post } = await supabasePublic
    .from("posts")
    .select(
      "id, title, content, cover_image_url, created_at, profiles(username, display_name, avatar_url, role, bio, socials)"
    )
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  const { data: comments } = await supabasePublic
    .from("comments")
    .select("id, content, created_at, profiles(display_name)")
    .eq("post_id", post.id)
    .order("created_at", { ascending: true });

  const author = post.profiles;
  const socials = author?.socials ?? {};

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-28 lg:pb-24 lg:pt-40">
        {post.cover_image_url && (
          <div className="mb-8 flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-[#f6f1e8]">
            <img src={post.cover_image_url} alt={post.title} className="h-full w-full object-contain" />
          </div>
        )}
        <h1 className="text-3xl font-bold text-[#344059]">{post.title}</h1>

        <Link
          href={`/blog/profile/${author?.username}`}
          className="mt-4 flex items-center gap-3 border border-[#e7dfce] bg-[#fffdf8] p-4 hover:shadow"
        >
          {author?.avatar_url && (
            <img src={author.avatar_url} alt={author.display_name} className="h-12 w-12 rounded-full object-cover" />
          )}
          <div>
            <p className="font-semibold text-[#344059]">{author?.display_name}</p>
            <p className="text-xs uppercase tracking-wider text-[#667085] capitalize">{author?.role}</p>
          </div>
        </Link>

        <article className="mt-8 whitespace-pre-wrap text-[#344059]">{post.content}</article>

        <SocialLinks socials={socials} />

        <CommentSection postId={post.id} initialComments={comments ?? []} />
      </main>
      <SiteFooter />
    </>
  );
}
