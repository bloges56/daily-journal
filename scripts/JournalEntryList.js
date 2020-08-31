import { JournalEntry } from './JournalEntry.js'
import { useJournalEntries } from './JournalEntryProvider.js'

export const JournalEntryList = () => {
    const contentElement = document.querySelector("#journal-entries");
    const journalEntries = useJournalEntries();

    var entriesHTML = "";
    journalEntries.map(entry => {
        entriesHTML += JournalEntry(entry);
    });

    contentElement.innerHTML = entriesHTML;
};