import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { auth } from "../firebase";
import { getUserDocumentData } from "./signup";

const ProfilePage = ({ history }) => {
  const user = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userD = JSON.parse(localStorage.getItem("user"));
      console.log(userD);
      return setUserInfo(userD);
    } else if (user !== null) {
      getUserDocumentData(user?.uid).then((userData) => {
        setUserInfo(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      });
    }
  }, [user]);

  const { name, phone, address, country, photoURL, email } =
    userInfo || user || {};

  return user !== null ? (
    <div className="mx-auto w-3/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${
              photoURL ||
              "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
            })  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
          className="border border-blue-300"
        ></div>
        <div className="md:pl-4">
          <h3 className="inline font-bold">Full name</h3>
          <h2 className="italic">{name || ""}</h2>
          <h3 className="inline font-bold">Email</h3>
          <h3 className="italic">{email || ""}</h3>
          <h3 className="inline font-bold">Phone</h3>
          <h3 className="italic">{phone || ""}</h3>
          <h3 className="inline font-bold">Address</h3>
          <h3 className="italic">{address || ""}</h3>
          <h3 className="inline font-bold">Country</h3>
          <h3 className="italic">{country || ""}</h3>
        </div>
      </div>
      <button
        className="w-full py-3 bg-red-600 mt-4 text-white"
        onClick={() => {
          auth.signOut();
          localStorage.clear();
          history.push("/");
        }}
      >
        Sign out
      </button>
    </div>
  ) : (
    <h1 className="flex justify-center mt-1/3 font-bold text-5xl">
      Loading...
    </h1>
  );
};
export default ProfilePage;
