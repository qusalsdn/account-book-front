"use client";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  return (
    <div className="space-y-7">
      <button className="flex items-center text-blue-500 space-x-2" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faAngleLeft} fontSize={26} />
        <span className="text-xl">홈</span>
      </button>
      <form className="text-xl space-y-10">
        <div className="flex items-center justify-center space-x-5">
          <span className="w-24 text-start">금액</span>
          <input
            type="number"
            className="outline-none border-b-2 hover:border-green-500 focus:border-green-500 duration-700 w-96"
            required
            placeholder="금액을 입력하세요."
          />
          원
        </div>

        <div className="flex items-center justify-center space-x-5">
          <span className="w-24 text-start">분류</span>
          <div className="w-96 space-x-5">
            <button className="py-3 px-5 border-2 rounded-md border-green-500 text-green-500">
              수입
            </button>
            <button className="py-3 px-5 border-2 rounded-md border-blue-400 text-blue-400">
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
            placeholder="카테고리를 입력하세요."
          />
        </div>

        <div className="flex items-center justify-center space-x-5">
          <span className="w-24 text-start">날짜</span>
          <input
            type="datetime-local"
            className="outline-none border-b-2 hover:border-green-500 focus:border-green-500 duration-700 w-96"
            required
          />
        </div>

        <div className="flex items-center justify-center space-x-5">
          <span className="w-24 text-start">메모</span>
          <input
            type="text"
            className="outline-none border-b-2 hover:border-green-500 focus:border-green-500 duration-700 w-96"
            placeholder="메모를 입력하세요."
          />
        </div>

        <div className="flex items-center justify-between">
          <button type="button" className="py-4 px-9 bg-slate-200 text-slate-700 rounded-md">
            초기화
          </button>
          <button
            type="submit"
            className="py-4 px-32 text-white bg-green-500 hover:bg-green-600 duration-500 rounded-md"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
