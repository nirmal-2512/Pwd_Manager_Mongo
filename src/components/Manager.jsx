import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // useEffect(() => {
  //   let req = fetch("http://loaclhost:3000/");
  //   let passwords = localStorage.getItem("passwords");
  //   if (passwords) {
  //     setPasswordArray(JSON.parse(passwords));
  //   }
  // }, []);
  const showPassword = () => {
    // alert("Show the password");
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/icons/hideeye.png")) {
      ref.current.src = "/icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/icons/hideeye.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (
      form.username.length > 3 &&
      form.site.length > 3 &&
      form.password.length > 3
    ) {
      // If any such id exists in the db, delete it
      // await fetch("http://localhost:3000/", {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id: form.id }),
      // });

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      setform({ site: "", username: "", password: "" });
    } else {
      toast("Error: Password Unsaved", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const deletePassword = async (id) => {
    let c = confirm("Do you want to delete this password?");
    if (c) {
      toast("Password Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
  };

  const deleteAfterEdit = async (id) => {
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });
  };
  const editPassword = async (id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: form.id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    deleteAfterEdit(id);
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify([passwordArray.filter((item) => item.id !== id)])
    // );
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="px-0 mx-0 flex text-center flex-col w-full text-1xl min-h-[84vh]">
        <div className="fixed min-h-[100vh] inset-0 -z-10 w-[100vw] items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#ffff_40%,#63e_100%)]"></div>
        <div className="container mx-auto w-full gap-20 mx-top-10 justify-around rounded-2xl">
          <div className="text-white flex flex-col p-4 gap-10 items-center">
            <input
              value={form.site}
              name="site"
              onChange={handleChange}
              placeholder="Enter Site URL"
              className="px-2 rounded-full  text-black bg-white w-1/1 border-red-600 border-1"
              type="text"
            />
            <div className="flex gap-10 w-full md:flex-row flex-col items-center">
              <input
                value={form.username}
                onChange={handleChange}
                name="username"
                placeholder="Enter Username"
                className="px-2 text-black rounded-full bg-white md:w-1/2 w-1/1  border-red-600 border-1"
                type="text"
              />
              <div className="flex gap-5 w-1/1">
                <input
                  ref={passwordRef}
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="px-2 rounded-full bg-white md:w-1/2 w-1/1 text-black  border-red-600 border-1"
                  type="password"
                />
                <span
                  className="abosolute py-1 right-[3px] top-[5px] cursor-pointer"
                  onClick={showPassword}
                >
                  <img ref={ref} src="/icons/eye.png" width={25} alt="" />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="text-black gap-3 flex items-center justify-center bg-green-200 rounded-2xl hover:bg-green-400 w-1/2"
            >
              <lord-icon
                src="https://cdn.lordicon.com/sbnjyzil.json"
                trigger="hover"
              ></lord-icon>
              Add Password
            </button>
          </div>
        </div>
        {/* Here is the section of the saved passwords */}
        <div className="passwordContainer flex flex-col items-center w-full py-8 px-2">
          <h2 className="font-bold">Your Saved Passwords</h2>
          {passwordArray.length === 0 && <div> No Passwords Saved </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto md:w-4/5 w-1/1 rounded-md overflow-hidden py-10">
              <thead>
                <tr className="bg-purple-900 text-white text-center">
                  <th className="text-center">Site</th>
                  <th className="text-center">Username</th>
                  <th className="text-center">Password</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-left px-2">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>{" "}
                      </td>
                      <td className="text-left px-2">{item.username}</td>
                      <td className="text-left px-2 flex justify-between">
                        <span>{item.password} </span>
                        <span className="hover:invert">
                          <button
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img
                              src="/icons/copy.png"
                              alt=""
                              className="place-items-right w-4 h-4"
                            />
                          </button>
                        </span>
                      </td>
                      <td className="text-left px-2 justify-">
                        <span className="flex flex-row gap-2 items- justify-evenly">
                          <img
                            src="/icons/pencil.png"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            alt=""
                            className="place-items-right w-4 h-4 hover:invert"
                          />{" "}
                          <img
                            src="/icons/delete.png"
                            alt=""
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            className="place-items-right w-4 h-4 hover:invert hover:bg-black-600"
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
