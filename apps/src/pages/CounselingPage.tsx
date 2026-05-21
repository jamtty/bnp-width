import Header from '../components/Header';
import Footer from '../components/Footer';
import imgBann12 from '../assets/main/images/common/img_bann12.png';
import imgBann13 from '../assets/main/images/common/img_bann13.png';
import imgBann14 from '../assets/main/images/common/img_bann14.png';
import imgBann15 from '../assets/main/images/common/img_bann15.png';
import imgBann16 from '../assets/main/images/common/img_bann16.png';
import imgBann17 from '../assets/main/images/common/img_bann17.png';

const CounselingPage = () => {
  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual start */}
        <div id="visual">
          <div className="bg_bann_img03">
            <h3>상담 및 코칭</h3>
            <p>
              심리상담, 심리검사, 코칭 등 다양한 프로그램으로 고객들이 원하는<br />
              서비스를 제공하고 있습니다.
            </p>
            <div className="location">
              <span>홈</span>
              <span>상담 및 코칭</span>
            </div>
          </div>
        </div>
        {/* visual end */}

        <div id="contents" className="pb0">

          {/* 상담 start */}
          <div id="sub03_01" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">상담</h4>
              <div className="cont_txt">
                <div className="box_img01">
                  <div>
                    <div>
                      <img src={imgBann12} alt="심리상담 설명을 돕기위한 예시" />
                      <p>심리상담</p>
                    </div>
                    <ul>
                      <li>개인상담</li>
                      <li>부부상담</li>
                      <li>아동 청소년 상담</li>
                      <li>집단상담</li>
                    </ul>
                  </div>
                  <div>
                    <div>
                      <img src={imgBann13} alt="선교사 상담 설명을 돕기위한 예시" />
                      <p>선교사 상담</p>
                    </div>
                    <ul>
                      <li>국내외 사역하고 있는 사역자 상담 프로그램</li>
                      <li>디브리핑(DEBRIEFING),  심리검사, 선교사 개인 및 부부 가족 상담  선교사 자녀 상담, 위기 상담, 팀 갈등 상담, 다양한 교육 제공 선교지 및 선교단체의 요청에 따라 선교지 방문하여 상담과 교육을 지원</li>
                    </ul>
                  </div>
                  <div>
                    <div>
                      <img src={imgBann14} alt="심리검사 설명을 돕기위한 예시" />
                      <p>심리검사</p>
                    </div>
                    <ul>
                      <li>맞춤형 진단검사</li>
                      <li>종합심리검사(full-battery) : <br />종합적 진단검사</li>
                      <li>Simple 심리검사<br />보통 1-3개 정도의  간단한 심리검사</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 상담 end */}

          {/* 코칭 start */}
          <div id="sub02_02" className="cont_area etc">
            <div className="cont_w_area">
              <h4 className="tit_01">코칭</h4>
              <div className="cont_txt">
                <div className="box_img01 pt0">
                  <div>
                    <div>
                      <img src={imgBann15} alt="라이프 코칭 설명을 돕기위한 예시" />
                      <p>라이프 코칭</p>
                    </div>
                    <ul>
                      <li>스트레스 관리, 시간 관리</li>
                      <li>의사소통, 관계문제</li>
                      <li>진로 및 적성 발견</li>
                      <li>리더쉽</li>
                    </ul>
                  </div>
                  <div>
                    <div>
                      <img src={imgBann16} alt="자녀양육 코칭 설명을 돕기위한 예시" />
                      <p>자녀양육 코칭</p>
                    </div>
                    <ul>
                      <li>자녀와의 의사소통</li>
                      <li>문제 행동 자녀 대처하기</li>
                      <li>발달단계별 자녀와 부모 관계 코칭</li>
                      <li>학습능력에 따른 부모의 역할 훈련</li>
                    </ul>
                  </div>
                  <div>
                    <div>
                      <img src={imgBann17} alt="학습 진로 코칭 설명을 돕기위한 예시" />
                      <p>학습 진로 코칭</p>
                    </div>
                    <ul>
                      <li>자기 주도학습의 수준을 높이는 코칭</li>
                      <li>학습효율성 높이는 코칭</li>
                      <li>일대일 맞춤형 학습 코칭</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 코칭 end */}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CounselingPage;
