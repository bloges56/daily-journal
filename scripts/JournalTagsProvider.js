// let entryTags = []

export const checkTag = (tag) => {
    return fetch(`http://localhost:8088/tags?subject=${tag.subject}`)
    .then(response => response.json())
    .then(parsedResponse => {
        if(parsedResponse.length === 0){
            return saveTag(tag)
            .then(tagObject =>{
                const tagId = tagObject.id
                return tagId
            })
        }
        else{
            debugger;
            let copy = parsedResponse.slice()
            return copy[0].id
        }
    })
}

const saveTag = (tag) => {
    return fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    })
    .then(response => response.json())
}