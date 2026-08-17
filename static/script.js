const passwordInput = document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const strengthText =
    document.getElementById("strengthText");

const strengthProgress =
    document.getElementById("strengthProgress");

const suggestionsList =
    document.getElementById("suggestionsList");

const generateButton =
    document.getElementById("generateButton");

const generatedPassword =
    document.getElementById("generatedPassword");

const useGeneratedButton =
    document.getElementById("useGeneratedButton");


// Requirements

const requirements = {
    length: document.getElementById("lengthRequirement"),
    uppercase: document.getElementById("uppercaseRequirement"),
    lowercase: document.getElementById("lowercaseRequirement"),
    number: document.getElementById("numberRequirement"),
    special: document.getElementById("specialRequirement")
};


// Show / Hide Password

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

        togglePassword.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁️";

        togglePassword.setAttribute(
            "aria-label",
            "Show password"
        );
    }

});


// Check password whenever user types

passwordInput.addEventListener(
    "input",
    checkPassword
);


function checkPassword() {

    const password = passwordInput.value;

    if (password.length === 0) {

        resetChecker();

        return;
    }


    const checks = {

        length: password.length >= 8,

        uppercase: /[A-Z]/.test(password),

        lowercase: /[a-z]/.test(password),

        number: /[0-9]/.test(password),

        special: /[^A-Za-z0-9]/.test(password)

    };


    updateRequirements(checks);


    const score =
        Object.values(checks)
        .filter(Boolean)
        .length;


    updateStrength(score);

    generateSuggestions(checks, password);
}


// Update requirements

function updateRequirements(checks) {

    Object.keys(checks).forEach(function (key) {

        const requirement =
            requirements[key];

        const check =
            requirement.querySelector(".check");


        if (checks[key]) {

            requirement.classList.add("valid");

            check.textContent = "✓";

        } else {

            requirement.classList.remove("valid");

            check.textContent = "○";

        }

    });

}


// Update strength meter

function updateStrength(score) {

    let width = 0;

    let text = "Very Weak";


    if (score === 1) {

        width = 20;
        text = "Very Weak";

    } else if (score === 2) {

        width = 40;
        text = "Weak";

    } else if (score === 3) {

        width = 60;
        text = "Medium";

    } else if (score === 4) {

        width = 80;
        text = "Strong";

    } else if (score === 5) {

        width = 100;
        text = "Very Strong";

    }


    strengthProgress.style.width =
        width + "%";

    strengthText.textContent =
        text;
}


// Suggestions

function generateSuggestions(checks, password) {

    const suggestions = [];


    if (!checks.length) {

        suggestions.push(
            "Use at least 8 characters."
        );

    }


    if (!checks.uppercase) {

        suggestions.push(
            "Add at least one uppercase letter."
        );

    }


    if (!checks.lowercase) {

        suggestions.push(
            "Add at least one lowercase letter."
        );

    }


    if (!checks.number) {

        suggestions.push(
            "Add at least one number."
        );

    }


    if (!checks.special) {

        suggestions.push(
            "Add a special character such as !, @, # or $."
        );

    }


    if (password.length < 12) {

        suggestions.push(
            "Consider using 12 or more characters."
        );

    }


    if (suggestions.length === 0) {

        suggestions.push(
            "Excellent! Your password meets all the basic requirements."
        );

    }


    suggestionsList.innerHTML = "";


    suggestions.forEach(function (suggestion) {

        const li = document.createElement("li");

        li.textContent = suggestion;

        suggestionsList.appendChild(li);

    });

}


// Reset checker

function resetChecker() {

    strengthText.textContent =
        "No password";

    strengthProgress.style.width =
        "0%";


    Object.keys(requirements).forEach(function (key) {

        requirements[key]
            .classList.remove("valid");

        requirements[key]
            .querySelector(".check")
            .textContent = "○";

    });


    suggestionsList.innerHTML =
        "<li>Enter a password to get suggestions.</li>";
}


// Generate strong password

generateButton.addEventListener(
    "click",
    generateStrongPassword
);


function generateStrongPassword() {

    const uppercase =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lowercase =
        "abcdefghijklmnopqrstuvwxyz";

    const numbers =
        "0123456789";

    const special =
        "!@#$%^&*()-_=+";


    const allCharacters =
        uppercase +
        lowercase +
        numbers +
        special;


    let password = "";


    // Guarantee required character types

    password += randomCharacter(uppercase);

    password += randomCharacter(lowercase);

    password += randomCharacter(numbers);

    password += randomCharacter(special);


    // Add additional characters

    for (let i = password.length; i < 16; i++) {

        password +=
            randomCharacter(allCharacters);

    }


    // Shuffle password

    password =
        shuffleString(password);


    generatedPassword.value =
        password;
}


// Random character

function randomCharacter(characters) {

    const index =
        Math.floor(
            Math.random() * characters.length
        );

    return characters[index];
}


// Shuffle string

function shuffleString(string) {

    const array =
        string.split("");

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [array[i], array[j]] =
            [array[j], array[i]];

    }

    return array.join("");
}


// Use generated password

useGeneratedButton.addEventListener(
    "click",
    function () {

        if (generatedPassword.value === "") {

            generateStrongPassword();

        }


        passwordInput.value =
            generatedPassword.value;


        passwordInput.type =
            "text";


        togglePassword.textContent =
            "🙈";


        checkPassword();

    }
);