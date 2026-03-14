const handleApply = async () => {
  // 고객이 입력한 가상의 데이터 (이름, 연락처 등)
  const customerData = {
    name: "홍길동",
    phone: "010-1234-5678",
    message: "파킨슨 케어 상담 신청합니다.",
    source: "landing_page_main"
  };

  try {
    const response = await fetch('여기에_아까_복사한_n8n_URL_붙여넣기', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    });

    if (response.ok) {
      alert("성공적으로 접수되었습니다. 곧 연락드리겠습니다!");
    }
  } catch (error) {
    console.error("전송 실패:", error);
  }
};
