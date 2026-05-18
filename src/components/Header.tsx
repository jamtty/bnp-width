import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  const active = path.startsWith('/info') ? 'info'
    : path.startsWith('/eap') ? 'eap'
    : path.startsWith('/counseling') ? 'counseling'
    : path.startsWith('/education') ? 'education'
    : path.startsWith('/notice') ? 'notice'
    : path.startsWith('/data') ? 'data'
    : '';

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
          <h1><Link to="/">메인로고</Link></h1>
        </div>
        <a href="javascript:void(0)" className="btn_gnbView close">gnbMenuView</a>

        <div id="gnbMenu">
          <div>
            <h2 id="info" className={active === 'info' ? 'on' : ''}><Link to="/info">헤세드상담연구소</Link></h2>
            <h2 id="eap" className={active === 'eap' ? 'on' : ''}><Link to="/eap">EAP</Link></h2>
            <h2 id="counseling" className={active === 'counseling' ? 'on' : ''}><Link to="/counseling">상담 및 코칭</Link></h2>
            <h2 id="education" className={active === 'education' ? 'on' : ''}><Link to="/education">임상 수련/교육</Link></h2>
            <h2 id="notice" className={active === 'notice' ? 'on' : ''}><Link to="/notice">공지사항</Link></h2>
            <h2 id="data" className={active === 'data' ? 'on' : ''}><Link to="/data">자료실</Link></h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

