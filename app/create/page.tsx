"use client";

import { faAngleLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

export default function Create() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, reset, setValue } = useForm<any>();
  const [breakdownType, setBreakdownType] = useState(0);
  const accessToken = Cookies.get("accessToken");
  const [loading, setLoading] = useState(true);
  let year = searchParams.get("year");
  let month = searchParams.get("month");

  useEffect(() => {
    axios
      .post(
        "http://43.202.250.71:3000/auth",
        { username: Cookies.get("accessToken") },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status === 401) router.replace("/signIn");
      });
    setValue("type", "income");
  }, [accessToken, router, setValue]);

  const onSubmit = (formData: { date: string }) => {
    year = formData.date.split("-")[0];
    month = formData.date.split("-")[1];
    axios
      .post("http://43.202.250.71:3000/breakdown/create", formData, {
        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      })
      .then((res) => {
        if (res.data.ok) router.replace(`/?year=${year}&month=${month}`);
        else console.error(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onClickIncomeBtn = () => {
    setValue("type", "income");
    setBreakdownType(0);
  };

  const onClickSpendingBtn = () => {
    setValue("type", "spending");
    setBreakdownType(1);
  };

  return (
    <div>
      {!loading && (
        <div className="space-y-7">
          <button
            className="flex items-center text-blue-500 space-x-2"
            onClick={() => router.replace(`/?year=${year}&month=${month}`)}
          >
            <FontAwesomeIcon icon={faAngleLeft} fontSize={26} />
            <span className="text-xl">홈</span>
          </button>
          <form className="text-xl space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center space-x-5">
              <span className="w-24 text-start">금액</span>
              <input
                type="number"
                className="outline-none border-b-2 hover:border-green-500 focus:border-green-500 duration-700 w-96"
                required
                placeholder="금액을 입력하세요."
                {...register("amount", { required: true })}
              />
              원
            </div>

            <div className="flex items-center justify-center space-x-5">
              <span className="w-24 text-start">분류</span>
              <div className="w-96 space-x-5">
                <button
                  type="button"
                  className={`py-3 px-5 border-2 rounded-md ${
                    breakdownType === 0
                      ? "border-green-500 text-green-500"
                      : "border-slate-400 text-slate-500"
                  } duration-300`}
                  {...register("type")}
                  onClick={onClickIncomeBtn}
                >
                  수입
                </button>
                <button
                  type="button"
                  className={`py-3 px-5 border-2 rounded-md ${
                    breakdownType === 1
                      ? "border-blue-400 text-blue-400"
                      : "border-slate-400 text-slate-500"
                  } duration-300`}
                  {...register("type")}
                  onClick={onClickSpendingBtn}
                >
                  지출
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-5">
              <span className="w-24 text-start">카테고리</span>
              <input
                type="text"
                className="outline-none border-b-2 hover:border-green-500 focus:border-green-500 duration-700 w-96"
                required
                placeholder="카테고리를 입력하세요. Ex) 식비"
                {...register("category", { required: true })}
              />
            </div>

            <div className="flex items-center justify-center space-x-5">
              <span className="w-24 text-start">날짜</span>
              <input
                type="datetime-local"
                className="outline-none border-b-2 hover:border-green-500 focus:border-green-500 duration-700 w-96"
                required
                {...register("date", { required: true })}
              />
            </div>

            <div className="flex items-center justify-center space-x-5">
              <span className="w-24 text-start">메모</span>
              <input
                type="text"
                className="outline-none border-b-2 hover:border-green-500 focus:border-green-500 duration-700 w-96"
                placeholder="메모를 입력하세요."
                {...register("memo")}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="py-4 px-6 bg-blue-400 text-white hover:bg-blue-500 duration-500 rounded-md"
                onClick={() => reset()}
              >
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
              <button
                type="submit"
                className="py-4 px-40 text-white bg-green-500 hover:bg-green-600 duration-500 rounded-md"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
