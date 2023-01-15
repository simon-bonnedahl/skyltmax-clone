import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import Footer from "../../components/Footer";
import HeaderBar from "../../components/HeaderBar";
import Navbar from "../../components/Navbar";
import { setError } from "../../reducers/alertSlice";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    let credentials = {
      email: email,
      password: password,
    };
    e.preventDefault();
    signIn("credentials", credentials);
  };
  useEffect(() => {
    if (router.query.error) {
      dispatch(setError("Felaktig inloggning"));
    }
  });
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col bg-base-100 w-screen">
        <HeaderBar />
        <Navbar />
        <div className="flex mx-10 justify-center space-x-10 mt-10 h-screen ">
          {/*Form*/}
          {/*Information*/}
          <div
            id="information"
            className="border border-primary w-5/12  h-min rounded-xl"
          >
            <div className="p-8">
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl">Logga in</h2>

                <div className="flex flex-col">
                  <label>E-post</label>
                  <input
                    id="email"
                    className="input input-bordered input-primary w-full max-w"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label>Lösenord</label>
                  <input
                    id="password"
                    className="input input-bordered input-primary w-full max-w"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full flex justify-end">
                  <span className="link">Glömt lösenord?</span>
                </div>
                <div className="flex justify-between w-full">
                  <button
                    onClick={handleLogin}
                    className="btn btn-info w-5/12 flex space-x-2"
                  >
                    <FontAwesomeIcon
                      className="scale-110"
                      icon={faRightToBracket}
                    />
                    <span>Logga in</span>
                  </button>
                  <button
                    className="btn btn-outline w-5/12"
                    onClick={() => router.push("/register")}
                  >
                    Registrera dig
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Login;
