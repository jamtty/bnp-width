import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchNoticeDetail, type NoticeDetail, type NoticeFile } from '../api/notice';
import { toAbsUrl, resolveContentUrls } from '../utils/uploadUrl';

const NoticeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<NoticeDetail | null>(null);
  const [files, setFiles] = useState<NoticeFile[]>([]);
  const [prev, setPrev] = useState<{ id: number; title: string } | null>(null);
  const [next, setNext] = useState<{ id: number; title: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    fetchNoticeDetail(Number(id))
      .then((res) => {
        setItem(res.item);
        setFiles(res.files);
        setPrev(res.prev);
        setNext(res.next);
      })
      .catch((e) => setError(e.message || '데이터를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

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

            {loading ? (
              <div style={{ padding: '60px 0', textAlign: 'center' }}>불러오는 중...</div>
            ) : error ? (
              <div style={{ padding: '60px 0', textAlign: 'center' }}>
                <p>{error}</p>
                <button className="btn" onClick={() => navigate('/notice')} style={{ marginTop: '20px' }}>목록으로</button>
              </div>
            ) : !item ? (
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
                      <li>등록일: {item.created_at}</li>
                      <li>조회수: {item.view_count}</li>
                      <li>
                        첨부파일:{' '}
                        {files.length > 0 ? (
                          files.map((f) => (
                            <a
                              key={f.id}
                              href={toAbsUrl(f.file_url)}
                              className="file indent"
                              download={f.ori_name}
                              data-tooltip-text={f.ori_name}
                            >
                              {f.ori_name}
                            </a>
                          ))
                        ) : (
                          <span>없음</span>
                        )}
                      </li>
                    </ul>
                  </div>
                  <div
                    className="obj_cont"
                    dangerouslySetInnerHTML={{ __html: resolveContentUrls(item.content ?? '') }}
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
                    {prev && (
                      <tr>
                        <th scope="row" className="td_c">이전글</th>
                        <td>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate(`/notice/${prev.id}`); }}
                          >
                            {prev.title}
                          </a>
                        </td>
                      </tr>
                    )}
                    {next && (
                      <tr>
                        <th scope="row" className="td_c">다음글</th>
                        <td>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate(`/notice/${next.id}`); }}
                          >
                            {next.title}
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
