function adjustContainerHeight() {
    var container = document.getElementById('userNames');
    var tableHeight = document.getElementById('tableClass');
    container.style.height = tableHeight.style.height + 'px';

}

// Call the function when the page loads or whenever the content changes
window.addEventListener('load', adjustContainerHeight);