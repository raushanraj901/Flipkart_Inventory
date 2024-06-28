document.addEventListener('DOMContentLoaded', function() {
    const categories = ['trousers', 'shoes', 't-shirts']; // Define categories

    categories.forEach(category => {
        const form = document.getElementById(`${category}-form`);
        const input = document.getElementById(`${category}-input`);
        const list = document.getElementById(`${category}-list`);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const productName = input.value.trim();
            if (productName) {
                addProduct(category, productName);
                input.value = '';
            }
        });

        // Function to add product
        function addProduct(category, productName) {
            const item = document.createElement('div');
            item.textContent = productName;
            item.classList.add('product-item');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', function() {
                removeProduct(item, category, productName);
            });

            item.appendChild(removeButton);
            list.appendChild(item);

            // Save to local storage
            saveToLocalStorage(category, productName);
        }

        // Function to remove product
        function removeProduct(item, category, productName) {
            list.removeChild(item);
            removeFromLocalStorage(category, productName);
        }

        // Function to save to local storage
        function saveToLocalStorage(category, productName) {
            let products = JSON.parse(localStorage.getItem(category)) || [];
            products.push(productName);
            localStorage.setItem(category, JSON.stringify(products));
        }

        // Function to remove from local storage
        function removeFromLocalStorage(category, productName) {
            let products = JSON.parse(localStorage.getItem(category)) || [];
            products = products.filter(product => product !== productName);
            localStorage.setItem(category, JSON.stringify(products));
        }

        // Load products from local storage on page load
        function loadProductsFromLocalStorage() {
            let products = JSON.parse(localStorage.getItem(category)) || [];
            products.forEach(productName => {
                addProduct(category, productName);
            });
        }

        loadProductsFromLocalStorage();
    });
});
