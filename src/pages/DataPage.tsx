import Header from '../components/Header';
import Footer from '../components/Footer';

interface DataItem {
  id: number;
  category: string;
  title: string;
  date: string;
  fileExt?: string;
}

const dataList: DataItem[] = [
  { id: 10, category: '교육자료', title: '2024년 EAP 스트레스 관리 워크북', date: '2024.09.05', fileExt: 'PDF' },
  { id: 9, category: '연구자료', title: '기독교 상담의 이론과 실제 (요약)', date: '2024.08.18', fileExt: 'PDF' },
  { id: 8, category: '교육자료', title: '집단상담 운영 가이드', date: '2024.07.20', fileExt: 'PDF' },
  { id: 7, category: '양식', title: '상담 신청서 양식', date: '2024.07.01', fileExt: 'HWP' },
  { id: 6, category: '연구자료', title: '게슈탈트 상담 기법 소개 자료', date: '2024.06.10', fileExt: 'PDF' },
  { id: 5, category: '교육자료', title: '인지행동치료(CBT) 워크시트 모음', date: '2024.05.22', fileExt: 'PDF' },
  { id: 4, category: '양식', title: '슈퍼비전 사례 보고서 양식', date: '2024.04.15', fileExt: 'HWP' },
  { id: 3, category: '연구자료', title: '직장인 심리건강 설문 결과 보고서', date: '2024.03.30', fileExt: 'PDF' },
  { id: 2, category: '교육자료', title: '리더십 코칭 프로그램 안내서', date: '2024.02.14', fileExt: 'PDF' },
  { id: 1, category: '양식', title: '개인정보 수집 및 이용 동의서', date: '2024.01.05', fileExt: 'PDF' },
];

const DataPage = () => {
  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual */}
        <div id="visual" className="bg_bann_img06">
          <div className="bg_bann_img06">
            <h3>자료실</h3>
            <div className="location">
              <span>홈</span>
              <span>자료실</span>
            </div>
          </div>
        </div>

        <div id="contents">
          <div id="sub06_01" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">자료실</h4>
              <div className="cont_txt">
                <div className="search_area">
                  <select>
                    <option value="">전체</option>
                    <option value="edu">교육자료</option>
                    <option value="research">연구자료</option>
                    <option value="form">양식</option>
                  </select>
                  <input type="text" placeholder="검색어를 입력하세요" />
                  <button type="button">검색</button>
                </div>

                <table className="tbl_type01">
                  <colgroup>
                    <col style={{ width: '80px' }} />
                    <col style={{ width: '100px' }} />
                    <col />
                    <col style={{ width: '80px' }} />
                    <col style={{ width: '120px' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">번호</th>
                      <th scope="col">분류</th>
                      <th scope="col">제목</th>
                      <th scope="col">파일</th>
                      <th scope="col">등록일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map((item) => (
                      <tr key={item.id}>
                        <td className="tc">{item.id}</td>
                        <td className="tc">{item.category}</td>
                        <td>
                          <a href={`/data/${item.id}`}>
                            {item.title}
                          </a>
                        </td>
                        <td className="tc">
                          {item.fileExt && (
                            <span className={`ico_file ${item.fileExt.toLowerCase()}`}>
                              {item.fileExt}
                            </span>
                          )}
                        </td>
                        <td className="tc">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="paging">
                  <a href="#" className="btn_prev">이전</a>
                  <strong className="on">1</strong>
                  <a href="#">2</a>
                  <a href="#" className="btn_next">다음</a>
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

export default DataPage;
