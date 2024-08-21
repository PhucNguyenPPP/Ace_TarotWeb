const baseUrl = import.meta.env.VITE_API_HOST;

//ham test login mot co api cua prj thi thay doi
export const GetRandomCardList = async (cardTypeId) => {
    try {
        const url = `${baseUrl}/api/FreeTarot/GetRandomCard?cardType=${cardTypeId}`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};