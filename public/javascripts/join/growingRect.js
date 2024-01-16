document.addEventListener('DOMContentLoaded', function () {
    var background = document.getElementById('changing-background');
    var rectangle = document.getElementById('growing-rectangle');
    var additionalContent = document.getElementById('additional-content');

    setTimeout(function () {
        background.style.backgroundColor = '#131514';
        rectangle.style.width = '200%';
        rectangle.style.height = '200%';

        setTimeout(function () {
            additionalContent.style.display = "block";
        }, 200);
    }, 800);
});