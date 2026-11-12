import { notFound } from "next/navigation";
import ClassUpdatesPage from "@/components/ClassUpdatesPage";
import { AUDIENCES } from "@/lib/audiences";


export async function generateMetadata({ params }) {
  const { audience: key } = await params;
  const cfg = AUDIENCES[key];
  return cfg ? { title: `${cfg.heading} | Legacy Leaders` } : {};
}

export default async function AudienceRoot({ params }) {
  const { audience: key } = await params;
  const cfg = AUDIENCES[key];
  if (!cfg) notFound();
  return <ClassUpdatesPage audience={cfg.audience} heading={cfg.heading} />;
}
