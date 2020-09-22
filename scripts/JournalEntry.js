export const JournalEntry = (entry, entryTags) => {
    return  `
        <div class="journal-entry">
            <h2>${entry.concept}</h2>
            <h3>${entry.mood.mood}</h3>
            <p class="entry-content">${entry.entry}<p>
            <div class="entry-date">${entry.date}</div>
            <div class="tags-list">
                <h4>Tags</h4>
                ${entryTags.map(entryTag => {
                    return `<div class="tag">
                        ${entryTag}
                    </div>`
                }).sort().join("")}
            </div>
            <button id="deleteEntry--${entry.id}">Delete</button>
        </div>
    `      
};