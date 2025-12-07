const fs = require('fs');
const path = require('path');

// Read the index.html file
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Define categories for each blog post
const categories = {
    'api-explained.html': { category: 'architecture', tags: 'api rest web-services communication' },
    'databases-explained.html': { category: 'data', tags: 'database sql storage data' },
    'docker-explained.html': { category: 'devops', tags: 'docker containers devops deployment' },
    'microservices-explained.html': { category: 'architecture', tags: 'microservices architecture scalability' },
    'git-explained.html': { category: 'tools', tags: 'git version-control collaboration' },
    'cloud-computing.html': { category: 'devops', tags: 'cloud aws infrastructure hosting' },
    'frontend-backend.html': { category: 'web', tags: 'frontend backend web-development' },
    'algorithms.html': { category: 'fundamentals', tags: 'algorithms logic problem-solving' },
    'variables-explained.html': { category: 'fundamentals', tags: 'variables basics programming' },
    'functions-explained.html': { category: 'fundamentals', tags: 'functions code-reusability programming' },
    'loops-explained.html': { category: 'fundamentals', tags: 'loops automation iteration' },
    'conditionals-explained.html': { category: 'fundamentals', tags: 'conditionals if-else logic' },
    'arrays-explained.html': { category: 'fundamentals', tags: 'arrays data-structures lists' },
    'objects-explained.html': { category: 'fundamentals', tags: 'objects oop data-structures' },
    'classes-explained.html': { category: 'fundamentals', tags: 'classes oop templates' },
    'debugging-explained.html': { category: 'tools', tags: 'debugging problem-solving development' },
    'datatypes-explained.html': { category: 'fundamentals', tags: 'data-types variables fundamentals' },
    'recursion-explained.html': { category: 'fundamentals', tags: 'recursion advanced algorithms' },
    'html-explained.html': { category: 'web', tags: 'html web-development markup' },
    'css-explained.html': { category: 'web', tags: 'css styling web-design' },
    'javascript-explained.html': { category: 'web', tags: 'javascript programming interactivity' },
    'responsive-explained.html': { category: 'web', tags: 'responsive mobile web-design' },
    'dom-explained.html': { category: 'web', tags: 'dom javascript web-development' },
    'events-explained.html': { category: 'web', tags: 'events javascript interactivity' },
    'cookies-explained.html': { category: 'web', tags: 'cookies privacy web-storage' },
    'rest-explained.html': { category: 'architecture', tags: 'rest api web-services' },
    'ajax-explained.html': { category: 'web', tags: 'ajax asynchronous javascript' },
    'frameworks-explained.html': { category: 'web', tags: 'frameworks productivity development-tools' }
};

// Update each blog card with data attributes
for (const [filename, attrs] of Object.entries(categories)) {
    const regex = new RegExp(`(<a href="blogs/${filename}" class="blog-card")>`, 'g');
    html = html.replace(regex, `$1 data-category="${attrs.category}" data-tags="${attrs.tags}">`);
}

// Write the updated HTML back
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully added category and tag attributes to all blog cards!');
