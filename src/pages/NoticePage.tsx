import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { noticeList } from '../data/noticeData';

const TOTAL_PAGES = 8;

declare function page_move(page: number): void;

const NoticePage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = keyword.trim()
    ? noticeList.filter((item) => item.title.includes(keyword))
    : noticeList;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="td_c">게시물이 없습니다.</td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.detailId}>
                      <td className="td_c">{item.no}</td>
                      <td className="td_c">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/notice/${item.detailId}`); }}>
                          {item.title}
                        </a>
                      </td>
                      <td className="td_c">{item.date}</td>
                      <td className="td_c">{item.views}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* list end */}

            {/* paging start */}
            <div className="paging">
              <h4 className="blind">paging</h4>
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
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
