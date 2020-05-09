export const localStore = {
  setNews: (news) => {
    localStorage.setItem('news', JSON.stringify(news))
  },
  getNews: () => {
    return JSON.parse(localStorage.getItem('news'));
  }
}