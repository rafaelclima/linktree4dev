import { Input } from "@material-tailwind/react";
import { Link2 } from "lucide-react";
import { useContext, useState } from "react";
import { LinkContext } from "../context/LinkContext";
import Snackbar from "../components/snackbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export function Social() {
  const { facebookUrl, instagramUrl, youtubeUrl } = useContext(LinkContext);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [linkFacebook, setLinkFacebook] = useState("");
  const [linkInstagram, setLinkInstagram] = useState("");
  const [linkYoutube, setLinkYoutube] = useState("");

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 2500);
  };

  const handleSaveLinkOnContext = () => {
    if (facebookUrl) {
      try {
        facebookUrl(linkFacebook);
      } catch (error) {
        console.log(error);
      }
    }

    if (instagramUrl) {
      try {
        instagramUrl(linkInstagram);
      } catch (error) {
        console.log(error);
      }
    }

    if (youtubeUrl) {
      try {
        youtubeUrl(linkYoutube);
      } catch (error) {
        console.log(error);
      }
    }

    if (linkFacebook === "" && linkInstagram === "" && linkYoutube === "") {
      alert("Preencha pelo menos um dos links de redes sociais");
      return;
    }

    addDoc(collection(db, "socialLink"), {
      linkFacebook,
      linkInstagram,
      linkYoutube,
    })
      .then(() => {
        setLinkFacebook("");
        setLinkInstagram("");
        setLinkYoutube("");

        alert("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });

    handleShowSnackbar();
  };

  return (
    <div className=" w-full px-3 sm:max-w-lg md:max-w-xl lg:max-w-2xl m-auto mt-6 flex flex-col items-center justify-center ">
      <section className=" w-full flex flex-col items-center gap-4 ">
        <div className=" w-full flex flex-col gap-1 ">
          <label htmlFor="face">Link do facebook</label>
          <Input
            id="face"
            type="url"
            color="white"
            label="Digite a url"
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            crossOrigin=""
            value={linkFacebook}
            onChange={(ev) => setLinkFacebook(ev.target.value)}
          />
        </div>

        <div className=" w-full flex flex-col gap-1 ">
          <label htmlFor="insta">Link do instagram</label>
          <Input
            id="insta"
            type="url"
            color="white"
            label="Digite a url"
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            crossOrigin=""
            value={linkInstagram}
            onChange={(ev) => setLinkInstagram(ev.target.value)}
          />
        </div>

        <div className=" w-full flex flex-col gap-1 ">
          <label htmlFor="ytb">Link do Youtube</label>
          <Input
            id="ytb"
            type="url"
            color="white"
            label="Digite a url"
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            crossOrigin=""
            value={linkYoutube}
            onChange={(ev) => setLinkYoutube(ev.target.value)}
          />
        </div>

        <div className=" w-full ">
          <button
            className=" w-full py-1.5 flex items-center justify-center gap-1 text-center text-base font-poppins font-semibold bg-blue-800 hover:bg-blue-600 p-1 rounded transition duration-300 ease-in-out"
            type="button"
            onClick={handleSaveLinkOnContext}
          >
            Salvar links <Link2 strokeWidth={1.5} />
          </button>
          {showSnackbar && (
            <Snackbar
              message="Links cadastrados com sucesso!"
              type="success"
              onClose={() => setShowSnackbar(false)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
