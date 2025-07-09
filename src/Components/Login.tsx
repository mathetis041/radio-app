import Modal from "./modal";
import line from "../Images/line.svg";
import style from "../CSSModules/Login.module.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../Auth/Auth";
import { AuthContext } from "../Contexts/authContext";

const useValid = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [message] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const authContext = useContext(AuthContext);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)


        if (!authContext) {
            setError("Auth context is not available.");
            return;
        }


        if (e.currentTarget.checkValidity()) {
            setLoading(true);
            doSignInWithEmailAndPassword(email, password)
                .then((r: any) => {
                    if (r.user.emailVerified) {
                        // console.log("User successfully logged in", r);
                        setError("");
                        authContext.login(r.user.stsTokenManager.accessToken, r.user.stsTokenManager.refreshToken);
                        setLoading(false);
                        // Assuming `navigate` is defined and properly imported
                        navigate('/');
                    } else {
                        setLoading(false);
                        setIsOpen(true);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    // console.log("Error logging user in:", err.code);
                    switch (err.code) {
                        case "auth/user-not-found":
                            setError("User not found. Please check your email.");
                            break;
                        case "auth/wrong-password":
                            setError("Incorrect password. Try again.");
                            break;
                        case "auth/invalid-credential":
                            setError("Invalid email or password.");
                            break;
                        default:
                            setError("Something went wrong. Try again later.");
                    }
                });

        }
        setLoading(false);

    };

    return {
        email,
        password,
        setEmail,
        setPassword,
        error,
        message,
        handleSubmit,
        loading,
        isOpen,
        setIsOpen
    };
};




export default function Login() {
    const {
        email,
        password,
        setEmail,
        setPassword,
        error,
        message,
        handleSubmit,
        loading,
        setIsOpen,
        isOpen
    } = useValid();


    return (
        <div className={style.container}>
            <Modal isOpen={isOpen} children='This User is not verified, check your email for verification link' onClose={() => setIsOpen(false)} />
            <div className={style.left}>
                <div className={style.mainText}>
                    Hey, <br /> Welcome back <br /> to
                    <span className={style.mainSpanText}> MattVinc Radio!</span>
                </div>
                <img className={style.image} src={line} alt="" />
            </div>

            <div className={style.right}>
                <div className={style["form-container"]}>
                    <p className={style.login}>Login</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={style["form-content"]}>
                            <label htmlFor="Username">Email</label>
                            <input
                                className={style.input}
                                type="text"
                                id="Username"
                                name="Username"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {error && <p className={style["error-message"]}>{error}</p>}
                            <label htmlFor="Password">Password</label>
                            <input
                                className={style.input}
                                type="password"
                                placeholder="Enter password"
                                id="Password"
                                name="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <p className={style.forgot}>Forgot password?</p>
                        <button className={style.submit} type="submit">
                            {loading ? 'loading...' : 'Login'}
                        </button>
                        {message && <p className={style.message}>{message}</p>}
                        <div>
                            <p className={style.create}>
                                Already have an account? &nbsp;
                                <span className={style["span-create"]}>
                                    <Link style={{ textDecoration: "none" }} to="/signup">
                                        Create an account
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export { useValid };
