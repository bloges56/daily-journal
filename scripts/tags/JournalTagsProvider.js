let tags = []
let savedTags = []

export const getTags = () => {
    return fetch(`http://localhost:8088/tags`)
    .then(response => response.json())
    .then(parsedResponse => {
       tags = parsedResponse
    })
}

export const useTags = () => {
    return tags.slice()
}

export const saveTags = (tagsArr) => {
    savedTags = tagsArr
    return getTags()
    .then(_ => {
        const tagsSubjects = tags.map(tag => {
            return tag.subject
        })
        return tagsArr.filter(tag => {
            return !(tagsSubjects.includes(tag.subject))
        })
    })
    .then(filteredTagsArr => {
        let promiseArray = [];
        for (let i = 0; i < filteredTagsArr.length; i++) {
            promiseArray.push(fetch("http://localhost:8088/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filteredTagsArr[i])
            }))
        }
        return Promise.all(promiseArray)
        .then(getTags)
    })
}

export const useSavedTags = () => {
    return savedTags.slice()
}