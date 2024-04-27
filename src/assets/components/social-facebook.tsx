import { Facebook } from "lucide-react";
import { ComponentProps } from "react";

interface SocialFacebookProps extends ComponentProps<"a"> {}

export function SocialFacebook(props: SocialFacebookProps) {
  return (
    <a target="_blank" {...props}>
      <Facebook size={36} color="#ffffff" strokeWidth={1.25} />
    </a>
  );
}
