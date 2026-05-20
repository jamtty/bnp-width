import Header from '../components/Header';
import Footer from '../components/Footer';
import imgBann01_2 from '../assets/main/images/common/img_bann01_2.png';
import imgBann04 from '../assets/main/images/common/img_bann04.png';
import imgBann05 from '../assets/main/images/common/img_bann05.png';
import imgBann06 from '../assets/main/images/common/img_bann06.png';
import imgBann07 from '../assets/main/images/common/img_bann07.png';
import imgBann08 from '../assets/main/images/common/img_bann08.png';
import imgBann09 from '../assets/main/images/common/img_bann09.png';
import imgBann10 from '../assets/main/images/common/img_bann10.png';
import imgBann11 from '../assets/main/images/common/img_bann11.png';

const EapPage = () => {
  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual start */}
        <div id="visual">
          <div className="bg_bann_img02">
            <h3>EAP</h3>
            <p>
              EAP 프로그램은 개인의 정신건강과 건강한 기업문화을 기반으로 조직문화 증진 및<br />
              생산성 향상을 목적으로 한 기업의 정신건강관리 프로그램 입니다.
            </p>
            <div className="location">
              <span>홈</span>
              <span>EAP</span>
            </div>
          </div>
        </div>
        {/* visual end */}

        <div id="contents">

          {/* 상담 및 코칭 start */}
          <div id="sub02_01" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">상담 및 코칭</h4>
              <div className="cont_txt">
                <div className="box_img type01">
                  <div>
                    <img src={imgBann01_2} alt="개인상담 및 코칭 설명을 돕기위한 예시" />
                    <p>개인상담 및 코칭</p>
                    <span>스트레스, 우울, 불안, 성격 등의 심리적 문제 등을 상담과 코칭</span>
                  </div>
                  <div>
                    <img src={imgBann04} alt="대인관계 상담 및 코칭 설명을 돕기위한 예시" />
                    <p>대인관계 상담 및 코칭</p>
                    <span>직장 내 대인관계, 자녀양육, 부부관계, 다양한 가족문제 등 대인관계 문제에 관한 상담과 코칭</span>
                  </div>
                  <div>
                    <img src={imgBann05} alt="조직능력 향상 상담 및 코칭 설명을 돕기위한 예시" />
                    <p>조직능력 향상 상담 및 코칭</p>
                    <span>조직적응 능력 향상, 적성 및 진로, 위기 상황 극복 등 다양한 현실 문제와 관련된 필요에 따라 상담과 코칭</span>
                  </div>
                </div>
                <span className="txt_exp">**  필요에 따라 개인상담, 부부상담, 아동청소년 상담, 집단상담 등으로 구분되어 진행됩니다</span>
              </div>
            </div>
          </div>
          {/* 상담 및 코칭 end */}

          {/* 심리진단 맞춤형 심리진단 프로그램 start */}
          <div id="sub02_02" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">심리진단<br /><em>맞춤형 심리진단 프로그램</em></h4>
              <div className="cont_txt">
                <strong>심리진단은 개인의 필요와 심리적 상태에 따라 맞춤형으로 진단합니다. </strong>
                <div className="box_img type02">
                  <div>
                    <img src={imgBann06} alt="간단한 심리진단 설명을 돕기위한 예시" />
                    <p>간단한 심리진단</p>
                  </div>
                  <div>
                    <img src={imgBann07} alt="맞춤형 진단 설명을 돕기위한 예시" />
                    <p>맞춤형 진단</p>
                  </div>
                  <div>
                    <img src={imgBann08} alt="종합 진단 설명을 돕기위한 예시" />
                    <p>종합 진단</p>
                  </div>
                </div>
                <span className="txt_exp">
                  <ul>
                    <li>심리적 진단 : 스트레스 우울 및 불안, 다양한 심리적 병리를 진단 </li>
                    <li>관계적 진단 : 결혼생활 및 부부관계 만족도, 대인관계 유형 및  만족도</li>
                    <li>무능력 진단 : 성격 및 적성평가, 직업 만족도, 갈등요인 분석 </li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
          {/* 심리진단 맞춤형 심리진단 프로그램 end */}

          {/* 조직지원 프로그램 start */}
          <div id="sub02_03" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">조직지원 프로그램</h4>
              <div className="cont_txt pb0">
                <div className="box_img type01">
                  <div>
                    <img src={imgBann09} alt="조직 맞춤형 프로그램 설명을 돕기위한 예시" />
                    <p>조직 맞춤형 프로그램</p>
                    <span>조직 지원 프로그램은 스트레스 관리, 팀워크 향상, 의사소통 능력을 통한 직무능력 향상, 가족 문제 해결을 통한 업무 안정성 향상 등</span>
                  </div>
                  <div>
                    <img src={imgBann10} alt="개인 유형별 프로그램 설명을 돕기위한 예시" />
                    <p>개인 유형별 프로그램</p>
                    <span>프로그램의 운영 방식은 워크샵, 집단 프로그램, 교육, 특강 등의 형식으로 참여 특성별 운영</span>
                  </div>
                  <div>
                    <img src={imgBann11} alt="힐링 프로그램 설명을 돕기위한 예시" />
                    <p>힐링 프로그램</p>
                    <span>업무로 인한 스트레스, 다양한 대인관계 문제, 현실 및 위기문제 등을 힐링할 수 있는 다양한 프로그램을 제공</span>
                  </div>
                </div>
                <span className="txt_exp">**  필요에 따라 개인상담, 부부상담, 아동청소년 상담, 집단상담 등으로 구분되어 진행됩니다</span>
              </div>
            </div>
          </div>
          {/* 조직지원 프로그램 end */}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EapPage;
