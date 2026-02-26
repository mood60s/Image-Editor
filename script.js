// Select Elements
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let huerotate = document.getElementById("hue-rotate");
let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");
let reset = document.querySelector("span");
let imgBox = document.querySelector(".img-box");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// Check Did he Upload Photo Or no
function IsImage() {
  // Check Did we Have SRC Did he Upload Img or no upload ???
  if (!img.src) {
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
  } else {
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";
    //   Reset Img Filter
    // resetValue();
  }
}
upload.addEventListener("change", () => {
  // Read Data User
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  // Add Event To check Did he Upload Done? Then Add Result to img.src
  file.onload = () => {
    img.src = file.result;
    IsImage();
    FilterImg();
  };
  //Add Event To Img Onload To Draw it in Canvas
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
});
function FilterImg() {
  // Select All Filters Element
  let filters = document.querySelectorAll("ul li input");
  // Loop Through Filters
  filters.forEach((filter) => {
    // Add Evenet Listener To Every Filter
    filter.addEventListener("input", (_) => {
      // Add Style Filter To Img  Filter.value
      ctx.filter = `
              saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)
            `;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
  });
}
function resetValue() {
  [saturate, contrast, brightness, sepia, grayscale, blur, huerotate].forEach(
    (filter) => {
      //   Variable To take Every Attribute Value From Filter
      let initialValue = filter.getAttribute("value");
      //  every Filter.value = initialValue The Attribute Value
      filter.value = initialValue;
    }
  );
    // Reset Filter Img
   ctx.filter = `
              saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)
            `;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  // Loop Through Filters to Back Value Every Filter to initialValue

  
}
download.addEventListener("click", () => {
  download.href = canvas.toDataURL();
});
window.addEventListener("load", () => {
  // Call IsImage To Check
  IsImage();
});
