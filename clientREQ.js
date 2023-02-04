const testNotes = [
    {
        title: "trash",
        text: "I need to take the trash out"
    },
    {
        title: "music",
        text: "jack stauber is a musician"
    },
    {
        title: "feet",
        text: "donk"
    }
]

for(let note of testNotes){
fetch('http://localhost:3003/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    });
}