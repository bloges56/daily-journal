import { useSavedTags, saveTags } from './JournalTagsProvider.js'
import { useSavedEntry, saveJournalEntry} from '../entries/JournalEntryProvider.js'

let entryTags = []

export const saveEntryTag = (entry, tags) => {
    const entrySaved = saveJournalEntry(entry)
    const tagsSaved = saveTags(tags)

    Promise.all([entrySaved, tagsSaved])
    .then(_ => {
       const savedEntry = useSavedEntry()
       const savedTags = useSavedTags()
       debugger;
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