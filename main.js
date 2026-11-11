
function fillUpdateForm(id, name, alterEgo, powers, movie) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateAlterEgo').value = alterEgo;
    document.getElementById('updatePowers').value = powers;
    document.getElementById('updateMovie').value = movie;

    const form = document.getElementById('updateForm');
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.classList.add('highlight-pulse');
    setTimeout(() => form.classList.remove('highlight-pulse'), 1000);
}
