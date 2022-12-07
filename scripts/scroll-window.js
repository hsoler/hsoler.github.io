const scrollable_windows = []
const dummy = document.getElementById("dummy");
const mais_info_caso = document.getElementById("mais-info-caso");
const caso_petr = document.getElementById("caso-petroquimica");
const mais_info_gemeos = document.getElementById("mais-info-gemeos");
const mais_gemeos = document.getElementById("mais-gemeos");
const mais_info_implementacao = document.getElementById("mais-info-implementacao");
const mais_implementacao = document.getElementById("mais-implementacao");
const global_l_butt = document.getElementById("global-l-button");
const global_r_butt = document.getElementById("global-r-button");

const m_id = {data: ["im0", "im1", "im2", "im3", "im4"]};
const n_id = {data: ["im00", "im01", "im02", "im03", "im04"]};
const o_id = {data: ["im000", "im001", "im002", "im003", "im004"]};

let mem = {data: [], ptr:1};
for (let e_id of m_id.data) {
    mem.data.push(document.getElementById(e_id));
}
let nem = {data: [], ptr:1};
for (let e_id of n_id.data) {
    nem.data.push(document.getElementById(e_id));
}
let oem = {data: [], ptr:1};
for (let e_id of o_id.data) {
    oem.data.push(document.getElementById(e_id));
}

function ptr_incr(mem, n) {
    let fruit = mem.ptr;
    if (!n) {
        return fruit;
    } else if (n>0){
        for (let i = 0; i<n; i++) {
            if (fruit == mem.data.length - 1) fruit = 0;
            else fruit = fruit + 1;
        }
    } else {
        for (let i = 0; i<(-n); i++) {
            if (fruit == 0) fruit = mem.data.length - 1;
            else fruit = fruit - 1;
        }
    }
    return fruit;
}

function update_scrollable_windows(mem) {
    for (let i = 0; i<mem.data.length; i++) {
        mem.data[i].style.display = "none";
    }
    mem.data[ptr_incr(mem, -1)].style.display = "block";
    mem.data[ptr_incr(mem, -1)].style.gridColumn = "1";
    mem.data[mem.ptr].style.display = "block";
    mem.data[mem.ptr].style.gridColumn = "2";
    mem.data[ptr_incr(mem, 1)].style.display = "block";
    mem.data[ptr_incr(mem, 1)].style.gridColumn = "3";
    return;
}

function scroll_right(mem) {
    mem.ptr = ptr_incr(mem, 1);
    update_scrollable_windows(mem);
    return;
}

function scroll_left(mem) {
    mem.ptr = ptr_incr(mem, -1);
    update_scrollable_windows(mem);
    return;
}

document.getElementById("b-left").addEventListener("click", (e) => scroll_left(mem));
document.getElementById("b-right").addEventListener("click", (e) => scroll_right(mem));
document.getElementById("b-left0").addEventListener("click", (e) => scroll_left(nem));
document.getElementById("b-right0").addEventListener("click", (e) => scroll_right(nem));
document.getElementById("b-left00").addEventListener("click", (e) => scroll_left(oem));
document.getElementById("b-right00").addEventListener("click", (e) => scroll_right(oem));

update_scrollable_windows(mem);
update_scrollable_windows(nem);
update_scrollable_windows(oem);

const x_scroll_button = document.getElementById("x-scroll-button");
let curr_showing_img = dummy;

function expand_image(obj) {
    collapse_image();
    obj.parentElement.parentElement.style.left ="100vw";
    obj.style.position = "fixed";
    obj.style.width = "60%";
    obj.style.padding = "1%";
    obj.style.maxHeight = "95vh";
    curr_showing_img = obj;
    for (let i = 0; i<curr_mem.data.length; i++) {
        if(mem.data[i] == obj) {
            mem.ptr = i;
        }
    }
    x_scroll_button.style.display = "block";
    global_l_butt.style.display = "block";
    global_r_butt.style.display = "block";
}

function collapse_image() {
    curr_showing_img.parentElement.parentElement.style.left = "0";
    curr_showing_img.style.position = "static";
    curr_showing_img.style.padding = "0";
    curr_showing_img.style.maxHeight = "100%";
    x_scroll_button.style.display = "none";
    global_l_butt.style.display = "none";
    global_r_butt.style.display = "none";
}

for (let obj of mem.data) {
    obj.addEventListener("click", (e) => {
        curr_mem = mem;
        expand_image(obj);
        });
}
for (let obj of nem.data) {
    obj.addEventListener("click", (e) => {
        curr_mem = nem;
        expand_image(obj);
        });
}
for (let obj of oem.data) {
    obj.addEventListener("click", (e) => {
        curr_mem = oem;
        expand_image(obj);
        });
}

function toggle_display(obj) {
    if (obj.style.display == "none") {
        obj.style.display = "block";
    } else obj.style.display = "none";
}

caso_petr.style.display = "none";
mais_gemeos.style.display = "none";

mais_info_caso.textContent = "Mostrar caso em maiores detalhes:";
mais_info_gemeos.textContent = "Mostrar mais informações sobre gêmeos digitais:";
mais_info_implementacao.textContent = "Exemplos de implementação de gêmeos digitais:";

function toggle_text(obj, text1) {
    if(obj.textContent == text1) {
        obj.textContent = "Voltar";
    } else {
        obj.textContent = text1;
    } return;
}

x_scroll_button.addEventListener("click", (e) => {collapse_image()});
mais_info_caso.addEventListener("click", (e) => {
    toggle_text(mais_info_caso, "Mostrar caso em maiores detalhes:");
    toggle_display(caso_petr)});
mais_info_gemeos.addEventListener("click", (e) => {
    toggle_text(mais_info_gemeos, "Mostrar mais informações sobre gêmeos digitais:");
    toggle_display(mais_gemeos)});
mais_info_implementacao.addEventListener("click", (e) => {
    toggle_text(mais_info_implementacao, "Exemplos de implementação de gêmeos digitais:")});

let curr_mem = mem;

global_l_butt.addEventListener("click", (e) => {
    collapse_image();
    scroll_left(curr_mem);
    expand_image(curr_mem.data[curr_mem.ptr]);
})

global_r_butt.addEventListener("click", (e) => {
    collapse_image();
    scroll_right(curr_mem);
    expand_image(curr_mem.data[curr_mem.ptr]);
})

