"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData: any) => {
    axios
      .post("http://localhost:3000/signIn", formData)
      .then((res) => {
        if (res.data.ok) router.replace("/");
        else console.error(res.data);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
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
    </div>
  );
}
