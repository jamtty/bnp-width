import Header from '../components/Header';
import Footer from '../components/Footer';

const EducationPage = () => {
  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual start */}
        <div id="visual">
          <div className="bg_bann_img04">
            <h3>임상 수련/교육</h3>
            <p>
              이 과정은 사람의 마음을 온전히 이해하고자 노력하고, 건강하게<br />
              회복하도록 돕고자 자신의 삶을 결정한 전문상담사들의 교육 과정입니다.
            </p>
            <div className="location">
              <span>홈</span>
              <span>임상 수련/교육</span>
            </div>
          </div>
        </div>
        {/* visual end */}

        <div id="contents">

          {/* 교육과정 start */}
          <div className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">교육과정</h4>
              <div className="cont_txt pt20 pb0">

                {/* 인턴 과정 start */}
                <h5 className="tit_05" id="sub04_01">인턴 과정</h5>
                <div className="obj_txt">
                  <span className="block_txt">1년 과정으로 학사 3학년 이상부터 가능합니다.</span>
                  <span className="block_txt">상담사례 개념화에 근거한 집단슈퍼비전 교육과 상담 사례 경험, 면접 상담 경험으로 이루어집니다.</span>
                </div>
                {/* 인턴 과정 end */}

                {/* 레지던트 과정 start */}
                <h5 className="tit_05">레지던트 과정</h5>
                <div className="obj_txt">
                  <span className="block_txt">2년 과정으로 인터 과정 수료자에 한하여 교육 신청 가능합니다. </span>
                  <span className="block_txt">상담사례 개념화에 근거한 집단슈퍼비전과 상담 사례 경험과 면접 상담 경험, 심리검사 진행 경험으로 이루어집니다.</span>
                </div>
                {/* 레지던트 과정 end */}

                {/* 교육분석 start */}
                <h5 className="tit_05" id="sub04_02">교육분석</h5>
                <div className="obj_txt">
                  <span className="block_txt">교육분석은 정신분석이론에 근거한 정신치료 교육분석을 진행합니다. 상담자로서 필수적 능력은 자기 통찰의 능력입니다.</span>
                  <span className="block_txt">이를 위해 상담자에게 꼭 필요한 정신분석 기반 교육분석을 진행합니다.</span>
                  <span className="block_txt">회기 별 시간은 50분이나 100분 선택 가능합니다.</span>
                </div>
                {/* 교육분석 end */}

                {/* 개인 슈퍼비전 start */}
                <h5 className="tit_05">개인 슈퍼비전</h5>
                <div className="obj_txt">1:1슈퍼비전과 1:3 슈퍼비전을 진행합니다. </div>
                {/* 개인 슈퍼비전 end */}

                {/* 상담교육 프로그램 start */}
                <h5 className="tit_05" id="sub04_03">상담교육 프로그램</h5>
                <div className="obj_txt pb0">
                  <ul className="list_type">
                    <li>
                      <strong>상담 사례 개념화 교육</strong>
                      <p>
                        <span className="block_txt">상담이론 사례 개념화, 정신역동 사례 개념화, 부부치료 사례 개념화, 상담 관련 다양한 교육 등을 교육합니다.</span>
                        <span className="block_txt">이 과정은 전문상담사로서 훈련하는 기초이며 필수과정입니다.</span>
                      </p>
                    </li>
                    <li>
                      <strong>상담 기술 교육</strong>
                      <p>
                        <span className="block_txt">전문 상담자로서 준비하기 위한 상담의 기본 기술 교육을 진행합니다.</span>
                        <span className="block_txt">상담자의 공감훈련, 상담의 구조화 훈련, 상담 기본 기술 훈련을 교육합니다.</span>
                      </p>
                    </li>
                    <li>
                      <strong>집단 상담 교육</strong>
                      <p>
                        <span className="block_txt">집단상담의 경험은 상담자로서 다양한 사람들의 내면과 역동을 경험하게 합니다.</span>
                        <span className="block_txt">이에 대상관계 집단상담 및 공감 훈련 집단 상담 등 다양한 이론에 근거한 집단상담이 진행됩니다.</span>
                      </p>
                    </li>
                    <li>
                      <strong>심리검사 교육</strong>
                      <p>
                        <span className="block_txt">심리 검사교육은 전문 임상심리사로서부터 상담자로서 필요한 심리검사 실시 및 해석 능력을 향상하는 교육입니다.</span>
                        <span className="block_txt">종합심리 검사 훈련과 다양한 심리검사에 관한 훈련을 하게 됩니다.</span>
                      </p>
                    </li>
                  </ul>
                </div>
                {/* 상담교육 프로그램 end */}

              </div>
            </div>
          </div>
          {/* 교육과정 end */}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EducationPage;
