import { useEffect, useState } from "react";
import { LinkCards } from "../components/link-cards";
import { SocialFacebook } from "../components/social-facebook";
import { SocialInstagram } from "../components/social-instagram";
import { SocialYoutube } from "../components/social-youtube";
//import { LinkContext } from "../context/LinkContext";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  getDoc,
  collection,
  query,
  orderBy,
  doc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinkProps {
  linkFacebook: string;
  linkInstagram: string;
  linkYoutube: string;
}

export function Home() {
  //const { cardsLink, faceUrl, instaUrl, ytbUrl } = useContext(LinkContext);
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "linksCard");
      const queryRef = query(linksRef, orderBy("createdAt", "asc"));

      getDocs(queryRef).then((snapshot) => {
        const lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bgCard,
            color: doc.data().linkColor,
          });
        });

        setLinks(lista);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "socialLink", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            linkFacebook: snapshot.data()?.linkFacebook,
            linkInstagram: snapshot.data()?.linkInstagram,
            linkYoutube: snapshot.data()?.linkYoutube,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  return (
    <div className=" w-full px-3 sm:max-w-lg md:max-w-xl lg:max-w-2xl m-auto flex flex-col items-center ">
      <h1 className=" md:text-4xl text-3xl font-bold text-white mt-20 ">
        Rafael Lima Dev
      </h1>
      <p className=" text-base font-normal mt-4 ">Acesse meus links 👇🏼</p>

      <main className=" mt-4 w-full ">
        <section className=" m-auto flex flex-col items-center gap-3 text-center ">
          {links.length > 0 &&
            links.map((card) => (
              <LinkCards
                key={card.id}
                style={{ backgroundColor: card.bg }}
                additionalClasses={`font-semibold`}
              >
                <a
                  href={card.url}
                  target="blank"
                  style={{ color: card.color, cursor: "pointer" }}
                >
                  {card.name}
                </a>
              </LinkCards>
            ))}
        </section>

        <section className=" w-full mt-4 flex items-center justify-center gap-4 ">
          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <>
              <SocialFacebook href={socialLinks?.linkFacebook} target="blank" />
              <SocialInstagram
                href={socialLinks?.linkInstagram}
                target="blank"
              />
              <SocialYoutube href={socialLinks?.linkYoutube} target="blank" />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
