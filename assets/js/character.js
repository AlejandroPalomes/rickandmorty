function printCharacter(url) {
  console.log(url);
  $(".display__main").empty();
  axios({
    method: 'get',
    url: url,
  }).then((response) => {
    $(".display__main").append(`
        <div class="display__main--character d-flex flex-column">
            <h4>${response.data.name}</h4>
            <span><span>${response.data.species}</span> | <span>${response.data.status}</span> | <span>${response.data.gender}</span> | <span>${response.data.origin.name}</span></span>
            <span class="display__main__title mt-5 mb-3">Episodes</span>
            <div class="display__main__episodes d-flex justify-content-between flex-wrap"></div>
        </div>
        `);
    var axiosArr = [];
    $(response.data.episode).each((i, char) => {
      axiosArr.push(axios.get(char));
    })
    axios.all(axiosArr)
      .then(responseArr => {
        $(responseArr).each((i, e) => {
          $(".display__main__episodes").append(`
                        <button class="display__main__episodes--main d-flex flex-column mb-3 p-2 mr-2 justify-content-center" data-url="${e.data.url}">
                            <span class="display__main__episodes--title">${e.data.name}</span>
                            <span class="display__main__episodes--code">${e.data.episode}</span>
                        </button>
                        `);
        });
        $(".display__main__episodes--main").click(e => {
          // console.log($(e.currentTarget).data("url"))
          printEpisode($(e.currentTarget).data("url"))
        });
      });
  });
}