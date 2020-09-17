export const JournalEntry = (entry) => {
    return  `
        <div class="journal-entry">
            <h2>${entry.concept}</h2>
            <h3>${entry.mood.mood}</h3>
            <p class="entry-content">${entry.entry}<p>
            <div class="entry-date">${entry.date}</div>
            <button id="deleteEntry--${entry.id}">Delete</button>
        </div>
    `      
};