document.addEventListener('DOMContentLoaded', function () {
    var background = document.getElementById('changing-background');
    var rectangle = document.getElementById('growing-rectangle');
    var additionalContent = document.getElementById('additional-content');


    setTimeout(function () {
        background.style.backgroundColor = '#1A1917';
        rectangle.style.width = '6000px';
        rectangle.style.height = '3000px';

        setTimeout(function () {
            rectangle.style.transform = 'translate(-50%, -50%) rotate(1080deg)';
            rectangle.style.opacity = '0';
        }, 1000);

        setTimeout(function () {
            additionalContent.style.display = "block";
        }, 200);
    }, 800);
});