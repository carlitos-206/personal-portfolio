export const isServerOnline = async () => {
    try {
        const response = await fetch(`https://carlitos.ngrok.dev/`);
        const data = await response.json();
        console.log(`data: ${data}`)
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
};  