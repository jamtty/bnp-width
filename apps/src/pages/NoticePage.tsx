import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchNoticeList, type NoticeItem } from '../api/notice';

const PAGE_SIZE = 10;

const NoticePage = () => {
  const navigate = useNavigate();
  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<NoticeItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchNoticeList({ page: currentPage, size: PAGE_SIZE, keyword: keyword || undefined, type: keyword ? 0 : undefined })
      .then((res) => {
        setItems(res.items);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      })
      .catch((e) => setError(e.message || '목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [currentPage, keyword]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setKeyword(inputKeyword);
  };

  const handlePageMove = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* visual start */}
        <div id="visual">
          <div className="bg_bann_img05">
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

            {/* search start */}
            <form id="search_form" name="search_form" onSubmit={handleSearch}>
              <fieldset className="asideSear">
                <legend>검색</legend>
                <label htmlFor="search_keyword">단어 입력</label>
                <input
                  type="text"
                  id="search_keyword"
                  name="search_keyword"
                  value={inputKeyword}
                  onChange={(e) => setInputKeyword(e.target.value)}
                />
                <button type="submit" className="btn">검색</button>
              </fieldset>
            </form>
            {/* search end */}

            {/* list start */}
            <table className="tbl_type01">
              <caption>공지사항 리스트</caption>
              <colgroup>
                <col style={{ width: '18%' }} />
                <col style={{ width: '46%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '18%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">날짜</th>
                  <th scope="col">조회</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="td_c">불러오는 중...</td></tr>
                ) : error ? (
                  <tr><td colSpan={4} className="td_c">{error}</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={4} className="td_c">게시물이 없습니다.</td></tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="td_c">{totalCount - (currentPage - 1) * PAGE_SIZE - index}</td>
                      <td className="td_c">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/notice/${item.id}`); }}>
                          {item.title}
                        </a>
                      </td>
                      <td className="td_c">{item.created_at}</td>
                      <td className="td_c">{item.view_count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* list end */}

            {/* paging start */}
            <div className="paging">
              <h4 className="blind">paging</h4>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <a
                  key={page}
                  href="#"
                  className={currentPage === page ? 'on' : undefined}
                  onClick={(e) => handlePageMove(e, page)}
                >
                  {page}
                </a>
              ))}
            </div>
            {/* paging end */}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NoticePage;
