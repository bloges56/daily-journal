import { getEntries, useJournalEntries } from '../entries/JournalEntryProvider.js'
import { getEntryTags } from './JournalEntryTagsProvider.js'

const eventHub = document.querySelector('#container')


export const JournalTagsList = () => {
    return getEntries()
            .then(_ => {
                const entries = useJournalEntries()
                entries.forEach(entry => {
                    getEntryTags(entry.id)
                    .then()
                })
            })
}