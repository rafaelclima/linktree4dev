import { Input } from "@material-tailwind/react";
import { Link2, Trash2 } from "lucide-react";
import { LinkCards } from "../components/link-cards";
import { useContext, useEffect, useState } from "react";
import { LinkContext } from "../context/LinkContext";
import { db } from "../../services/firebaseConnection";
import Snackbar from "../components/snackbar";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const { addCardLink, cardLinkId, incrementId } = useContext(LinkContext);
  const [nomeLink, setNomeLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [corFundoLink, setCorFundoLink] = useState("#FFFFFF");
  const [corTextoLink, setCorTextoLink] = useState("#000000");
  const [dbCardLink, setDbCardLink] = useState<LinkProps[]>([]);
  const [showSnackBar, setShowSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState<null | "error" | "success">(
    null
  );

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      setMessageSnackBar("");
      setTypeSnackBar(null);
    }, 2500);
  };

  useEffect(() => {
    const linksRef = collection(db, "linksCard");
    const queryRef = query(linksRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
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

      setDbCardLink(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleSubmitLinks() {
    const newCardLink = {
      id: cardLinkId,
      nome: nomeLink,
      url: urlLink,
      corFundo: corFundoLink,
      corTexto: corTextoLink,
    };

    addCardLink(newCardLink);
    incrementId();

    if (nomeLink === "" || urlLink === "") {
      setMessageSnackBar("Preencha todos os campos!");
      setTypeSnackBar("error");
      handleShowSnackbar();
      return;
    }

    addDoc(collection(db, "linksCard"), {
      name: nomeLink,
      url: urlLink,
      bgCard: corFundoLink,
      linkColor: corTextoLink,
      createdAt: new Date(),
    })
      .then(() => {
        setNomeLink("");
        setUrlLink("");
        setMessageSnackBar("Cadastro concluído com sucesso");
        setTypeSnackBar("success");
        handleShowSnackbar();
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });
  }

  async function handleDeleteLinkDb(id: string) {
    const docRef = doc(db, "linksCard", id);
    await deleteDoc(docRef);
  }

  return (
    <div className=" w-full px-3 sm:max-w-lg md:max-w-xl lg:max-w-2xl m-auto mt-6 flex flex-col items-center justify-center ">
      <section className=" w-full flex flex-col items-center gap-4 ">
        <Input
          type="text"
          color="white"
          label="Nome do link"
          onPointerEnterCapture=""
          onPointerLeaveCapture=""
          crossOrigin=""
          value={nomeLink}
          onChange={(ev) => setNomeLink(ev.target.value)}
        />
        <Input
          type="url"
          color="white"
          label="URL do link"
          placeholder="http://"
          onPointerEnterCapture=""
          onPointerLeaveCapture=""
          crossOrigin=""
          value={urlLink}
          onChange={(ev) => setUrlLink(ev.target.value)}
        />
        <div className=" flex items-center justify-center gap-8 ">
          <div className="flex flex-col items-center jus gap-2">
            <label
              className="font-poppins text-sm text-center"
              htmlFor="bgLink"
            >
              Fundo do link:
            </label>
            <input
              className="cursor-pointer w-10 h-9 rounded "
              type="color"
              name="bgLink"
              id="bgLink"
              value={corFundoLink}
              onChange={(ev) => setCorFundoLink(ev.target.value)}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <label
              className="font-poppins text-sm text-center"
              htmlFor="colorLink"
            >
              Cor do link:
            </label>
            <input
              className="cursor-pointer w-10 h-9 rounded "
              type="color"
              name="colorLink"
              id="colorLink"
              value={corTextoLink}
              onChange={(ev) => setCorTextoLink(ev.target.value)}
            />
          </div>
        </div>

        {nomeLink !== "" && (
          <div className=" border border-gray-200/25 w-full px-6 py-3 rounded-md flex flex-col items-center">
            <p>Veja um preview do seu card</p>
            <div
              className=" w-11/12 max-w-lg h-9 mt-2 rounded flex items-center justify-center "
              style={{ backgroundColor: corFundoLink }}
            >
              <p style={{ color: corTextoLink }}>{nomeLink}</p>
            </div>
          </div>
        )}

        <button
          className=" w-full py-1.5 flex items-center justify-center gap-1 mt-6 text-center text-base font-poppins font-semibold bg-blue-800 hover:bg-blue-600 p-1 rounded transition duration-300 ease-in-out"
          type="button"
          onClick={handleSubmitLinks}
        >
          Cadastrar <Link2 strokeWidth={1.5} />
        </button>
      </section>

      <section className=" w-full flex flex-col items-center gap-3">
        <h1 className=" text-2xl text-center font-poppins font-bold mt-12 ">
          Meus Links
        </h1>
        {dbCardLink.length > 0 &&
          dbCardLink.map((link) => (
            <LinkCards
              key={link.id}
              style={{ backgroundColor: link.bg }}
              additionalClasses={`flex items-center justify-between font-semibold`}
            >
              <p style={{ color: link.color }}>{link.name}</p>
              <Trash2
                onClick={() => handleDeleteLinkDb(link.id)}
                className="cursor-pointer"
                color={`${link.color}`}
              />
            </LinkCards>
          ))}
      </section>
      <div>
        {showSnackBar && (
          <Snackbar
            message={messageSnackBar}
            type={typeSnackBar}
            onClose={() => setShowSnackbar(false)}
          />
        )}
        {/* Restante do conteúdo do seu componente principal */}
      </div>
    </div>
  );
}
