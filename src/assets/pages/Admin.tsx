import { Input } from "@material-tailwind/react";
import { Link2, Trash2 } from "lucide-react";
import { LinkCards } from "../components/link-cards";
import { useContext, useState } from "react";
import { LinkContext } from "../context/LinkContext";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

export function Admin() {
  const { cardsLink, addCardLink, cardLinkId, incrementId } =
    useContext(LinkContext);
  const [nomeLink, setNomeLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [corFundoLink, setCorFundoLink] = useState("#FFFFFF");
  const [corTextoLink, setCorTextoLink] = useState("#000000");

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

    if (nomeLink === "") {
      alert("Preencha todos os campos para cadastrar um card");
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
        alert("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });
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
          onPointerEnterCapture=""
          onPointerLeaveCapture=""
          crossOrigin=""
          defaultValue="http://"
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
        {cardsLink.length > 0 &&
          cardsLink.map((link) => (
            <LinkCards
              key={link.id}
              style={{ backgroundColor: link.corFundo }}
              additionalClasses={`flex items-center justify-between font-semibold`}
            >
              <p style={{ color: link.corTexto }}>{link.nome}</p>
              <Trash2 className="cursor-pointer" color={`${link.corTexto}`} />
            </LinkCards>
          ))}
      </section>
    </div>
  );
}
