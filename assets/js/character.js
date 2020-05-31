function printCharacter(url){
    console.log(url);
    $(".display__main").empty();
    axios({
        method: 'get',
        url: url,
      }).then((response)=>{
        $(".display__main").append(`
        <div class="display__main--episode d-flex flex-column">
            <h4>${response.data.name}</h4>
            <span><span>${response.data.species}</span> | <span>${response.data.status}</span> | <span>${response.data.gender}</span> | <span>${response.data.origin.name}</span></span>
            <span class="display__main__title mt-5 mb-3">Episodes</span>
            <div class="display__main__characters d-flex justify-content-between flex-wrap"></div>
        </div>
        `);
      })
}