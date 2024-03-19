$(document).ready(function() {
    const BASE_URL = 'http://localhost:5000/api/cupcakes';

    async function getCupcakes() {
        const response = await axios.get(BASE_URL);
        for (let cupcake of response.data.cupcakes) {
            $('#cupcake-list').append(
                `<li>${cupcake.flavor}, ${cupcake.size}, Rating: ${cupcake.rating}
                <img src="${cupcake.image}" width="100"></li>`
            );
        }
    }

    $('#new-cupcake-form').on('submit', async function(e) {
        e.preventDefault();
        let flavor = $('#new-cupcake-form input[name="flavor"]').val();
        let size = $('#new-cupcake-form input[name="size"]').val();
        let rating = $('#new-cupcake-form input[name="rating"]').val();
        let image = $('#new-cupcake-form input[name="image"]').val();

        const response = await axios.post(BASE_URL, { flavor, size, rating, image });
        let newCupcake = response.data.cupcake;
        $('#cupcake-list').append(
            `<li>${newCupcake.flavor}, ${newCupcake.size}, Rating: ${newCupcake.rating}
            <img src="${newCupcake.image}" width="100"></li>`
        );

        $('#new-cupcake-form').trigger("reset");
    });

    getCupcakes();
});