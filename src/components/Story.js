import React, { useEffect, useState } from 'react';

import { getAllStories } from '../services/hnApi';

import { localStore } from '../utils/localStore';

import LineChart from './lineChart'

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
    const ID = event.target.getAttribute('id');
    let storedStories = localStore.getNews();

    if (ID === "upVote") {
      storedStories = storedStories.map((upVoteStory) => {
        if (upVoteStory.objectID === story.objectID) {
          upVoteStory.points += 1;
        }
        return upVoteStory;
      });
    }
    if (ID === "hide") {
      var removeIndex = storedStories.map((item) => item.objectID).indexOf(story.objectID);
      storedStories.splice(removeIndex, 1);
    }
    setStories(storedStories);
    localStore.setNews(storedStories);
  }
  return (
    <>
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
                <td> <span id="upVote" className="glyphicon glyphicon-triangle-top pointer" value={story.points}></span></td>
                <td><span className="title">{story.title || '--'}</span>  | by <span className="makeBold">{story.author}</span> | <span id='hide' className="pointer makeBold">[ hide ]</span></td>
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
      {
        stories.length > 0 ?
          <div className="container">
            <LineChart stories={stories} />
          </div> : ''
      }
    </>
  )
}