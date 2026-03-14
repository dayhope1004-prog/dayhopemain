'use client';

import React, { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); // [추가] 성함 상태
  const [phone, setPhone] = useState(''); // [추가] 전화번호 상태
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // [검증] 필수 정보 확인
    if (!name || !email || !phone) return alert('모든 정보를 정확히 입력해주세요.');

    setLoading(true);
    try {
      const response = await fetch('https://n8n.dayhope.day/webhook/dayhope-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          name, // [추가] 데이터 전송
          phone, // [추가] 데이터 전송
          source: 'dayhope_landing_v1',
          timestamp: new Date().toISOString() 
        }),
      });

      if (response.ok) {
        alert(`${name} 님, 성공적으로 접수되었습니다! 가이드북을 메일로 보내드립니다.`);
        setEmail('');
        setName('');
        setPhone('');
      } else {
        alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 연결 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 text-center border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-yellow-500 text-lg font-bold mb-4 tracking-widest uppercase">
            DayHope Exclusive
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            AI의 뇌를 장악하고 <br />
            <span className="text-yellow-500">결과를 200% 폭발</span>시키십시오
          </h1>
          <p className="text-gray-400 text-xl mb-10">
            100억 자산가 비즈니스 아키텍트의 실전 프롬프트 설계도 v1.0
          </p>
          <a href="#pricing" className="bg-yellow-500 text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-yellow-400 transition-all inline-block">
            지금 즉시 소유하기 (90% 할인)
          </a>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center text-red-500">"왜 내 AI는 뻔한 대답만 할까?"</h3>
          <ul className="space-y-4 text-gray-300 text-lg">
            <li className="flex items-start">
              <span className="mr-3">❌</span> 질문이 막막해서 "블로그 글 써줘"만 반복한다.
            </li>
            <li className="flex items-start">
              <span className="mr-3">❌</span> 결과물을 수정하느라 결국 내가 다 직접 한다.
            </li>
            <li className="flex items-start">
              <span className="mr-3">❌</span> AI 격차가 소득 격차로 벌어지는 것이 불안하다.
            </li>
          </ul>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-6 border-b border-gray-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="p-8 border border-gray-700 rounded-2xl">
            <h4 className="text-xl font-bold mb-4 text-gray-500">일반적인 프롬프트</h4>
            <p className="text-gray-400 italic">"창업 아이디어 5개 알려줘"</p>
            <p className="mt-4 text-sm text-gray-500">결과: 누구나 아는 뻔한 내용, 실행 불가</p>
          </div>
          <div className="p-8 border-2 border-yellow-500 rounded-2xl bg-zinc-900 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <h4 className="text-xl font-bold mb-4 text-yellow-500">DayHope 아키텍처</h4>
            <p className="text-white font-medium">"[컨텍스트] + [페르소나] + [논리적 체인] 설계"</p>
            <p className="mt-4 text-sm text-yellow-500 font-bold">결과: 즉시 수익 창출이 가능한 비즈니스 모델 도출</p>
          </div>
        </div>
      </section>

      {/* Pricing Section (Lead Capture Form) */}
      <section id="pricing" className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto border-2 border-yellow-500 p-12 rounded-3xl bg-zinc-900">
          <h3 className="text-3xl font-bold mb-4">오늘 한정 얼리버드 혜택</h3>
          <p className="text-gray-400 mb-8">기초부터 상위 1% 기술까지 모두 담았습니다.</p>
          <div className="flex justify-center items-end gap-2 mb-10">
            <span className="text-gray-500 line-through text-2xl">₩50,000</span>
            <span className="text-6xl font-black text-yellow-500">₩4,900</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* [추가] 성함 입력창 */}
            <input 
              type="text" 
              placeholder="성함" 
              required
              className="w-full px-6 py-4 rounded-xl bg-black border border-gray-700 text-white text-lg focus:border-yellow-500 outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* [기존] 이메일 입력창 */}
            <input 
              type="email" 
              placeholder="자료를 받을 이메일 주소 입력" 
              required
              className="w-full px-6 py-4 rounded-xl bg-black border border-gray-700 text-white text-lg focus:border-yellow-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* [추가] 전화번호 입력창 */}
            <input 
              type="tel" 
              placeholder="전화번호 (예: 010-1234-5678)" 
              required
              className="w-full px-6 py-4 rounded-xl bg-black border border-gray-700 text-white text-lg focus:border-yellow-500 outline-none transition-all"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl text-2xl font-black transition-transform active:scale-95 ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-yellow-500 text-black hover:bg-yellow-400'}`}
            >
              {loading ? '처리 중...' : '프롬프트 가이드 즉시 소유하기'}
            </button>
          </form>
          
          <p className="mt-6 text-gray-500 text-sm">신청 완료 시 n8n 시스템을 통해 즉시 가이드가 발송됩니다.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-600 border-t border-gray-900 text-sm">
        © 2026 dayhope.day | Business Architect Strategy
      </footer>
    </div>
  );
}
