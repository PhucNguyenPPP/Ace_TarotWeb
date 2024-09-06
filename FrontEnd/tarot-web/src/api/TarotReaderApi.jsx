const baseUrl = import.meta.env.VITE_API_HOST;

export const GetTarotReaderList = async (searchValue, pageNumber, rowsPerpage, genderFilter, languageFilter, formFilter) => {
    try {
        var url = "";
        if (searchValue !== '') {
            url = `${baseUrl}/api/User/readers?readerName=${encodeURIComponent(searchValue)}&pageNumber=${pageNumber}&rowsPerpage=${rowsPerpage}`;
            if (languageFilter.length > 0) {
                const languageFilterParams = languageFilter.map(lang => `filterLanguages=${encodeURIComponent(lang)}`).join('&');
                url += `&${languageFilterParams}`;
            }
            if (genderFilter) {
                url += `&gender=${encodeURIComponent(genderFilter)}`;
            }
            if (formFilter.length > 0) {
                const formFilterParams = formFilter.map(form => `filterForming=${encodeURIComponent(form)}`).join('&');
                url += `&${formFilterParams}`;
            }
        } else {
            url = `${baseUrl}/api/User/readers?pageNumber=${pageNumber}&rowsPerpage=${rowsPerpage}`;
            if (languageFilter.length > 0) {
                const languageFilterParams = languageFilter.map(lang => `filterLanguages=${encodeURIComponent(lang)}`).join('&');
                url += `&${languageFilterParams}`;
            }
            if (genderFilter) {
                url += `&gender=${encodeURIComponent(genderFilter)}`;
            }
            if (formFilter.length > 0) {
                const formFilterParams = formFilter.map(form => `filterForming=${encodeURIComponent(form)}`).join('&');
                url += `&${formFilterParams}`;
            }
        }
        const request = {
            method: "GET",
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

export const GetTarotReaderDetail = async (userId) => {
    try {

        const url = `${baseUrl}/api/User/reader-detail?userId=${userId}`;

        const request = {
            method: "GET",
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