import { Globe, Instagram, Linkedin, Twitter } from "lucide-react";

const SOCIAL_CONFIG = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "x", label: "X", Icon: Twitter },
  { key: "website", label: "Website", Icon: Globe },
];

export default function SocialLinks({ socials }) {
  const links = SOCIAL_CONFIG.filter(({ key }) => socials?.[key]);
  if (links.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {links.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={socials[key]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#344059]/20 bg-white px-4 py-2 text-sm font-medium text-[#344059] transition-all hover:border-[#D89B2B] hover:bg-[#D89B2B] hover:text-white"
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
      ))}
    </div>
  );
}
