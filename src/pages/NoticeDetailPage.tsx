import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { noticeList } from '../data/noticeData';

const NoticeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detailId = Number(id);

  const item = noticeList.find((n) => n.detailId === detailId);
  const currentIndex = item ? noticeList.findIndex((n) => n.detailId === detailId) : -1;
  const prevItem = currentIndex > 0 ? noticeList[currentIndex - 1] : null;
  const nextItem = currentIndex >= 0 && currentIndex < noticeList.length - 1 ? noticeList[currentIndex + 1] : null;

  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual start */}
        <div id="visual">
          <div className="bg_bann_img06">
            <h3>공지사항</h3>
            <div className="location">
              <span>홈</span>
              <span>공지사항</span>
            </div>
          </div>
        </div>
        {/* visual end */}

        <div id="contents">
          <div className="cont_w_area">

            {!item ? (
              <div style={{ padding: '60px 0', textAlign: 'center' }}>
                <p>해당 공지사항을 찾을 수 없습니다.</p>
                <button className="btn" onClick={() => navigate('/notice')} style={{ marginTop: '20px' }}>
                  목록으로
                </button>
              </div>
            ) : (
              <>
                {/* view start */}
                <div className="box_view">
                  <div className="obj_head">
                    <strong>{item.title}</strong>
                    <ul>
                      <li>등록일: {item.date}</li>
                      <li>조회수: {item.views}</li>
                      <li>
                        첨부파일:{' '}
                        {item.attachment ? (
                          <a
                            href={item.attachment.url}
                            className="file indent"
                            download
                            data-tooltip-text={item.attachment.name}
                          >
                            {item.attachment.name}
                          </a>
                        ) : (
                          <span>없음</span>
                        )}
                      </li>
                    </ul>
                  </div>
                  <div
                    className="obj_cont"
                    dangerouslySetInnerHTML={{ __html: `<p>안녕하세요 위드원상담코칭센터 입니다.</p><p>&nbsp;</p><p>지난 사례개념화 이론 기초/심화 과정이 성공적으로 끝나고 좋은 평이 많았습니다.&nbsp;</p><p>&nbsp;</p><p>4주 특강을 개설하였습니다. 많은 관심 부탁드립니다 ^___^</p><p>&nbsp;</p><p><img src="/upload/editor/20260404160837.png" title="2026?%20?%20??????%20??%20??.png"><br style="clear:both;">&nbsp;</p><p>&nbsp;</p><p>【수용전념치료 특강】&nbsp;</p><p>▷기간: 4월 23일부터 매주 목요일&nbsp;</p><p>▷시간: 오후 6시 30분~9시30분 (3시간씩)</p><p>▷수강료: 32만원 (수련생10% 할인시 288천원)</p><p>신청폼 ▶ <a href="https://forms.gle/RJvVYfYArXMRmXDAA">https://forms.gle/RJvVYfYArXMRmXDAA</a></p><p>&nbsp;</p><div><br></div>` }}
                  />
                </div>
                {/* view end */}

                {/* prev/next start */}
                <table className="tbl_type01" style={{ marginTop: '10px' }}>
                  <caption>이전글 / 다음글</caption>
                  <colgroup>
                    <col style={{ width: '15%' }} />
                    <col />
                  </colgroup>
                  <tbody>
                    {prevItem && (
                      <tr>
                        <th scope="row" className="td_c">이전글</th>
                        <td>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate(`/notice/${prevItem.detailId}`); }}
                          >
                            {prevItem.title}
                          </a>
                        </td>
                      </tr>
                    )}
                    {nextItem && (
                      <tr>
                        <th scope="row" className="td_c">다음글</th>
                        <td>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate(`/notice/${nextItem.detailId}`); }}
                          >
                            {nextItem.title}
                          </a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* prev/next end */}

                {/* btn start */}
                <div className="btn_area">
                  <div className="right">
                    <button className="btn" onClick={() => navigate('/notice')}>목록</button>
                  </div>
                </div>
                {/* btn end */}
              </>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NoticeDetailPage;
