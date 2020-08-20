import { JournalEntry } from './JournalEntry.js'
import { useJournalEntries } from './JournalEntryProvider.js'

export const JournalEntryList = () => {
    const contentElement = document.querySelector("#journal-entries");
    const journalEntries = useJournalEntries();

    var entriesHTML = "";
    journalEntries.forEach(entry => {
        entriesHTML += JournalEntry(entry);
    });

    contentElement.innerHTML = entriesHTML;
};