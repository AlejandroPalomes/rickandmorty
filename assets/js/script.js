var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene
    , 
//     {
//   relativeInput: true
// }
);
parallaxInstance.friction(0.2, 0.2);


axios({
    method: 'get',
    url: 'https://rickandmortyapi.com/api/episode',

    }).then((response)=>{
        $(response.data.results).each((i,e)=>{
            $("#episodes").append(`<li><button id="${e.id}" data-url="${e.url}" class="main__container__menu--episode mb-1 p-2">${e.name}</button><li>`);
            $("#episodes-sm").append(`<li><button id="s${e.id}" data-url="${e.url}" class="main__container__menu--episode mb-1 p-2" data-toggle="collapse" data-target="#collapseMenu" aria-controls="collapseMenu" aria-expanded="false" aria-label="Toggle navigation">${e.name}</button><li>`);
        })
        $("#episodes").append(`<button class="loadMore mx-auto mt-4">Load more</button>`);
        $(".main__container__menu--episode").click(e=>{
            printEpisode($(e.target).data("url"));
        })

        $(".loadMore").click(e=>{
            $(e.target).addClass("d-none");
            console.log("response.data.info.next")
            console.log(response.data.info.next)
            axios({
                method: 'get',
                url: response.data.info.next,
                }).then((response)=>{
                    $(response.data.results).each((i,e)=>{
                        $("#episodes").append(`<li><button id="${e.id}" data-url="${e.url}" class="main__container__menu--episode mb-1 p-2">${e.name}</button><li>`);
                        $("#episodes-sm").append(`<li><button id="s${e.id}" data-url="${e.url}" class="main__container__menu--episode mb-1 p-2" data-toggle="collapse" data-target="#collapseMenu" aria-controls="collapseMenu" aria-expanded="false" aria-label="Toggle navigation">${e.name}</button><li>`);
                        $(`#${e.id}`).click(e=>{
                            printEpisode($(e.target).data("url"));
                        })
                    });
                });
        });
    });