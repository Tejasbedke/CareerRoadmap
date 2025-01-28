document.addEventListener("DOMContentLoaded", () => {
    fetch('menu')


        .then(response => response.text())
        .then(data => {
            // Insert the fetched HTML into the menu div
            document.getElementById('menu').innerHTML = data;

            // Get all script elements from the fetched HTML
            const scripts = document.getElementById('menu').querySelectorAll('script');

            // Execute each script
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.type = 'text/javascript';
                newScript.text = script.textContent;
                document.body.appendChild(newScript);
            });
        });
});   document.addEventListener("DOMContentLoaded",()=>{
    fetch('menu')
        .then(response=>response.text())
        .then(data=>console.log(data));
});
