import { Youtube } from "lucide-react";
import { ComponentProps } from "react";

interface SocialYoutubeProps extends ComponentProps<"a"> {}

export function SocialYoutube(props: SocialYoutubeProps) {
  return (
    <a target="_blank" {...props}>
      <Youtube size={36} color="#ffffff" strokeWidth={1.25} />
    </a>
  );
}
