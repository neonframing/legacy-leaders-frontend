import { notFound } from "next/navigation";
import ClassUpdatesPage from "@/components/ClassUpdatesPage";
import { PrivateBlogIndex, PrivateBlogNew, PrivateBlogPost } from "@/components/blog/PrivateBlogPages";

// One catch-all route serves /fellows and /mentors (and their blogs) as a single edge function.
export const runtime = 'edge';

const AUDIENCES = {
  fellows: { audience: "fellow", heading: "Fellows" },
  mentors: { audience: "mentor", heading: "Mentors" },
};

export async function generateMetadata({ params }) {
  const { audience: key, slug = [] } = await params;
  const cfg = AUDIENCES[key];
  if (!cfg) return {};
  if (slug.length === 0) return { title: `${cfg.heading} | Legacy Leaders` };
  if (slug.length === 1) return { title: `${cfg.heading} Blog | Legacy Leaders` };
  if (slug[1] === "new") return { title: `New Post | ${cfg.heading} Blog` };
  return {};
}

export default async function AudienceRoute({ params }) {
  const { audience: key, slug = [] } = await params;
  const cfg = AUDIENCES[key];
  if (!cfg) notFound();

  if (slug.length === 0) return <ClassUpdatesPage audience={cfg.audience} heading={cfg.heading} />;
  if (slug[0] !== "blog" || slug.length > 2) notFound();
  if (slug.length === 1) return <PrivateBlogIndex audience={cfg.audience} />;
  if (slug[1] === "new") return <PrivateBlogNew audience={cfg.audience} />;
  return <PrivateBlogPost audience={cfg.audience} slug={slug[1]} />;
}
