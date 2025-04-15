document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        // მენიუს გადართვა
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        menuToggle.classList.toggle('active');
        
        // იკონების გადართვა
        const hamburger = document.querySelector('.hamburger');
        const close = document.querySelector('.close');
        
        if (mainNav.classList.contains('active')) {
            hamburger.style.display = 'none';
            close.style.display = 'block';
        } else {
            hamburger.style.display = 'block';
            close.style.display = 'none';
        }
    });
    
    // მენიუს დახურვა ლინკზე დაჭერისას
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.classList.remove('active');
            document.querySelector('.hamburger').style.display = 'block';
            document.querySelector('.close').style.display = 'none';
        });
    });
});

// უკან დაბრუნების ფუნქციონალი
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

// სანიშნეების ფუნქციონალი
const saveButton = document.getElementById('saveButton');
const saveIcon = document.getElementById('saveIcon');
const notification = document.getElementById('notification');

// შეამოწმეთ არის თუ არა რეცეპტი უკვე შენახული
let isSaved = localStorage.getItem('savedRecipe') === 'true';

// განაახლეთ ღილაკის მდგომარეობა
updateSaveButton();

saveButton.addEventListener('click', function() {
    isSaved = !isSaved;
    
    if (isSaved) {
        // შენახვის ლოგიკა
        localStorage.setItem('savedRecipe', 'true');
        showNotification();
    } else {
        // წაშლის ლოგიკა
        localStorage.removeItem('savedRecipe');
    }
    
    updateSaveButton();
});

function updateSaveButton() {
    if (isSaved) {
        saveButton.classList.add('saved');
        saveIcon.textContent = '✓';
        saveButton.innerHTML = `<span id="saveIcon">✓</span> შენახული`;
    } else {
        saveButton.classList.remove('saved');
        saveIcon.textContent = '❤️';
        saveButton.innerHTML = `<span id="saveIcon">❤️</span> შენახვა`;
    }
}

function showNotification() {
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// რეცეპტის ID-ის მიხედვით შენახვის შემოწმება (რეალურ პროექტში)
function checkIfRecipeIsSaved() {
    // აქ დაემატება კოდი რომელიც ამოწმებს კონკრეტული რეცეპტის შენახვას
}

// კატეგორიის გვერდის ფუნქციონალი
document.addEventListener('DOMContentLoaded', function() {
    // URL-დან კატეგორიის ამოღება
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        // აქ შეგიძლიათ დაამატოთ კატეგორიის მიხედვით რეცეპტების ფილტრაცია
        console.log('კატეგორია:', category);
    }
    
    // ფილტრების ფუნქციონალი
    const sortSelect = document.getElementById('sort');
    const difficultySelect = document.getElementById('difficulty');
    
    if (sortSelect && difficultySelect) {
        sortSelect.addEventListener('change', applyFilters);
        difficultySelect.addEventListener('change', applyFilters);
    }
    
    function applyFilters() {
        const sortBy = sortSelect.value;
        const difficulty = difficultySelect.value;
        
        // აქ დაემატება რეცეპტების დალაგების ლოგიკა
        console.log('დალაგება:', sortBy, 'სირთულე:', difficulty);
    }
    
    // გვერდების ნავიგაცია
    const nextPageBtn = document.querySelector('.pagination-button:not(:disabled)');
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            // აქ დაემატება გვერდის გადატვირთვის ან AJAX ლოგიკა
            console.log('შემდეგი გვერდი');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // რეცეპტების ფილტრაცია/დალაგება შეიძლება დაემატოს აქ
    console.log('რეცეპტების სიის გვერდი ჩატვირთულია');
    
    // მობილურისთვის სპეციფიკური ფუნქციონალი
    if (window.innerWidth <= 480) {
        // მობილურის ოპტიმიზაციები
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. URL პარამეტრების დამუშავება
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromURL = urlParams.get('cat');
    
    // 2. ელემენტების შერჩევა
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    // 3. ფილტრაციის ფუნქცია
    function filterRecipes(category) {
        recipeCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // განაახლეთ აქტიური ღილაკი
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        // URL-ის განახლება (არ გადატვირთავს გვერდს)
        history.pushState({}, '', `?cat=${category}`);
    }
    
    // 4. ღილაკების event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterRecipes(category);
        });
    });
    
    // 5. თუ URL-ში არის კატეგორია, გამოიყენეთ ის
    if (categoryFromURL) {
        filterRecipes(categoryFromURL);
        
        // გააქტიურეთ შესაბამისი ღილაკი
        const activeBtn = document.querySelector(`.filter-btn[data-category="${categoryFromURL}"]`);
        if (activeBtn) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            activeBtn.classList.add('active');
        }
    }
    
    // 6. დააფიქსირეთ გვერდის ისტორიის ცვლილებები (სანამ უკან ღილაკზე დაჭერით)
    window.addEventListener('popstate', function() {
        const currentParams = new URLSearchParams(window.location.search);
        const currentCategory = currentParams.get('cat') || 'all';
        filterRecipes(currentCategory);
    });
});

