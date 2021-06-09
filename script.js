const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const websiteNameEl = document.getElementById('website-name')
const websiteURLEl = document.getElementById('website-URL')
const bookmarkForm = document.getElementById("bookmark-form")
const bookmarksContainer = document.getElementById("bookmarks-container")


//show Modal, focus on input
function showModal(){
    modal.classList.toggle('show-modal')
    websiteNameEl.focus()
}

//Modal event listeneres
modalShow.addEventListener('click',showModal)
modalClose.addEventListener('click',showModal)
modal.addEventListener('click',(e) => e.target===modal ? showModal() : false)

const validate = (val, url) => {
    const exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(exp)
    if (!val || !url)
        alert("TRYNA BE SMART EH MOFO GIB VALUES!")
    else if (!url.match(regex)){
        alert("BRUH!")
        return false
    }
    
    //Valid
    return true
}

//delete bookmark
const deleteBookmark = (url) => {
    bookmarks = bookmarks.filter(bookmark => bookmark.url!==url)
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    buildBookmarks()
}

//Build bookmarks
const buildBookmarks = () => {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    //build items
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark
        //Item
        const item = document.createElement('div')
        item.classList.add('item')
        //Close-icon
        const closeIcon = document.createElement('i')
        closeIcon.classList.add('fas','fa-times')
        closeIcon.setAttribute('title','Delete')
        closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`)
        //Favicon / link container
        const linkInfo = document.createElement('div')
        linkInfo.classList.add('name')
        //Favicon
        const favicon = document.createElement('img')
        favicon.setAttribute('src',`https://www.google.com/s2/u/0/favicons?domain=${url}`)
        favicon.setAttribute('alt',`${name}`)

        //link
        const link = document.createElement('a')
        link.setAttribute('href',`${url}`)
        link.setAttribute('target','_blank')
        link.textContent = name;
        //Append to bookmark container
        linkInfo.append(favicon, link)
        item.append(closeIcon, linkInfo)
        bookmarksContainer.appendChild(item);
    })
}


//get bookmarks from local storage
const fetchBookmarks = () => {
    if (localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }
    else{
        //create initial onload bookmark
        bookmarks = [
            {
                name: 'google',
                url: 'https://google.com'
            }
        ]
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }
    buildBookmarks();
}


const storeBookmark = (e) => {
    e.preventDefault()
    const val = websiteNameEl.value
    let url = websiteURLEl.value
    if (!url.includes('http://', 'https://')) 
        url = `https://${url}`
    if (!validate(val, url))
        return false
    showModal()
    const bookmark = {
        name: val,
        url: url
    }
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
    bookmarkForm.reset()
    websiteNameEl.focus()
}

//Event listeners
bookmarkForm.addEventListener('submit',storeBookmark)

//Onload
fetchBookmarks()
