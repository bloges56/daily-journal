import { JournalEntry } from './JournalEntry.js'
import { useJournalEntries, getEntries } from './JournalEntryProvider.js'
import { getMoods, useMoods } from './JournalMoodProvider.js'

const contentElement = document.querySelector("#journal-entries");

export const JournalEntryList = () => {
    
    getEntries()
    .then(_ => {
        const journalEntries = useJournalEntries();
        render(journalEntries)
    })
    
};

const render = (journalEntries) => {
    getMoods()
    .then(_ => {
        const moods = useMoods()
        var entriesHTML = "";
        journalEntries.map(entry => {
            const foundMood = moods.find(mood => {
                return mood.id.toString() === entry.moodID
            })
            entriesHTML += JournalEntry(entry, foundMood);
        });

        contentElement.innerHTML = entriesHTML;
    })
}

const eventHub = document.querySelector('#container');

eventHub.addEventListener('journalStateChanged', event => {
    getEntries()
    .then(_ => {
        const journalEntries = useJournalEntries();
        render(journalEntries)
    })
})