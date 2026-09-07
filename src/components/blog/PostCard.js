import Link from "next/link";

export default function PostCard({ post }) {
  const author = post.profiles;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-[#e7dfce] bg-[#fffdf8] p-6 transition-shadow hover:shadow-lg"
    >
      {post.cover_image_url && (
        <div className="mb-4 flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#f6f1e8]">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="h-full w-full object-contain"
          />
        </div>
      )}
      <h2 className="text-xl font-bold text-[#344059]">{post.title}</h2>
      {post.excerpt && <p className="mt-2 text-sm text-[#667085]">{post.excerpt}</p>}
      <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-wider text-[#667085]">
        {author?.avatar_url && (
          <img src={author.avatar_url} alt={author.display_name} className="h-6 w-6 rounded-full object-cover" />
        )}
        <span>{author?.display_name ?? "Unknown"}</span>
        <span>&middot;</span>
        <span className="capitalize">{author?.role}</span>
        <span>&middot;</span>
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>
    </Link>
  );
}
