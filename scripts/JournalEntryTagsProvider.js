let entryTags = []

export const saveEntryTag = (entryTag) => {
    return fetch("http://localhost:8088/entrytags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryTag)
    })
}

export const useEntryTags = () => {
    return entryTags.slice()
}

export const getEntryTags = (entryId) => {
    return fetch(`http://localhost:8088/entrytags?entryId=${entryId}&_expand=tag`)
    .then(response => response.json())
    .then(parsedResponse => {
        entryTags = parsedResponse.map(entryTag => {
            return entryTag.tag.subject
        })
    })
}