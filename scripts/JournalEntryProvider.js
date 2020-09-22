// This is the original data.
var journal = []

export const getEntries = () => {
    return fetch("http://localhost:8088/entries?_expand=mood") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(entries => {
            journal = entries.slice()
        })
}

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}

const eventHub = document.querySelector('#container');

export const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}

export const deleteJournalEntry = (journalID) => {
    return fetch(`http://localhost:8088/entries/${journalID}`, {
        method: "DELETE"
    })
    .then(_ => {
        return fetch(`http://localhost:8088/entrytags?entryId=${journalID}`, {
            method: "DELETE"
        })
    })
    .then(getEntries)
    .then(dispatchStateChangeEvent)
}

export const saveJournalEntry = (newJournalEntry) => {
    // Use `fetch` with the POST method to add your entry to your API
    return fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJournalEntry)
    })
        .then(response => response.json())
        .then(parsedResponse => parsedResponse.id)
        .then(entryId => {
            getEntries()
            return entryId
        })  // <-- Get all journal entries
        .then(entryId => {
            dispatchStateChangeEvent()
            return entryId
        })  // <-- Broadcast the state change event
        .then(entryId =>{
            return entryId
        })
}