<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Waar is dat feestje?</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <h1>🎉 Waar is dat feestje?</h1>
        <p>Ontdek de beste feesten bij jou in de buurt</p>
    </header>

    <main>
        <div id="loader" class="loader">
            <div class="spinner"></div>
            <p>Feestjes laden...</p>
        </div>

        <div id="error-message" class="error-message"></div>

        <div id="activities-grid" class="activities-grid"></div>
    </main>

    <template id="card-template">
        <article class="card">
            <div class="card-header">
                <span class="card-type"></span>
                <span class="card-weather"></span>
            </div>
            <h2 class="card-title"></h2>
            <p class="card-description"></p>
            <div class="card-footer">
                <span class="card-date"></span>
                <span class="card-time"></span>
            </div>
        </article>
    </template>

    <script type="module" src="assets/js/main.js"></script>
</body>
</html>
