import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const active = path.startsWith('/info') ? 'info'
    : path.startsWith('/eap') ? 'eap'
    : path.startsWith('/counseling') ? 'counseling'
    : path.startsWith('/education') ? 'education'
    : path.startsWith('/notice') ? 'notice'
    : path.startsWith('/data') ? 'data'
    : '';

  const closeMenu = () => setMenuOpen(false);

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
        <button
          type="button"
          className={`btn_gnbView ${menuOpen ? 'open' : 'close'}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="메뉴 열기/닫기"
          aria-expanded={menuOpen}
          style={{ border: 'none', padding: 0, cursor: 'pointer', backgroundColor: 'transparent' }}
        >gnbMenuView</button>

        <div id="gnbMenu" style={{ display: menuOpen ? 'block' : undefined }}>
          <div>
            <h2 id="info" className={active === 'info' ? 'on' : ''}><Link to="/info" onClick={closeMenu}>헤세드상담연구소</Link></h2>
            <h2 id="eap" className={active === 'eap' ? 'on' : ''}><Link to="/eap" onClick={closeMenu}>EAP</Link></h2>
            <h2 id="counseling" className={active === 'counseling' ? 'on' : ''}><Link to="/counseling" onClick={closeMenu}>상담 및 코칭</Link></h2>
            <h2 id="education" className={active === 'education' ? 'on' : ''}><Link to="/education" onClick={closeMenu}>임상 수련/교육</Link></h2>
            <h2 id="notice" className={active === 'notice' ? 'on' : ''}><Link to="/notice" onClick={closeMenu}>공지사항</Link></h2>
            <h2 id="data" className={active === 'data' ? 'on' : ''}><Link to="/data" onClick={closeMenu}>자료실</Link></h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

