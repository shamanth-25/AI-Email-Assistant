async function generateEmail() {

    const purpose =
        document.getElementById("purpose").value;

    const tone =
        document.getElementById("tone").value;

    const details =
        document.getElementById("details").value;

    const output =
        document.getElementById("output");

    const loading =
        document.getElementById("loading");

    output.innerHTML = "";

    loading.classList.remove("hidden");

    try {

        const response = await fetch(
            "http://localhost:5000/generate-email",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    purpose,
                    tone,
                    details
                })
            }
        );

        const data = await response.json();

        loading.classList.add("hidden");

        if (data.email) {
            output.innerHTML = data.email;
        }

        else {
            output.innerHTML =
                JSON.stringify(data);
        }

    } catch (error) {

        loading.classList.add("hidden");

        output.innerHTML =
            "Something went wrong";
    }
}

async function copyEmail() {

    const output =
        document.getElementById("output").innerText;

    try {

        await navigator.clipboard.writeText(output);

        alert("Email copied successfully!");

    } catch (error) {

        const textarea =
            document.createElement("textarea");

        textarea.value = output;

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);

        alert("Email copied!");
    }
}