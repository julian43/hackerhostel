function show_image_thrice(src, width, height, alt) {
  imgdiv = document.getElementById('imgdiv')
  imgdiv.innerHTML = "";
  function get_img_tag(num){
    var img = document.createElement("img");
    img.src = src+num;
    img.width = width;
    img.height = height;
    img.alt = alt;

    return img;
  }

  //Horrible Hack!!
  imgdiv.appendChild(get_img_tag("1.jpg"));
  imgdiv.appendChild(get_img_tag("2.jpg"));
  imgdiv.appendChild(get_img_tag("3.jpg"));
}


//Better

function show_cat_images(partial_src, width, height, alt, which){
  function get_img_tag(src){
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    return img;
  }

  for(var i=0;i<which.length;i++){
    console.log(partial_src+which[i])
    document.body.appendChild(get_img_tag(partial_src+which[i]))
  }
}
