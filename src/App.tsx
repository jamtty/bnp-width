import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';
import InfoPage from './pages/InfoPage';
import EapPage from './pages/EapPage';
import CounselingPage from './pages/CounselingPage';
import EducationPage from './pages/EducationPage';
import NoticePage from './pages/NoticePage';
import DataPage from './pages/DataPage';

declare var daum: any;
declare var $: any;

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/eap" element={<EapPage />} />
      <Route path="/counseling" element={<CounselingPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/data" element={<DataPage />} />
      </Routes>
    </>
  );
}

function MainPage() {
  useEffect(() => {
    if (typeof daum === 'undefined' || !daum.maps) return;
    try {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) return;
      const mapOption = { center: new daum.maps.LatLng(37.530774, 126.904339), level: 4 };
      const map = new daum.maps.Map(mapContainer, mapOption);
      const markerPosition = new daum.maps.LatLng(37.530774, 126.904339);
      const marker = new daum.maps.Marker({ position: markerPosition });
      marker.setMap(map);
      const content =
        '<div class="customoverlay">' +
        '  <a href="http://map.daum.net/?eX=478862&eY=1119810&eName=%ED%97%A4%EC%84%B8%EB%93%9C%EC%83%81%EB%8B%B4%EC%BD%94%EC%B9%AD%EC%97%B0%EA%B5%AC%EC%86%8C" target="_blank">' +
        '    <span class="title">헤세드상담코칭연구소</span>' +
        '  </a>' +
        '</div>';
      const position = new daum.maps.LatLng(37.530774, 126.904339);
      new daum.maps.CustomOverlay({ map, position, content, yAnchor: 1 });
    } catch (e) {
      console.warn('카카오 지도 초기화 실패:', e);
    }
    if (typeof $ === 'undefined') return;
    const handleResize = () => {
      if ($(window).width() <= 768) {
        $('.slider div').each(function (this: HTMLElement) { $(this).css('background-image', 'url(' + $(this).data('mobile') + ')'); });
      } else {
        $('.slider div').each(function (this: HTMLElement) { $(this).css('background-image', 'url(' + $(this).data('pc') + ')'); });
      }
    };
    $(window).on('resize', handleResize);
    handleResize();
    return () => { $(window).off('resize', handleResize); };
  }, []);

  return (
    <div className="wrap main">
      <Header />
      <div id="container">
        <div id="visual">
          <div className="slider">
            <div className="bann_img01" data-pc="/upload/banner/banner_file_202308222942917.png" data-mobile="/upload/banner/banner_file_202308222639832.png" />
          </div>
        </div>
        <div id="contents">
          <div className="cont_w_area">
            <div className="box_type01">
              <div className="box_cont bg_img01">
                <div>
                  <h4 className="tit_02">EAP</h4>
                  <p>EAP 프로그램은 개인의 정신 건강과 건강한 기업문화을 기반으로 조직문화 증진 및 생산성 향상을 목적으로 한 기업의 정신건강관리 프로그램 입니다.</p>
                  <Link to="/eap">More</Link>
                </div>
              </div>
              <div className="box_cont bg_img02">
                <div>
                  <h4 className="tit_02">상담 및 코칭</h4>
                  <p>심리상담, 심리검사, 코칭 등 다양한 프로그램으로 고객들이 원하는 서비스를 제공하고 있습니다.</p>
                  <Link to="/counseling">More</Link>
                </div>
              </div>
              <div className="box_cont bg_img03">
                <div>
                  <h4 className="tit_02">임상 수련/교육</h4>
                  <p>이 과정은 사람의 마음을 온전히 이해하고자 노력하고, 건강하게 회복하도록 돕고자 자신의 삶을 결정한 전문상담사들의 교육 과정입니다.</p>
                  <Link to="/education">More</Link>
                </div>
              </div>
            </div>
            <h4 className="tit_03">서울특별시 영등포구 당산동5가 11-47 로뎀나무내과 5층 <em>헤세드상담코칭연구소</em></h4>
            <div className="box_map" style={{ overflow: 'hidden' }}>
              <div className="map_area" id="map" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
