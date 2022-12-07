const gloss = document.getElementById("glossary");
const x_butt = document.getElementById("x-button")

const techs = ["cax", "big-data", "iot", "ai", "automacao"];
const images = ["im", "im-1", "im-2"];
const images1 = ["im1", "im1-1", "im1-2"];

let curr_displaying_p = false;

for (let tech of techs) {
    let inline_tech = document.getElementById("b-" + tech);
    let custom_func = new Function('e', '\
    let p_id = "p-' + tech + '"; \
    let p = document.getElementById(p_id); \
    p.style.display = "flex"; \
    let a = document.getElementById("only-text"); \
    gloss.style.display = "block"; \
    if (curr_displaying_p && curr_displaying_p != p) \
    {curr_displaying_p.style.display = "none";} \
    curr_displaying_p = p;');
    inline_tech.addEventListener("click", custom_func);
}

x_butt.addEventListener("click", (e) => {gloss.style.display = "none";});

