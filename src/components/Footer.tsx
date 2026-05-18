const Footer = () => {
  return (
    <div id="footer">
      <div>
        {/* 헤세드 상담코칭 연구소 */}
        <div>
          <h2><a href="/info.do">헤세드 상담코칭 연구소</a></h2>
          <ul>
            <li><h3><a href="/info.do#sub01_01">인사말</a></h3></li>
            <li><h3><a href="/info.do#sub01_02">상담 및 코칭 교육 영역</a></h3></li>
            <li><h3><a href="/info.do#sub01_03">조직도</a></h3></li>
            <li><h3><a href="/info.do#sub01_04">비전</a></h3></li>
            <li><h3><a href="/info.do#sub01_05">오시는 길</a></h3></li>
          </ul>
        </div>

        {/* EAP / 상담 및 코칭 */}
        <div>
          <h2><a href="/eap.do">EAP</a></h2>
          <ul>
            <li><h3><a href="/eap.do#sub02_01">상담 및 코칭 심리진단</a></h3></li>
            <li><h3><a href="/eap.do#sub02_03">조직지원 프로그램</a></h3></li>
          </ul>

          <h2><a href="/counseling.do">상담 및 코칭</a></h2>
          <ul>
            <li><h3><a href="/counseling.do#sub03_01">심리상담</a></h3></li>
            <li><h3><a href="/counseling.do#sub03_01">심리검사</a></h3></li>
            <li><h3><a href="/counseling.do#sub02_02">코칭</a></h3></li>
          </ul>
        </div>

        {/* 임상 수련/교육 / 공지사항 / 자료실 */}
        <div>
          <h2><a href="/education.do">임상 수련/교육</a></h2>
          <ul>
            <li><h3><a href="/education.do#sub04_01">인턴, 레지던트과정</a></h3></li>
            <li><h3><a href="/education.do#sub04_02">교육분석, 슈퍼비전</a></h3></li>
            <li><h3><a href="/education.do#sub04_03">상담교육 프로그램</a></h3></li>
          </ul>

          <h2><a href="/noticeList.do">공지사항</a></h2>
          <h2><a href="/dataList.do">자료실</a></h2>
        </div>

        {/* Contact */}
        <div className="end">
          <h2><a href="/main.do#map">Contact</a></h2>
          <ul>
            <li>서울특별시 영등포구 당산동5가 11-47</li>
            <li>T. 02 – 2632 - 7755</li>
            <li>
              E.{' '}
              <a href="mailto:hessed5822@hanmail.net" style={{ color: '#fff' }}>
                hessed5822@hanmail.net
              </a>
            </li>
            <li>상담시간. 월요일~금요일 (10시~오후 8시) / 토요일 (10시~오후 3시)</li>
          </ul>
          <p className="copyRight">COPYRIGHT 2019 ALL RIGHT RESERVED.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
