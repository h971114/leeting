import React from 'react'

export const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, loading, noPosts }) => {
  const pageNumbers = [];
  const lastPage = Math.ceil(totalPosts / postsPerPage);

  if (loading) {
    return (
      <div></div>
    )
  }
  if (noPosts) {
    return (
      <div></div>
    )
  }

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
    return (
      <nav>
        <ul id="paging" className="pagination">
          <li key="first" className="first page-item pager">
            <button onClick={(e) => 
              paginate(e, 1)
            } className="page-link">
              <span className="hide">
                첫 페이지
              </span>
            </button>
          </li>
          <li key="prev" className="prev page-item pager">
            <button onClick={(e) => paginate(e, currentPage-1)} className="page-link">
              <span className="hide">
                이전 페이지
              </span>
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button onClick={ (e)=> paginate(e, number) } className={number === currentPage ? "page-link active" : "page-link"}>
                {number}
              </button>
            </li>
          ))}
          <li key="next" className="page-item next pager">
            <button onClick={(e) => paginate(e, currentPage+1)} className="page-link">
            <span className="hide">다음 페이지</span>
            </button>
          </li>
          <li key="last" className="page-item last pager">
            <button onClick={(e) => paginate(e, lastPage)} className="page-link">
            <span className="hide">마지막 페이지</span>
            </button>
          </li>
        </ul>
      </nav>
    )
}

export default Pagination
