// This function checks if the server is online to eneable or disable demos
export const isServerOnlineChecker = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/`);
        const data = await response.json();
        if (data.status === 200){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};  