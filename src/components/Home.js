import React, { useEffect, useState } from "react";
import banner from "../assets/high-quality-photo.jpg";
import ReactCardFlip from "react-card-flip";
import { auth, googleProvider } from "../firebase";
import { generateUserDocument } from "./signup";

const Home = ({ history }) => {
  const [isFlipped, setFlip] = useState(false);
  const [values, setValue] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoaing] = useState(false);

  // A function that handles the user input changes.
  // stores them to the local state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue({ ...values, [name]: value });
  };

  //A function that handles the user sign up
  // Sends the user information to the firebase NoSql database
  // Creates auth account for the user
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoaing(true);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      //remove password while saving to the database
      const { password, ...valuesWithoutPassword } = values;

      //call a function to save data to the database
      generateUserDocument(user, valuesWithoutPassword);
      setLoaing(false);
      setFlip(!isFlipped);
    } catch (error) {
      console.log(error);
      setError("Error signing up with password and email!");
      alert(error.message);
      setLoaing(false);
    }
  };

  // A function that signs in the user if he/she exists
  const handleSignIn = (e) => {
    e.preventDefault();
    setLoaing(true);
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setLoaing(false);
        history.push("/profile");
      })
      .catch((error) => {
        alert(error.message);
        setError("Error signing in with password and email!");
        setLoaing(false);
        setValue({});
        console.error("Error signing in with password and email", error);
      });
  };

  const signWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(() => {
        setValue({});
        history.push("/profile");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      return history.push("/profile");
    }
  });

  return (
    <div className="home md:bg-white">
      <div className="contain flex  ">
        {
          // FORM ELEMENTS
          <div className="lg:w-2/4 w-full bg-yellow-300 z-10">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <form className="m-auto mt-10 p-5 w-3/4" onSubmit={handleSignUp}>
                <div>
                  <div style={inputs}>
                    <label htmlFor="name" className="pt-5">
                      Full Name
                    </label>
                    <input
                      onChange={handleChange}
                      required
                      name="name"
                      id="name"
                      className=" p-2 bg-blue-200-100 my-5 rounded-md w-2/3 h-10  border border-solid border-blue-700"
                    />
                  </div>
                  <div style={inputs}>
                    <label htmlFor="phone" className="pt-5">
                      Phone
                    </label>
                    <input
                      onChange={handleChange}
                      required
                      name="phone"
                      id="phone"
                      className="p-2 bg-blue-200-100  my-5 rounded-md w-2/3 h-10  border border-solid border-blue-700"
                    />
                  </div>
                  <div style={inputs}>
                    <label htmlFor="address" className="pt-5">
                      Address
                    </label>
                    <input
                      onChange={handleChange}
                      required
                      name="address"
                      id="address"
                      className="p-2 bg-blue-200-100 my-5 rounded-md w-2/3 h-10  border border-solid border-blue-700"
                    />
                  </div>
                  <div style={inputs}>
                    <label htmlFor="country" className="pt-5">
                      Country
                    </label>
                    <input
                      onChange={handleChange}
                      required
                      name="country"
                      id="country"
                      className=" p-2 bg-blue-200-100  my-5 rounded-md w-2/3 h-10  border border-solid border-blue-700"
                    />
                  </div>
                  <div style={inputs}>
                    <label htmlFor="email" className="pt-5">
                      Email
                    </label>
                    {/* here i used the type email to make sure the user submits valid email */}
                    <input
                      onChange={handleChange}
                      required
                      type="email"
                      name="email"
                      id="email"
                      className=" p-2 bg-blue-200-100  my-5 rounded-md w-2/3 h-10  border border-solid border-blue-700"
                    />
                  </div>
                  <div style={inputs}>
                    <label htmlFor="password" className="pt-5">
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      required
                      type="password"
                      name="password"
                      id="password"
                      className=" p-2 bg-blue-200-100  my-5 rounded-md w-2/3 h-10  border border-solid border-blue-700"
                    />
                  </div>
                </div>
                <span> Already have account ? </span>
                <button
                  type="button"
                  onClick={() => setFlip(!isFlipped)}
                  className=" h-10  2/3 text-blue-600"
                >
                  sign in
                </button>
                <button
                  type="submit"
                  className=" h-10 float-right mr-14 uppercase 2/3 bg-blue-600 rounded p-2 text-white"
                >
                  {loading ? "submit..." : "submit"}
                </button>
              </form>

              <form className="m-auto mt-40 p-5 w-3/4" onSubmit={handleSignIn}>
                <div>
                  <div style={inputs}>
                    <label htmlFor="email" className="pt-5">
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      required
                      type="email"
                      name="email"
                      id="email"
                      className="p-2 bg-blue-200-100  my-5 rounded-md w-2/3 h-10  border border-solid border-blue-700"
                    />
                  </div>
                  <div style={inputs}>
                    <label htmlFor="password" className="pt-5">
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      required
                      type="password"
                      name="password"
                      id="password"
                      className=" p-2 bg-blue-200-100  my-5 rounded-md w-2/3 h-10  border border-solid border-blue-700"
                    />
                  </div>
                </div>
                <span> Don't have account ? </span>
                <button
                  type="button"
                  onClick={() => setFlip(!isFlipped)}
                  className=" h-10  2/3 text-blue-600"
                >
                  sign up
                </button>

                <button
                  type="submit"
                  className=" h-10 float-right mr-10 uppercase 2/3 bg-blue-600 rounded p-2 text-white"
                >
                  {loading ? "submit..." : "submit"}
                </button>
                <button type="button" onClick={signWithGoogle}>
                  Sign in with <span className="text-red-700">google</span>
                </button>
              </form>
            </ReactCardFlip>
          </div>
        }
        <div className="absolute right-0 w-2/3 h-full bg-gradient-to-t from-black to-black opacity-75" />

        <div className="h-full hidden md:block">
          <img lassName="w-2/3" src={banner} alt="" />
          <h1 className="absolute right-56 text-white text-6xl font-bold top-1/3">
            Welcome
          </h1>
          <h1 className="absolute right-40 text-yellow-400 text-3xl font-bold top-80">
            We book the best route for you
          </h1>
        </div>
      </div>
    </div>
  );
};

const inputs = {
  width: "400px",
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
};

export default Home;
