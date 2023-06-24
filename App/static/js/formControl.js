async function authenticateLogin() {
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value

    const result = await authenticate(username, password);

    if (result)
        window.location.href = "/home"
}