"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface User {
  username: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<User>();
  const accessToken = Cookies.get("accessToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/auth",
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

  const onSubmit = (formData: User) => {
    axios
      .post("http://localhost:3000/auth/signIn", formData)
      .then((res) => {
        if (res.data.ok) {
          Cookies.set("accessToken", res.data.accessToken, { expires: 3 });
          Cookies.set("username", formData.username, { expires: 3 });
          router.replace("/");
        } else console.error(res.data);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      {!loading && (
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center text-2xl">로그인</p>
          <div className="space-y-3">
            <span className="text-lg">이름</span>
            <input
              type="text"
              className="outline-none border-b-2 focus:border-green-500 w-full duration-300"
              required
              placeholder="아이디를 입력해주세요."
              {...register("username", { required: true })}
            />
          </div>
          <div className="space-y-3">
            <span className="text-lg">비밀번호</span>
            <input
              type="password"
              className="outline-none border-b-2 focus:border-green-500 w-full duration-300"
              required
              placeholder="비밀번호를 입력해주세요."
              {...register("password", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 duration-300 text-white py-3 rounded-md"
          >
            로그인
          </button>
          <button
            type="button"
            className="bg-blue-400 hover:bg-blue-500 duration-300 text-white py-3 rounded-md"
            onClick={() => router.push("/signUp")}
          >
            회원가입
          </button>
        </form>
      )}
    </div>
  );
}
