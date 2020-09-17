import { JournalEntry } from './JournalEntry.js'
import { useJournalEntries, getEntries, deleteJournalEntry } from './JournalEntryProvider.js'

const contentElement = document.querySelector("#journal-entries");

export const JournalEntryList = () => {
    
    getEntries()
    .then(_ => {
        const journalEntries = useJournalEntries();
        render(journalEntries)
    })
    
};

const render = (journalEntries) => {
    
    var entriesHTML = "";
    journalEntries.map(entry => {
        entriesHTML += JournalEntry(entry);
    });
    contentElement.innerHTML = entriesHTML;   
     
}

const eventHub = document.querySelector('#container');

eventHub.addEventListener('journalStateChanged', event => {
    getEntries()
    .then(_ => {
        const journalEntries = useJournalEntries();
        render(journalEntries)
    })
})

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("deleteEntry--")){
        const [prefix, id] = event.target.id.split("--")
        deleteJournalEntry(id)
    }
})