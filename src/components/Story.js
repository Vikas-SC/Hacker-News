import React, { useEffect, useState } from 'react';

import { getAllStories } from '../services/hnApi';

import { localStore } from '../utils/localStore';

import '../styles/style.scss';

export const Story = () => {
  const [stories, setStories] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const storiesFromLocalStorage = localStore.getNews();
    if (!storiesFromLocalStorage) {
      const res = getAllStories(pageNumber).then(stories => stories);
      res.then((data) => {
        const hits = data.data.hits;
        localStore.setNews(hits);
        setStories(hits);
      });
    } else {
      setStories(storiesFromLocalStorage);
    }
    if (pageNumber < 1) {
      setDisable(true);
    } else {
      setDisable(false)
    }
  }, [pageNumber, disable]);

  const nextNews = () => {
    localStorage.clear();
    setPageNumber(pageNumber + 1);
  }

  const prevNews = () => {
    localStorage.clear();
    setPageNumber(pageNumber - 1);
  }

  const upVote = (event, story) => {
    event.stopPropagation();
    const storedStories = localStore.getNews();
    const updatedStories = storedStories.map((upVoteStory) => {
      if (upVoteStory.objectID === story.objectID) {
        upVoteStory.points += 1;
      }
      return upVoteStory;
    });
    setStories(updatedStories);
    localStore.setNews(updatedStories);
  }
  return (
    <div className="container">
      <table className="table table-striped" id="newsTable">
        <thead className="tableHead">
          <tr>
            <th>Comments</th>
            <th>Vote Count</th>
            <th>Up Vote</th>
            <th>News Details</th>
          </tr>
        </thead>

        <tbody>
          {stories ? stories.map((story) => {
            return (<tr key={story.objectID} onClick={(e) => upVote(e, story)}>
              <td>{story.num_comments || '--'}</td>
              <td>{story.points || '--'}</td>
              <td> <span className="glyphicon glyphicon-triangle-top" value={story.points}></span></td>
              <td>{story.title || '--'}</td>
            </tr>)
          }) :
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span classN="sr-only">Loading...</span>
              </div>
            </div>

          }
        </tbody>

      </table>
      <div className="paginationFloat">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${disable ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => prevNews()}>Previous</a>
            </li>
            <li className="page-item">
              <span className="page-link" onClick={() => nextNews()}>Next</span>
            </li>
          </ul>
        </nav>
      </div>
    </div >
  )
}