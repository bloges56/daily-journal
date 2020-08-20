export const JournalEntry = (entry) => {
    return `
        <div class="journal-entry">
            <h2>${entry.concept}</h2>
            <p class="entry-content">${entry.entry}<p>
            <div class="entry-date">${entry.date}</div>
        </div>

    `
};