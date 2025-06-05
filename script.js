window.addEventListener('load', function () {
    const form = document.querySelector('#xyntrixForm');
    const nameField = document.querySelector('#name');
    const siteField = document.querySelector('#website');

    if (!form) return; // safety check in case the form isn't found

    form.onsubmit = function (e) {
        e.preventDefault();

        const userName = nameField.value.trim();
        const siteURL = siteField.value.trim();

        if (!/^https:\/\/www\./i.test(siteURL)) {
            alert('Oops! Make sure your site starts with https://www.');
            return;
        }

        const query = new URLSearchParams({
            name: userName,
            site: siteURL
        }).toString();

        location.href = `simulation.html?${query}`;
    };
});
