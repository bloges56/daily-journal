// This is the original data.
const journal = [
    {
        id: 1,
        date: "07/24/2025",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "happy"
    },
    {
        id: 2,
        date: "07/30/2025",
        concept: "Javascript",
        entry: "Learned how to automate html",
        mood: "scared"
    },
    {
        id: 3,
        date: "07/34/2025",
        concept: "React",
        entry: "Learned the basics of using react",
        mood: "disgusted"
    }
]

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