import { getMoods, useMoods } from './JournalMoodProvider.js'

export const JournalEntry = (entry, mood) => {
    return  `
        <div class="journal-entry">
            <h2>${entry.concept}</h2>
            <h3>${mood.mood}</h3>
            <p class="entry-content">${entry.entry}<p>
            <div class="entry-date">${entry.date}</div>
        </div>
    `      
};