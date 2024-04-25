"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const accessToken = Cookies.get("accessToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "http://43.202.3.171:3000/auth",
        { username: Cookies.get("accessToken") },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        if (res.data.ok) router.replace("/");
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [accessToken, router]);

  const onSubmit = (formData: any) => {
    axios
      .post("http://43.202.3.171:3000/auth/signUp", formData)
      .then((res) => {
        if (res.data.ok) router.replace("/signIn");
        else console.error(res.data);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      {!loading && (
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center text-2xl">회원가입</p>
          <div className="space-y-3">
            <span className="text-lg">이름</span>
            <input
              type="text"
              className="outline-none border-b-2 focus:border-green-500 w-full duration-300"
              required
              placeholder="5 ~ 20자리이어야 합니다."
              minLength={5}
              maxLength={20}
              {...register("username", { required: true, minLength: 5, maxLength: 20 })}
            />
          </div>
          <div className="space-y-3">
            <span className="text-lg">비밀번호</span>
            <input
              type="password"
              className="outline-none border-b-2 focus:border-green-500 w-full duration-300"
              required
              placeholder="5 ~ 20자리이어야 합니다."
              minLength={5}
              maxLength={20}
              {...register("password", { required: true, minLength: 5, maxLength: 20 })}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 duration-300 text-white py-3 rounded-md"
          >
            회원가입
          </button>
          <button
            type="button"
            className="bg-blue-400 hover:bg-blue-500 duration-300 text-white py-3 rounded-md"
            onClick={() => router.push("/signIn")}
          >
            로그인
          </button>
        </form>
      )}
    </div>
  );
}
