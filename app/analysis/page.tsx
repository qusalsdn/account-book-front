"use client";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Cookies from "js-cookie";

interface Breakdown {
  category: string;
  amount: number;
  color: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analysis() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = Cookies.get("accessToken");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const searchParamsIncome = searchParams.get("income");
  const searchParamsSpending = searchParams.get("spending");
  const [type, setType] = useState("spending");
  const [income, setIncome] = useState(0);
  const [spending, setSpending] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>();
  const [breakdown, setBreakdown] = useState<Breakdown[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://43.203.200.5:3000/breakdown/analysis?date=${year}-${month?.padStart(
          2,
          "0"
        )}&type=${type}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        if (res.data.ok) {
          setChartData(res.data.chartData);
          setBreakdown(res.data.breakdown);
          setIncome(Number(searchParamsIncome));
          setSpending(Number(searchParamsSpending));
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e);
        if (e.response.status === 401) router.replace("/signIn");
      });
  }, [accessToken, month, router, searchParamsIncome, searchParamsSpending, type, year]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  return (
    <div>
      {!loading && (
        <div className="space-y-5">
          <button
            className="flex items-center text-blue-500 space-x-2"
            onClick={() => router.replace(`/?year=${year}&month=${month}`)}
          >
            <FontAwesomeIcon icon={faAngleLeft} fontSize={26} />
            <span className="text-xl">홈</span>
          </button>
          <div className="flex items-center justify-center space-x-20">
            <div className="space-x-2 text-blue-400">
              <input type="radio" name="type" id="income" onChange={onChange} value="income" />
              <label htmlFor="income">수입 {income.toLocaleString("ko-KR")}원</label>
            </div>
            <div className="space-x-2 text-green-500">
              <input
                type="radio"
                name="type"
                id="spending"
                defaultChecked
                onChange={onChange}
                value="spending"
              />
              <label htmlFor="spending">지출 {spending.toLocaleString("ko-KR")}원</label>
            </div>
          </div>
          <Doughnut data={chartData} />
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span>전체</span>
              <span>
                {type === "income"
                  ? Number(income).toLocaleString("ko-KR")
                  : Number(spending).toLocaleString("ko-KR")}
                원
              </span>
            </div>
            <hr />
            <div className="mt-3 space-y-5">
              {breakdown.map((item, idx) => {
                return (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></p>
                      <span>{item.category}</span>
                    </div>
                    <div>{item.amount.toLocaleString("ko-KR")}원</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