// დამატებითი ფილტრაციის ფუნქციონალი
document.addEventListener('DOMContentLoaded', function() {
    // ... არსებული კოდი ...
    
    // "შენახვა ყველა" ფუნქციონალი
    document.getElementById('saveAllBtn').addEventListener('click', function() {
        const currentCategory = document.querySelector('.filter-btn.active').dataset.category;
        const recipesToSave = document.querySelectorAll(`.recipe-card[data-category="${currentCategory}"]:not(.hidden)`);
        
        recipesToSave.forEach(recipe => {
            recipe.classList.add('saved');
            const recipeId = recipe.querySelector('a').href.split('=')[1];
            saveToLocalStorage(recipeId);
        });
        
        showNotification(`შენახულია ${recipesToSave.length} რეცეპტი`);
    });
    
    // სწრაფი რეცეპტების ფილტრი
    document.getElementById('quickRecipesBtn').addEventListener('click', function() {
        const allRecipes = document.querySelectorAll('.recipe-card:not(.hidden)');
        
        allRecipes.forEach(recipe => {
            const timeText = recipe.querySelector('.time').textContent;
            const time = parseInt(timeText.match(/\d+/)[0]);
            
            if (time <= 30) {
                recipe.classList.add('quick');
                recipe.querySelector('.time').innerHTML = '⏱️ <strong>'+timeText+'</strong>';
            } else {
                recipe.classList.remove('quick');
                recipe.querySelector('.time').textContent = timeText;
            }
        });
        
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.innerHTML = '<span class="icon">⚡</span> ყველა რეცეპტი';
        } else {
            this.innerHTML = '<span class="icon">⚡</span> სწრაფი რეცეპტები';
            document.querySelectorAll('.recipe-card.quick').forEach(card => {
                card.classList.remove('quick');
            });
        }
    });
    
    // დალაგების ფუნქციონალი
    document.getElementById('sortSelect').addEventListener('change', function() {
        const sortValue = this.value;
        const recipeContainer = document.querySelector('.recipes-grid');
        const recipes = Array.from(document.querySelectorAll('.recipe-card:not(.hidden)'));
        
        recipes.sort((a, b) => {
            switch(sortValue) {
                case 'time-asc':
                    return getTimeInMinutes(a) - getTimeInMinutes(b);
                case 'time-desc':
                    return getTimeInMinutes(b) - getTimeInMinutes(a);
                case 'difficulty':
                    return getDifficultyValue(a) - getDifficultyValue(b);
                default:
                    return 0;
            }
        });
        
        recipes.forEach(recipe => {
            recipeContainer.appendChild(recipe);
        });
    });
    
    // დამხმარე ფუნქციები
    function getTimeInMinutes(recipe) {
        const timeText = recipe.querySelector('.time').textContent;
        return parseInt(timeText.match(/\d+/)[0]);
    }
    
    function getDifficultyValue(recipe) {
        const difficulty = recipe.querySelector('.difficulty').textContent;
        if (difficulty.includes('მარტივი')) return 1;
        if (difficulty.includes('საშუალო')) return 2;
        return 3; // რთული
    }
    
    function saveToLocalStorage(recipeId) {
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        if (!savedRecipes.includes(recipeId)) {
            savedRecipes.push(recipeId);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        }
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'temp-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }, 100);
    }
});

// ძებნის ფუნქციონალი
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // ძებნის ფუნქცია
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.innerHTML = '<p class="search-message">გთხოვთ შეიყვანოთ მინიმუმ 2 სიმბოლო</p>';
            return;
        }
        
        // მოახდინეთ ძებნა (ეს არის მარტივი ვერსია, რეალურ პროექტში დაამატეთ API ან მონაცემთა ბაზა)
        const recipeCards = document.querySelectorAll('.recipe-card');
        let foundResults = false;
        
        recipeCards.forEach(card => {
            const title = card.querySelector('.recipe-title').textContent.toLowerCase();
            const description = card.querySelector('.recipe-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                foundResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // შედეგების ჩვენება
        if (!foundResults) {
            searchResults.innerHTML = `<p class="search-message">ვერ მოიძებნა "${searchTerm}"-ისთვის. სცადეთ სხვა საკვანძო სიტყვა.</p>`;
        } else {
            searchResults.innerHTML = `<p class="search-message">ნაპოვნია რეცეპტები "${searchTerm}"-ისთვის</p>`;
            window.scrollTo({
                top: searchResults.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
    
    // ღილაკზე დაჭერის მოსმენა
    searchButton.addEventListener('click', performSearch);
    
    // Enter ღილაკის მოსმენა
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // ცარიელი ველის შემოწმება
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            // აღადგინეთ ყველა რეცეპტი, თუ ველი ცარიელია
            document.querySelectorAll('.recipe-card').forEach(card => {
                card.style.display = 'block';
            });
            searchResults.innerHTML = '';
        }
    });
});

