import Header from '../components/Header';
import Footer from '../components/Footer';

const CounselingPage = () => {
  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual */}
        <div id="visual" className="bg_bann_img03">
          <div className="bg_bann_img03">
            <h3>상담 및 코칭</h3>
            <div className="location">
              <span>홈</span>
              <span>상담 및 코칭</span>
            </div>
          </div>
        </div>

        <div id="contents">
          {/* 심리상담 / 심리검사 */}
          <div id="sub03_01" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">심리상담 &amp;<br />심리검사</h4>
              <div className="cont_txt">
                <strong>전문 상담사와 함께하는 심리상담 및 심리검사 서비스입니다.</strong>

                <div className="box_type02">
                  <div>
                    <h5 className="tit_02">심리상담</h5>
                    <p>
                      개인이 경험하는 심리적 어려움, 감정 문제, 대인관계 갈등,
                      자기 이해 등 다양한 주제에 대해 전문 상담사와 1:1로 진행하는
                      상담 서비스입니다.
                    </p>
                    <ul>
                      <li>우울·불안·스트레스 상담</li>
                      <li>대인관계 및 가족 갈등 상담</li>
                      <li>자아정체성 및 자기 이해 상담</li>
                      <li>트라우마 및 위기 상담</li>
                      <li>기독교 상담 (신앙 기반 상담)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="tit_02">심리검사</h5>
                    <p>
                      표준화된 심리검사 도구를 활용하여 개인의 심리적 특성, 성격,
                      욕구, 대인관계 패턴 등을 객관적으로 파악하고 상담에 활용합니다.
                    </p>
                    <ul>
                      <li>MBTI 성격유형검사</li>
                      <li>MMPI 다면적 인성검사</li>
                      <li>에니어그램 검사</li>
                      <li>SCT 문장완성검사</li>
                      <li>직업흥미검사 / 진로탐색검사</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 코칭 */}
          <div id="sub03_02" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">코칭</h4>
              <div className="cont_txt">
                <strong>목표 달성과 잠재력 개발을 위한 전문 코칭 프로그램입니다.</strong>
                <p>
                  코칭은 코치와 클라이언트가 협력적 파트너십을 통해 개인의 목표를 명확히 하고,
                  잠재적 가능성을 최대로 이끌어내는 과정입니다. 헤세드 상담코칭연구소의
                  전문 코치와 함께 삶의 방향을 찾아가세요.
                </p>
                <ul className="list_type01">
                  <li>
                    <strong>라이프 코칭</strong>
                    <p>삶의 목표와 비전을 명확히 하고, 균형 잡힌 삶을 영위하도록 돕는 코칭 과정입니다.</p>
                  </li>
                  <li>
                    <strong>커리어 코칭</strong>
                    <p>직업적 목표 설정, 경력 개발, 진로 전환 등 커리어 전반에 걸친 코칭을 제공합니다.</p>
                  </li>
                  <li>
                    <strong>리더십 코칭</strong>
                    <p>리더로서의 역량 개발과 효과적인 팀 관리를 위한 맞춤형 코칭 프로그램입니다.</p>
                  </li>
                  <li>
                    <strong>기독교 코칭</strong>
                    <p>신앙을 기반으로 한 삶의 목적 발견과 영적 성장을 위한 코칭 과정입니다.</p>
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

export default CounselingPage;
