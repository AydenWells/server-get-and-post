const getMovies = async () => {
    try {
        return (await fetch("api/movies/")).json();
    } catch (error) {
        console.log(error);
    }
};

const showMovies = async () => {
    let movies = await getMovies();
    let moviesDiv = document.getElementById("movie-list");
    moviesDiv.innerHTML = "";
    movies.forEach((movie) => {
        const section = document.createElement("section");
        section.classList.add("movie");
        moviesDiv.append(section);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const h6 = document.createElement("h6");
        h6.innerHTML = movie.title;
        a.append(h6);

        a.onclick = (e) => {
            e.preventDefault();
            displayDetails(movie);
       }; 

    });
};

const displayDetails = (movie) => {
    const movieDetails = document.getElementById("movie-details");
    movieDetails.innerHTML = "";

    const h6 = document.createElement("h6");
    h6.innerHTML = movie.title;
    movieDetails.append(h6);

    const dLink = document.createElement("a");
    dLink.innerHTML = "	&#x2715;";
    movieDetails.append(dLink);
    dLink.id = "delete-link";

    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;";
    movieDetails.append(eLink);
    eLink.id = "edit-link";

    const p = document.createElement("p");
    movieDetails.append(p);
    p.innerHTML = movie.director;

    const ul = document.createElement("ul");
    movieDetails.append(ul);
    console.log(movie.writers);
    movie.writers.forEach((writer) => {
        const li = document.createElement("li");
        ul.append(li);
        li.innerHTML = writer;
    });

    eLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("add-edit-title").innerHTML = "Edit Movie";
    };

    dLink.onclick = (e) => {
        e.preventDefault();
    };

    populateEditForm(movie);
};












const populateEditForm = (movie) => {};

const addEditMovie = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-edit-movie-form");
    const formData = new FormData(form);
    let response;

    if (form._id.value == -1) {
        formData.delete("_id");
        formData.delete("img");
        formData.append("writers", getWriters());

        console.log(...formData);

        response = await fetch("/api/movies", {
            method: "POST",
            body: formData
        });
    }

    if (response.status != 200) {
        console.log("Error posting data");
    }

    response = await response.json();
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showMovies();
};

const getWriters = () => {
    const inputs = document.querySelectorAll("#writer-boxes input");
    let writers = [];

    inputs.forEach((input) => {
        writers.push(input.value);
    });

    return writers;
}

const resetForm = () => {
    const form = document.getElementById("add-edit-movie-form");
    form.reset();
    form._id = "-1";
    document.getElementById("writer-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Add Movie";
    resetForm();
};

const addWriter = (e) => {
    e.preventDefault();
    const writerBoxes = document.getElementById("writer-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);

}


window.onload = () => {
    showMovies();
    document.getElementById("add-edit-movie-form").onsubmit = addEditMovie;
    document.getElementById("add-link").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-movie").onclick = addMovie;
    document.getElementById("add-writer").addEventListener("click", addWriter); 

};




