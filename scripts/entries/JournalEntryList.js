import { JournalEntry } from './JournalEntry.js'
import { useJournalEntries, getEntries, deleteJournalEntry } from './JournalEntryProvider.js'
import { getEntryTags, useEntryTags } from '../tags/JournalEntryTagsProvider.js'

//testing github push
const contentElement = document.querySelector("#journal-entries");

export const JournalEntryList = () => {
    render()
};

const renderHelper = (entries, entryTags) => {
    let entriesHTML = "";
        entriesHTML = entries.map(entry => {
            const thisEntryTags = entryTags.filter(entryTag => {
                return entryTag.entryId === entry.id
            })
            return JournalEntry(entry, thisEntryTags);
        }).join("")

        contentElement.innerHTML = entriesHTML;
}

const render = () => {

    const fetchEntries = fetch('http://localhost:8088/entries?_expand=mood')
    const fetchEntryTags = fetch(`http://localhost:8088/entrytags?&_expand=tag&_expand=entry`)

    Promise.all([fetchEntries, fetchEntryTags])
    .then(values => {
        return Promise.all(values.map(r => r.json()))
    })
    .then(([entries, entryTags]) => {
        const radios = document.getElementsByName('mood-filter')
        let selectedRadio
        if(radios){
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                  // do whatever you want with the checked radio
                  selectedRadio = radios[i]
              
                  // only one radio can be logically checked, don't check the rest
                  break;
                }
            }
        }
        if(selectedRadio !== undefined){
            const [radio, mood, moodId] = selectedRadio.id.split("--")
            const moodEntries = entries.filter(entry => {
                return entry.moodId === parseInt(moodId)
            })
            renderHelper(moodEntries, entryTags)
        }
        else{
            renderHelper(entries, entryTags)
        }
    })
}

const eventHub = document.querySelector('#container');

eventHub.addEventListener('journalStateChanged', event => {

    render()

    // const fetchEntries = fetch('http://localhost:8088/entries?_expand=mood')
    // const fetchEntryTags = fetch(`http://localhost:8088/entrytags?&_expand=tag&_expand=entry`)

    // Promise.all([fetchEntries, fetchEntryTags])
    // .then(values => {
    //     return Promise.all(values.map(r => r.json()))
    // })
    // .then(([entries, entryTags]) => {
    //     const radios = document.getElementsByName('mood-filter')
    //     let selectedRadio
    //     if(radios){
    //         for (var i = 0, length = radios.length; i < length; i++) {
    //             if (radios[i].checked) {
    //               // do whatever you want with the checked radio
    //               selectedRadio = radios[i]
              
    //               // only one radio can be logically checked, don't check the rest
    //               break;
    //             }
    //         }
    //     }
    //     if(selectedRadio !== undefined){
    //         const [radio, mood, moodId] = selectedRadio.id.split("--")
    //         const moodEntries = entries.filter(entry => {
    //             return entry.moodId === parseInt(moodId)
    //         })
    //         render(moodEntries, entryTags)
    //     }
    //     else{
    //         render(entries, entryTags)
    //     }
    // })
})

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("deleteEntry--")){
        const [prefix, id] = event.target.id.split("--")
        deleteJournalEntry(id)
    }
})

