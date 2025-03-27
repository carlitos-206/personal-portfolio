const API_TESTER_HOME_TRUE = async () => {
    try {
        const call = await fetch("http://localhost:5000/cover-letter", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const contentType = call.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const res = await call.json();
            console.log(res);
        } else {
            const text = await call.text();
            console.error("Unexpected response format (not JSON):");
            console.error(text);
        }
    } catch (error) {
        console.error("Fetch failed:", error);
    }
};


const API_TESTER_HOME_FALSE = async () => {
    try {
        const call = await fetch("http://localhost:5000/");
        const contentType = call.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const res = await call.json();
            console.log(`
RESPONSE:
${JSON.stringify(res, null, 2)}
            `);
        } else {
            const text = await call.text();
            console.error("Unexpected response format (not JSON):");
            console.error(text);
        }
    } catch (error) {
        console.error("Fetch failed:", error);
    }
};



API_TESTER_HOME_TRUE()
// API_TESTER_HOME_FALSE()


const API_TESTER_HOME_POST_TRUE = async () => {
    try {
        const call = await fetch("http://localhost:5000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const contentType = call.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const res = await call.json();
            console.log(res);
        } else {
            const text = await call.text();
            console.error("Unexpected response format (not JSON):");
            console.error(text);
        }
    } catch (error) {
        console.error("Fetch failed:", error);
    }
};


const API_TESTER_HOME_POST_FALSE = async () => {
    try {
        const call = await fetch("http://localhost:5000/");
        const contentType = call.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const res = await call.json();
            console.log(`
RESPONSE:
${JSON.stringify(res, null, 2)}
            `);
        } else {
            const text = await call.text();
            console.error("Unexpected response format (not JSON):");
            console.error(text);
        }
    } catch (error) {
        console.error("Fetch failed:", error);
    }
};
