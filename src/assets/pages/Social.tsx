import { Input } from "@material-tailwind/react";
import { Link2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { LinkContext } from "../context/LinkContext";
import Snackbar from "../components/snackbar";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export function Social() {
  const { facebookUrl, instagramUrl, youtubeUrl } = useContext(LinkContext);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState<null | "error" | "success">(
    null
  );
  const [linkFacebook, setLinkFacebook] = useState("");
  const [linkInstagram, setLinkInstagram] = useState("");
  const [linkYoutube, setLinkYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "socialLink", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setLinkFacebook(snapshot?.data()?.linkFacebook);
          setLinkInstagram(snapshot?.data()?.linkInstagram);
          setLinkYoutube(snapshot?.data()?.linkYoutube);
        }
      });
    }
    loadLinks();
  }, []);

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      setMessageSnackBar("");
      setTypeSnackBar(null);
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
      setMessageSnackBar("Preencha pelo menos um dos links");
      setTypeSnackBar("error");
      handleShowSnackbar();
      return;
    }

    setDoc(doc(db, "socialLink", "link"), {
      linkFacebook,
      linkInstagram,
      linkYoutube,
    })
      .then(() => {
        setLinkFacebook("");
        setLinkInstagram("");
        setLinkYoutube("");
        setMessageSnackBar("Cadastro realizado com sucesso");
        setTypeSnackBar("success");
        handleShowSnackbar();
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });
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
              message={messageSnackBar}
              type={typeSnackBar}
              onClose={() => setShowSnackbar(false)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
