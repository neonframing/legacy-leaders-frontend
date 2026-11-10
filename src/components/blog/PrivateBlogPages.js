import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostCard from "@/components/blog/PostCard";
import PostForm from "@/components/blog/PostForm";
import CommentSection from "@/components/blog/CommentSection";
import DeletePostButton from "@/components/blog/DeletePostButton";
import { getClassAccess, blogBasePath } from "@/lib/classAccess";

const plural = (audience) => `${audience === "fellow" ? "Fellows" : "Mentors"}`;

function Shell({ children, width = "max-w-5xl" }) {
  return (
    <div className="min-h-screen bg-white font-sans text-[#344059] flex flex-col">
      <SiteHeader />
      <main className={`mx-auto w-full ${width} flex-1 px-6 pb-16 pt-28 lg:pb-24 lg:pt-36`}>{children}</main>
      <SiteFooter />
    </div>
  );
}

function NotAllowed({ audience }) {
  return (
    <Shell>
      <p className="text-[#667085]">
        This page is only available to {audience}s. You can change your role in your{" "}
        <a href="/blog/profile/edit" className="underline">profile</a>.
      </p>
    </Shell>
  );
}

export async function PrivateBlogIndex({ audience }) {
  const { supabase, allowed } = await getClassAccess(audience);
  if (!allowed) return <NotAllowed audience={audience} />;

  const base = blogBasePath(audience);
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, created_at, profiles(display_name, avatar_url, role)")
    .eq("audience", audience)
    .order("created_at", { ascending: false });

  return (
    <Shell>
      <Link href={`/${audience}s`} className="text-xs font-semibold uppercase tracking-wider text-[#667085] hover:underline">
        &larr; Back to {plural(audience)}
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">{plural(audience)} Blog</h1>
          <p className="mt-2 text-[#667085]">A private space for {audience}s to share posts and talk it through.</p>
        </div>
        <Link
          href={`${base}/new`}
          className="border border-[#D89B2B] bg-[#D89B2B] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#D89B2B]"
        >
          New Post
        </Link>
      </div>

      {error && <p className="mt-10 text-red-600">Unable to load posts. Please try again later.</p>}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} basePath={base} />
        ))}
        {posts?.length === 0 && <p className="text-[#667085]">No posts yet. Be the first to share something!</p>}
      </div>
    </Shell>
  );
}

export async function PrivateBlogNew({ audience }) {
  const { allowed } = await getClassAccess(audience);
  if (!allowed) return <NotAllowed audience={audience} />;

  return (
    <Shell>
      <h1 className="text-3xl font-bold">Write a New Post</h1>
      <p className="mt-2 text-[#667085]">Only other {audience}s will see this post.</p>
      <div className="mt-10">
        <PostForm audience={audience} basePath={blogBasePath(audience)} />
      </div>
    </Shell>
  );
}

export async function PrivateBlogPost({ audience, params }) {
  const { slug } = await params;
  const { supabase, isAdmin, allowed } = await getClassAccess(audience);
  if (!allowed) return <NotAllowed audience={audience} />;

  const base = blogBasePath(audience);
  const { data: post } = await supabase
    .from("posts")
    .select("id, title, content, cover_image_url, created_at, profiles(username, display_name, avatar_url, role)")
    .eq("slug", slug)
    .eq("audience", audience)
    .maybeSingle();
  if (!post) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("id, content, created_at, profiles(display_name)")
    .eq("post_id", post.id)
    .order("created_at", { ascending: true });

  const author = post.profiles;

  return (
    <Shell width="max-w-3xl">
      <Link href={base} className="text-xs font-semibold uppercase tracking-wider text-[#667085] hover:underline">
        &larr; Back to {plural(audience)} Blog
      </Link>
      {post.cover_image_url && (
        <div className="my-8 flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-[#f6f1e8]">
          <img src={post.cover_image_url} alt={post.title} className="h-full w-full object-contain" />
        </div>
      )}
      <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
      {isAdmin && (
        <div className="mt-4">
          <DeletePostButton postId={post.id} redirectTo={base} />
        </div>
      )}
      <div className="mt-4 flex items-center gap-3 border border-[#e7dfce] bg-[#fffdf8] p-4">
        {author?.avatar_url && (
          <img src={author.avatar_url} alt={author.display_name} className="h-12 w-12 rounded-full object-cover" />
        )}
        <div>
          <p className="font-semibold">{author?.display_name}</p>
          <p className="text-xs uppercase tracking-wider text-[#667085]">
            {author?.role} &middot; {new Date(post.created_at).toLocaleDateString("en-US", { timeZone: "UTC" })}
          </p>
        </div>
      </div>
      <article className="mt-8 whitespace-pre-wrap">{post.content}</article>
      <CommentSection postId={post.id} initialComments={comments ?? []} isAdmin={isAdmin} />
    </Shell>
  );
}
