import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { dataList } from '../data/dataData';

const DataPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filtered = keyword.trim()
    ? dataList.filter((item) => item.title.includes(keyword) || item.category.includes(keyword))
    : dataList;

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
              <caption>자료실 리스트</caption>
              <colgroup>
                <col style={{ width: '8%' }} />
                <col style={{ width: '15%' }} />
                <col />
                <col style={{ width: '18%' }} />
                <col style={{ width: '12%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">분류</th>
                  <th scope="col">제목</th>
                  <th scope="col">날짜</th>
                  <th scope="col">파일</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="td_c">게시물이 없습니다.</td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id}>
                      <td className="td_c">{item.id}</td>
                      <td className="td_c">{item.category}</td>
                      <td>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/data/${item.id}`); }}>
                          {item.title}
                        </a>
                      </td>
                      <td className="td_c">{item.date}</td>
                      <td className="td_c">{item.fileExt ?? '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* list end */}

            {/* paging start */}
            <div className="paging">
              <h4 className="blind">paging</h4>
              <a href="#" className="on" onClick={(e) => e.preventDefault()}>1</a>
            </div>
            {/* paging end */}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DataPage;
