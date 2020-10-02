import { useSavedTags, saveTags, useTags } from './JournalTagsProvider.js'
import { useSavedEntry, saveJournalEntry} from '../entries/JournalEntryProvider.js'
import { dispatchStateChangeEvent } from '../entries/JournalEntryProvider.js'

let entryTags = []

export const saveEntryTag = (entry, tags) => {
    const entrySaved = saveJournalEntry(entry)
    const tagsSaved = saveTags(tags)

    Promise.all([entrySaved, tagsSaved])
    .then(_ => {
       const savedEntry = useSavedEntry()
       const savedTags = useSavedTags()
       const allTags = useTags()
       const savedTagsSub = savedTags.map(savedTag => {
           return savedTag.subject
       })
       const savedTagsObjs = allTags.filter(tag => {
           return savedTagsSub.includes(tag.subject)
       })
       const newEntryTags = savedTagsObjs.map(savedTagObj => {
           return {
            "entryId": savedEntry.id,
            "tagId": savedTagObj.id,
           }
       })
       let promiseArray = [];
        for (let i = 0; i < newEntryTags.length; i++) {
            promiseArray.push(fetch("http://localhost:8088/entrytags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEntryTags[i])
            }))
        }
        return Promise.all(promiseArray)
        .then(getEntryTags)
        .then(dispatchStateChangeEvent)
    })
}


export const useEntryTags = () => {
    return entryTags.slice()
}

export const getEntryTags = () => {
    return fetch(`http://localhost:8088/entrytags?&_expand=tag&_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
        entryTags = parsedResponse
    })
}