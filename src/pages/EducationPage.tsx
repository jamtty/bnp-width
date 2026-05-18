import Header from '../components/Header';
import Footer from '../components/Footer';

const EducationPage = () => {
  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual */}
        <div id="visual" className="bg_bann_img04">
          <div className="bg_bann_img04">
            <h3>임상 수련/교육</h3>
            <div className="location">
              <span>홈</span>
              <span>임상 수련/교육</span>
            </div>
          </div>
        </div>

        <div id="contents">
          {/* 인턴, 레지던트 과정 */}
          <div id="sub04_01" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">인턴,<br />레지던트과정</h4>
              <div className="cont_txt">
                <strong>전문상담사로의 성장을 위한 체계적인 임상 수련 과정입니다.</strong>
                <p>
                  헤세드 상담코칭연구소는 전문상담사를 꿈꾸는 이들에게
                  현장 중심의 임상 수련 기회를 제공합니다.
                  석사 이상의 상담 관련 학위 소지자를 대상으로 하며,
                  전문 슈퍼바이저의 지도 아래 실질적인 상담 역량을 키울 수 있습니다.
                </p>
                <div className="box_type02">
                  <div>
                    <h5 className="tit_02">인턴과정</h5>
                    <ul>
                      <li>대상: 상담 관련 전공 석사과정 재학생 또는 졸업생</li>
                      <li>기간: 1년 과정 (주 2~3일 출근)</li>
                      <li>내용: 개인상담 실습, 사례 개념화, 그룹 슈퍼비전</li>
                      <li>자격: 한국상담학회 2급 자격 취득 연계</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="tit_02">레지던트과정</h5>
                    <ul>
                      <li>대상: 인턴 수료 후 또는 상담 경력 2년 이상</li>
                      <li>기간: 1~2년 과정</li>
                      <li>내용: 개인·집단상담 운영, 심층 슈퍼비전, 연구 활동</li>
                      <li>자격: 한국상담학회 1급 자격 취득 연계</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 교육분석, 슈퍼비전 */}
          <div id="sub04_02" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">교육분석,<br />슈퍼비전</h4>
              <div className="cont_txt">
                <strong>전문상담사로서의 자기 성장과 상담 역량 향상을 위한 과정입니다.</strong>
                <ul className="list_type01">
                  <li>
                    <strong>개인 교육분석</strong>
                    <p>
                      상담사 자신의 내면을 탐색하고 개인적 문제를 해결함으로써
                      보다 효과적인 상담을 수행할 수 있도록 돕는 개인 분석 과정입니다.
                    </p>
                  </li>
                  <li>
                    <strong>개인 슈퍼비전</strong>
                    <p>
                      1:1 슈퍼비전을 통해 상담사례를 심층적으로 검토하고
                      전문적 역량을 강화합니다. 숙련된 슈퍼바이저와 함께
                      개별적인 피드백을 받을 수 있습니다.
                    </p>
                  </li>
                  <li>
                    <strong>그룹 슈퍼비전</strong>
                    <p>
                      소그룹 형태로 진행되는 집단 슈퍼비전으로, 다양한 사례를
                      공유하고 동료들과 함께 성장하는 과정입니다.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 상담교육 프로그램 */}
          <div id="sub04_03" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">상담교육<br />프로그램</h4>
              <div className="cont_txt">
                <strong>다양한 계층을 위한 상담 교육 프로그램을 운영합니다.</strong>
                <ul className="list_type01">
                  <li>
                    <strong>상담이론 및 기법 교육</strong>
                    <p>인지행동치료, 게슈탈트 치료, 정신역동 등 다양한 상담이론과 실제 적용 기법을 배웁니다.</p>
                  </li>
                  <li>
                    <strong>집단상담 지도자 양성 과정</strong>
                    <p>집단 역동의 이해와 집단상담 운영 능력을 개발하는 실습 중심 교육 과정입니다.</p>
                  </li>
                  <li>
                    <strong>기독교 상담 전문가 과정</strong>
                    <p>기독교적 세계관을 바탕으로 한 상담 접근법과 목회 상담의 이론 및 실제를 다룹니다.</p>
                  </li>
                  <li>
                    <strong>EAP 전문가 양성 과정</strong>
                    <p>기업 현장에서 EAP를 효과적으로 운영할 수 있는 전문 인력을 양성하는 교육 과정입니다.</p>
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

export default EducationPage;
