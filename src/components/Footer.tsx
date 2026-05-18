import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div id="footer">
      <div>
        {/* 헤세드 상담코칭 연구소 */}
        <div>
          <h2><Link to="/info">헤세드 상담코칭 연구소</Link></h2>
          <ul>
            <li><h3><Link to="/info#sub01_01">인사말</Link></h3></li>
            <li><h3><Link to="/info#sub01_02">상담 및 코칭 교육 영역</Link></h3></li>
            <li><h3><Link to="/info#sub01_03">조직도</Link></h3></li>
            <li><h3><Link to="/info#sub01_04">비전</Link></h3></li>
            <li><h3><Link to="/info#sub01_05">오시는 길</Link></h3></li>
          </ul>
        </div>

        {/* EAP / 상담 및 코칭 */}
        <div>
          <h2><Link to="/eap">EAP</Link></h2>
          <ul>
            <li><h3><Link to="/eap#sub02_02">상담 및 코칭 심리진단</Link></h3></li>
            <li><h3><Link to="/eap#sub02_03">조직지원 프로그램</Link></h3></li>
          </ul>

          <h2><Link to="/counseling">상담 및 코칭</Link></h2>
          <ul>
            <li><h3><Link to="/counseling#sub03_01">심리상담</Link></h3></li>
            <li><h3><Link to="/counseling#sub03_01">심리검사</Link></h3></li>
            <li><h3><Link to="/counseling#sub03_02">코칭</Link></h3></li>
          </ul>
        </div>

        {/* 임상 수련/교육 / 공지사항 / 자료실 */}
        <div>
          <h2><Link to="/education">임상 수련/교육</Link></h2>
          <ul>
            <li><h3><Link to="/education#sub04_01">인턴, 레지던트과정</Link></h3></li>
            <li><h3><Link to="/education#sub04_02">교육분석, 슈퍼비전</Link></h3></li>
            <li><h3><Link to="/education#sub04_03">상담교육 프로그램</Link></h3></li>
          </ul>

          <h2><Link to="/notice">공지사항</Link></h2>
          <h2><Link to="/data">자료실</Link></h2>
        </div>

        {/* Contact */}
        <div className="end">
          <h2><Link to="/#map">Contact</Link></h2>
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
