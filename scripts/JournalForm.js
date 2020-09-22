import { saveJournalEntry } from './JournalEntryProvider.js'
import { getMoods, useMoods } from './JournalMoodProvider.js'
import { checkTag } from './JournalTagsProvider.js'
import { saveEntryTag } from './JournalEntryTagsProvider.js'

const eventHub = document.querySelector('#container');

eventHub.addEventListener('click', event => {
    if(event.target.id === "saveForm"){

        var date = document.querySelector('#journal-date')
        var concept = document.querySelector('#journal-concepts')
        var entry = document.querySelector('#journal-entry')
        var mood = document.querySelector('#journal-mood')
        var tags = document.querySelector('#journal-tags')

        const newJournalEntry = {
            "date": date.value,
            "concept": concept.value,
            "entry": entry.value,
            "moodId": parseInt(mood.value)
        }

        const tagsArray = tags.value.split(",")
        const tagsObjects = tagsArray.map(tag => {
            return {
                "subject": tag
            }
        })

        saveJournalEntry(newJournalEntry)
        .then(entryId => {
            tagsObjects.forEach(tagObject => {
                checkTag(tagObject)
                .then(tagId => {   
                    debugger;
                    const newEntryTag = {
                        "entryId": entryId,
                        "tagId": tagId
                    }
                    saveEntryTag(newEntryTag)
                }) 
            })
        })

        

        concept.value = ""
        entry.value = ""
        tags.value = ""
    }
})


export const JournalForm = () => {
    const contentTarget = document.querySelector('#new-form')

    getMoods()
    .then(_ => {
        const moods = useMoods()
        contentTarget.innerHTML = `
        <h2>New Journal Entry</h2>
        <form action="">
            <fieldset class="journal-section" id="journal-date-cont">
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journal-date">
            </fieldset>
            <fieldset class="journal-section" id="journal-concepts-cont">
                <label for="journal-concepts">Concepts Covered</label>
                <input name="journal-concepts" id="journal-concepts">
            </fieldset>
            <fieldset class="journal-section" id="journal-entry-cont">
                <label for="journal-entry">Journal Entry</label>
                <textarea id="journal-entry"></textarea>
            </fieldset>
            <fieldset class="journal-section" id="journal-mood-cont">
                <label for="journal-mood">Mood for the day</label>
                <select name="journal-mood" id="journal-mood">
                   ${moods.map(mood => {
                       return `<option id="${mood.mood}" value=${mood.id}>${mood.mood}</option>`
                   }).sort().join("")}
                    
                </select>
            </fieldset>
            <fieldset class="journal-section" id="journal-tags-cont">
                <label for="journal-tags">Enter Tags:</label>
                <input name="journal-tags" id="journal-tags">
            </fieldset>
        </form>
        <button id="saveForm">Save Form</button>
    `
    })
    
}