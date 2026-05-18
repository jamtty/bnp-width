const Header = () => {
  return (
    <>
      {/* 스킵 네비게이션 */}
      <div id="skipNavigation">
        <ul>
          <li><a href="#content">본문 바로가기</a></li>
          <li><a href="#gnbMenu">주요메뉴 바로가기</a></li>
          <li><a href="#footer">하단 바로가기</a></li>
        </ul>
      </div>

      {/* header */}
      <div id="header">
        <div className="logo_area">
          <h1><a href="/main.do">메인로고</a></h1>
        </div>
        <a href="javascript:void(0)" className="btn_gnbView close">gnbMenuView</a>

        <div id="gnbMenu">
          <div>
            <h2 id="info"><a href="/info.do">헤세드상담연구소</a></h2>
            <h2 id="eap"><a href="/eap.do">EAP</a></h2>
            <h2 id="counseling"><a href="/counseling.do">상담 및 코칭</a></h2>
            <h2 id="education"><a href="/education.do">임상 수련/교육</a></h2>
            <h2 id="noticeList"><a href="/noticeList.do">공지사항</a></h2>
            <h2 id="dataList"><a href="/dataList.do">자료실</a></h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
