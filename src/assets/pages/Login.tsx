import { FormEvent, useState } from "react";
import { auth } from "../../services/firebaseConnection.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha todos os campos corretamente");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Success login");
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log("Erro ao fazer o login:");
        console.log(error);
      });
  }

  return (
    <div className=" h-screen w-full flex flex-col items-center justify-center ">
      <h1 className=" text-[62px] text-center font-bold ">
        Link
        <span className=" text-[72px] font-bold font-poppins italic text-yellow-500 ">
          Tree
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[70%] sm:w-[55%] md:w-[40%] lg:w-[25%]"
      >
        <div className="relative mb-3">
          <input
            type="email"
            className="peer m-0 block h-[58px] w-full rounded border border-solid border-gray-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-gray-300 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-gray-300 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
          >
            Email
          </label>
        </div>
        <div className="relative mb-3">
          <input
            type="password"
            className="peer m-0 block h-[58px] w-full rounded border border-solid border-gray-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-gray-300 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-gray-300 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
          >
            Password
          </label>
        </div>
        <button
          className="w-full m-auto bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
