import ClassUpdatesPage from "@/components/ClassUpdatesPage";

export const runtime = 'edge';

export const metadata = { title: "Fellows | Legacy Leaders" };

export default function FellowsPage() {
  return <ClassUpdatesPage audience="fellow" heading="Fellows" />;
}
