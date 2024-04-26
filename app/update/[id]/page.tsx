"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faRotateRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Breakdown } from "@/app/page";

export default function Update({ params }: { params?: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, reset, setValue } = useForm<Breakdown>();
  const [breakdownType, setBreakdownType] = useState(0);
  const accessToken = Cookies.get("accessToken");
  let year = searchParams.get("year");
  let month = searchParams.get("month");

  useEffect(() => {
    axios
      .get(`http://43.202.250.71:3000/breakdown/update/${params?.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.ok) {
          const breakdown: Breakdown = res.data.breakdown;
          setValue("amount", breakdown.amount);
          setValue("type", breakdown.type);
          setBreakdownType(breakdown.type === "income" ? 0 : 1);
          setValue("category", breakdown.category);
          setValue("date", breakdown.date);
          setValue("memo", breakdown.memo);
        }
      })
      .catch((e) => {
        if (e.response.status === 401) router.replace("/signIn");
      });
  }, [accessToken, params?.id, router, setValue]);

  const onSubmit = (formData: { date: string }) => {
    axios
      .post(`http://43.202.250.71:3000/breakdown/update/${params?.id}`, formData, {
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

  const onClickDeleteBtn = () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm)
      axios
        .delete(`http://43.202.250.71:3000/breakdown/delete/${params?.id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.data.ok) router.replace(`/?year=${year}&month=${month}`);
        })
        .catch((e) => {
          if (e.response.status === 401) router.replace("/signIn");
        });
  };

  return (
    <div>
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
              className="py-4 px-32 text-white bg-green-500 hover:bg-green-600 duration-500 rounded-md"
            >
              저장
            </button>
            <button
              type="button"
              className="bg-slate-200 py-4 px-6 rounded-md text-slate-700 hover:bg-red-400 duration-500 hover:text-white"
              onClick={onClickDeleteBtn}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
