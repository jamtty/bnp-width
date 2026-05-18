import Header from '../components/Header';
import Footer from '../components/Footer';

const EapPage = () => {
  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual */}
        <div id="visual" className="bg_bann_img02">
          <div className="bg_bann_img02">
            <h3>EAP</h3>
            <div className="location">
              <span>홈</span>
              <span>EAP</span>
            </div>
          </div>
        </div>

        <div id="contents">
          {/* EAP란 */}
          <div id="sub02_01" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">EAP란</h4>
              <div className="cont_txt">
                <strong>EAP(Employee Assistance Program)는 근로자 지원 프로그램입니다.</strong>
                <p>
                  EAP 프로그램은 개인의 정신 건강과 건강한 기업문화를 기반으로
                  조직문화 증진 및 생산성 향상을 목적으로 한 기업의 정신건강관리
                  프로그램입니다.<br /><br />
                  직원들이 직면하는 개인적·직업적 문제들을 해결하고, 조직의 건강한
                  문화를 형성하기 위해 전문적인 상담 서비스와 심리교육을 제공합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 상담 및 코칭 심리진단 */}
          <div id="sub02_02" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">상담 및 코칭<br />심리진단</h4>
              <div className="cont_txt">
                <strong>전문적인 심리진단을 통해 개인과 조직의 건강을 점검합니다.</strong>
                <ul className="list_type01">
                  <li>
                    <strong>개인상담</strong>
                    <p>직무스트레스, 대인관계, 심리적 어려움 등 개인이 경험하는 다양한 문제에 대한 전문 상담 서비스를 제공합니다.</p>
                  </li>
                  <li>
                    <strong>코칭</strong>
                    <p>리더십 향상, 커리어 개발, 자기계발 등 목표 달성을 위한 전문 코칭 프로그램을 운영합니다.</p>
                  </li>
                  <li>
                    <strong>심리검사</strong>
                    <p>표준화된 심리검사 도구를 활용하여 개인의 심리적 특성과 욕구를 파악하고 적합한 프로그램을 안내합니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 조직지원 프로그램 */}
          <div id="sub02_03" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">조직지원<br />프로그램</h4>
              <div className="cont_txt">
                <strong>조직의 건강한 문화 형성과 구성원의 역량 강화를 지원합니다.</strong>
                <ul className="list_type01">
                  <li>
                    <strong>스트레스 관리 교육</strong>
                    <p>직무 스트레스 원인 파악 및 효과적인 관리 방법을 교육합니다.</p>
                  </li>
                  <li>
                    <strong>대인관계 향상 프로그램</strong>
                    <p>구성원 간 원활한 소통과 협력을 위한 대인관계 역량 강화 프로그램입니다.</p>
                  </li>
                  <li>
                    <strong>리더십 교육</strong>
                    <p>팀장·관리자를 위한 리더십 역량 개발 및 부하직원 상담·지원 능력 향상 프로그램입니다.</p>
                  </li>
                  <li>
                    <strong>조직문화 개선 컨설팅</strong>
                    <p>조직진단을 기반으로 건강하고 생산적인 조직문화 형성을 위한 맞춤형 컨설팅을 제공합니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EapPage;
