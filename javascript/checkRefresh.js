function checkRefresh() {
    if (document.refreshForm.visited.value == "") {
        // Initial page load
        document.refreshForm.visited.value = "1";
    } else {
        // Page reload
        window.location = window.location.href;
    }
}