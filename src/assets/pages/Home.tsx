import { useContext } from "react";
import { LinkCards } from "../components/link-cards";
import { SocialFacebook } from "../components/social-facebook";
import { SocialInstagram } from "../components/social-instagram";
import { SocialYoutube } from "../components/social-youtube";
import { LinkContext } from "../context/LinkContext";

export function Home() {
  const { cardsLink, faceUrl, instaUrl, ytbUrl } = useContext(LinkContext);

  return (
    <div className=" w-full px-3 sm:max-w-lg md:max-w-xl lg:max-w-2xl m-auto flex flex-col items-center ">
      <h1 className=" md:text-4xl text-3xl font-bold text-white mt-20 ">
        Rafael Lima Dev
      </h1>
      <p className=" text-base font-normal mt-4 ">Acesse meus links 👇🏼</p>

      <main className=" mt-4 w-full ">
        <section className=" m-auto flex flex-col items-center gap-3 text-center ">
          {cardsLink &&
            cardsLink.map((card) => (
              <LinkCards
                key={card.id}
                style={{ backgroundColor: card.corFundo }}
                additionalClasses={`font-semibold`}
              >
                <a
                  href={card.url}
                  target="blank"
                  style={{ color: card.corTexto, cursor: "pointer" }}
                >
                  {card.nome}
                </a>
              </LinkCards>
            ))}
        </section>

        <section className=" w-full mt-4 flex items-center justify-center gap-4 ">
          {faceUrl && <SocialFacebook href={faceUrl} target="blank" />}
          {instaUrl && <SocialInstagram href={instaUrl} target="blank" />}
          {ytbUrl && <SocialYoutube href={ytbUrl} target="blank" />}
        </section>
      </main>
    </div>
  );
}
