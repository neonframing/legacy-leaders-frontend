import { notFound } from "next/navigation";
import { PrivateBlogIndex, PrivateBlogNew, PrivateBlogPost } from "@/components/blog/PrivateBlogPages";
import { AUDIENCES } from "@/lib/audiences";

// slug is everything after /fellows or /mentors; only /blog, /blog/new and /blog/<post> exist.

export async function generateMetadata({ params }) {
  const { audience: key, slug } = await params;
  const cfg = AUDIENCES[key];
  if (!cfg) return {};
  if (slug.length === 1) return { title: `${cfg.heading} Blog | Legacy Leaders` };
  if (slug[1] === "new") return { title: `New Post | ${cfg.heading} Blog` };
  return {};
}

export default async function AudienceBlogRoute({ params }) {
  const { audience: key, slug } = await params;
  const cfg = AUDIENCES[key];
  if (!cfg || slug[0] !== "blog" || slug.length > 2) notFound();

  if (slug.length === 1) return <PrivateBlogIndex audience={cfg.audience} />;
  if (slug[1] === "new") return <PrivateBlogNew audience={cfg.audience} />;
  return <PrivateBlogPost audience={cfg.audience} slug={slug[1]} />;
}
