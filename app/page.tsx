"use client";

import { faCaretLeft, faCaretRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { register } from "module";
import { useForm } from "react-hook-form";

interface Breakdown {
  id: number;
  type: "income" | "spending";
  category: string;
  amount: string;
  date: string;
  memo?: string;
}

interface ResponseData {
  data: Breakdown[];
  income: string;
  spending: string;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status === 401) router.replace("/signIn");
      });
  }, [accessToken, router]);

  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  const [breakdown, setBreakdown] = useState<Record<string, ResponseData>>({});
  const [income, setIncome] = useState(0);
  const [spending, setSpending] = useState(0);
  const [year, setYear] = useState(
    searchParams.get("year") ? Number(searchParams.get("year")) : currentYear
  );
  const [month, setMonth] = useState(
    searchParams.get("month") ? Number(searchParams.get("month")) : currentMonth
  );
  const [isLoading, setIsLoading] = useState(false);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const [type, setType] = useState("all");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/breakdown", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { date: `${year}-${month.toString().padStart(2, "0")}`, type: type },
      })
      .then((res) => {
        if (res.data.ok) {
          setBreakdown(res.data.breakdown);
          setIncome(res.data.income);
          setSpending(res.data.spending);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [accessToken, month, year, type]);

  // 월 왼쪽 버튼
  const onClickLeftBtn = () => {
    if (month === 1 && year !== 0) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  // 월 오른쪽 버튼
  const onClickRightBtn = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div>
      {!loading && (
        <div className="space-y-5">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-3">
              <button className={`${isLoading && "pointer-events-none"}`}>
                <FontAwesomeIcon icon={faCaretLeft} onClick={onClickLeftBtn} />
              </button>
              <span className="text-2xl">
                {year !== currentYear && <span>{year}년</span>}
                {month}월
              </span>
              <button className={`${isLoading && "pointer-events-none"}`}>
                <FontAwesomeIcon icon={faCaretRight} onClick={onClickRightBtn} />
              </button>
            </div>
            {(month !== currentMonth || year !== currentYear) && (
              <button
                className="bg-slate-200 text-slate-700 py-1 px-3 rounded-md text-sm hover:bg-green-400 hover:text-white duration-300"
                onClick={() => {
                  setYear(currentYear);
                  setMonth(currentMonth);
                }}
              >
                현재 날짜로 이동
              </button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <p className="text-slate-600">지출</p>
                <p className="text-xl">{income.toLocaleString("ko-KR")}원</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-slate-600">수입</p>
                <p className="text-green-500 text-xl">{spending.toLocaleString("ko-KR")}원</p>
              </div>
            </div>
            <div>
              <button className="bg-slate-200 text-slate-700 py-3 px-5 rounded-md hover:bg-green-400 duration-500 hover:text-white">
                분석
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <select className="outline-none" onChange={(e) => setType(e.target.value)}>
              <option value="all">전체 내역</option>
              <option value="income">수입 내역</option>
              <option value="spending">지출 내역</option>
            </select>
            <div className="flex items-center space-x-5">
              <input
                type="text"
                className="outline-none border-2 px-2 py-1 text-sm font-normal focus:border-green-400 duration-700"
              />
              <button type="submit" className="text-lg">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <button className="text-xl hover:text-green-500 duration-300">
                <Link href={`/create?year=${year}&month=${month}`}>
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </button>
            </div>
          </div>
          <div className="space-y-10">
            {Object.entries(breakdown).map(([key, value]) => {
              const date = new Date(key);
              const day = date.getDate();
              const dayOfWeek = days[date.getDay()];
              return (
                <div key={key}>
                  <div className="flex items-center justify-between">
                    <p>
                      {day}일 {dayOfWeek}요일
                    </p>
                    <div className="flex space-x-3">
                      {type !== "spending" && (
                        <p className="text-green-500">
                          +{Number(value.income).toLocaleString("ko-KR")}원
                        </p>
                      )}
                      {type !== "income" && (
                        <p>-{Number(value.spending).toLocaleString("ko-KR")}원</p>
                      )}
                    </div>
                  </div>
                  <hr className="mt-1 mb-3" />
                  <div className="space-y-5">
                    {value.data.map((item) => {
                      return (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="space-x-3 flex items-center">
                            <span
                              className={`${
                                item.type === "income" ? "bg-green-400" : "bg-red-400"
                              } text-white py-2 px-3 rounded-md`}
                            >
                              {item.type === "income" ? "수입" : "지출"}
                            </span>
                            <div>
                              <p>{item.category}</p>
                              <p className="text-sm text-slate-400 font-normal">{item.memo}</p>
                            </div>
                          </div>
                          <p>
                            {item.type === "income" ? "+" : "-"}
                            {Number(item.amount).toLocaleString("ko-KR")}원
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
