export const saveEntryTag = (entryTag) => {
    return fetch("http://localhost:8088/entrytags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryTag)
    })
}