import { Instagram } from "lucide-react";
import { ComponentProps } from "react";

interface SocialInstagramProps extends ComponentProps<"a"> {}

export function SocialInstagram(props: SocialInstagramProps) {
  return (
    <a target="_blank" {...props}>
      <Instagram size={36} color="#ffffff" strokeWidth={1.25} />
    </a>
  );
}
