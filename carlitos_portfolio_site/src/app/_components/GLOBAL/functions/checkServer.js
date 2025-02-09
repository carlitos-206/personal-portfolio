// This function checks if the server is online to eneable or disable demos
export const isServerOnline = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/`);
        const data = await response.json();
        console.log(`data: ${data}`)
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
};  