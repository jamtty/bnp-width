import Header from '../components/Header';
import Footer from '../components/Footer';

const InfoPage = () => {

  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual */}
        <div id="visual" className="bg_bann_img01">
          <div className="bg_bann_img01">
            <h3>헤세드 상담코칭 연구소</h3>
            <div className="location">
              <span>홈</span>
              <span>헤세드 상담코칭 연구소</span>
            </div>
          </div>
        </div>

        <div id="contents">
          {/* 인사말 */}
          <div id="sub01_01" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">인사말</h4>
              <div className="cont_txt">
                <strong>안녕하세요 헤세드 상담코칭연구소입니다.</strong>
                <p>
                  본 연구소는 인애와 사랑의 의미인 헤세드의 정신을 바탕으로 설립된
                  사람들의 마음을 품는 공간, 꿈을 품는 공간입니다.<br />
                  이에 사람들의 마음의 소리에 진정으로 귀기울이며, 정신과 관계가 회복되고
                  자신의 진정한 꿈을 발견하는 연구소가 되도록 최선을 다하겠습니다.
                  또한 함께 돌보고 함께 발견하고 함께 성장하는 연구소가 되겠습니다.<br /><br />
                  많은 관심과 격려 부탁드립니다.<br />
                  감사합니다.
                </p>
                <span className="txt_aside">헤세드 상담코칭연구소</span>
              </div>
            </div>
          </div>

          {/* 상담 및 코칭 교육영역 */}
          <div id="sub01_02" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">상담 및 코칭<br />교육영역</h4>
              <div className="cont_txt">
                <strong>헤세드 상담코칭연구소는 다양한 영역에 상담과 코칭, 교육 프로그램을 제공합니다.</strong>
                <div className="box_img">
                  <div>
                    <img src="/assets/main/images/common/img_bann01.png" alt="EAP 영역" />
                    <p>EAP 영역</p>
                  </div>
                  <div>
                    <img src="/assets/main/images/common/img_bann02.png" alt="개인 및 가족" />
                    <p>개인 및 가족</p>
                  </div>
                  <div>
                    <img src="/assets/main/images/common/img_bann03.png" alt="전문상담사 교육" />
                    <p>전문상담사 교육</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 조직도 */}
          <div id="sub01_03" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">조직도</h4>
              <div className="cont_txt">
                <ul className="cont_group">
                  <li>
                    <span>대표</span>
                    <div className="toolTip">
                      <h5 className="tit_04">
                        <span>임국진</span>
                        <a href="javascript:void(0)" className="btn_close">Close</a>
                      </h5>
                      <ul>
                        <li>현 진인글로벌 대표</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <span>소장</span>
                    <div className="toolTip">
                      <h5 className="tit_04">
                        <span>윤인 교수</span>
                        <a href="javascript:void(0)" className="btn_close">Close</a>
                      </h5>
                      <ul>
                        <li>University of Missouri Columbia 상담심리학 박사</li>
                        <li>전 한동대학교 상담대학원 교수</li>
                        <li>전 연세대학교 부설 기독교 상담 및 코칭 센터 슈퍼바이저</li>
                        <li>현 한국기독교상담심리학회 감독</li>
                        <li>한국상담심리학회 1급 전문가</li>
                        <li>한국상담학회 1급 전문가</li>
                        <li>한국게슈탈트 상담심리학회 1급 전문가</li>
                      </ul>
                    </div>

                    <span className="etc">자문위원</span>
                    <div className="toolTip w645">
                      <div>
                        <h5 className="tit_04"><span>이유경 교수</span></h5>
                        <ul>
                          <li>연세대학교 상담코칭학 박사</li>
                          <li>현 숭실사이버대학교 기독교상담복지학과 교수</li>
                          <li>기독교 상담심리학회 감독</li>
                          <li>가족문화상담협회 수련감독</li>
                          <li>한국 EAP 수련감독</li>
                          <li>한국 청소년 상담학회 수련감독</li>
                          <li>생명문화학회 이사 및 윤리위원장</li>
                        </ul>
                      </div>
                      <div className="space_area1">
                        <h5 className="tit_04">
                          <span>오화철 교수</span>
                          <a href="javascript:void(0)" className="btn_close">Close</a>
                        </h5>
                        <ul>
                          <li>미국 뉴욕 유니온신학대학원 상담학 박사</li>
                          <li>현 서울기독대학교 상담심리학과 교수</li>
                          <li>한국기독교상담심리학회 감독</li>
                          <li>한국가족문화상담협회 가족상담 수련감독</li>
                          <li>한국가족문화상담협회 기업상담 전문가 1급</li>
                          <li>한국목회상담협회 감독</li>
                        </ul>
                      </div>
                      <div className="space_area2">
                        <h5 className="tit_04">
                          <span>장정은 교수</span>
                          <a href="javascript:void(0)" className="btn_close">Close</a>
                        </h5>
                        <ul>
                          <li>서울대 종교학과 학사</li>
                          <li>미국 드류대학교 심리학과 종교학 박사</li>
                          <li>현 이화여자대학교 기독교상담학과 교수</li>
                          <li>미국공인정신분석가(NCPsyA)</li>
                          <li>한국기독교상담심리학회 전문상담사 수련감독</li>
                          <li>한국기독교상담심리학회 놀이 아동 상담사 수련감독</li>
                          <li>한국목회상담협회 목회상담전문가</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span>전문상담사</span>
                    <div className="toolTip">
                      <h5 className="tit_04">
                        <span>전문상담사</span>
                        <a href="javascript:void(0)" className="btn_close">Close</a>
                      </h5>
                      <ul>
                        <li>석사 이상의 상담 관련 국가자격증 및 한국의 4대 학회 자격증 보유한 전문상담사를 통해 상담이 진행된다.</li>
                      </ul>
                    </div>

                    <span>연구팀</span>
                    <div className="toolTip">
                      <h5 className="tit_04">
                        <span>연구팀</span>
                        <a href="javascript:void(0)" className="btn_close">Close</a>
                      </h5>
                      <ul>
                        <li>다양한 교육 프로그램을 위한 연구를 담당한다.</li>
                      </ul>
                    </div>

                    <span>교육 전담팀</span>
                    <div className="toolTip">
                      <h5 className="tit_04">
                        <span>교육 전담팀</span>
                        <a href="javascript:void(0)" className="btn_close">Close</a>
                      </h5>
                      <ul>
                        <li>각 계층 및 EAP 교육을 위한 전문 교육 전담팀을 운영한다.</li>
                      </ul>
                    </div>

                    <span>홍보팀</span>
                    <div className="toolTip">
                      <h5 className="tit_04">
                        <span>홍보팀</span>
                        <a href="javascript:void(0)" className="btn_close">Close</a>
                      </h5>
                      <ul>
                        <li>다양한 홍보를 통해 다양한 계층이 혜택을 얻을 수 있도록 운영한다.</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 비전 */}
          <div id="sub01_04" className="cont_area">
            <div className="cont_w_area">
              <h4 className="blind">비전</h4>
              <div className="cont_txt box_icon">
                <div>
                  <div className="is_ico ico_img01">Icon</div>
                  <strong>개인과 가족의 정신건강</strong>
                  <p>진정한 자기 발견, 대인관계 능력 향상 및 균형을 통해 개인과 가족의 정신건강을 도모</p>
                </div>
                <div>
                  <div className="is_ico ico_img02">Icon</div>
                  <strong>건강한 조직 문화 형성</strong>
                  <p>EAP 프로그램을 통한 직업현장에서의 건강한 자기 개발, 관계와 건강한 기업문화 및 생산력 향상을 도모</p>
                </div>
                <div>
                  <div className="is_ico ico_img03">Icon</div>
                  <strong>전문 상담사 양성</strong>
                  <p>전문상담가로서 분명한 정체성과 능력을 함양</p>
                </div>
                <div>
                  <div className="is_ico ico_img04">Icon</div>
                  <strong>나눔과 섬김</strong>
                  <p>함께 돌보며 나누는 삶을 실천</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오시는 길 */}
          <div id="sub01_05" className="cont_w_area">
            <h4 className="tit_03">
              서울특별시 영등포구 당산동5가 11-47 로뎀나무내과 5층
              <em>헤세드상담코칭연구소</em>
            </h4>
            <div className="box_map" style={{ overflow: 'hidden' }}>
              <iframe
                className="map_area"
                src="https://maps.google.com/maps?q=37.530774,126.904339&z=16&output=embed"
                style={{ border: 0, width: '100%', height: '420px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="헤세드상담코칭연구소 위치"
              />
              <div className="map_pub_tran">
                <div>
                  <strong>주변지하철</strong>
                  <p>
                    <span className="col_green01">2호선</span> /{' '}
                    <span className="col_gold01">9호선</span> 당산역
                  </p>
                </div>
                <div>
                  <strong>주변 버스</strong>
                  <p>
                    <em className="col_bule01">간선</em> 605, 661, 670, 760 /{' '}
                    <em className="col_green02">지선</em> 5616, 5714, 6514, 6623 /{' '}
                    <em className="col_red01">광역</em> 9707, M7625 /{' '}
                    <em>공항</em> 6008<br />
                    <em>일반</em> 60, 60-3, 69, 70-2, 88 /{' '}
                    <em>좌석</em> 700, 830, 870, 871 /{' '}
                    <em>마을</em> 영등포03 /{' '}
                    <em>직행</em> 1082, 1500, 8000, 8600, 8601, 9030
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InfoPage;
