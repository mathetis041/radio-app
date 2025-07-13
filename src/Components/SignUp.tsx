import Modal from "./modal";
import React, { useState } from "react";
import line from "../Images/line.svg";
import style from "../CSSModules/Login.module.css";
import { Link } from "react-router-dom";
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from "../Auth/Auth";

const useValidation = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>('');
  const [error1, setError1] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const validateName = (value: string) => {
    if (value === "") {
      setError("Email cannot be left blank");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const validatePassword = (value: string) => {
    if (value.length <= 8) {
      setError1("Password should be at least 8 characters long");
      return false;
    } else if (value === "") {
      setError1("Password cannot be left blank");
      return false;
    }
    setError1("");
    return true;
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!validateName(email)) {
      isValid = false;
    }
    if (!validatePassword(password)) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)


    if (validateForm()) {
      setLoading(true)

      try {
        doCreateUserWithEmailAndPassword(email, password)
          .then(async (r) => {
            setLoading(false);
            console.log("User created successfully", r);

            await doSendEmailVerification(r.user);
            setError('');
            setIsOpen(true);
          })
          .catch(err => {
            setLoading(false)
            console.log("Error creating user:", err.code);
            setError(err.code);
          })


      } catch (error: any) {
        console.log("Error creating user:", error);
        setError(error.message);
        setLoading(false)
      }
    } else {
      setMessage("");
      setLoading(false)
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    error,
    error1,
    message,
    setMessage,
    handleSubmit,
    validateForm,
    validateName,
    validatePassword,
    isOpen,
    loading,
    setIsOpen
  };
};

const SignUp: React.FC = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    error,
    error1,
    message,
    handleSubmit,
    isOpen,
    setIsOpen,
    loading
  } = useValidation();

  return (
    <>
      <Modal isOpen={isOpen} children='Check your mail for Verification, Before proceeding to login' onClose={() => setIsOpen(false)} />
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.mainText}>
            Hey, <br /> Welcome<br /> to
            <span className={style.mainSpanText}> MattVinc Radio!</span>
          </div>
          <img className={style.image} src={line} alt="" />
        </div>

        {/* This is the right side of the code */}

        {/* ---------------------------------------------------- */}

        <div className={style.right}>
          <div className={style["form-container"]}>
            <p className={style.login}>Create a personal account</p>

            {/* This is the form  */}
            {/* --------------------------------------------------- */}

            <form onSubmit={handleSubmit}>
              <div className={style["form-content"]}>
                <label htmlFor="Username">Email</label>
                <input
                  className={style.input}
                  type="email"
                  value={email}
                  id="Username"
                  name="Username"
                  placeholder="Enter email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className={style["error-message"]}> {error}</p>}

                <label htmlFor="Password">Password</label>
                <input
                  className={style.input}
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  id="Password"
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error1 && <p className={style["error-message"]}> {error1}</p>}
              </div>
              <button className={style.submit} type="submit">
                {loading ? 'loading...' : 'Sign up'}
              </button>
              {message && <p className={style.message}>{message}</p>}
              <div>
                <p className={style.create}>
                  Already have an account? &nbsp;
                  <span className={style["span-create"]}>
                    <Link style={{ textDecoration: "none" }} to="/login">
                      Log in
                    </Link>
                  </span>
                </p>
              </div>
              <div>
                <p className={style["extra-text"]}>
                  By signing in, you agree to MattVinc Radio
                </p>
                <p className={style["extra-text2"]}>Terms and Conditions</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { useValidation };

export default SignUp;
