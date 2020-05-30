var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene
    , 
//     {
//   relativeInput: true
// }
);
parallaxInstance.friction(0.2, 0.2);

$("#sideMenu").mouseover(e=>{
    console.log(e.target)
    $("#sideMenu").stop().animate({
        width: "25%",
    }, 500, "swing")
    // $("#sideMenu").css("width", "400px")
})

$("#sideMenu").mouseout(e=>{
    console.log("hover works")
    $("#sideMenu").stop().animate({
        width: "20px"
    }, 500)
    // $("#sideMenu").css("width", "20px")
})