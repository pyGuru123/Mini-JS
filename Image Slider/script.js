const body = document.querySelector('body');
const output = document.querySelector('.output');
const thumbanils_div = document.querySelector('.thumbnails_div');
const all_thumbnails = document.querySelectorAll('.thumbnail')

const leftdiv = document.querySelector('.leftdiv');
const rightdiv = document.querySelector('.rightdiv');

const images = [];
for (let i = 0; i<14; i++){
    images.push(`assets/${i+1}.jpg`);
}
let index = 0;
const length = images.length;

body.addEventListener('keydown', updateIndex)
leftdiv.addEventListener('click', function() {updateIndex('left')});
rightdiv.addEventListener('click', function() {updateIndex('right')});

body.onload = function(){
    output.src = images[0];
    updateThumbnail(index);
    leftdiv.style.color = 'rgba(128, 128, 128, 50)';
    rightdiv.style.color = 'white';
}

function updateIndex(ctrl) {
    if (ctrl == 'left'){
        index -= 1;
        if (index <= 0) {
            index = 0
            leftdiv.style.color = 'rgba(128, 128, 128, 50)';
        }
    }

    if (ctrl == 'right'){
        index += 1;
        if (index + 7 >= length -1) {
            index = length - 7;
            rightdiv.style.color = 'rgba(128, 128, 128, 50)';
        }
    }

    updateThumbnail(index);

    if (index > 0) {
        leftdiv.style.color = 'white';
    }
    if (index < length - 7) {
        rightdiv.style.color = 'white';
    }
}

function updateThumbnail(index){
    console.log(index);
    for (let i = 0; i<7; i++){
        let thumbnail = all_thumbnails[i];
        thumbnail.src = images[index+i];
        thumbnail.addEventListener('click', function(){updateImage(thumbnail)});
    }
}

function updateImage(thumbnail) {
    output.src = thumbnail.src;
}