import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

const getPasswords = async () => {
  let req = await fetch("http://localhost:3000/")
  let passwords = await req.json()
  console.log(passwords)
  setpasswordArray(passwords)
}


  useEffect(() => {
    getPasswords();
  }, []);

  const copytext = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async() => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){

      //If any such id exists in db, delete it
      await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-type": "application/json"}, body: JSON.stringify({id: form.id})})

      setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);
      await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast.success("Password Saved!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }else {
    toast("Password Not Saved!")
  }
  };

  const deletePassword = async(id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?");
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id !== id));
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)));
      let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-type": "application/json"}, body: JSON.stringify({id})})

      toast.success("Password Deleted", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
    // console.log([...passwordArray, form]);
  };

  const editPassword = (id) => {
    console.log("Editing password with id ", id)
    setform({...passwordArray.filter(item=>item.id === id)[0], id : id});
    setpasswordArray(passwordArray.filter(item=>item.id !== id));
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      /><ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-600">&lt;</span>
          <span>Pass</span>
          <span className="text-green-600">Op/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your Own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter UserID"
              className="rounded-full border border-green-500 w-full px-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full px-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center px-8 gap-2 py-2 rounded-full bg-green-400 hover:bg-green-300 w-fit border border-green-900"
          >
            Save
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border borderwhite text-center">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => copytext(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/slmechys.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border borderwhite text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => copytext(item.username)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/slmechys.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border borderwhite text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => copytext(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/slmechys.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border borderwhite text-center w-32">
                        <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24">
<path d="M 18.400391 2 C 18.100391 2 17.899219 2.1007812 17.699219 2.3007812 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.699219 6.3007812 C 22.099219 5.9007812 22.099219 5.3003906 21.699219 4.9003906 L 19.099609 2.3007812 C 18.899609 2.1007812 18.700391 2 18.400391 2 z M 18.400391 4.4003906 L 19.599609 5.5996094 L 18.306641 6.8925781 L 17.107422 5.6933594 L 18.400391 4.4003906 z M 15.693359 7.1074219 L 16.892578 8.3066406 L 6.1992188 19 L 5 19 L 5 17.800781 L 15.693359 7.1074219 z"></path>
</svg> */}
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="morph"
                            state="morph-trash-full-to-empty"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
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
