var index=1;
Changeimg=function ()
{
    var imgs=[src="ảnh_logo/lgo2.jpg",src="ảnh_logo/lgo4.jpg", src="ảnh_logo/lgo5.jpg"];
    document.getElementById('imgslide').src=imgs[index];
    index++;
    if(index==3)
    {
        index =0;
    }

}
setInterval(Changeimg,3000)
