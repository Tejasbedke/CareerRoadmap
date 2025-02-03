const cardFiles = [
    'agriculture', 'aviation', 'business', 'creative', 'education',
    'engineering', 'finance', 'government', 'hospitality', 'index',
    'information', 'journalism', 'law', 'medical', 'miscellaneous',
    'science', 'skilled', 'sports'
];

const container = document.getElementById('cards-container');

cardFiles.forEach(cardFile => {
    fetch(`cards/${cardFile}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`File not found: ${cardFile}`);
            }
            return response.text();
        })
        .then(data => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = data;
            container.appendChild(card);
        })
        .catch(error => console.error(`Error loading card '${cardFile}':`, error));

});
