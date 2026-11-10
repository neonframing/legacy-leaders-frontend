import ClassUpdatesPage from "@/components/ClassUpdatesPage";

export const runtime = 'edge';

export const metadata = { title: "Mentors | Legacy Leaders" };

export default function MentorsPage() {
  return <ClassUpdatesPage audience="mentor" heading="Mentors" />;
}
