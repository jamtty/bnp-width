import Header from '../components/Header';
import Footer from '../components/Footer';

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  isNew?: boolean;
}

const noticeList: NoticeItem[] = [
  { id: 10, title: '2024년 하반기 집단상담 프로그램 참여자 모집', date: '2024.09.01', isNew: true },
  { id: 9, title: 'EAP 서비스 이용 안내 및 상담 예약 방법', date: '2024.08.20', isNew: true },
  { id: 8, title: '2024년 인턴·레지던트 과정 모집 공고', date: '2024.07.15' },
  { id: 7, title: '상담사 보수교육 일정 안내 (2024년 3분기)', date: '2024.06.30' },
  { id: 6, title: '헤세드 상담코칭연구소 여름 휴가 안내', date: '2024.06.20' },
  { id: 5, title: '기독교 상담 전문가 과정 수강생 모집', date: '2024.05.10' },
  { id: 4, title: '2024년 상반기 슈퍼비전 그룹 참여자 모집', date: '2024.04.05' },
  { id: 3, title: '연구소 운영시간 변경 안내', date: '2024.03.15' },
  { id: 2, title: '2024년 EAP 전문가 양성 과정 모집', date: '2024.02.20' },
  { id: 1, title: '헤세드 상담코칭연구소 홈페이지 오픈 안내', date: '2024.01.02' },
];

const NoticePage = () => {
  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual */}
        <div id="visual" className="bg_bann_img05">
          <div className="bg_bann_img05">
            <h3>공지사항</h3>
            <div className="location">
              <span>홈</span>
              <span>공지사항</span>
            </div>
          </div>
        </div>

        <div id="contents">
          <div id="sub05_01" className="cont_area">
            <div className="cont_w_area">
              <h4 className="tit_01">공지사항</h4>
              <div className="cont_txt">
                <table className="tbl_type01">
                  <colgroup>
                    <col style={{ width: '80px' }} />
                    <col />
                    <col style={{ width: '120px' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">번호</th>
                      <th scope="col">제목</th>
                      <th scope="col">등록일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noticeList.map((item) => (
                      <tr key={item.id}>
                        <td className="tc">{item.id}</td>
                        <td>
                          <a href={`/notice/${item.id}`}>
                            {item.title}
                            {item.isNew && <span className="ico_new">N</span>}
                          </a>
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

export default NoticePage;
