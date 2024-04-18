"use client";

import { faCaretLeft, faCaretRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Home() {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  // 월 왼쪽 버튼
  const onClickLeftBtn = () => {
    if (month === 1 && year !== 0) {
      console.log("test");
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
    <div className="w-[480px] mx-auto h-screen mt-10 px-5 select-none font-bold space-y-5">
      <div className="flex items-center space-x-3">
        <button>
          <FontAwesomeIcon icon={faCaretLeft} onClick={onClickLeftBtn} />
        </button>
        <span className="text-2xl">
          {year !== currentYear && <span>{year}년</span>}
          {month}월
        </span>
        <button>
          <FontAwesomeIcon icon={faCaretRight} onClick={onClickRightBtn} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <p className="text-slate-600">지출</p>
            <p className="text-xl">956,784원</p>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-slate-600">수입</p>
            <p className="text-green-500 text-xl">1,806,920원</p>
          </div>
        </div>
        <div>
          <button className="bg-slate-200 text-slate-700 py-3 px-5 rounded-md">분석</button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <select className="outline-none">
          <option value="all">전체 내역</option>
          <option value="Income">수입 내역</option>
          <option value="Spending">지출 내역</option>
        </select>
        <div className="flex items-center space-x-5">
          <button className="text-lg">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button className="text-xl">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className="space-y-7">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p>18일 오늘</p>
              <div className="flex space-x-3">
                <p>-563,900원</p>
              </div>
            </div>
            <hr />
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-x-3">
                <span className="bg-red-400 text-white py-1 px-3 rounded-md">지출</span>
                <span>월세</span>
              </div>
              <p>-555,000원</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-x-3">
                <span className="bg-red-400 text-white py-1 px-3 rounded-md">지출</span>
                <span>치킨</span>
              </div>
              <p>-13,900원</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p>17일 수요일</p>
              <div className="flex space-x-3">
                <p className="text-green-500">+5,000,000원</p>
                <p>-15,680원</p>
              </div>
            </div>
            <hr />
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-x-3">
                <span className="bg-red-400 text-white py-1 px-3 rounded-md">지출</span>
                <span>쿠팡</span>
              </div>
              <p>-15,600원</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-x-3">
                <span className="bg-green-400 text-white py-1 px-3 rounded-md">수입</span>
                <span>주식</span>
              </div>
              <p className="text-green-500">+5,000,000원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
