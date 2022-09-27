import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IUser } from "../../models/user.model";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { enteranceUser, userInfoByRefToken } from "../../redux/user/auth.slice";
import { myToken } from "../../redux/user/token.slice";
import { ResetPass, UserInfoByToken } from "../../services/user.service";
import { isLength, isMatch } from "../../utils/validation";

const Profile = () => {
  const initialState = {
    name: "",
    password: "",
    cf_password: "",
    err: "",
    success: "",
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector<IUser>(enteranceUser);
  const token = useAppSelector(myToken);

  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;
  console.log(data);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e: any) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload/avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setAvatar(res.data.url);
    } catch (err: any) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        "/api/users/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err: any) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      await ResetPass(token, password);

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err: any) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = async () => {
    if (name || avatar) {
      updateInfor();
      const user = await UserInfoByToken(token);
      dispatch(userInfoByRefToken(user));
    }
    if (password) updatePassword();
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full pt-[90px] ">
      <div className="relative w-full">
        <div className="absolute top-5 w-full flex justify-center">
          {err && <div className="text-red-500">{err}</div>}
          {success && <div className="text-green-500">{success}</div>}
        </div>
        <div className="flex justify-between  flex-1 px-20 text-center pt-20">
          {user && (
            <div className="flex gap-x-10 h-max">
              <div className="w-max h-max relative">
                <div className="w-40 h-40 rounded-full border-2 border-black overflow-hidden relative">
                  <Image src={user.avatar} alt="avt" height={180} width={180} />
                </div>
                <div className="absolute top-0 right-5 bg-primary rounded-full p-1 border-4 border-white ">
                  <label
                    htmlFor="file_up"
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <input
                      accept="image/*"
                      className="opacity-0 w-0 h-0"
                      type="file"
                      name="file"
                      id="file_up"
                      onChange={changeAvatar}
                    />
                    <AiOutlineEdit size={20} className="text-white" />
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-y-5 w-80">
                <div className="form-group text-left flex flex-col">
                  <label className="" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="p-2 bg-blue-200"
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={user.name}
                    placeholder="Your name"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group text-left flex flex-col">
                  <label className="" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="p-2 bg-blue-200 cursor-not-allowed"
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user.email}
                    placeholder="Your email address"
                    disabled
                  />
                </div>

                <div className="form-group text-left flex flex-col">
                  <label className="" htmlFor="password">
                    New Password
                  </label>
                  <input
                    className="p-2 bg-blue-200"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group text-left flex flex-col">
                  <label className="" htmlFor="cf_password">
                    Confirm New Password
                  </label>
                  <input
                    className="p-2 bg-blue-200"
                    type="password"
                    name="cf_password"
                    id="cf_password"
                    placeholder="Confirm password"
                    value={cf_password}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center">
                  <button
                    className="w-max mt-5 btn-primary"
                    disabled={loading}
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
          <div>Coming soon</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
