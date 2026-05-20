import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { dataList } from '../data/dataData';

const DataDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itemId = Number(id);

  const item = dataList.find((d) => d.id === itemId);
  const currentIndex = item ? dataList.findIndex((d) => d.id === itemId) : -1;
  const prevItem = currentIndex > 0 ? dataList[currentIndex - 1] : null;
  const nextItem = currentIndex >= 0 && currentIndex < dataList.length - 1 ? dataList[currentIndex + 1] : null;

  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual start */}
        <div id="visual">
          <div className="bg_bann_img06">
            <h3>자료실</h3>
            <div className="location">
              <span>홈</span>
              <span>자료실</span>
            </div>
          </div>
        </div>
        {/* visual end */}

        <div id="contents">
          <div className="cont_w_area">

            {!item ? (
              <div style={{ padding: '60px 0', textAlign: 'center' }}>
                <p>해당 자료를 찾을 수 없습니다.</p>
                <button className="btn" onClick={() => navigate('/data')} style={{ marginTop: '20px' }}>
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
                      <li>분류: {item.category}</li>
                      <li>등록일: {item.date}</li>
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
                          <span>{item.fileExt ?? '없음'}</span>
                        )}
                      </li>
                    </ul>
                  </div>
                  <div
                    className="obj_cont"
                    dangerouslySetInnerHTML={{
                      __html: item.content ?? '<p style="color:#888;text-align:center">내용이 없습니다.</p>',
                    }}
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
                            onClick={(e) => { e.preventDefault(); navigate(`/data/${prevItem.id}`); }}
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
                            onClick={(e) => { e.preventDefault(); navigate(`/data/${nextItem.id}`); }}
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
                    <button className="btn" onClick={() => navigate('/data')}>목록</button>
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

export default DataDetailPage;
