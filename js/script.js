const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll('.filter button'),
previewImg = document.querySelector('.preview-img img'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider = document.querySelector('.slider input'),
rotateOptions = document.querySelectorAll('.rotate button'),
resetFilterBtn = document.querySelector('.reset-filter'),
chooseImgBtn = document.querySelector('.choose-img'),
saveImgBtn = document.querySelector('.save-img');


let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

let rotate = 0, flipHorizontal = 1, flipVertical = 1;
const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
     previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}
const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return
    previewImg.src = URL.createObjectURL(file)
    // console.log(file);

    previewImg.addEventListener("load", () => {
        document.querySelector('.container').classList.remove('disable')
    })

}

filterOptions.forEach(Option => {
    Option.addEventListener('click', () => {
        document.querySelector(".filter .active").classList.remove('active');
        Option.classList.add("active");
        filterName.innerText = Option.innerText;


        if(Option.id == 'brightness'){
            filterSlider.max = "200";
            filterSlider.value = brightness
            filterValue.innerText = `${brightness}%`
        }else if(Option.id == 'saturation'){
            filterSlider.max = "200";
            filterSlider.value = saturation
            filterValue.innerText = `${saturation}%`
        }else if(Option.id == 'inversion'){
            filterSlider.max = "100";
            filterSlider.value = inversion
            filterValue.innerText = `${inversion}%`
        }else{
            filterSlider.max = "100";
            filterSlider.value = grayscale
            filterValue.innerText = `${grayscale}%`
        }
    })
});

const updateFilter = () => {
   filterValue.innerText = `${filterSlider.value}%` ;

   const selectedFilter = document.querySelector('.filter .active');

   if(selectedFilter.id === "brightness"){
       brightness = filterSlider.value;
   }else if(selectedFilter.id === "saturation"){
       inversion = filterSlider.value;
   }else{
       grayscale = filterSlider.value;
   }

   applyFilters()
}

rotateOptions.forEach(Option => {
    Option.addEventListener('click', () => {
         if(Option.id === 'left'){
            rotate -= 90
         }else if(Option.id === 'right'){
             rotate += 90;
         }else if(Option.id === 'horizontal'){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        }else{
            flipVertical = flipVertical === 1 ? -1 : 1
        }
         applyFilters();
    });
});

const resetFilter = () => {
    
     brightness = 100; saturation = 100; inversion = 0;  grayscale = 0;
     rotate = 0; flipHorizontal = 1; flipVertical = 1;

     filterOptions[0].click();

     applyFilters();
}
const saveImage = () => {
     const canvas =  document.createElement('canvas');
     const ctx  = canvas.getContext('2d');
     canvas.width = previewImg.naturalWidth;
     canvas.height = previewImg.naturalHeight;
      
     ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
     ctx.translate( canvas.width / 2, canvas.height / 2,)

     if(rotate !== 0){
         ctx.rotate(rotate * Math.PI / 180)
     }
     ctx.scale(flipHorizontal, flipVertical)
     ctx.drawImage(previewImg,  -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.download = "image.jpg";
    link.href = canvas.toDataURL()
    link.click()
}
fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input',updateFilter);
resetFilterBtn.addEventListener('click',resetFilter);
saveImgBtn.addEventListener('click',saveImage);
chooseImgBtn.addEventListener('click', () => fileInput.click())


